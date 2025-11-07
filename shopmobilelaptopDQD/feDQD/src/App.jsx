import { Routes, Route, Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Home from "@/pages/Home/Home";

import AdminLayout from "@/admin/layout/AdminLayout";
import Dashboard from "@/admin/dashboard/Dashboard";
import CategoriesList from "@/admin/categories/CategoriesList";
import CategoryForm from "@/admin/categories/CategoryForm";
import CartPage from "@/pages/Cart/Cart";
import LoginPage from "@/pages/Auth/Login";
import RegisterPage from "@/pages/Auth/Register";




// Public layout CHỈ có Outlet (không lồng <Routes/>)
function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="px-4 md:px-6 py-4">
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="categories" element={<CategoriesList />} />
        <Route path="categories/new" element={<CategoryForm />} />
        <Route path="categories/:id" element={<CategoryForm />} />
        
      </Route>

      {/* 404 */}
      <Route path="*" element={<div className="p-6">Not Found</div>} />
    </Routes>
  );
}
