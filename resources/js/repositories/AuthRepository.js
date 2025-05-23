// Replace your mock API functions with real API calls
export async function loginWithEmail(credentials) {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();

    return data;
}

export async function loginWithGoogle(googleData) {
    console.log("ggole data");
    console.log(googleData);
    const response = await fetch(
        "http://127.0.0.1:8000/api/auth/google/redirect",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ token: googleData.token }),
        }
    );

    if (!response.ok) {
        throw new Error("Google login failed");
    }

    const data = await response.json();
    console.log("data");
    console.log(data);
    return data;
}
