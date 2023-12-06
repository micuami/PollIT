const { Router } = require("express"); 
const Poll = require("../db/Poll"); 
const { isLoggedIn } = require("./middleware"); 

const router = Router();

router.get("/polls", isLoggedIn, async (req, res) => {
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


router.post("/create", isLoggedIn, async (req, res) => {
  const { email } = req.user;
  req.body.email = email;

  try {
    const createdPoll = await Poll.create(req.body);
    res.status(201).json(createdPoll);
  } catch (error) {
    console.error('Error creating poll:', error.message);
    res.status(400).json({ error: 'Error creating poll. Please try again.' });
  }
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

router.post("/:id/vote", isLoggedIn, async (req, res) => {
  const { email } = req.user;
  const _id = req.params.id;
  const { selectedOption } = req.body;

  try {
    const poll = await Poll.findOne({ _id });
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    const isValidOption = poll.options.includes(selectedOption);
    if (!isValidOption) {
      return res.status(400).json({ error: 'Invalid option selected' });
    }

    const hasVoted = poll.votes.some((vote) => vote.email === email);
    if (hasVoted) {
      return res.status(400).json({ error: 'You have already voted on this poll' });
    }

    poll.votes.push({ email, option: selectedOption });
    await poll.save();

    res.status(200).json(poll);
  } catch (error) {
    console.error('Error voting on poll:', error.message);
    res.status(500).json({ error: 'Error voting on poll. Please try again.' });
  }
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