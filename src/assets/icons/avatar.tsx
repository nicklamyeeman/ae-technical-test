import React from "react";

export const AvatarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={`relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ${className}`}
  >
    <svg
      className="absolute w-[120%] h-[120%] text-gray-400 -left-[10%]"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  </div>
);
