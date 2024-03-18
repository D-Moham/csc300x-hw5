# Jokebook API Documentation

This document outlines the endpoints and functionality of the Jokebook service.

## Base URL

http://localhost:3000/


## Endpoints

### List Joke Categories

- **URL**: `/jokebook/categories`
- **Method**: GET
- **Description**: Returns a list of joke categories available in the Jokebook service.
- **Sample Response**:
  ```json
  ["funnyJoke", "lameJoke"]

### Get Jokes by Category
- **URL**: `/jokebook/joke/:category`
- **Method**: GET
- **Parameters**:
    `:category` (string, required): The category of jokes to retrieve.
- **Description**: Returns jokes for the specified category.
- **Query Parameters**:
    `limit` (optional): Limits the number of jokes returned.
- **Sample Request**:
    ```bash
    [GET /jokebook/joke/funnyJoke?limit=2]
- **Sample Response**:
    ```json
    [{ joke: 'Why did the student eat his homework?', response: 'Because the teacher told him it was a piece of cake!' },
        { joke: 'What kind of tree fits in your hand?', response: 'A palm tree' }]

### Add a New Joke
- **URL**: `/jokebook/joke/new`
- **Method**: POST
- **Description**: Adds a new joke to the specified category.
- **Request Body**:
    { "category": "funnyJoke",
    "joke": "Why did the chicken cross the road?",
    "response": "Because he was fast!"}
- **Request Sample**:
    ```json
    [{ joke : 'Why did the chicken cross the road?', response : 'Because he was fast!'}]

### Error Handling 

#### Get Jokes by Catagory 
- **404**:
    ```json
    [{ error: `no category listed for ${category}` }]

#### Add a New Joke
- **400**:
    ```json
    [{ error: 'Category does not exist' },{ error: 'Joke and response are required' }]


