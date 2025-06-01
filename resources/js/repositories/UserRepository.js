import AxiosSetup from './AxiosSetup';

export async function getUsers() {
    try {
        const response = await AxiosSetup.get('/users');
        return response.data.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch users"
        );
    }
}

export async function getUser(id = null) {
    try {
        const url = id ? `/users/${id}` : '/profile';
        const response = await AxiosSetup.get(url);
        return response.data.data || null;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch user"
        );
    }
}

export async function createUpdateUser(formData, id = null) {
    try {
        const url = id ? `/users/update/${id}` : '/users';
        const response = await AxiosSetup.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 
            `Failed to ${id ? "update" : "create"} user`
        );
    }
}

export async function deleteUser(id) {
    try {
        const response = await AxiosSetup.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to delete user"
        );
    }
}

export async function updateUserStatus(id, isActive) {
    try {
        const response = await AxiosSetup.put(
            `/users/${id}/status`,
            { is_active: isActive }
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to update user status"
        );
    }
}