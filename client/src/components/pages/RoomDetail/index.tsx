import { Chairs } from "../../../domains/room/components/Chairs";
import { Hall } from "../../../domains/room/components/Hall";
import { Lights } from "../../../domains/room/components/Lights";
import { RoomProvider } from "../../../domains/room/components/RoomProvider";
import {
  ThreeProvider,
  useCameraPosition,
} from "../../../domains/room/components/ThreeProvider";
import { useHallObject } from "../../../domains/room/usecase/reader";
import { PrivateRoute } from "../../../libs/firebase";

type Props = {
  roomId: string;
};

const Room = ({ roomId }: Props) => {
  const { objects } = useHallObject(roomId);
  const { position, handleMove } = useCameraPosition();
  return (
    <>
      <Lights lights={objects} />

      <Chairs
        objects={objects}
        onClickChair={({ x, y, z }) => handleMove(x - 0.5, y + 0.5, z + 2)}
      />
      <Hall
        roomId={roomId}
        x={position[0]}
        y={position[1]}
        z={position[2]}
        xr={0}
        yr={0}
        zr={0}
        scale={0.6}
      />
    </>
  );
};

export const RoomDetail = ({ roomId }: Props) => {
  return (
    <PrivateRoute>
      <RoomProvider roomId={roomId}>
        <ThreeProvider>
          <Room roomId={roomId} />
        </ThreeProvider>
      </RoomProvider>
    </PrivateRoute>
  );
};
