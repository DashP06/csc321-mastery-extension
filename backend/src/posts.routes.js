const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('./db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// GET /posts
router.get('/', async (req, res) => {
  res.set('Cache-Control', 'no-store');
  const posts = await prisma.post.findMany({
    include: { author: { select: { name: true } } },
  });
  res.json(posts);
});

// GET /posts/:id
router.get('/:id', async (req, res) => {
  const post = await prisma.post.findUnique({ where: { id: Number(req.params.id) } });
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

// POST /posts
router.post('/', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.create({
    data: { title, content, authorId: req.user.id },
  });
  res.status(201).json(post);
});

// PUT /posts/:id
router.put('/:id', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const post = await prisma.post.update({
    where: { id: Number(req.params.id) },
    data: { title, content },
  });
  res.json(post);
});

// DELETE /posts/:id
router.delete('/:id', requireAuth, async (req, res) => {
  await prisma.post.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

module.exports = router;
