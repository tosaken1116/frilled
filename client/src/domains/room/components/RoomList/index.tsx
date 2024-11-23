import { List, ListItem } from "../../../../components/ui/List";
import { useRoomList } from "../../usecase/reader";

export const RoomList = () => {
  const { rooms } = useRoomList();
  return (
    <List>
      {rooms.map((room) => (
        <ListItem key={room.id}>{room.title}</ListItem>
      ))}
    </List>
  );
};
