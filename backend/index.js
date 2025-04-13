const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500;

// Enable CORS for all routes
app.use(cors());

// Add JSON middleware to parse request bodies
app.use(express.json());

// Store submissions in memory
let submissions = [];

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Get all submissions
app.get('/api/submissions', (req, res) => {
  res.json(submissions);
});

// New POST route for submitting scores
app.post('/api/submit-scores', (req, res) => {
  console.log('Received scores:', req.body);
  // Add timestamp to submission
  const submission = {
    ...req.body,
    timestamp: new Date().toISOString()
  };
  submissions.push(submission);
  res.status(200).json({ 
    message: 'Scores received by backend!',
    submission
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
