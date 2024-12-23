import clsx from "clsx";
import React from "react";
import { Loading } from "../../icons/Loading";

type Props = {
  isLoading?: boolean;
  as?: React.ElementType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  as,
  className,
  disabled,
  isLoading,
  ...props
}: Props) => {
  const Component = as || "button";
  const assertDisabled = isLoading || disabled;
  return (
    <Component
      disabled={assertDisabled}
      className={clsx(
        "flex flex-col font-bold gap-2 px-4 py-1 text-4xl border-white rounded-xl border-2",
        className
      )}
      {...props}
    >
      {isLoading && <Loading />}
      {props.children}
    </Component>
  );
};
