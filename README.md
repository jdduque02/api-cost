## 💴 Assistant Cost Manager

The main objective of the “Monthly Expense and Income Management Platform” project is to provide users with an intuitive and secure web-based tool to effectively manage their personal finances. This platform will allow users to record, monitor and analyze their monthly expenses and income, which will help them maintain a more solid control over their financial situation.
---
## 🛠 Tech Stack
[![Node.js](https://img.shields.io/badge/Node.js-20.x%2B-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)](https://www.mongodb.com/atlas)
---

### 📂 **Project Structure** (Estructura del proyecto)

Brief description of code organization:
```plaintext
/src
│── /controllers # Endpoint logic.
│─── /models # MongoDB schemas.
│─── /routes # Routes definition.
│─── /middlewares # Authentication, validation, etc.
│─── /utils # Helpers (sending emails, logs).
│─── /tests # Unit tests/integration.
.env # Environment variables
app.js # Main configuration
```

---

# 📦 Dependencies

### **Core Dependencies (Production)**
| Package | Version | Description |
|---------|---------|-------------|
| **`express`** | `^4.21.2` | Fast, unopinionated web framework for Node.js. |
| **`mongodb`** | `6.13.0` | Official MongoDB driver for Node.js. |
| **`mongoose`** | `1.0.0` | Elegant ODM for MongoDB (schema-based modeling). |
| **`jsonwebtoken`** | `^8.5.1` | JSON Web Token implementation for authentication. |
| **`bcrypt`** / **`bcryptjs`** | `^5.1.1` / `^3.0.2` | Password hashing libraries (security). |
| **`passport`** | `^0.6.0` | Authentication middleware (supports JWT, OAuth, etc.). |
| **`nodemailer`** | `^6.10.0` | Email sending library for Node.js. |
| **`zod`** | `^3.24.3` | TypeScript-first schema validation. |
| **`express-validator`** | `7.2.1` | Request data validation middleware. |
| **`date-fns`** / **`date-fns-tz`** | `^4.1.0` / `3.2.0` | Modern date utilities with timezone support. |
| **`swagger-jsdoc`** + **`swagger-ui-express`** | `^6.2.8` / `^5.0.1` | Auto-generated Swagger/OpenAPI documentation. |

### **Security & Performance**
| Package | Version | Description |
|---------|---------|-------------|
| **`helmet`** | `^8.1.0` | Secures HTTP headers (XSS, CSP, etc.). |
| **`cors`** | `2.8.5` | Enables Cross-Origin Resource Sharing. |
| **`express-rate-limit`** | `^7.5.0` | Rate-limiting middleware (anti-DDoS). |
| **`compression`** | `^1.8.0` | Compresses HTTP responses (Gzip/Brotli). |

### **Utilities**
| Package | Version | Description |
|---------|---------|-------------|
| **`cross-env`** | `7.0.3` | Cross-platform environment variables. |
| **`morgan`** | `1.10.0` | HTTP request logger (dev-only). |
| **`picocolors`** | `1.1.1` | Tiny console color formatting. |
| **`superagent`** | `10.1.1` | Lightweight HTTP client for APIs. |

### **Development Tools (DevDependencies)**
| Package | Version | Description |
|---------|---------|-------------|
| **`jest`** + **`supertest`** | `29.7.0` / `7.0.0` | Testing framework + HTTP assertions. |
| **`eslint`** + **`semistandard`** | `^9.23.0` / `17.0.0` | Linting and code style rules. |
| **`dotenv`** | `^16.4.7` | Loads `.env` environment variables. |
| **`husky`** + **`lint-staged`** | `^9.1.7` / `^15.5.0` | Git hooks for pre-commit checks. |
| **`commitizen`** + **`@commitlint`** | `4.3.1` / `19.7.1` | Enforces Conventional Commits. |
| **`semantic-release`** | `^24.2.3` | Automated versioning + changelog generation. |

---

### **Key Notes**
- **Security**: `helmet`, `bcrypt`, and `express-rate-limit` mitigate common threats.
- **API Docs**: Swagger integration provides interactive API documentation.
- **Testing**: Full test coverage with `jest` and `supertest`.

---

### 🚀 **Features** (Key features)
List the key functionalities of your project. For example:
- **User registration and authentication** (JWT, bcrypt).
- Revenue and expense management** (full CRUD).
- Transaction categorization** (tags, filters).
- Mail notifications** (reminders, summaries).
- **API documented with Swagger**.

---

### 📌 **Prerequisites** (Prerequisites)
Before running the project, what does the user need to install? For example:
- Node.js (v20.x+).
- MongoDB (or access to MongoDB Atlas)
- Environment variables (`.env` configured)

---

### 📄 **Environment Variables** (Environment variables)
Lists the variables needed in `.env`:
```env
PORT=3000
MONGODB_URI=tu_url_of_mongodb
JWT_SECRET=your_secret_key
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=your_password
```
---

### ⚙️ **Installation** (How to install and run)
Step by step guide to clone and install the project:
```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/tu-proyecto.git

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (crear un archivo .env basado en .env.example)

# 4. Iniciar el servidor (modo desarrollo)
npm run dev

# 5. Acceder a la API (ej: http://localhost:3000)
```
---

### 🧪 **Testing**
Explains how to run the tests (if you have them):
````bash
npm test
```

---

### 📜 **License** (Licencia)
```markdown
Licensed under the [MIT License](LICENSE).
```

## Authors

- [@jdduque02](https://github.com/jdduque02)

