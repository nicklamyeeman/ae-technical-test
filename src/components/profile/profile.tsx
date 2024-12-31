import { fetchUserSchedule } from "@/data/fetchers/users";
import React from "react";

export const Profile: React.FC<{
  user: any;
}> = async ({ user }) => {
  const userSchedule = await fetchUserSchedule(user.id);

  return (
    <div>
      <h1>Profile</h1>
      {JSON.stringify(user)}
      <div>{JSON.stringify(userSchedule)}</div>
    </div>
  );
};
