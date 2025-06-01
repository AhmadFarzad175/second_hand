import AxiosSetup from './AxiosSetup';

export async function getCategories() {
    try {
        const response = await AxiosSetup.get('/categories');
        return response.data.data || [];
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
}

export async function createUpdateCategory(formData, id = null) {
    const url = id ? `/categories/update/${id}` : '/categories';
    
    try {
        const response = await AxiosSetup.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to ${id ? "update" : "create"} category`);
    }
}

export async function deleteCategory(id) {
    try {
        await AxiosSetup.delete(`/categories/${id}`);
    } catch (error) {
        throw new Error("Failed to delete category");
    }
}