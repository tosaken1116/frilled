export type CreateRoomResponse = {
  id: string;
  token: string;
};

export type Room = {
  title: string;
  description: string;
  id: string;
};

export type ListRoomResponse = {
  rooms: Room[];
};
