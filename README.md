# CareerFlow AI — Job Portal Update

This update adds a recruiter-driven job portal while preserving the existing resume builder and job application history.

## New functionality
- Job seekers can browse and search published vacancies, filter by location/work mode, select an existing resume, and apply directly.
- Recruiters can create, edit, and close job listings.
- Recruiters can view applicants for their own jobs and update application statuses.
- Job seekers can view their application history at `/applications`.
- User accounts have a `jobSeeker` or `recruiter` role.
- API routes enforce roles and ownership on the backend.
- Existing manually tracked applications remain supported for backwards compatibility.

## Backend routes
- `GET /jobs` — list published jobs; supports `search`, `location`, `workType`, and `employmentType` query parameters.
- `GET /jobs/:id` — get one published job.
- `POST /jobs` — recruiter publishes a job.
- `GET /jobs/mine` — recruiter sees their own listings.
- `PATCH /jobs/:id` — recruiter edits their own listing.
- `DELETE /jobs/:id` — recruiter closes their own listing (soft close).
- `POST /jobs/:id/apply` — job seeker applies; optional JSON body `{ "resumeId": "...", "notes": "..." }`.
- `GET /jobs/:id/applicants` — recruiter views applicants to their own listing.
- `PATCH /jobs/applications/:applicationId/status` — recruiter changes an applicant status.

All routes except public job listing/detail require a JWT where indicated. Backend authorization checks ownership.

## Run locally
1. Keep your existing environment variables in `server/.env` (`PORT`, `MONGO_URI` or the variable expected by your existing database config, and `JWT_SECRET`; plus Cloudinary credentials if using profile image upload).
2. From `server`, run `npm install` if needed and `npm run` / your existing server command. The project uses `node server.js` as its entry point; add a start script if you want `npm start`.
3. From `client`, run `npm install` if needed and `npm run dev`.
4. The Axios base URL currently targets `http://localhost:8000`. Your server defaults to port `5000`. Set `PORT=8000` in `server/.env` or update `client/src/services/axios.js` to the port your server actually uses.
5. Register a test account and choose either Job Seeker or Recruiter. Log in after registration. Recruiters are redirected to `/recruiter`; job seekers can browse `/jobs` and apply.

## Notes before production
- Public recruiter self-registration is enabled for development/demo purposes. Before a public production launch, add recruiter/company verification or an admin approval workflow.
- Configure CORS for your real frontend origin, validate uploaded files, add rate limiting and request logging, and set strong secrets.
- Salary fields are stored as numeric values in the currency you choose; this version does not impose a currency conversion.
- A resume reference is stored with an application when the job seeker selects one. This version displays the resume title to recruiters; add a secure PDF/export/share workflow before allowing recruiters to download full resume files.
