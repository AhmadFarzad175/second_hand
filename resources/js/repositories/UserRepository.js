export async function getUsers() {
    const response = await fetch('http://127.0.0.1:8000/api/users');

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    // Parse response as JSON
    const data = await response.json();
    console.log(data); // Log the data to ensure it's being received
    
    return data.data || []; // Return the data (products)
    
}

  export async function createUpdateUser(formData, id = null) {

    const url = id
        ? `http://127.0.0.1:8000/api/users/update/${id}`
        : `http://127.0.0.1:8000/api/users`;

    const response = await fetch(url, {
        method: "POST",
        body: formData, // No Content-Type header, browser sets it for FormData
        contentType: "multipart/form-data"
    });
    
    if (!response.ok) {
      throw new Error(`Failed to ${id ? "update" : "create"} user`);
    }
    

    return response.json();
  }



export async function deleteUser(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  console.log(response.data);
}


// Add this to your API functions (where getUsers, createUpdateUser are defined)
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