import e from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import sessionMiddleware from "./sessionConfig.js";
import { CreateUser, ModifierUser, GetUserByEmail, ModifierProductivity, GetAllTasks, CreateTask, getUsers, DeleteUser, UpdateUser, getUserById } from "./CrudFunction.js";
import cookieParser from "cookie-parser";

dotenv.config();
const port = process.env.PORT ;

const app = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get('/',(req,res)=>{
    res.send("Bonjour dans le backend ! ");
})

app.get("/me", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.post('/login',async (req,res)=>{
    const { email, password } = req.body;
    const data = await GetUserByEmail(email);
    if (!data) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    // Store user data in session
    req.session.user = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        productivity: data.productivity
    };
    // console.log(req.session.user);
    res.status(200).json({ success: true, userId: data.id, user: req.session.user });
}
);
app.post('/createUser',async (req,res)=>{
    const { name, email, password } = req.body;
    try{
        const existingUser = await GetUserByEmail(email);
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }
        const user = { name, email, password };
        const result = await CreateUser(user);
        if (result.error) {
            return res.status(500).json({ error: result.error });
        }
        res.status(201).json({ success: true, userId: result.userId });
    } catch (err) {
        console.log("server erreur")
    }
})

app.put('/modifierProductivity',async (req,res)=>{
    const { productivity } = req.body;
    const id = req.session.user.id;
    if (!id) {
        return res.status(401).json({ error: "User not authenticated" });
    }
    const result = await ModifierProductivity(id, productivity);
    if(result.error){
        res.status(500).json({ error: result.error });
    }
    else{
        res.status(200).json({ success: true });
    }
}
);

app.put('/modifierUser/:id',async (req,res)=>{
    const { name, email, password } = req.body;
    const user = { name, email, password };
    const id = req.params.id;
    const result = await ModifierUser(user,id);
    if (result.error) {
        res.status(500).json({ error: result.error });
    } else {
        res.status(200).json({ success: true });
    }
}),

app.post('/createTask',async (req,res)=>{
    const { domain, content } = req.body;
    const task = { domain, content };
    const result = await CreateTask(task);
    if (result.error) {
        res.status(500).json({ error: result.error });
    } else {
        res.status(201).json({ success: true, taskId: result.taskId });
    }
});
app.get('/getAllTasks',async (req,res)=>{
    const result = await GetAllTasks();
    if (result.error) {
        res.status(500).json({ error: result.error });
    } else {
        res.status(200).json({ success: true, tasks: result.tasks });
    }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // default cookie name
    res.json({ success: true, message: "Logged out successfully" });
  });
});
//get  users
app.get('/getUsers',async(req,res)=>{
   try{
     const result= await getUsers();
     return res.status(200).json({result:result});
   }catch(err){
    console.log(err);
     return res.status(500).send({error:err});
   }
})

// Delete user
app.delete('/deleteUser/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const result= await DeleteUser(id);
        return res.status(200).json({result:result});
    }catch(err){
        console.log(err);
        return res.status(500).send({error:err});
    }
});

app.get("/getUser/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  console.log("getUser id:", id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  try {
    const rows = await getUserById(id);
    console.log("getUser response:", rows);

    if (rows) {
      res.json({ rows: rows }); // Retourne l'utilisateur seul
    } else {
      res.status(404).json({ error: "Utilisateur introuvable" });
    }
  } catch (err) {
    console.error("Erreur dans getUser:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


//  modifier utilisateur
app.put("/updateUser/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const user = { name, email, password };

  try {
    const result = await UpdateUser(user, id);
    return res.status(200).json({ result });
  } catch (err) {
    console.error("Erreur updateUser:", err.message, err.stack);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});


app.listen( port ,()=>{
    console.log(`Backend running on ${process.env.BASE_URL}`)
})