import { useDataChannel } from "@livekit/components-react";
import { useEffect, useRef } from "react";
import { useAuth } from "../../../../libs/firebase";
import { Object } from "../../types";
import { AnimationModel } from "../UserModels";

type Props = Omit<Object, "href" | "ext">;
export const CurrentUser = ({ x, y, z, xr, yr, zr, scale }: Props) => {
  const { send } = useDataChannel();
  const { userId } = useAuth();
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    intervalId.current = setInterval(() => {
      const text = new TextEncoder().encode(
        `${userId},${x},${y},${z},${xr},${yr},${zr},${scale}`
      );
      send(text, {});
    }, 1000);
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  });
  return (
    <AnimationModel x={x} y={y} z={z} xr={xr} yr={yr} zr={zr} scale={scale} />
  );
};
