import React from "react";

import { BaseUser } from "@/data/types/users";
import { CheckInButton } from "./pointing/checkin_button";
import { CheckOutButton } from "./pointing/checkout_button";
import { CodeValidation } from "./pointing/code_validation";

const OfflineHomeContent: React.FC = () => {
  return (
    <div>
      <span>Please login to access the Pointing App</span>
    </div>
  );
};

const OnlineHomeContent: React.FC<{ user: BaseUser }> = ({ user }) => {
  return (
    <div>
      <span>{`Hello, ${user.username} !`}</span>
      <div>
        <CheckInButton user={user} />
        <CheckOutButton user={user} />
      </div>
      <CodeValidation userId={user.id} />
    </div>
  );
};

export const Home: React.FC<{ user: BaseUser | null }> = ({ user }) => {
  const today = new Date().toLocaleDateString("fr-FR", {
    timeZone: "Indian/Reunion",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <h1>Welcome to the Austral Groupe Energies Pointing App !</h1>
      <span>{today}</span>
      {user ? <OnlineHomeContent user={user} /> : <OfflineHomeContent />}
    </div>
  );
};
