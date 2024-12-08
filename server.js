require('dotenv').config();
const express = require('express');
const passport = require('./passport-config');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const app = express();


// Connect to MongoDB
main().catch(err => console.log(err));
async function main() {
    mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
}

// Static Files 
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));

// Set up session
app.use(session({
    secret: 'my_name_is_bobo',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());

// app.use(session(sessionOptions));

// Routes will be added here

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/api/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:5173/login' }), // Correctly authenticate and redirect on failure
    (req, res) => {
        // After successful authentication, redirect to React app (dashboard or home)
        res.redirect('http://localhost:5173/main');
    }
);


app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));