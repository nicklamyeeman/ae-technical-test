import { connect, connection } from "mongoose";

try {
  connect(process.env.MONGODB_URI!);

  connection.on("connected", () => {
    console.log("MongoDB connected successfully !");
  });

  connection.on("error", (err) => {
    console.error("MongoDB connection error" + err);
    process.exit();
  });
} catch (error) {
  console.error(error);
}
