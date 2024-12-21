## Run:

In `.env`, give your gemini api key:
```bash
GEMINI_API=<key>
```

Run:
```bash
npm install

npm run start
```

## API Documentation:

### Route: `/api/ingredients`
**Method:** GET  
**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "Tomato",
    "quantity": "2 kg",
    "createdAt": "2024-12-20T08:30:00.000Z",
    "updatedAt": "2024-12-20T08:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Cucumber",
    "quantity": "1 kg",
    "createdAt": "2024-12-21T09:00:00.000Z",
    "updatedAt": "2024-12-21T09:00:00.000Z"
  }
]
```

---

### Route: `/api/ingredients/:id`
**Method:** GET  
**Sample Response:**
```json
{
  "id": 1,
  "name": "Tomato",
  "quantity": "2 kg",
  "createdAt": "2024-12-20T08:30:00.000Z",
  "updatedAt": "2024-12-20T08:30:00.000Z"
}
```

---

### Route: `/api/ingredients`
**Method:** POST  
**Sample Payload:**
```json
{
  "name": "Carrot",
  "quantity": "500 grams"
}
```
**Sample Response:**
```json
{
  "id": 3,
  "name": "Carrot",
  "quantity": "500 grams",
  "createdAt": "2024-12-21T10:00:00.000Z",
  "updatedAt": "2024-12-21T10:00:00.000Z"
}
```

---

### Route: `/api/ingredients/:id`
**Method:** PUT  
**Sample Payload:**
```json
{
  "name": "Tomato",
  "quantity": "3 kg"
}
```
**Sample Response:**
```json
{
  "id": 1,
  "name": "Tomato",
  "quantity": "3 kg",
  "createdAt": "2024-12-20T08:30:00.000Z",
  "updatedAt": "2024-12-21T10:15:00.000Z"
}
```

---

### Route: `/api/ingredients/:id`
**Method:** DELETE  
**Sample Response:**
```json
{
  "message": "Ingredient not found"
}
```

### Route: `/api/chat`
**Method:** GET  
**Sample Response:**
```json
[
  {
    "id": 1,
    "createdAt": "2024-12-20T08:30:00.000Z",
    "updatedAt": "2024-12-20T08:30:00.000Z"
  },
  {
    "id": 2,
    "createdAt": "2024-12-21T09:00:00.000Z",
    "updatedAt": "2024-12-21T09:00:00.000Z"
  }
]
```

---

### Route: `/api/chat/:id`
**Method:** GET  
**Sample Response:**
```json
{
  "chat": {
    "id": 1,
    "createdAt": "2024-12-20T08:30:00.000Z",
    "updatedAt": "2024-12-20T08:30:00.000Z"
  },
  "chatMessages": [
    {
      "id": 1,
      "chatId": 1,
      "message": "Hello, how are you?",
      "createdAt": "2024-12-20T08:35:00.000Z",
      "updatedAt": "2024-12-20T08:35:00.000Z"
    },
    {
      "id": 2,
      "chatId": 1,
      "message": "I'm good, thanks!",
      "createdAt": "2024-12-20T08:36:00.000Z",
      "updatedAt": "2024-12-20T08:36:00.000Z"
    }
  ]
}
```

---

### Route: `/api/chat`
**Method:** POST  
**Sample Payload:**
```json
{
  "createdAt": "2024-12-20T08:30:00.000Z",
  "updatedAt": "2024-12-20T08:30:00.000Z"
}
```
**Sample Response:**
```json
{
  "id": 3,
  "createdAt": "2024-12-20T08:40:00.000Z",
  "updatedAt": "2024-12-20T08:40:00.000Z"
}
```

---

### Route: `/api/chat/:id/message`
**Method:** PUT  
**Sample Payload:**
```json
{
  "message": "What time is it?"
}
```
**Sample Response:**
```json
{
  "message": "Message added"
}
```

---

### Route: `/api/chat/:id`
**Method:** DELETE  
**Sample Response:**
```json
{
  "message": "Chat not found"
}
```

Here is the API documentation based on the provided code for the `Recipes` routes:

---

### Route: `/api/recipes`
**Method:** GET  
**Sample Response:**
```json
[
  {
    "id": 1,
    "name": "Tomato Soup",
    "ingredients": ["Tomato", "Salt", "Water"],
    "steps": "Boil tomatoes, add salt, and blend.",
    "createdAt": "2024-12-20T08:30:00.000Z",
    "updatedAt": "2024-12-20T08:30:00.000Z"
  },
  {
    "id": 2,
    "name": "Cucumber Salad",
    "ingredients": ["Cucumber", "Olive oil", "Lemon"],
    "steps": "Chop cucumber, mix with olive oil and lemon.",
    "createdAt": "2024-12-21T09:00:00.000Z",
    "updatedAt": "2024-12-21T09:00:00.000Z"
  }
]
```

---

### Route: `/api/recipes/my_fav_recipes`
**Method:** GET  
**Sample Response:**
```text
Tomato Soup: Boil tomatoes, add salt, and blend.
Cucumber Salad: Chop cucumber, mix with olive oil and lemon.
```

---

### Route: `/api/recipes/:id`
**Method:** GET  
**Sample Response:**
```json
{
  "id": 1,
  "name": "Tomato Soup",
  "ingredients": ["Tomato", "Salt", "Water"],
  "steps": "Boil tomatoes, add salt, and blend.",
  "createdAt": "2024-12-20T08:30:00.000Z",
  "updatedAt": "2024-12-20T08:30:00.000Z"
}
```

---

### Route: `/api/recipes`
**Method:** POST  
**Sample Payload (with image):**
```json
{
  "file": "<image-file>",
  "text": null
}
```
**Sample Payload (with text):**
```json
{
  "file": null,
  "text": "Tomato Soup: Boil tomatoes, add salt, and blend."
}
```
**Sample Response:**
```json
{
  "id": 3,
  "name": "Tomato Soup",
  "ingredients": ["Tomato", "Salt", "Water"],
  "steps": "Boil tomatoes, add salt, and blend.",
  "createdAt": "2024-12-21T10:00:00.000Z",
  "updatedAt": "2024-12-21T10:00:00.000Z"
}
```

---

### Route: `/api/recipes/:id`
**Method:** PUT  
**Sample Payload:**
```json
{
  "name": "Tomato Soup",
  "ingredients": ["Tomato", "Salt", "Pepper"],
  "steps": "Boil tomatoes, add salt and pepper, and blend."
}
```
**Sample Response:**
```json
{
  "id": 1,
  "name": "Tomato Soup",
  "ingredients": ["Tomato", "Salt", "Pepper"],
  "steps": "Boil tomatoes, add salt and pepper, and blend.",
  "createdAt": "2024-12-20T08:30:00.000Z",
  "updatedAt": "2024-12-21T10:15:00.000Z"
}
```

---

### Route: `/api/recipes/:id`
**Method:** DELETE  
**Sample Response:**
```json
{
  "message": "Recipe not found"
}
```