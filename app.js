const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let jokes = {
    funnyJoke: [
        { joke: 'Why did the student eat his homework?', response: 'Because the teacher told him it was a piece of cake!' },
        { joke: 'What kind of tree fits in your hand?', response: 'A palm tree' },
    ],
    lameJoke: [
        { joke: 'Which bear is the most condescending?', response: 'Pan-DUH' },
    ],
};

// Endpoint to list joke categories
app.get('/jokebook/categories', (req, res) => {
    res.json(Object.keys(jokes));
});

// Endpoint to get jokes by category with an optional limit
app.get('/jokebook/joke/:category', (req, res) => {
    const { category } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

    if (!jokes[category]) {
        return res.status(404).json({ error: `no category listed for ${category}` });
    }

    let categoryJokes = jokes[category];
    if (limit) {
        categoryJokes = categoryJokes.slice(0, limit);
    }

    res.json(categoryJokes);
});

// Endpoint to add a new joke
app.post('/jokebook/joke/new', (req, res) => {
    const { category, joke, response } = req.body;

    if (!jokes[category]) {
        return res.status(400).json({ error: 'Category does not exist' });
    }

    if (!joke || !response) {
        return res.status(400).json({ error: 'Joke and response are required' });
    }

    jokes[category].push({ joke, response });
    res.json(jokes[category]);
});

app.listen(port, () => console.log(`Jokebook service running on port ${port}`));
