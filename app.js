const express = require('express');
const bodyParser = require('body-parser');
const libraryData = require('./data');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Endpoint untuk menambahkan buku
app.post('/addBook',(req, res) => {
    const { title, author } = req.body;
    const newBook = { title, author };
    libraryData.push(newBook);
    res.json(newBook);
});


// Endpoint untuk mendapatkan buku
app.get('/getBooks', (req, res) => {
    res.json(libraryData);
});
    

// Endpoint untuk mengubah data buku
app.put('/editBook/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { title, author } = req.body;
    if (libraryData[index]) {
      libraryData[index] = { title, author };
      res.json(libraryData[index]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
});


// Endpoint: Menghapus buku berdasarkan indeks (index) dari database
app.delete('/deleteBook/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (libraryData[index]) {
      const deletedBook = libraryData.splice(index, 1);
      res.json(deletedBook[0]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});