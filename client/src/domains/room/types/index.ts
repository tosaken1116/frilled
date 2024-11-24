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

export type Object = {
  href: string;
  ext: string;
  x: number;
  y: number;
  z: number;
  xr: number;
  yr: number;
  zr: number;
  scale: number;
};

type ServerObject = {
  id: string;
  ext: string;
  x: number;
  y: number;
  z: number;
  xr: number;
  yr: number;
  zr: number;
  scale: number;
};

export type GetHallRequest = {
  roomId: string;
};

export type GetHallRawResponse = {
  objects: ServerObject[];
};

export type GetHallResponse = {
  objects: Object[];
};
