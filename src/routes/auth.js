import express from "express";
import { isValidEmail, isValidText } from "../util/validation.js";
import { createJSONToken, isValidPassword } from "../util/auth.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email.";
  } else {
    try {
      const existingUser = ["test@example.com", "user@example.com"];
      if (existingUser.includes(data.email)) {
        errors.email = "Email exists already.";
      }
    } catch (error) {}
  }

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = { email: data.email }; // placeholder
    const authToken = createJSONToken(createdUser.email);

    res.status(201).json({
      message: "User created.",
      user: createdUser,
      token: authToken,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = { email, password: "123456" }; // dummy user

  try {
    // user = await getUser(email);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  console.log("user found", user);
  const pwIsValid = await isValidPassword(password, user.password);

  if (!pwIsValid) {
    return res.status(422).json({
      message: "Invalid credentials.",
      errors: { credentials: "Invalid email or password entered." },
    });
  }

  const token = createJSONToken(email);
  res.json({ token });
});

export default router;
