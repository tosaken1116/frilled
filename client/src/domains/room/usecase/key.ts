export const generateRoomListKey = () => {
  return ["ROOM_LIST"];
};

export const generateRoomTokenKey = (roomId: string, userName: string) => {
  return ["ROOM_TOKEN", userName, roomId];
};

export const generateHallObjectKey = (roomId: string) => {
  return ["HALL_OBJECT", roomId];
};
