import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import CategoryModal from "../components/CategoryModal";
import SubCategoryModal from "../components/SubCategoryModal";
import PackageModal from "../components/PackageModal";
import PackageCard from "../components/PackageCard";

export default function DashboardLayout() {
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/packages")
      .then((res) => setPackages(res.data))
      .catch((err) => console.error(err));
  }, [isPackageModalOpen]);

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/packages/${id}`);
    setPackages(packages.filter((p) => p._id !== id)); // update UI
  };

  // Edit (open modal with package data)
  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setIsPackageModalOpen(true); // open modal with pre-filled form
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { name: "Category" },
    { name: "Packages" },
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
                ${
                  active === item.name
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
            >
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

        {/* Category Page */}
        {active === "Category" && (
          <main className="flex-1 p-6">
            <div className="p-6 bg-white shadow rounded-xl">
              <h3 className="text-lg font-bold mb-4">Catalog Management</h3>

              <div className="flex gap-4">
                {/* Category */}
                <button
                  className="px-6 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setIsCategoryModalOpen(true)}
                >
                  Add Category
                </button>
                <CategoryModal
                  isOpen={isCategoryModalOpen}
                  onClose={() => setIsCategoryModalOpen(false)}
                />

                {/* SubCategory */}
                <button
                  className="px-6 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setIsSubCategoryModalOpen(true)}
                >
                  Add SubCategory
                </button>
                <SubCategoryModal
                  isOpen={isSubCategoryModalOpen}
                  onClose={() => setIsSubCategoryModalOpen(false)}
                />

                {/* Product (future modal placeholder) */}
                <button className="px-6 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 transition">
                  Add Product
                </button>
              </div>
            </div>
          </main>
        )}

        {/* Packages Page */}
        {active === "Packages" && (
          <main className="flex-1 p-6 flex flex-col items-start justify-start">
            <div className="bg-white rounded-xl shadow p-6 w-full">
              <h3 className="text-2xl font-bold mb-4">
                Package <span className="text-blue-600">Manager</span>
              </h3>

              <div className="flex justify-between items-center">
                <p className="text-gray-600">
                  Manage and add travel packages here.
                </p>

                <button
                  onClick={() => setIsPackageModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                  <span className="text-lg">＋</span> Add Package
                </button>
              </div>
            </div>

            {/* Modal */}
            <PackageModal
              isOpen={isPackageModalOpen}
              onClose={() => setIsPackageModalOpen(false)}
              editingPackage={editingPackage}
              setEditingPackage={setEditingPackage}
            />

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg._id}
                  pkg={pkg}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
