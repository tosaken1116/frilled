import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.unmarshalling.{FromRequestUnmarshaller, Unmarshaller}
import spray.json._
import scala.concurrent.Await
import scala.concurrent.duration.Duration

object FirebaseAuthAPI extends App {
  implicit val system: ActorSystem = ActorSystem("firebase-auth-api")
  import system.dispatcher

  // JSON サポート
  case class AuthRequest(token: String)
  case class AuthResponse(uid: Option[String], error: Option[String])

  // JSON フォーマット
  object JsonFormats extends DefaultJsonProtocol {
    implicit val authRequestFormat: RootJsonFormat[AuthRequest] = jsonFormat1(AuthRequest)
    implicit val authResponseFormat: RootJsonFormat[AuthResponse] = jsonFormat2(AuthResponse)
  }
  import JsonFormats._

  // FromRequestUnmarshaller を定義
  implicit val authRequestUnmarshaller: FromRequestUnmarshaller[AuthRequest] =
    Unmarshaller.stringUnmarshaller.map { data =>
      data.parseJson.convertTo[AuthRequest]
    }.asInstanceOf[FromRequestUnmarshaller[AuthRequest]]

  // ルート定義
  val route: Route =
    path("auth") {
      post {
        entity(as[AuthRequest]) { request =>
          val result = FirebaseAuthService.verifyToken(request.token)
          result match {
            case Right(uid) =>
              complete(StatusCodes.OK, AuthResponse(Some(uid), None).toJson.prettyPrint)
            case Left(error) =>
              complete(StatusCodes.Unauthorized, AuthResponse(None, Some(error)).toJson.prettyPrint)
          }
        }
      }
    }

  // Firebase の初期化
  FirebaseAuthService.initializeFirebase()

  // サーバー開始
  val binding = Http().newServerAt("0.0.0.0", 8080).bind(route)
  println("Server is running at http://0.0.0.0:8080/")

  Await.result(system.whenTerminated, Duration.Inf)
}
