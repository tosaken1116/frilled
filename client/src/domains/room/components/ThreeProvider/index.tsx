import { OrbitControls as DreiOrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { PerspectiveCamera, Vector3 } from "three";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type Props = { children: ReactNode };

const DynamicTarget = ({
  controlsRef,
  cameraRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  cameraRef: React.RefObject<PerspectiveCamera>;
}) => {
  useFrame(() => {
    if (controlsRef.current && cameraRef.current) {
      const camera = cameraRef.current;

      // カメラのワールド方向に基づいてターゲットを設定
      const target = camera.position
        .clone()
        .add(camera.getWorldDirection(new Vector3()).multiplyScalar(2));
      controlsRef.current.target.copy(target);
      controlsRef.current.position0.copy(camera.position);
      controlsRef.current.update();
    }
  });
  return null;
};

const CameraContext = createContext<{
  position: [number, number, number];
  handleMove: (x: number, y: number, z: number) => void;
}>({
  position: [0, 0, 0],
  handleMove: () => {},
});

export const useCameraPosition = () => {
  return useContext(CameraContext);
};

export const ThreeProvider = ({ children }: Props) => {
  return (
    <Canvas shadows>
      <Internal>{children}</Internal>
    </Canvas>
  );
};

export const Internal = ({ children }: Props) => {
  const cameraRef = useRef<PerspectiveCamera>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const currentCameraPositionRef = useRef<[number, number, number]>([
    10.5, 27, 1.7,
  ]);
  const [position, setPosition] = useState<[number, number, number]>([
    10.5, 27, 1.7,
  ]);
  const handleMove = (x: number, y: number, z: number) => {
    currentCameraPositionRef.current = [x + 1, y, z];
    setPosition([x - 1, z - 0.3, y - 0.5]);
    setTimeout(() => {
      controlsRef.current?.reset();
      cameraRef.current?.lookAt(x + 10, y + 1, z + 2);
    }, 250);
  };

  useFrame(() => {
    const [x, y, z] = currentCameraPositionRef.current; // 目標位置
    if (cameraRef.current) {
      // カメラの位置を滑らかに更新
      cameraRef.current.position.lerp(new Vector3(x, z, y), 0.1);

      // 必ずY軸を上にし、正しい方向を向くように調整
      cameraRef.current.lookAt(0, 0, 0); // 必要に応じてターゲットを変更
    }
  });

  return (
    <CameraContext.Provider
      value={{
        position: position,
        handleMove,
      }}
    >
      {/* カメラの参照 */}
      <perspectiveCamera ref={cameraRef} position={[10.5, 27, 1.7]} />
      <DreiOrbitControls
        enableZoom={false}
        minZoom={0.04}
        maxZoom={0.04}
        ref={controlsRef}
      />
      <DynamicTarget controlsRef={controlsRef} cameraRef={cameraRef} />
      <axesHelper args={[5]} />
      <mesh castShadow>{children}</mesh>
    </CameraContext.Provider>
  );
};
