import mongoose from "mongoose";
main().catch(err => console.log(err));

export default async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ChatApp');
    console.log("ChatApp database is connected")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}