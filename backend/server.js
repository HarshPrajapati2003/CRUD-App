const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./db.js')
const asyncHandler = require("express-async-handler");
const User = require("./model.js")
const cors = require('cors')
const path = require("path");

dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000;

app.post('/users',asyncHandler(async(req, res) => {
    const { name, email } = req.body
    if (!name || !email) {
      return res.status(400).json({ message: "Please Enter all the Fields" });
    }
    const user = await User.create({ name, email })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      return res.status(400).json({ message: "Failed to create the user" });
    }
}))

app.get("/users", asyncHandler(async(req, res) => {
    const data = await User.find({})
    if (data) res.status(200).json(data);
    else {
      return res.status(400).json({ message: "Data can't retrive from Database" });
    }
}));

app.delete("/users/:id", asyncHandler(async (req, res) => {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    if (deletedUser) res.status(200).json(deletedUser);
    else {
      return res
        .status(400)
        .json({ message: "User doesn't exist in Database" });
    }
}))

app.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const singleUser = await User.findById(id);
    if (singleUser) res.status(200).json(singleUser);
    else {
      return res
        .status(400)
        .json({ message: "User doesn't exist in Database" });
    }
  })
);

app.put(
  "/users/:id",
  asyncHandler(async (req, res) => {
      const { id } = req.params;
      const {name,email}=req.body
    const singleUser = await User.findByIdAndUpdate(id,{name,email});
    if (singleUser) res.status(200).json(singleUser);
    else {
      return res
        .status(400)
        .json({ message: "User doesn't exist in Database" });
    }
  })
);

// ======================= deployment ============================

const __dirname1 = path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")))
     app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
     });
} else {
    app.get("/", (req, res) => {
      res.send("api is running");
    });
}
  // ======================= deployment ============================

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
});