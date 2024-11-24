import { Html } from "@react-three/drei";
import { ArrowDown } from "../../../../components/icons/ArrowDown";
import { Model } from "../../../../components/ui/ModelViewer";
import { Object } from "../../types";

type Props = {
  objects: Object[];
  onClickChair?: (object: Object) => void;
};
export const Chairs = ({ objects, onClickChair = () => {} }: Props) => {
  return (
    <>
      {objects.map((object, i) => (
        <Model key={`${object.href}${i}`} {...object}>
          <Html
            position={[0, 5, 2]}
            rotation={[0, 0, 0]}
            transform
            scale={[2, 2, 2]}
          >
            <button
              onClick={() => onClickChair(object)}
              className="hover:animate-bounce  "
            >
              <ArrowDown className="h-64 w-64 hover:text-white text-transparent" />
            </button>
          </Html>
        </Model>
      ))}
    </>
  );
};
