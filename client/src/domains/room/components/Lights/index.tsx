import { Object } from "../../types";

type Props = {
  lights: Object[];
};
export const Lights = ({ lights }: Props) => {
  return (
    <>
      {/* {lights.map(({ x, y, z, xr, yr, zr }) => (
        <spotLight
          position={[x, y + 2000, z]}
          rotation={[xr, yr, zr]}
          castShadow
          intensity={0.0001}
        />
      ))} */}
    </>
  );
};
