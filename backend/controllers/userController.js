require("dotenv").config(); 
const { Router } = require("express"); 
const User = require("../db/User"); 
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");

const router = Router(); 


router.post("/register", async (req, res) => {
  try {

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email." });
    }

    req.body.password = await bcrypt.hash(req.body.password, 10);

    const user = await User.create(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const token = jwt.sign({ email: user.email }, "SECRET");
        res.json({ token, email: user.email }); // returneaza emailul si tokenul
      } else {
        res.status(400).json({ error: "Password do not match." });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist." });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router