import { createFileRoute } from "@tanstack/react-router";
import { RoomListPage } from "../../components/pages/RoomList";

export const Route = createFileRoute("/rooms/")({
  component: RoomListPage,
});
