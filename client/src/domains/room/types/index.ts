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

export type GetTokenRequest = {
  roomId: string;
  userName: string;
};

export type GetTokenResponse = {
  token: string;
};
