const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


router.get('/notes', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    res.json(JSON.parse(data))
  })
});

router.post('/notes', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4()
    }

    const db = JSON.parse(data)
    console.log(db);
    const notes = [...db, newNote]

    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
      res.json(newNote);
    })
  })
})

router.delete('/notes/:id', (req, res) => {
  //req.params.id
  // delete item where id = req.params.id
  fs.readFile('db/db.json', (err, data) => {
    const db = JSON.parse(data)
    const adjustDb = db.filter(note => {
      return note.id !== req.params.id
    });
    fs.writeFile('db/db.json', JSON.stringify(adjustDb), (err) => {
      res.json(adjustDb);
    })
  })

})


module.exports = router;