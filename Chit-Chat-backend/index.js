const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./models/user.js");
const Message = require("./models/message.js");

const app = express();
const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    //"Enter Url here",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Error in connecting to database.", err);
  });

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

app.post("/signup", async (req, res) => {
  const { Username, Email, Password, Avatar } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new User({
      Username,
      Email,
      Password: hashedPassword,
      Avatar,
    });

    await newUser.save();
    res.status(200).json({ message: "User Registered Successfully." });
  } catch (err) {
    console.log("Error in registering the user.", err);
    res.status(500).json({ message: "Error in registering the user!" });
  }
});

// Function to create token for the particular user
const createToken = (userId) => {
  const payload = { userId };
  const token = jwt.sign(payload, "gcyftxby#%67x3yt%dvg", { expiresIn: "1h" });
  return token;
};

app.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res
      .status(400)
      .json({ message: "Email and Password are required fields." });
  }

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect Email or Password." });
    }

    const token = createToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in finding the user", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});



app.get("/chats", (req, res) => {
  const loggedInUserId = req.params.userId;
  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log("Error in retrieving users", err);
      res.status(500).json({ message: "Error in retrieving users." });
    });
});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
