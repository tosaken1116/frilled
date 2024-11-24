import {
  CreateRoomResponse,
  GetHallRequest,
  GetHallResponse,
  GetTokenRequest,
  GetTokenResponse,
  ListRoomResponse,
} from "../types";

type RoomRepository = {
  createRoom: () => Promise<CreateRoomResponse>;
  listRoom: () => Promise<ListRoomResponse>;
  getToken: (request: GetTokenRequest) => Promise<GetTokenResponse>;
  getHallObject: (request: GetHallRequest) => GetHallResponse;
};
export const useRoomRepository = (): RoomRepository => {
  const createRoom = async () => {
    return {
      id: "1",
      token: "test room1",
    };
  };

  const listRoom = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      rooms: [
        {
          title: "test room 1",
          description: "test room1",
          id: "1",
          thumbnail: "/image1.png",
        },
        {
          title: "test room",
          description: "test room2",
          id: "2",
          thumbnail: "/image1.png",
        },
        {
          title: "test room3",
          description: "test room2",
          id: "2",
          thumbnail: "/image1.png",
        },
        {
          title: "test room",
          description: "test room2",
          id: "2",
          thumbnail: "/image1.png",
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

  const getHallObject = ({ roomId }: GetHallRequest): GetHallResponse => {
    const MAX = 20;
    const COLUMN = 20;
    return {
      objects: Array.from({ length: COLUMN })
        .map((_, j) =>
          Array.from({ length: MAX - 3 }).map((_, i) => ({
            ext: "glb",
            href: "/chair.glb",
            x: i * 2,
            y: j * 1.5,
            z: 0,
            xr: 0,
            yr: 0,
            zr: 0,

            scale: 0.1,
          }))
        )
        .flat(),
    };
  };

  return {
    createRoom,
    listRoom,
    getToken,
    getHallObject,
  };
};
