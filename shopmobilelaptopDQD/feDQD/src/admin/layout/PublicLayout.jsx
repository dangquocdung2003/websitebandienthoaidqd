import Header from "@/components/layout/Header";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <div className="px-4 md:px-6 py-4">
        <Outlet />
      </div>
    </div>
  );
}
