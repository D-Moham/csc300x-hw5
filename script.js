document.addEventListener('DOMContentLoaded', function() {
    fetchCategories();
    document.getElementById('newJokeForm').addEventListener('submit', addNewJoke);
});

async function fetchCategories() {
    const response = await fetch('http://localhost:3000/jokebook/categories');
    const categories = await response.json();

    const categoriesDiv = document.getElementById('jokeCategories');
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.onclick = () => fetchJokes(category);
        categoriesDiv.appendChild(button);
    });
}

async function fetchJokes(category) {
    const response = await fetch(`http://localhost:3000/jokebook/joke/${category}`);
    const jokes = await response.json();

    const jokesDiv = document.getElementById('jokes');
    jokesDiv.innerHTML = '';
    jokes.forEach(joke => {
        const p = document.createElement('p');
        p.textContent = `${joke.joke} - ${joke.response}`;
        jokesDiv.appendChild(p);
    });
}

async function addNewJoke(event) {
    event.preventDefault();
    const form = event.target;
    const category = form.category.value;
    const joke = form.joke.value;
    const responseText = form.response.value; // Changed variable name to responseText

    const response = await fetch('http://localhost:3000/jokebook/joke/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category, joke, response: responseText }), // Used responseText here
    });

    if (response.ok) {
        fetchJokes(category);
        form.reset();
    } else {
        alert('Failed to add joke.');
    }
}
