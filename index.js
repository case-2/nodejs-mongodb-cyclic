require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/books');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);

// connecting to the database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

// routes
app.get('/', (req, res) => {
  res.send({title: 'Books'});
});

app.get('/add-note', async (req, res) => {
  try{
    await Book.insertMany([
      {
        title: "Sons of Anarchy",
        body: "body text goes here...",
      },
      {
        title: "Game of Thrones",
        body: "body text goes here....",
      }
    ]);
    res.send('Books added.....')
  } catch (error) {
    console.log("err", + error);
  }
  res.send({title: 'Books'});
});

app.get('/books', async (req, res) => {
  const book = await Book.find();

  if (book) {
    res.json(book)
  } else {
    res.send("something went wrong.");
  }
});

connectDB().then(() => {
  app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
  })
});

