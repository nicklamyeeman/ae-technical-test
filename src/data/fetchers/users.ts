import { verify } from "jsonwebtoken";
import { NextRequest } from "next/server";

import { cookies } from "next/headers";
import { BaseUser } from "../types/users";

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
