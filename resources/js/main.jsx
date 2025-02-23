import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MyTheme from "./theme/MyTheme.js"; // Import your custom theme
import "./theme/MyTheme.js";
import "./app.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            <BrowserRouter>
                <ThemeProvider theme={MyTheme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>

        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "white",
              color: "var(--color-grey-700)",
            },
          }}
          />

    </StrictMode>
);
