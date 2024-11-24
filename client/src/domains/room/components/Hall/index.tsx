import { Box, Sphere, SpotLight } from "@react-three/drei";
import { BackSide } from "three";
import { Object } from "../../types";
import { CurrentUser } from "../CurrentUser";
import { UserModels } from "../UserModels";

type Props = {
  roomId: string;
} & Omit<Object, "href" | "ext">;
export const Hall = ({ roomId, ...props }: Props) => {
  return (
    <mesh receiveShadow>
      <Stage />
      <Sphere scale={[100, 100, 100]}>
        <meshBasicMaterial attach="material" color="#000000" side={BackSide} />
      </Sphere>
      <directionalLight intensity={5} />

      <CurrentUser {...props} />
      <UserModels />
    </mesh>
  );
};

const Stage = () => {
  return (
    <mesh position={[20, 0, 40]}>
      <mesh receiveShadow>
        <Box args={[20, 1, 10]} receiveShadow />
      </mesh>
      <SpotLight
        distance={5}
        angle={0}
        position={[5, 5, 5]}
        attenuation={4}
        anglePower={100}
        color={"#ff0000"}
      />
    </mesh>
  );
};
