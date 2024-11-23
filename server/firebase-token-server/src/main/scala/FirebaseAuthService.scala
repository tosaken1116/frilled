import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.auth.FirebaseAuth
import java.io.FileInputStream

object FirebaseAuthService {
  def initializeFirebase(): Unit = {
    val serviceAccountPath = sys.env.getOrElse("GOOGLE_APPLICATION_CREDENTIALS", "service-account-key.json")
    val serviceAccount = new FileInputStream(serviceAccountPath)
    val options = FirebaseOptions.builder()
      .setCredentials(com.google.auth.oauth2.GoogleCredentials.fromStream(serviceAccount))
      .build()
    if (FirebaseApp.getApps.isEmpty) {
      FirebaseApp.initializeApp(options)
    }
  }

  def verifyToken(idToken: String): Either[String, String] = {
    try {
      val decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken)
      val uid = decodedToken.getUid
      Right(uid)
    } catch {
      case e: Exception =>
        Left(s"Invalid token: ${e.getMessage}")
    }
  }
}
