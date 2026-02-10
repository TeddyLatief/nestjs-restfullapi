# 🚀 NestJS REST API – Auth, Users & Posts

A production‑ready REST API built with **NestJS**, **TypeORM**, and **JWT Authentication**. This project demonstrates clean architecture, proper authorization flow, relational data handling, and complete API documentation using **Postman**.

---

## ✨ Features

* 🔐 JWT‑based Authentication
* 👤 Users Management (CRUD)
* 📝 Posts Management (CRUD)
* 🔗 One‑to‑Many Relationship (Users ↔ Posts)
* 🛡️ Authorization using Guards & Custom Decorators
* 🧪 End‑to‑End (E2E) Testing
* 📬 Postman Collection (Public & Shareable)
* ⚙️ Environment‑based Configuration

---

## 🧱 Project Architecture & Pattern

This project follows **Modular Architecture with Layered Pattern**, which is the most common and recommended pattern in real‑world NestJS applications.

### Layers

* **Controller** → Handles HTTP requests & responses
* **Service** → Contains business logic
* **Entity** → Database schema & relations
* **Guard / Decorator** → Authorization & request context

### Why This Pattern?

* Separation of concerns
* High maintainability & scalability
* Easy testing (unit & E2E)
* Aligns with NestJS core philosophy

> This pattern mirrors how backend systems are built in production environments.

---

## 🗂️ Entity Relationship Diagram (ERD)

```text
User (1) ────< (N) Post
```

* One user can have multiple posts
* Deleting a user will cascade delete their posts

---

## 🔐 Authentication Flow

1. User registers via `POST /users`
2. User logs in via `POST /auth/login`
3. API returns **JWT Access Token**
4. Token is used as `Bearer Token` for secured endpoints

---

## 📬 API Documentation (Postman)

The API is fully documented using **Postman**, including:

* Example requests
* Expected responses
* Authorization handling
* Environment variables

🔗 **Postman Collection (Public)**
👉 *Paste your Postman public link here*

### How to Use the Collection

1. Open the Postman link
2. Fork or copy the collection
3. Set environment variable:

   * `base_url` → `http://localhost:3000`
4. Run **Auth → Login**
5. JWT token will be stored automatically
6. Test secured endpoints

---

## 📌 Available Endpoints

### Auth

| Method | Endpoint      | Description           |
| ------ | ------------- | --------------------- |
| POST   | `/auth/login` | Login & get JWT token |

### Users

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| POST   | `/users`     | Create user    |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |
| PATCH  | `/users/:id` | Update user    |
| DELETE | `/users/:id` | Delete user    |

### Posts (Protected)

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| POST   | `/posts`     | Create post    |
| GET    | `/posts`     | Get all posts  |
| GET    | `/posts/:id` | Get post by ID |
| PATCH  | `/posts/:id` | Update post    |
| DELETE | `/posts/:id` | Delete post    |

---

## 🧪 Testing

### Run E2E Tests

```bash
npm run test:e2e
```

E2E tests cover:

* User registration
* Authentication
* Authorized access to protected routes

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run development server
npm run start:dev
```

Server will start at:

```
http://localhost:3000
```

---

## 🛠️ Tech Stack

* **NestJS**
* **TypeScript**
* **TypeORM**
* **PostgreSQL**
* **JWT & Passport**
* **Jest & Supertest**
* **Postman**

---

## 📈 Notes

This project is designed to reflect **real‑world backend practices**, including authentication flow, authorization guards, relational data modeling, and API documentation.

Perfect for:

* Backend portfolio
* Technical assessment
* Learning reference

---

## 👨‍💻 Author

**Teddy Rizqi**
Backend Developer | NestJS Enthusiast
