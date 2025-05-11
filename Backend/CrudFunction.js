import { connectDB, getDB } from "./dbs.js";
import bcrypt from "bcrypt";

await connectDB();

const db = getDB();

export async function CreateUser(user) {
  const { name, email, password } = user;
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
            if (err) {
                return { error: err };
            }
            return { success: true, userId: result.insertId };
        }
    );
}

export async function ModifierProductivity(id, productivity) {
    await db.query(
        "UPDATE users SET productivity = ? WHERE id = ?",
        [productivity, id],
        (err, result) => {
            if (err) {
                return { error: err };
            }
            return { success: true };
        }
    );
}

export async function ModifierUser(user,id){
    const { name, email, password } = user;
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
        "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
        [name, email, hashedPassword, id],
        (err, result) => {
            if (err) {
                return { error: err };
            }
            return { success: true };
        }
    );
}
export async function GetUserByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}