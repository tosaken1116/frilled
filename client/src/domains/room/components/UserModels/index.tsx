import { useDataChannel } from "@livekit/components-react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { AnimationMixer, FrontSide } from "three";
import { GLTFLoader } from "three-stdlib";
import { Model } from "../../../../components/ui/ModelViewer";
import { Object as ObjectType } from "../../types";

const ObjectKeys = ["id", "x", "y", "z", "xr", "yr", "zr", "scale"] as const;
export const UserModels = () => {
  const [users, setUsers] = useState<Record<string, ObjectType>>({});
  useDataChannel((message) => {
    const uint8array = message.payload;
    const text = new TextDecoder().decode(uint8array);
    const object = text.split(",").reduce(
      (acc, value, index) => {
        return { ...acc, [ObjectKeys[index]]: value };
      },
      {} as ObjectType & { id: string }
    );
    console.log(text);

    setUsers((prev) => {
      return { ...prev, [object.id]: object };
    });
  });

  return (
    <>
      {Object.values(users).map((object, index) => {
        return <UserModel key={index} {...object} />;
      })}
    </>
  );
};

type Props = Omit<ObjectType, "href" | "ext">;
export const UserModel = (props: Props) => {
  return <Model {...props} href="/character.glb" ext="glb" />;
};

import { LoopOnce } from "three";

export const AnimationModel = (props: Props) => {
  const model = useLoader(GLTFLoader, "/character.glb");

  const mixerRef = useRef<AnimationMixer | null>(null);
  const hasPlayedRef = useRef(false); // アニメーションが再生されたかどうかを記録

  if (!hasPlayedRef.current && model.animations.length) {
    const mixer = new AnimationMixer(model.scene);
    mixerRef.current = mixer;

    const action = mixer.clipAction(model.animations[4]);
    action.setLoop(LoopOnce, 0); // アニメーションを1回だけ再生
    action.clampWhenFinished = true; // アニメーション終了時に最後のフレームで停止
    action.play();

    hasPlayedRef.current = true; // アニメーションが再生されたことを記録
  }

  useFrame((state, delta) => {
    mixerRef.current?.update(delta);
  });

  model.scene.traverse((child) => {
    // @ts-ignore
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      // @ts-ignore
      child.material.side = FrontSide;
    }
  });

  return (
    <mesh position={[props.x, props.y, props.z]}>
      <primitive object={model.scene} scale={props.scale} />;
    </mesh>
  );
};
