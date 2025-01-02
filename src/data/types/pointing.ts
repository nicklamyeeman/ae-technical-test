import { Types } from "mongoose";

export enum PointerType {
  CHECKIN = "check-in",
  CHECKOUT = "check-out",
}

export interface Pointer {
  userId: Types.ObjectId;
  timestamp: number;
  code: string;
  type: PointerType;
}

export interface UserScheduleEntry {
  date: Date;
  checkin: Date;
  checkout?: Date;
  _id: Types.ObjectId;
}

export interface UserSchedule {
  userId: Types.ObjectId;
  history: Array<UserScheduleEntry>;
}
