import api from "./axios";

export async function showResumes() {
    const response = await api.get("/resume");
    return response.data;
}

export async function showMyResume(id) {
    const response = await api.get(`/resume/${id}`);
    return response.data;
}

export async function createResume(data) {
    return api.post("/resume/create", data);
}

export async function updateResume(id, data) {
    return api.patch(`/resume/${id}`, data);
}

export async function deleteResume(id) {
    return api.delete(`/resume/${id}`);
}
