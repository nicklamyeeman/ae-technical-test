import React from "react";

import { fetchUserScheduleByDate } from "@/data/fetchers/users";
import { BaseUser } from "@/data/types/users";
import { localeFormattedDate } from "@/data/utils/date";
import Link from "next/link";
import { CheckInButton } from "./pointing/checkin_button";
import { CheckOutButton } from "./pointing/checkout_button";
import { CodeValidation } from "./pointing/code_validation";
import { HomeTime } from "./pointing/home_time";

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

const OnlineHomeContent: React.FC<{ user: BaseUser }> = async ({ user }) => {
  const today = new Date(localeFormattedDate());
  const userTodaySchedule = await fetchUserScheduleByDate(user.id, today);

  return (
    <div className="w-full h-full my-2 items-center flex flex-col gap-12 sm:gap-16">
      <div className="w-full items-center flex flex-col text-center">
        <span className="font-medium text-lg text-stone-900">
          Hello, <span className="text-amber-500">{user.username}</span> !
        </span>
        <HomeTime />
      </div>
      <div className="w-full h-fit sm:flex-row flex-col flex gap-4 items-center justify-between">
        <div className="w-full h-full sm:w-1/2 flex flex-col bg-white rounded-xl shadow-md shadow-stone-200 py-2 px-6">
          <span className="font-semibold text-stone-900 mb-4">
            Get your code for clock in and out for the day
          </span>
          <div className="w-full items-center flex flex-col sm:flex-row gap-4 mb-2">
            <CheckInButton user={user} />
            <div className="flex gap-1 items-center">
              <div className="w-24 h-[1px] sm:w-[1px] sm:h-10 bg-stone-200" />
            </div>
            <CheckOutButton user={user} disabled={!userTodaySchedule} />
          </div>
        </div>
        <div className="w-full h-full sm:w-1/2 flex flex-col gap-4 bg-white rounded-xl shadow-md shadow-stone-200 py-2 px-6">
          <span className="font-semibold text-stone-900 mb-4">
            Check your code validity to start or end your day
          </span>
          <CodeValidation userId={user.id} />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-4 my-2">
        {userTodaySchedule && (
          <ul className="w-fit items-start sm:list-disc text-start">
            <li className="italic">
              You already check-in today at{" "}
              {new Date(userTodaySchedule.checkin).toLocaleTimeString("en-EN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
            {userTodaySchedule.checkout && (
              <li className="italic">
                You already check-out today at{" "}
                {new Date(userTodaySchedule.checkout).toLocaleTimeString(
                  "en-EN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </li>
            )}
          </ul>
        )}
        <Link href="/profile">
          <button className="disabled:opacity-40 flex w-full items-center justify-center rounded-md bg-opacity-0 px-6 py-1.5 text-sm font-semibold leading-6 text-amber-500 border border-amber-500 shadow-sm hover:bg-amber-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
            See my schedule history →
          </button>
        </Link>
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
