export async function getProducts() {
  try {
    // Fetch data from Laravel API
    const response = await fetch('http://127.0.0.1:8000/api/products');
    
    console.log(response)
    // Check if the response is successful (status 200-299)
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    // Parse response as JSON
    const data = await response.json();
    console.log(data); // Log the data to ensure it's being received
    
    return data.data || []; // Return the data (products)
    
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow the error to be handled by React Query or your error boundary
  }
}
