const express = require("express");
const {connectDB} = require("./connect")
const cookieParser = require("cookie-parser")
const { checkForAuth, restrictTo } = require("./middlewares/auth")

const urlRoute = require("./routes/url")
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const URL = require("./models/url")
const path = require("path")

const app = express();
const PORT = 8001;

connectDB("mongodb://localhost:27017/short-url")
.then(() => {
    console.log("Database Connected")
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuth);

app.use("/", staticRoute);
app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/user", userRoute);

app.get("/test", async(req, res) => {
    const allURLs = await URL.find({});
    return res.render("home", {
        urls: allURLs,
    });
});

app.get("/url/:shortId", async(req,res) => {
    const shortId = req.params.shortId;
    const temp = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
            visitHistory: {timestamp: Date.now(),},
        },
    });
    res.redirect(temp.redirectURL);
});

app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
});