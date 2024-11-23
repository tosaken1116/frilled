import { Suspense } from "./components/ui/Suspense";
import { CreateRoomButton } from "./domains/room/components/CreateRoomButton";
import { RoomList } from "./domains/room/components/RoomList";

export const App = () => {
  return (
    <div>
      <CreateRoomButton />
      <Suspense>
        <RoomList />
      </Suspense>
    </div>
  );
};
