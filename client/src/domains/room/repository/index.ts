import { CreateRoomResponse, ListRoomResponse } from "../types";

type RoomRepository = {
  createRoom: () => Promise<CreateRoomResponse>;
  listRoom: () => Promise<ListRoomResponse>;
};
export const useRoomRepository = (): RoomRepository => {
  const createRoom = async () => {
    return {
      id: "1",
      token: "this is token",
    };
  };

  const listRoom = async () => {
    return {
      rooms: [
        {
          title: "Room 1",
          description: "This is room 1",
          id: "1",
        },
        {
          title: "Room 2",
          description: "This is room 2",
          id: "2",
        },
      ],
    };
  };

  return {
    createRoom,
    listRoom,
  };
};
