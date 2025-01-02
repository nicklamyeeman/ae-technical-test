import { Model, model, models, Schema } from "mongoose";

import { Pointer as IPointer, PointerType } from "@/data/types/pointing";

const pointerSchema = new Schema<IPointer>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please provide user"],
  },
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
  type: {
    type: String,
    enum: [PointerType.CHECKIN, PointerType.CHECKOUT],
    default: PointerType.CHECKIN,
  },
});

let Pointer: Model<IPointer>;
if (models.pointers) {
  Pointer = models.pointers as Model<IPointer>;
} else {
  Pointer = model("pointers", pointerSchema);
}
export { Pointer };
