import { useFetch } from "../../../libs/fetcher";
import { useRoomRepository } from "../repository";
import { generateRoomListKey } from "./key";

export const useRoomList = () => {
  const repository = useRoomRepository();
  const { data } = useFetch(generateRoomListKey(), repository.listRoom);
  return data;
};
