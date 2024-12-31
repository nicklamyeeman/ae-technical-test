import React from "react";

import { BaseUser } from "@/data/types/users";
import Link from "next/link";
import { CheckInButton } from "./pointing/checkin_button";
import { CheckOutButton } from "./pointing/checkout_button";
import { CodeValidation } from "./pointing/code_validation";

const OfflineHomeContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center my-4 gap-2 h-full w-full justify-center">
      <span className="italic text-lg text-stone-900">
        Please login to access the Pointing App
      </span>
      <Link href="/login">
        <button className="bg-amber-500 text-stone-50 tracking-wider rounded-2xl px-6 py-1.5 hover:bg-amber-400 flex items-center font-medium">
          Go to the login page →
        </button>
      </Link>
    </div>
  );
};

const OnlineHomeContent: React.FC<{ user: BaseUser }> = ({ user }) => {
  const todayDate = new Date().toLocaleDateString("en-EN", {
    timeZone: "Indian/Reunion",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const todayTime = new Date().toLocaleTimeString("en-EN", {
    timeZone: "Indian/Reunion",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <div className="w-full h-full my-2 items-center flex flex-col gap-12 sm:gap-16">
      <div className="w-full items-center flex flex-col text-center">
        <span className="font-medium text-lg text-stone-900">
          Hello, <span className="text-amber-500">{user.username}</span> !
        </span>
        <span className="text-stone-900">
          Today is {todayDate} and it's {todayTime}, have a nice day.
        </span>
      </div>
      <div className="w-full sm:flex-row flex-col flex gap-4 items-center justify-between">
        <div className="w-full sm:w-1/2 flex flex-col gap-2 bg-white rounded-xl shadow-md shadow-stone-200 py-2 px-6">
          <span className="font-semibold text-stone-900">
            Get your code to clock in and out for the day
          </span>
          <CheckInButton user={user} />
          <CheckOutButton user={user} />
        </div>
        <CodeValidation userId={user.id} />
      </div>
    </div>
  );
};

export const Home: React.FC<{ user: BaseUser | null }> = ({ user }) => {
  return (
    <div className="w-full h-full flex flex-col items-center my-2 py-2 sm:my-8 px-4 gap-6">
      <h1 className="font-semibold sm:tracking-wide text-xl text-center sm:text-3xl text-stone-900">
        Welcome to the Austral Groupe Energies Pointing App !
      </h1>
      {user ? <OnlineHomeContent user={user} /> : <OfflineHomeContent />}
    </div>
  );
};
