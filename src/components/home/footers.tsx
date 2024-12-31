import Link from "next/link";
import React from "react";

export const Footer: React.FC = async () => {
  return (
    <div className="w-full flex items-center py-6 bg-stone-800">
      <div className="w-full flex items-center justify-center">
        <span className="flex text-center gap-2 text-stone-50">
          2024 LAMYEEMAN - All rights reserved <span>{"-"}</span>
          <Link href={"/"} className="text-stone-50">
            <span>Terms of use</span>
          </Link>
        </span>
      </div>
    </div>
  );
};
