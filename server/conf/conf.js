import * as dotenv from 'dotenv';
dotenv.config();

export const conf = {

   port : process.env.PORT, 
   mongo_uri: process.env.MONGO_URI
}