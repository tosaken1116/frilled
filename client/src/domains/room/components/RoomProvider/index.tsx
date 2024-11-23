import { LiveKitRoom } from "@livekit/components-react";
import { ReactNode } from "react";
import { useRoomToken } from "../../usecase/reader";

type Props = {
  roomId: string;
  children: ReactNode;
};
export const RoomProvider = ({ roomId, children }: Props) => {
  const { token } = useRoomToken(roomId);
  return (
    <LiveKitRoom serverUrl={import.meta.env.VITE_LK_SERVER_URL} token={token}>
      {children}
    </LiveKitRoom>
  );
};
