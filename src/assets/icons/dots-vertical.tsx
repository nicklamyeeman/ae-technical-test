import React from "react";

export const DotsVerticalIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.5"
      d="M12 6h.01M12 12h.01M12 18h.01"
    />
  </svg>
);
