import { Model, model, models, Schema } from "mongoose";

import { UserSchedule as IUserSchedule } from "@/data/types/pointing";

const userScheduleSchema = new Schema<IUserSchedule>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please provide user"],
  },
  history: {
    type: [
      {
        date: Date,
        checkin: Date,
        checkout: Date,
      },
    ],
    default: [],
  },
});

let UserSchedule: Model<IUserSchedule>;
if (models.userschedules) {
  UserSchedule = models.userschedules as Model<IUserSchedule>;
} else {
  UserSchedule = model("userschedules", userScheduleSchema);
}
export { UserSchedule };
