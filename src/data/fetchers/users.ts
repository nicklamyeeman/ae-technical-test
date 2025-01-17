import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { User } from "../mongodb/models/user";
import { UserSchedule } from "../mongodb/models/user_schedule";
import { UserScheduleEntry } from "../types/pointing";
import { BaseUser } from "../types/users";
import { isSameDate } from "../utils/date";

export const fetchUserScheduleByDate = async (id: string, date: Date) => {
  const userSchedule = await UserSchedule.findOne({ userId: id });
  if (!userSchedule) {
    return Promise.resolve(null);
  }
  return userSchedule.history.find((history: UserScheduleEntry) =>
    isSameDate(history.date, date)
  ) as UserScheduleEntry;
};

export const fetchUserSchedule = async (id: string) =>
  UserSchedule.findOne({ userId: id });

export const fetchUserFromIdlias = async (idLias: string) => {
  const userFromId = await User.findOne({ _id: idLias })
    .select("-password")
    .catch(() => null);
  const userFromUsername = await User.findOne({ username: idLias })
    .select("-password")
    .catch(() => null);

  return userFromId || userFromUsername;
};

export const fetchUserRole = async (id: string | null) => {
  const user = await User.findOne({ _id: id });
  return user?.role || "user";
};

export const getUserFromToken = async (request?: NextRequest) => {
  try {
    const token = await getUserToken(request);

    if (token) {
      const decodedToken: any = verify(token, process.env.TOKEN_SECRET!);
      return decodedToken as BaseUser;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserToken = async (request?: NextRequest) => {
  try {
    const requestToken = request?.cookies.get("token")?.value || "";
    if (requestToken) {
      return requestToken;
    }
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get("token")?.value || "";

    return cookieToken || "";
  } catch (error: any) {
    throw new Error(error.message);
  }
};
