import {
  CreateRoomResponse,
  GetTokenRequest,
  GetTokenResponse,
  ListRoomResponse,
} from "../types";

type RoomRepository = {
  createRoom: () => Promise<CreateRoomResponse>;
  listRoom: () => Promise<ListRoomResponse>;
  getToken: (request: GetTokenRequest) => Promise<GetTokenResponse>;
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

  const getToken = async (
    request: GetTokenRequest
  ): Promise<GetTokenResponse> => {
    const { roomId, userName } = request;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SFU_TOKEN_API_URL}/getToken?room=${roomId}&name=${userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return { token: await res.text() };
    } catch (e) {
      console.error(e);
    }
    return { token: "" };
  };

  return {
    createRoom,
    listRoom,
    getToken,
  };
};
