const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://vivek9606555:npJhOc1hlmuhQcsG@cluster0.xh7e5tp.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define MongoDB schema and model
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model('Post', postSchema);

// Handle requests to the root path
app.get('/', (req, res) => {
    // Use string concatenation to create the correct file path
    const indexPath = __dirname + '/views/index.html';
    
    // Send the HTML file
    res.sendFile(indexPath);
  });

// Handle POST request to add a new post
app.post('/addpost', (req, res) => {
  const { title, content } = req.body;

  const newPost = new Post({
    title,
    content,
  });

  newPost.save()
  .then(() => {
    res.redirect('/');
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error saving post');
  });

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
