import api from "./axios";

export const listJobs = (params = {}) => api.get("/jobs", { params });
export const getJob = (id) => api.get(`/jobs/${id}`);
export const createJob = (data) => api.post("/jobs", data);
export const getMyJobs = () => api.get("/jobs/mine");
export const updateJob = (id, data) => api.patch(`/jobs/${id}`, data);
export const closeJob = (id) => api.delete(`/jobs/${id}`);
export const applyToJob = (id, data = {}) => api.post(`/jobs/${id}/apply`, data);
export const getJobApplicants = (id) => api.get(`/jobs/${id}/applicants`);
export const updateApplicantStatus = (applicationId, status) =>
    api.patch(`/jobs/applications/${applicationId}/status`, { status });
