import api from "./axios";

export async function showApplication() {
    try {
        const application = await api.get("/application");
        return application;
    } catch (error) {
        throw error;
    }
}

export async function createApplication(data) {
    try {
        const application = await api.post("/application", data);
        return application;
    } catch (error) {
        throw error;
    }
}

export async function updateApplication(id, data) {
    try {
        const application = await api.patch(`/application/${id}`, data);
        return application;
    } catch (error) {
        throw error;
    }
}

export async function deleteApplication(id) {
    try {
        const application = await api.delete(`/application/${id}`);
        return application;
    } catch (error) {
        throw error;
    }
}