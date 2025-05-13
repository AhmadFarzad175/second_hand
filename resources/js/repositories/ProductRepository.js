export async function getProducts() {
    const response = await fetch('http://127.0.0.1:8000/api/websiteProducts');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    // Parse response as JSON
    const data = await response.json();
    console.log(data); // Log the data to ensure it's being received

    return data.data || []; // Return the data (products)

}

export async function createUpdateProduct(formData, id = null) {

  const url = id
      ? `http://127.0.0.1:8000/api/products/update/${id}`
      : `http://127.0.0.1:8000/api/products`;

  const response = await fetch(url, {
      method: "POST",
      body: formData, // No Content-Type header, browser sets it for FormData
      contentType: "multipart/form-data"
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
  const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_active: isActive }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user status");
  }

  return response.json();
}

export async function toggleFavorite(productId) {
  const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to toggle favorite");
  }

  return response.json();
}