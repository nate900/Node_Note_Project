// import all modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');

// import note model
const Note = require('./models/note');

// create new express app
const app = express();

// database access, mongoDb
// use your own username and password in the 'dbURI' string
const dbURI = 'mongodb+srv://<username>:<password>@cluster0.3fufkks.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( result => {
        console.log('Connected to the DB');
        app.listen(3000); // automatically assumes localhost
    } )
    .catch( err => {
        console.log(err);
    } );

// register view engine
app.set('view engine', 'ejs');

// static files, allows users to access the 'public' folder
app.use(express.static('public'));

// use body field of request object
app.use(express.urlencoded( { extended: true } ));

// middleware
app.use(morgan('dev')); // log details about each request to the server's console

// routes
app.get('/', (req, res) => {
    res.redirect('/notes');
});

// note routes
app.get('/notes', (req, res) => {
    Note.find().sort({ createdAt: -1 })
    .then( result => {
        res.render('index', {title: 'All Notes', Notes: result});
    })
    .catch( err => {
        console.log(err);
    });
    
});

// find by id
app.get('/notes/:id', (req, res) => {
    Note.findById(req.params.id)
    .then( result => {
        res.render('single-note', {title: 'Single Note', Note: result});
    })
    .catch( err => {
        console.log(err);
    });
});

// create new note page
app.get('/new-note', (req, res) => {
    res.render('new-note', {title: 'Create Note'});
});

// post a new note to the database
app.post('/new-note/create', (req, res) => {
    // create a variable to hold new note object
    let newNote = new Note(req.body);
    newNote.save()
    .then( result => {
        res.redirect('/notes');
    })
    .catch( err => {
        console.log(err);
    })
});

// delete a note
app.delete('/notes/delete-note/:id', (req, res) => {
    Note.findByIdAndDelete(req.params.id)
    .then( result => {
        res.json({ redirect: '/notes' });
    })
    .catch( err => {
        console.log(err);
    });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404 Page Not Found'});
});
