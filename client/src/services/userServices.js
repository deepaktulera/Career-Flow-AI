import api from "./axios";

export async function updateUser(id, data) {
    try {
        const response = await api.patch(`/user/${id}`, data);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function updatePicture(data) {
    try {
        const response = await api.patch(
            "/user/profile-picture",
            data
        );

        return response;
    } catch (error) {
        throw error;
    }
}

export async function updatePassword(current, newPassword) {
    try {
        const response = await api.patch(
            "/user/change-password",
            {
                currentPassword: current,
                newPassword: newPassword,
            }
        );

        return response;
    } catch (error) {
        throw error;
    }
}