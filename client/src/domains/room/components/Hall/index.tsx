import { Box, Sphere, SpotLight } from "@react-three/drei";
import { BackSide } from "three";
import { Object } from "../../types";
import { AnimationModel, UserModels } from "../UserModels";
import { CurrentUser } from "../CurrentUser";

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
      <directionalLight intensity={0.7} castShadow />
      <mesh receiveShadow>
        <Box args={[20, 1, 10]} receiveShadow />
      </mesh>
      <SpotLight
        distance={5}
        angle={0}
        attenuation={4}
        anglePower={10}
        color={"#0085a0"}
      />
    </mesh>
  );
};
