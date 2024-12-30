export interface Pointer {
  timestamp: number;
  code: string;
  type: "check-in" | "check-out";
}

export interface UserScheduleEntry {
  date: Date;
  checkin: Date;
  checkout?: Date;
}
