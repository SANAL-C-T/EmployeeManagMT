require('dotenv').config();
const express = require('express');
const cors=require("cors")
const server = express();
const PORT = process.env.PORT || 3000;
const user_Routes=require("./Routes/UserRoutes/UserRouterFile");
const Admin_Routes=require("./Routes/AdminRoutes/AdminRoutesFile");
const cookieParser = require('cookie-parser');
const FRONTEND_URL=process.env.FRONTEND_URL;
const path = require('path');


server.use('/Uploads', express.static(path.join(__dirname, 'uploads')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors({
    origin: FRONTEND_URL, 
    credentials: true 
  }));
server.use(cookieParser());
server.use("/",user_Routes)
server.use("/",Admin_Routes)
server.use(express.static('Uploads'));



server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

