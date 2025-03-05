import express from "express";
import { conf } from "./conf/conf.js";
import { connectDB } from "./conf/db.js";
import bodyParser from "body-parser";
import cors from 'cors';
import expenseRoutes from './routes/expenseRoutes.js'
const app = express();



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


connectDB();

app.use('/api/expense', expenseRoutes);
// LISTENING SERVER AT PORT
app.listen(conf.port, () => {
  console.log(`server is listening at port ${conf.port}`);
});
