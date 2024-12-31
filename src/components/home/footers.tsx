import Link from "next/link";
import React from "react";

export const Footer: React.FC = async () => {
  return (
    <div className="w-full flex items-center py-6 bg-stone-900">
      <div className="w-full flex items-center justify-center">
        <span className="flex text-center gap-1 sm:gap-2 text-stone-50 flex-col sm:flex-row">
          2024 LAMYEEMAN - All rights reserved
          <span className="hidden sm:block">{"-"}</span>
          <Link href={"/"} className="text-stone-50">
            <span className="underline underline-offset-2">Terms of use</span>
          </Link>
        </span>
      </div>
    </div>
  );
};
