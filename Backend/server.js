import e from "express";
import dotenv from "dotenv";
import { CreateUser, ModifierUser, GetUserByEmail, ModifierProductivity, GetAllTasks, CreateTask } from "./CrudFunction.js";

dotenv.config();
const port = process.env.PORT ;

const app = e();
app.use(e.json());
app.use(e.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.send("Bonjour dans le backend ! ");
})
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
    res.status(200).json({ success: true, userId: data.id });
}
);
app.post('/createUser',async (req,res)=>{
    const { name, email, password } = req.body;
    const user = { name, email, password };
    const result = await CreateUser(user);
    if (result.error) {
        res.status(500).json({ error: result.error });
    } else {
        res.status(201).json({ success: true, userId: result.userId });
    }
})

app.put('/modifierProductivity/:id',async (req,res)=>{
    const { productivity } = req.body;
    const id = req.params.id;
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

app.listen( port ,()=>{
    console.log(`Backend running on ${process.env.BASE_URL}`)
})