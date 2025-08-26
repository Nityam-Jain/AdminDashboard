import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import CategoryModal from "../components/CategoryModal";
import SubCategoryModal from "../components/SubCategoryModal";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const [active, setActive] = useState(" ");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //logout 
  const handleLogout = () => {

    localStorage.removeItem("token");


    navigate("/"); //navigate to login page 
  };
  const menuItems = [
    { name: "Category", },
  ];

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-indigo-700">Manage Services</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-left font-medium transition 
                ${active === item.name
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </aside>


      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-800">{active}</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Hi! Admin</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded-full border text-blue-600 hover:bg-blue-50 flex items-center gap-1"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </header>

        {/* page content */}
        <main className="flex-1 p-6">
          {active === "Category" && (
            <div className="p-6 bg-white shadow rounded-xl">
              <h3 className="text-lg font-bold mb-4">Catalog Management</h3>
              {/* <p className="text-gray-600 mb-6">Category section</p> */}


              <div className="flex justify-between">
                <button className="px-6 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Category
                </button>

                
                <SubCategoryModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />

                <button className="px-6 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add SubCategory
                </button>

                
                <CategoryModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />

                <button className="px-6 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition">
                  Add Product
                </button>
              </div>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
