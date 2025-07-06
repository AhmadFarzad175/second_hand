import AxiosSetup from './AxiosSetup';

export async function getProducts(params = {}) {
    const { website = false, ...filters } = params;
        const user = JSON.parse(localStorage.getItem("user"));
        console.log('user id ',user?.id)

    const endpoint = website ? `/websiteProducts?user_id=${user?.id}` : '/products';

    try {
        const response = await AxiosSetup.get(endpoint, {
            params: {
                ...filters,
            },
        });
        return response.data.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch products"
        );
    }
}

export async function createUpdateProduct(formData, id = null) {
    const url = id ? `/products/update/${id}` : '/products';

    try {
        const response = await AxiosSetup.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || 
            `Failed to ${id ? "update" : "create"} product`
        );
    }
}

export async function deleteProduct(id) {
    try {
        const response = await AxiosSetup.delete(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to delete product"
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