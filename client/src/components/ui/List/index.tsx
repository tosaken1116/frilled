import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  as?: keyof JSX.IntrinsicElements;
};
export const List = ({
  children,
  className,
  gap = 0,
  as: Component = "ul",
}: Props) => {
  return (
    <Component className={clsx("gap-[vars(--gap)]", className)} style={{ gap }}>
      {children}
    </Component>
  );
};

type ListItemProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};
export const ListItem = ({
  children,
  className,
  as: Component = "li",
}: ListItemProps) => {
  return <Component className={className}>{children}</Component>;
};
