import Express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";


require("dotenv").config();
let app = Express();

// app.use(cors({ credentials: true, origin: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//config app

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));

//config cookie-parser
app.use(cookieParser());








//config view engine
viewEngine(app);
//init web routes
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});

// app.use((req, res, next) => {
//     return res.send("404 not found");
  
// });