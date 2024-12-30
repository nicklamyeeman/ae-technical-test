import { model, models, Schema } from "mongoose";

const pointerSchema = new Schema({
  timestamp: {
    type: Number,
    required: [true, "Please provide valid timestamp"],
    unique: true,
  },
  code: {
    type: String,
    required: [true, "Please provide code"],
    unique: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please provide user"],
  },
  type: {
    type: String,
    enum: ["check-in", "check-out"],
    default: "checkin",
  },
});

const Pointer = models.pointers || model("pointers", pointerSchema);

export default Pointer;
