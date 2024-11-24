import { CreateRoomButton } from "../../../domains/room/components/CreateRoomButton";
import { RoomList } from "../../../domains/room/components/RoomList";
import { List, ListItem } from "../../ui/List";
import { Suspense } from "../../ui/Suspense";

const Skeleton = () => {
  return (
    <List className="flex-row flex" gap={16}>
      {Array.from({ length: 5 }).map((room) => (
        <ListItem className=" aspect-video w-48 bg-gray-800 border-2 rounded-md p-4 height-auto">
          <div className="w-full aspect-video flex items-center justify-center">
            <img className="w-full h-full object-contain" />
          </div>
          <p className="font-bold w-full h-8"></p>
        </ListItem>
      ))}
    </List>
  );
};
export const RoomListPage = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div>
        <CreateRoomButton />
      </div>
      <Suspense fallback={<Skeleton />}>
        <RoomList />
      </Suspense>
    </div>
  );
};
