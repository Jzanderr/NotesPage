const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const uuid = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();
/* middleware */
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);
/* route to post notes to db */
app.post('/api/notes', (req, res) =>{ 
  const db = JSON.parse(fs.readFileSync('./db/db.json'));
  const addToDb = req.body;
  addToDb.id = uuid();
  db.push(addToDb);
  fs.writeFileSync('./db/db.json', JSON.stringify(db));
  res.json(db);
});
/* route for hompage */
app.get('/', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'))
});
/* route to notes page */
app.get('/notes', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);