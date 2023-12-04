const { Router } = require("express"); 
const Poll = require("../db/Poll"); 
const { isLoggedIn } = require("./middleware"); 

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
  const { email } = req.user; 
  res.json(
    await Poll.find({ email }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});


router.get("/:id", isLoggedIn, async (req, res) => {
  const { email } = req.user; 
  const _id = req.params.id; 
  res.json(
    await Poll.findOne({ email, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});


router.post("/", isLoggedIn, async (req, res) => {
  const { email } = req.user; 
  req.body.email = email; 

  res.json(
    await Poll.create(req.body).catch((error) =>
      res.status(400).json({ error })
    )
  );
});


router.put("/:id", isLoggedIn, async (req, res) => {
  const { email } = req.user; 
  req.body.email = email; 
  const _id = req.params.id;

  res.json(
    await Poll.updateOne({ email, _id }, req.body, { new: true }).catch(
      (error) => res.status(400).json({ error })
    )
  );
});


router.delete("/:id", isLoggedIn, async (req, res) => {
  const { email } = req.user; 
  const _id = req.params.id;

  res.json(
    await Poll.remove({ email, _id }).catch((error) =>
      res.status(400).json({ error })
    )
  );
});

module.exports = router