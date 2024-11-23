import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { RoomList } from "../../components/pages/RoomList";

export const Route = createFileRoute("/rooms/")({
  component: RoomList,
});
