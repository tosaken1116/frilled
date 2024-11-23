import { useFetch } from "../../../libs/fetcher";
import { useAuth } from "../../../libs/firebase";
import { useRoomRepository } from "../repository";
import { generateRoomListKey } from "./key";

export const useRoomList = () => {
  const repository = useRoomRepository();
  const { data } = useFetch(generateRoomListKey(), repository.listRoom);
  return data;
};

export const useRoomToken = (roomId: string) => {
  const repository = useRoomRepository();
  const { userName } = useAuth();
  const { data } = useFetch([roomId], () =>
    repository.getToken({ userName: userName ?? "匿名", roomId })
  );
  return { token: data.token };
};
