"use client";

import { localeFormattedDate } from "@/data/utils/date";
import { useEffect, useState } from "react";

export const HomeTime: React.FC = () => {
  const today = new Date(localeFormattedDate());

  const [todayTime, setTodayTime] = useState<string>(
    new Date(today).toLocaleTimeString("en-EN", {
      hour: "numeric",
      minute: "numeric",
    })
  );

  const todayDate = new Date(today).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString("en-EN", {
        timeZone: "Indian/Reunion",
        hour: "numeric",
        minute: "numeric",
      });
      setTodayTime(time);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-stone-900">
      Today is {todayDate} and it's {todayTime}, have a nice day.
    </span>
  );
};
