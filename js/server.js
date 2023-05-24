const express = require('express');
const path = require('path');

const app = express();
const port = 8000;

// Serve static files from the "js" directory
app.use('/js', express.static(path.join(__dirname, 'js')));

// Route for serving your index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
