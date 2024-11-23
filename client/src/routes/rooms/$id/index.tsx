import { createFileRoute } from "@tanstack/react-router";
import { RoomDetail } from "../../../components/pages/RoomDetail";

const Component = () => {
  const id: string = Route.useParams();
  return <RoomDetail roomId={"1"} />;
};
export const Route = createFileRoute("/rooms/$id/")({
  component: Component,
});
