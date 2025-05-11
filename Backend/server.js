import e from "express";
import dotenv from "dotenv";
import { CreateUser, ModifierUser, GetUserByEmail, ModifierProductivity } from "./CrudFunction";


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
})

app.listen( port ,()=>{
    console.log("Back end runing on port: "+port)
})