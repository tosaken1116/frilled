import { Chat } from "@livekit/components-react";
import { RoomProvider } from "../../../domains/room/components/RoomProvider";
import { PrivateRoute } from "../../../libs/firebase";

type Props = {
  roomId: string;
};

export const RoomDetail = ({ roomId }: Props) => {
  return (
    <PrivateRoute>
      <RoomProvider roomId={roomId}>
        <Chat />
      </RoomProvider>
    </PrivateRoute>
  );
};
