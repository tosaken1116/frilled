import { useNavigate } from "@tanstack/react-router";
import { List, ListItem } from "../../../../components/ui/List";
import { useRoomList } from "../../usecase/reader";

export const RoomList = () => {
  const { rooms } = useRoomList();
  const navigate = useNavigate();
  return (
    <List className="flex-row flex" gap={16}>
      {rooms.map((room) => (
        <ListItem
          onClick={() => navigate({ to: `/rooms/${room.id}` })}
          key={room.id}
          className=" aspect-video w-48  border-2 rounded-md p-4 height-auto cursor-pointer"
        >
          <div className="w-full aspect-video flex items-center justify-center">
            <img
              className="w-full h-full object-contain"
              src={room.thumbnail}
            />
          </div>
          <p className="font-bold text-2xl">{room.title}</p>
        </ListItem>
      ))}
    </List>
  );
};
