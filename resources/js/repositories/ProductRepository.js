export async function getProducts() {
    const response = await fetch('http://127.0.0.1:8000/api/products');

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    // Parse response as JSON
    const data = await response.json();
    console.log(data); // Log the data to ensure it's being received
    
    return data.data || []; // Return the data (products)
    
}

export async function deleteProduct(id) {
  const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
  console.log(response.data);

  // return data;
}
