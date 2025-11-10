import express from "express";
import bcrypt from "bcryptjs";
import { authenticateToken } from "../middleware/auth.js";
import { prisma } from "../prismaClient.js";

const router = express.Router();

// GET /api/user/me → Returns the current logged-in user's data
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});

// PATCH /api/user/me → Update user's name, email, or password
router.patch("/me", authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;
  const updates = {};

  if (name) updates.name = name;
  if (email) updates.email = email;
  if (password) updates.password = await bcrypt.hash(password, 10);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updates,
      select: { id: true, email: true, name: true, createdAt: true },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ error: "Failed to update user" });
  }
});

// DELETE /api/user/me → Delete current user
router.delete("/me", authenticateToken, async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: req.user.id } });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(400).json({ error: "Failed to delete user" });
  }
});

// GET /api/user/dashboard → Example protected route
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}! This is your dashboard.` });
});

export default router;


