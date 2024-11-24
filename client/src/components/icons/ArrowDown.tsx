import clsx from "clsx";

export const ArrowDown = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={clsx("lucide lucide-arrow-big-down-dash", className)}
    >
      <path d="M15 5H9" />
      <path d="M15 9v3h4l-7 7-7-7h4V9z" />
    </svg>
  );
};
