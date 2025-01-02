import { AvatarIcon } from "@/assets/icons/avatar";
import { WarningIcon } from "@/assets/icons/warning";
import { fetchUserSchedule } from "@/data/fetchers/users";
import { UserScheduleEntry } from "@/data/types/pointing";
import { BaseUser } from "@/data/types/users";
import { isSameDate, localeFormattedDate } from "@/data/utils/date";
import React from "react";
import { UserScheduleEntryMenuButton } from "./user_schedule_entry/user_schedule_entry_menu_button";

const formatTimeDiff = (duration: number) => {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return `${hours < 10 ? "0" + hours : hours}h ${
    minutes < 10 ? "0" + minutes : minutes
  }min`;
};

const UserScheduleHistoryTable: React.FC<{
  userSchedule: Array<UserScheduleEntry & { _id: string }>;
  userId: string;
  isAdmin?: boolean;
}> = ({ userSchedule, userId, isAdmin }) => {
  const today = new Date(localeFormattedDate());

  const scheduleData: Array<
    Omit<UserScheduleEntry, "checkout"> & {
      id: string;
      checkout: Date | null;
      checkoutWarning: boolean;
      timeWorked: number;
    }
  > = userSchedule
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((schedule) => {
      const isToday = isSameDate(schedule.date, today);
      const scheduleCheckoutDate =
        schedule.checkout ??
        new Date(`${schedule.date.toISOString().split("T")[0]}T23:59:59`);
      return {
        id: schedule._id.toString(),
        date: schedule.date,
        checkin: schedule.checkin,
        checkout: isToday && !schedule.checkout ? null : scheduleCheckoutDate,
        checkoutWarning: !isToday && !schedule.checkout,
        timeWorked:
          isToday && !schedule.checkout
            ? -1
            : scheduleCheckoutDate.getTime() - schedule.checkin.getTime(),
      };
    });

  if (!userSchedule.length) {
    return (
      <div className="w-full h-full flex my-8 justify-center">
        <span className="text-stone-900">No schedule history available</span>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-start rounded-md">
      <div className="w-full flex items-center justify-stretch rounded-t-md bg-amber-700/80 p-2">
        <span className="w-full font-medium text-amber-50">Date</span>
        <span className="w-full font-medium text-amber-50 hidden sm:block">
          Check-In
        </span>
        <span className="w-full font-medium text-amber-50 hidden sm:block">
          Check-Out
        </span>
        <span className="w-full font-medium text-amber-50">Time worked</span>
        {isAdmin && <span className="aspect-square w-6 h-6" />}
      </div>
      {scheduleData.map((schedule, index) => (
        <div
          key={schedule.id}
          className={`w-full flex items-center justify-stretch p-2 ${
            index % 2
              ? "bg-amber-700/30 hover:bg-amber-600/30"
              : "bg-amber-700/20 hover:bg-amber-600/20"
          }`}
        >
          <span className="flex w-full">
            {schedule.date.toLocaleDateString("en-EN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="hidden sm:flex w-full">
            {schedule.checkin
              ? schedule.checkin.toLocaleTimeString("en-EN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </span>
          <span className="hidden sm:flex w-full items-center gap-1">
            {schedule.checkout
              ? schedule.checkout.toLocaleTimeString("en-EN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
            {schedule.checkoutWarning && (
              <WarningIcon
                title="This value was filled automatically"
                className="w-4 h-4 text-red-500"
              />
            )}
          </span>
          <span className="w-full flex">
            {schedule.timeWorked > 0
              ? formatTimeDiff(schedule.timeWorked)
              : "N/A"}
          </span>
          {isAdmin && (
            <UserScheduleEntryMenuButton
              userId={userId}
              entryId={schedule.id}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const Profile: React.FC<{
  user: BaseUser;
  isSelf?: boolean;
  isAdmin?: boolean;
}> = async ({ user, isSelf = false, isAdmin }) => {
  const userSchedule = await fetchUserSchedule(user.id);
  const totalWorkedDays = (userSchedule?.history || []).length;

  const hideProfile = !isSelf && !isAdmin;

  return (
    <div className="w-full h-full my-2 items-start flex flex-col gap-6">
      <div className="w-full flex items-start p-2 gap-4">
        <AvatarIcon className="w-16 h-16 [&>svg]:text-stone-50 !bg-amber-500" />
        <ul className="text-stone-900">
          <li className="text-lg">{user.username}</li>
          <li>{user.email}</li>
        </ul>
      </div>
      {hideProfile ? (
        <div className="w-full h-full flex my-16 justify-center">
          <span className="text-stone-900">
            You can't see this user profile
          </span>
        </div>
      ) : (
        <div className="w-full flex flex-col items-start gap-2">
          <span className="font-medium text-lg">Schedule history</span>
          <span className="text-sm">{`${
            totalWorkedDays > 1
              ? totalWorkedDays + " days worked"
              : totalWorkedDays + " day worked"
          }`}</span>
          <UserScheduleHistoryTable
            userSchedule={userSchedule?.history || []}
            userId={user.id}
            isAdmin={isAdmin}
          />
        </div>
      )}
    </div>
  );
};
