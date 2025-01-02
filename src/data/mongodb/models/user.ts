import { model, Model, models, Schema } from "mongoose";

import { User as IUser, UserRoles } from "@/data/types/users";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  role: {
    type: String,
    enum: [UserRoles.ADMIN, UserRoles.USER],
    default: UserRoles.USER,
  },
});

let User: Model<IUser>;
if (models.users) {
  User = models.users as Model<IUser>;
} else {
  User = model("users", userSchema);
}
export { User };
