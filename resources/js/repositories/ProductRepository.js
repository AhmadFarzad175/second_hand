// ProductRepository.js
export async function getProducts(search = "", website=false) {
  console.log(website)
    let url = website
        ? "http://127.0.0.1:8000/api/websiteProducts"
        : "http://127.0.0.1:8000/api/products";
    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    return data.data || [];
}
export async function createUpdateProduct(formData, id = null) {
    const url = id
        ? `http://127.0.0.1:8000/api/products/update/${id}`
        : `http://127.0.0.1:8000/api/products`;

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
