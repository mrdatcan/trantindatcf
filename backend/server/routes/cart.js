// routes/cart.js
router.post("/cart", authMiddleware, async (req, res) => {
  const { items } = req.body;
  const userId = req.user.id;

  const updated = await Cart.findOneAndUpdate(
    { userId },
    { items },
    { upsert: true, new: true }
  );
  res.json(updated);
});