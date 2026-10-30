# CareerFlow AI 🚀

**Build your resume. Discover opportunities. Manage your career.**

CareerFlow AI is a MERN stack career management and job portal application designed to help job seekers create professional resumes, evaluate their resumes using an ATS-style checker, explore job opportunities, and track applications. Recruiters can publish job openings and manage their recruitment workflow.

## ✨ Features

### 👤 User Authentication
- User registration and login.
- JWT-based authentication.
- Protected routes for authenticated users.
- Role-based access for job seekers and recruiters.
- User profile and career information management.

### 📄 Resume Builder
- Create and manage professional resumes.
- Organize education, skills, projects, and experience.
- Support for resume templates.
- Resume preview and PDF export, depending on the configured implementation.

### 🎯 ATS Resume Checker
- Analyze resume content against relevant keywords.
- Check important resume sections.
- Identify missing keywords and potential improvements.
- Display an indicative ATS-style score.
- Help users improve resume relevance for a target job description.

> **Note:** The ATS checker provides a basic content-based assessment. Its score is indicative and does not guarantee a particular result from an employer's ATS or recruitment system.

### 💼 Job Portal
- Browse available job openings.
- View job descriptions and requirements.
- Access job listings published by recruiters.
- Apply for relevant opportunities through the application workflow.
- Support job-related information such as company, position, location, and job description.

### 🏢 Recruiter Dashboard
- Publish job vacancies.
- Manage recruiter-created job listings.
- Provide job details and requirements for applicants.
- Support role-based access to recruiter functionality.

### 📊 Job Application Tracker
- Record and manage job applications.
- Track application statuses, such as Applied, Interview, Rejected, Selected, or Offer, where supported.
- Store company details, job titles, dates, and notes.
- Review application progress from the dashboard.

### 🧑‍💻 Profile Management
- Manage personal and career information.
- Maintain skills, education, and experience details.
- Support profile picture uploads where configured.

### 🎨 User Interface
- Responsive React-based interface.
- Landing page with navigation to key features.
- Reusable components and page-level routing.
- API integration between the frontend and backend.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- React Router
- Tailwind CSS, where configured
- Axios or the configured HTTP client

### Backend
- Node.js
- Express.js
- REST APIs
- JSON Web Tokens (JWT)
- Middleware-based authentication and authorization

### Database
- MongoDB
- Mongoose

### Additional Tools
- Git and GitHub
- npm
- Nodemon
- Cloudinary and Multer, where configured for image uploads

---

## 📁 Project Structure

The project follows a frontend/backend structure. Your exact filenames may differ depending on the features installed.

```text
CareerFlow-AI/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

**Note:** This is a reference structure. Keep the existing folders and filenames in your repository; do not rename files solely to match this example.

---

## ⚙️ Prerequisites

Before running CareerFlow AI, install:

- [Node.js](https://nodejs.org/) — use a version compatible with your dependencies.
- npm, included with Node.js.
- [MongoDB](https://www.mongodb.com/) local installation or a MongoDB Atlas database.
- [Git](https://git-scm.com/) for version control.

Check your installations:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd CareerFlow-AI
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

If the project already exists on your computer, open its existing directory instead.

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open another terminal at the project root and run:

```bash
cd server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` directory. Use the project's existing `.env.example` or the variable names referenced in your backend code as the source of truth.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/careerflow
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

These names are examples. If the application uses different variable names, retain the names expected by the actual code.

**Important:**
- Generate a strong, private JWT secret.
- Never commit `.env` files or production credentials to GitHub.
- Ensure the MongoDB connection variable matches your database configuration.
- Configure additional credentials only for integrations that are actually enabled, such as Cloudinary or an AI provider.

### 5. Configure the Frontend API URL

If the frontend supports an environment-based API URL, create `client/.env` and configure the variable expected by the API service.

For example:

```env
VITE_API_URL=http://localhost:5000
```

This is only an example. Verify the exact variable name and whether the application expects the base URL or an API prefix before using it.

Vite exposes client-side variables prefixed with `VITE_` to browser code. Never put private secrets in frontend environment variables.

### 6. Start the Backend

In the backend terminal:

```bash
cd server
npm run dev
```

If the project does not define a `dev` script, use the script configured in `server/package.json`. For a Nodemon setup, this may be:

```bash
npx nodemon server.js
```

A successful startup should indicate that the server is running and the MongoDB connection has succeeded.

### 7. Start the Frontend

In a separate terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, commonly:

```text
http://localhost:5173
```

Keep both development servers running while using the application.

---

## 🔐 Environment Variable Reference

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for signing and verifying JWTs |
| `CLIENT_URL` | Frontend origin used for CORS configuration |
| `VITE_API_URL` | Example frontend API base URL, if supported |

The table lists common configuration names, not a guarantee that every name is used by the current codebase. Match your actual environment variables to the application implementation.

---

## 🧭 Application Workflow

### For Job Seekers

1. Register for an account.
2. Log in to the application.
3. Complete your profile and career information.
4. Create or update your resume.
5. Run the ATS-style resume checker.
6. Browse available job listings.
7. Apply for suitable openings using the available application workflow.
8. Track your applications and update your job-search progress.

### For Recruiters

1. Register or log in with an account authorized for recruiter functionality.
2. Open the recruiter dashboard.
3. Create a job listing with the relevant details.
4. Publish the vacancy.
5. Manage your published job listings using the available dashboard functionality.

Access to recruiter functionality should be enforced by the backend, not only by hiding frontend navigation links.

---

## 🧪 Testing and Build

### Frontend Production Build

From the `client` directory:

```bash
npm run build
```

Vite normally generates production assets in the `dist` directory.

To preview the production build locally, if the project supports the standard Vite script:

```bash
npm run preview
```

### Backend Checks

From the `server` directory, run the test or lint scripts defined in `server/package.json`, if available.

For example:

```bash
npm test
```

Only run this command if a test script exists.

### Recommended Manual Checks

Before deployment, verify:

- User registration and login.
- JWT creation and protected API access.
- MongoDB connectivity.
- Resume creation, editing, and export.
- ATS checker input validation and results.
- Job listing creation and browsing.
- Recruiter authorization.
- Job application submission and tracking.
- Frontend-to-backend API communication.
- CORS configuration.
- Error handling for missing or invalid input.

---

## 🌐 Deployment Guide

CareerFlow AI requires a deployed frontend, a running backend, a reachable MongoDB database, and correctly configured environment variables.

### 1. Deploy MongoDB

You can use MongoDB Atlas or another supported MongoDB deployment.

1. Create a database and database user.
2. Configure network access securely.
3. Obtain the connection string.
4. Set the production `MONGODB_URI` on the backend hosting platform.
5. Verify that the deployed backend can connect to the database.

Avoid exposing database credentials in frontend code or public repositories.

### 2. Deploy the Backend

Deploy the Express backend to a Node.js-compatible hosting provider.

Configure the production environment variables, including:

```env
PORT=5000
MONGODB_URI=your_production_mongodb_connection_string
JWT_SECRET=your_production_secret
CLIENT_URL=https://your-frontend-domain.example
```

Replace the example values with your actual production configuration. The hosting provider may assign the port automatically; if so, the server must use the supplied `process.env.PORT`.

Configure the start command according to the scripts in `server/package.json`. For example, if a production start script exists:

```bash
npm start
```

If the backend uses another entry point or script, use the command defined by that project.

### 3. Configure CORS

Allow requests from the actual deployed frontend origin.

For example:

```text
https://your-frontend-domain.example
```

Do not leave production CORS open unnecessarily. If cookie-based authentication is used, configure credential handling, cookie settings, and frontend requests appropriately.

### 4. Deploy the Frontend

Build the React application and deploy the generated static assets to a compatible frontend hosting provider.

Set the production API URL to the deployed backend address using the environment variable expected by the frontend code.

For a standard Vite application, environment variables used during the build must be configured in the frontend hosting platform before the production build runs.

### 5. Configure a Health Check

If the backend exposes a health endpoint, use its actual route to verify that the service is responding.

For example, if the configured route is `/health`:

```text
https://your-backend-domain.example/health
```

A successful health response confirms that the endpoint is reachable. It does not necessarily prove that every application feature or database operation is working correctly.

### 6. Verify the Complete Application

After deployment, test the full workflow using the production frontend and backend:

- Authentication and authorization.
- Database reads and writes.
- Resume operations and export.
- ATS checker functionality.
- Job listing and application workflows.
- Recruiter permissions.
- Image uploads and external integrations, if enabled.
- Browser console and server logs.

Do not consider the application production-ready until these checks have passed.

---

## 🔒 Security Considerations

- Never publish JWT secrets, database credentials, API keys, or private `.env` files.
- Use HTTPS in production.
- Validate and sanitize incoming user input.
- Enforce authentication and role-based authorization on protected backend routes.
- Restrict recruiter operations to authorized users.
- Use appropriate password hashing for stored passwords.
- Apply sensible request limits and error handling.
- Validate file types and sizes before accepting uploads.
- Restrict CORS to trusted origins.
- Avoid returning stack traces or sensitive internal information to clients.
- Keep dependencies updated and review security advisories.
- Use secure cookie settings if authentication relies on cookies.

---

## 🛠️ Troubleshooting

### MongoDB Connection Error

Check that MongoDB is running, the connection string is correct, and the database is reachable from the backend environment.

### `secretOrPrivateKey must have a value`

This usually means the JWT signing code received an undefined or empty secret.

1. Open `server/.env`.
2. Check that the JWT variable exists and is spelled exactly as expected by the authentication controller.
3. Confirm the environment file is loaded before JWT operations.
4. Restart the backend after changing environment variables.

Never share your actual JWT secret when requesting help.

### Frontend Cannot Reach the Backend

- Verify that the backend is running.
- Check the configured API base URL.
- Confirm that the frontend and backend use the correct ports.
- Check the browser console and Network tab.
- Verify CORS settings.

### Environment Variables Are Not Loading

- Confirm the `.env` file is in the correct directory.
- Ensure it is named `.env`, not `.env.txt`.
- Check the variable names used by the code.
- Restart the affected development server after making changes.

### Resume PDF Export Is Not Working

Check the implementation and dependencies responsible for PDF generation. Confirm that the browser console and server logs do not report errors. Verify that the required resume data is available before exporting.

### Production Deployment Errors

Review hosting logs, environment variables, database access, API URLs, CORS settings, and build output. Test the backend independently before troubleshooting the frontend.

---

## 🔮 Future Improvements

Potential enhancements include:

- AI-assisted resume content suggestions.
- More resume templates and export options.
- Job description matching and keyword recommendations.
- Advanced job search and filtering.
- Recruiter application management.
- Email notifications for application updates.
- Analytics for job-search progress.
- Automated testing and continuous integration.
- Improved security monitoring and rate limiting.

These are roadmap ideas and should not be interpreted as already implemented features.

---

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the affected functionality.
5. Commit your changes with a clear message.
6. Open a pull request describing the changes.

Example:

```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

Do not include credentials, local environment files, or generated dependencies in commits.

---

## 📄 License

Add the appropriate license for your project before distributing it publicly. If no license has been selected, the repository's default copyright restrictions still apply.

---

## 👨‍💻 Author

**Deepak**

A MERN stack career management and job portal project focused on resume building, job discovery, ATS-style resume analysis, and application tracking.

For issues or feature suggestions, use the repository's GitHub Issues section.

---

**CareerFlow AI — Build your resume. Find your next opportunity.**
