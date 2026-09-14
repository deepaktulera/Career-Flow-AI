import api from "./axios";

export async function updateUser(id, data) {
    try {
        const response = await api.patch(`/user/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updatePassword(current, newPassword) {
    try {
        const response = await api.patch(`/change-password`, {
            currentPassword: current,
            newPassword: newPassword
        });
        return response;
    } catch (error) {
        throw error;
    }
}