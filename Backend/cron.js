import { connectDB, getDB } from "./dbs.js";
import { sendEmail } from "./mail.js";

await connectDB();
const db = getDB()


export async function sendDailyTasks() {
  try {
    const [users] = await db.query("SELECT * FROM users");

    if (users.length === 0) {
      console.log("⚠️ No users found.");
      return;
    }

    for (let user of users) {
      const [matchedTasks] = await db.query(
        "SELECT * FROM tasks WHERE domain = ?",
        [user.productivity]
      );

      if (matchedTasks.length === 0) {
        console.log(`⚠️ No tasks for user ${user.email} with category '${user.productivity}'`);
        continue;
      }

      const randomTask = matchedTasks[Math.floor(Math.random() * matchedTasks.length)];

      const message = `Good morning, ${user.name}!\n\nHere’s your '${user.productivity}' task for today:\n\n"${randomTask.content}"\n\nMake it count!\n\n- OneTask Daily`;

      await sendEmail(user.email, "Your OneTask for Today 🌞", message);
    }
  } catch (err) {
    console.error("❌ Error in daily task job:", err.message);
  }
}
