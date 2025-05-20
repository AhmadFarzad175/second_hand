// ProductRepository.js
import axios from "axios";

export async function getProducts(params = {}) {
    const { website = false, ...filters } = params;
    const baseURL = website
        ? "http://127.0.0.1:8000/api/websiteProducts"
        : "http://127.0.0.1:8000/api/products";

    try {
        const response = await axios.get(baseURL, {
            params: {
                ...filters,
                website, // if you still need this flag
            },
        });
        console.log(response.data)
        return response.data.data || [];
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch products"
        );
    }
}
export async function createUpdateProduct(formData, id = null) {
    const url = id
        ? `http://127.0.0.1:8000/api/products/update/${id}`
        : `http://127.0.0.1:8000/api/products`;

    console.log(url)
    console.log(formData)

    const response = await fetch(url, {
        method: "POST",
        body: formData, // No Content-Type header, browser sets it for FormData
        contentType: "multipart/form-data",
    });

    if (!response.ok) {
        throw new Error(`Failed to ${id ? "update" : "create"} product`);
    }

    return response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
    console.log(response.data);

    // return data;
}

export async function updateUserStatus(id, isActive) {
    const response = await fetch(
        `http://127.0.0.1:8000/api/users/${id}/status`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_active: isActive }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update user status");
    }

    return response.json();
}
