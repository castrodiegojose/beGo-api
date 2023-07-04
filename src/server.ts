import express, {Application} from "express"; 
import bodyparser from "body-parser";
import connectDB from "./db/config";
import config from "./config/default";
import { appRoutes } from "./routes";
import { TokenValidation } from './middleware/verifyToken';


// connecting mongoDB
connectDB();
const app: Application = express();

// middleware
app.use(bodyparser.json());

//routes
app.use('/api/auth', appRoutes.authRoutes);
app.use('/api', TokenValidation, appRoutes.routes)

// server
const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT} 🚀`)
})