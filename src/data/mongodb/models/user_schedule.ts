import { model, models, Schema } from "mongoose";

const userScheduleSchema = new Schema({
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

const UserSchedule =
  models.userschedules || model("userschedules", userScheduleSchema);

export default UserSchedule;
