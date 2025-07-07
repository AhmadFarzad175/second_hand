import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./features/dashboard/dashboard";
import Products from "./features/product/Products";
import AdminLayout from "./ui/AdminLayout";
import Categories from "./features/category/Categories";
import Users from "./features/user/Users";
import CreateUser from "./features/user/CreateUser";
import ShowProduct from "./features/product/showProduct";
import ShowUser from "./features/user/ShowUser";
import AdminCreateProduct from "./features/product/AdminCreateProduct";
import WebsiteCreateProduct from "./pages/WebsiteCreateProduct";
import Profile from "./pages/Profile";
import CreateWebsiteUser from "./pages/CreateWebsiteUser";
import ProtectedRoute from "./repositories/ProtectedRoute";
import RoleProtectedRoute from "./repositories/RoleProtectedRoute";
import ForgetPassword from "./ui/ForgetPassword";
import ResetPassword from "./ui/ResetPassword";

function App() {
    return (
        <Routes>
            {/* Website routes */}
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<Product />} />

                <Route
                    path="favorite"
                    element={
                        <ProtectedRoute >
                            <Favorite />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="add-product"
                    element={
                        <ProtectedRoute>
                            <WebsiteCreateProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="edit-product/:id"
                    element={<WebsiteCreateProduct />}
                />
                <Route
                    path="profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile/edit"
                    element={
                        <ProtectedRoute>
                            <CreateWebsiteUser />
                        </ProtectedRoute>
                    }
                />

            </Route>

            {/* Admin Panel routes */}
            <Route
                path="/admin"
                element={
                    <RoleProtectedRoute role="admin">
                        <AdminLayout />
                    </RoleProtectedRoute>
                }
            >
                <Route path="dashboard" element={<Dashboard />} />

                {/* Product Menu */}
                <Route path="products" element={<Products />} />
                <Route path="product/:id" element={<ShowProduct />} />
                <Route path="create-product" element={<AdminCreateProduct />} />
                <Route
                    path="edit-product/:id"
                    element={<AdminCreateProduct />}
                />
                <Route path="categories" element={<Categories />} />

                {/* User Menu */}
                <Route path="users" element={<Users />} />
                <Route path="user/:id" element={<ShowUser />} />
                <Route path="create-user" element={<CreateUser />} />
                <Route path="edit-user/:id" element={<CreateUser />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/ForgetPassword" element={<ForgetPassword />} />
            <Route path="/reset-password/:id" element={<ResetPassword />} />
            <Route path="/register" element={<CreateWebsiteUser />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default App;
