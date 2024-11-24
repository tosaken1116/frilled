import { Fbx, Gltf } from "@react-three/drei";
import { ReactNode, Suspense } from "react";
import { Object } from "../../../domains/room/types";

type Props = { children?: ReactNode } & Object;

export const Model = ({ ext, ...props }: Props) => {
  const Component = ext === "gltf" || ext === "glb" ? GLTFViewer : FBXViewer;
  return (
    <Suspense>
      <Component ext={ext} {...props} />
    </Suspense>
  );
};

const GLTFViewer = ({ x, y, z, href, xr, yr, zr, scale, children }: Props) => {
  return (
    <mesh receiveShadow castShadow>
      <Gltf
        src={href}
        position={[x, z, y]}
        rotation={[xr, yr, zr]}
        scale={scale}
      >
        {children}
      </Gltf>
    </mesh>
  );
};

const FBXViewer = ({ x, y, z, href, xr, yr, zr, children }: Props) => {
  return (
    <mesh receiveShadow castShadow>
      <Fbx
        path={href}
        receiveShadow
        castShadow
        position={[x, y, z]}
        rotation={[xr, yr, zr]}
        scale={1}
      >
        {children}
      </Fbx>
    </mesh>
  );
};
