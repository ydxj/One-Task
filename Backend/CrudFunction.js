import { connectDB, getDB } from "./dbs.js";
import bcrypt from "bcrypt";

await connectDB();

const db = getDB();

export async function CreateUser(user) {
  const { name, email, password } = user;
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(
        "INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())",
        [name, email, hashedPassword],
        (err, result) => {
            if (err) {
                reject(err); 
            } else {
                resolve(result); 
            }
        }
    );
    return { success: true, userId: newUser.insertId };

}

export async function ModifierProductivity(id, productivity) {
    await db.query(
        "UPDATE users SET productivity = ?, updated_at = NOW() WHERE id = ?",
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
        "UPDATE users SET name = ?, email = ?, password = ?, updated_at = NOW() WHERE id = ?",
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
export async function CreateTask(task) {
    const { domain, content } = task;
    await db.query(
        "INSERT INTO tasks (domain, content, created_at) VALUES (?, ?, NOW())",
        [domain, content],
        (err, result) => {
            if (err) {
                return { error: err };
            }
            return { success: true, taskId: result.insertId };
        }
    );
}
export async function GetAllTasks() {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
}
//get user
export async function getUsers() {
    const [rows] = await db.query("SELECT * FROM users");
    return [rows];

}

//get user by id
export async function getUserById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
        return null;
    }
    return rows[0];
}
//supprimer user
export async function DeleteUser(id) {
    await db.query(
        "DELETE FROM users WHERE id = ?", [id],
    );
}


//update user
export async function UpdateUser(user, id) {
  const { name, email, password } = user;

  if (password && password.trim() !== "") {
    // mettre à jour avec le password
    await db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id],
    );
  } else {
    // mettre à jour sans toucher au password
    await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id],
    );
  }
}
