import { useNavigate } from "@tanstack/react-router";
import { Button } from "../../../../components/ui/Button";
import { useRoomUsecase } from "../../usecase";

export const CreateRoomButton = () => {
  const { createRoom } = useRoomUsecase();
  const navigate = useNavigate();
  const handleClick = async () => {
    const { id } = await createRoom();
    navigate({
      to: "/rooms/$id",
      params: {
        id,
      },
    });
  };
  return <Button onClick={handleClick}>ルームを作成</Button>;
};
