export async function getFavorites(search = "") {
    let url = "http://127.0.0.1:8000/api/favorites";
    if (search) {
        url += `?search=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch favorites");

    const data = await response.json();

    return data.data || [];
}

export async function toggleFavorite(productId) {
    console.log("API call started for product:", productId); // Add this
    const response = await fetch(
        `http://127.0.0.1:8000/api/products/${productId}/favorite`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to toggle favorite");
    }

    const data = await response.json();
    console.log("API response:", data); // Add this
    return data;
}
