import AxiosSetup from './AxiosSetup';

export async function getFavorites(search = "") {
    try {
        const response = await AxiosSetup.get('/favorites', {
            params: { search }
        });
        return response.data.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch favorites"
        );
    }
}

export async function toggleFavorite(productId) {
    try {
        const response = await AxiosSetup.post(
            `/products/${productId}/favorite`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to toggle favorite"
        );
    }
}