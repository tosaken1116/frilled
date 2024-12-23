import { ReactNode, Suspense as ReactSuspense } from "react";
import { Loading } from "../../icons/Loading";

type SuspenseProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

const Fallback = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-xl">
        <Loading className="text-4xl" />
      </div>
    </div>
  );
};

export const Suspense = ({
  children,
  fallback = <Fallback />,
}: SuspenseProps) => {
  return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
};
