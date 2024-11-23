import { useCallback } from "react";
import { mutate } from "swr";
import { useRoomRepository } from "../repository";
import { generateRoomListKey } from "./key";

export const useRoomUsecase = () => {
  const roomRepository = useRoomRepository();
  const createRoom = useCallback(async () => {
    const room = await roomRepository.createRoom();
    await mutate(generateRoomListKey());

    return room;
  }, []);

  return {
    createRoom,
  };
};
