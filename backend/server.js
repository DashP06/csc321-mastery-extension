require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/auth.routes");
const postRoutes = require("./src/posts.routes");
const adminRoutes = require("./src/admin.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => console.log("Backend running on port 3000"));
