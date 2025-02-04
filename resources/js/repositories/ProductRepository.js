export async function getProducts() {
    const { data, error } = await fetch('http://localhost:8000/api/products');
    console.log(data);
    if (error) {
      console.error(error);
      throw new Error("Cabins could not be loaded");
    }
  
    return data;
  }