import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Favorite from "./pages/Favorite";
import AddProduct from "./pages/AddProduct";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./features/dashboard/dashboard";
import Products from "./features/product/Products";
import AdminLayout from "./ui/AdminLayout";
import CreateProduct from "./features/product/CreateProduct";
import Categories from "./features/category/Categories";
import Users from "./features/user/Users";
import CreateUser from "./features/user/CreateUser";

function App() {
    return (
        <Routes>
            {/* Website routes */}
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<Product />} />
                <Route path="favorite" element={<Favorite />} />
                <Route path="add-product" element={<AddProduct />} />
            </Route>

            {/* Admin Panel routes */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />

                {/* Product Menu */}
                <Route path="products" element={<Products />} />
                <Route path="create-product" element={<CreateProduct />} />
                <Route path="categories" element={<Categories />} />

                {/* User Menu */}
                <Route path="users" element={<Users />} />
                <Route path="create-user" element={<CreateUser />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
