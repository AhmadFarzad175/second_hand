export async function getCategories() {
    const response = await fetch('http://127.0.0.1:8000/api/categories');

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    // Parse response as JSON
    const data = await response.json();
    
    return data.data || []; // Return the data (products)
    
}

export async function createUpdateCategory(formData, id = null) {

  const url = id
      ? `http://127.0.0.1:8000/api/categories/update/${id}`
      : `http://127.0.0.1:8000/api/categories`;

  
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


export async function deleteCategory(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}