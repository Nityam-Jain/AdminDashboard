import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Utensils,
  Wifi,
  Coffee,
  Car,
  Check,
  X,
} from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import Footer from "../components/footer";
// import Navbar from "../components/Navbar";

function PackageDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/packages/details/${id}`
        );
        setPackageData(response.data);
      } catch (err) {
        console.log("Error fetching package details", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center text-lg mt-12">Loading package details...</div>
    );
  }

  if (!packageData) {
    return (
      <div className="text-center text-lg mt-12">
        Package not found or error loading data.
      </div>
    );
  }

  // ✅ fix image path
  const imageUrl = packageData.image?.startsWith("http")
    ? packageData.image
    : `http://localhost:5000${packageData.image}`;

  const includes = packageData.included || [];
  const excludes = packageData.excluded || [];

  // Admin action handlers
  const handleEdit = () => {
    navigate(`/admin/packages/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      try {
        await axios.delete(`http://localhost:5000/api/packages/${id}`);
        alert("Package deleted successfully");
        navigate("/admin/packages");
      } catch (err) {
        console.error("Error deleting package", err);
        alert("Failed to delete package");
      }
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-6xl mx-auto p-5 bg-gray-50">
        {/* Image */}
        <div className="mb-8">
          <div className="w-full h-[500px] overflow-hidden rounded-lg mb-4">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={packageData.city}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 pb-5 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {packageData.city}
            </h1>
            <div className="flex items-center text-gray-600">
              <MapPin size={18} className="mr-2 text-black" />
              <span>{packageData.city}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-3xl font-bold text-black mb-3">
              ₹{packageData.price}
            </span>
            {/* <button
              onClick={handleBookingPackage}
              className="bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition"
            >
              Book This Package
            </button> */}
          </div>
        </header>

        {/* Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Overview */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-4">
              About
            </h2>
            <p className="text-gray-600">
              {packageData.description || "Default overview text."}
            </p>
          </section>

          {/* Highlights */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
              Package Highlights
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <Calendar size={22} className="text-black mt-1" />
                <div>
                  <h3 className="font-medium">Duration</h3>
                  <p className="text-gray-600">
                    {packageData.durationDays} Days / {packageData.durationNights} Nights
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Users size={22} className="text-black mt-1" />
                <div>
                  <h3 className="font-medium">Group Size</h3>
                  <p className="text-gray-600">{packageData.persons} Persons</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Utensils size={22} className="text-black mt-1" />
                <div>
                  <h3 className="font-medium">Meals</h3>
                  <p className="text-gray-600">
                    {packageData.meals || "Meals available"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Wifi size={22} className="text-black mt-1" />
                <div>
                  <h3 className="font-medium">Connectivity</h3>
                  <p className="text-gray-600">
                    {packageData.connectivity || "Free WiFi"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Coffee size={22} className="text-black mt-1" />
                <div>
                  <h3 className="font-medium">Activities</h3>
                  <p className="text-gray-600">
                    {packageData.activities || "Multiple activities included"}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Car size={22} className="text-black mt-1" />
                <div>
                  <h3 className="font-medium">Transport</h3>
                  <p className="text-gray-600">
                    {packageData.transport || "Airport transfers included"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Includes & Excludes */}
          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
              What's Included & Excluded
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Includes */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-5">
                  <Check size={20} className="text-green-500" />
                  What's Included
                </h3>
                <ul>
                  {includes.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 mb-3 text-gray-600"
                    >
                      <Check size={16} className="text-green-500 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excludes */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-5">
                  <X size={20} className="text-red-500" />
                  What's Not Included
                </h3>
                <ul>
                  {excludes.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 mb-3 text-gray-600"
                    >
                      <X size={16} className="text-red-500 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Admin Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-800 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-800 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default PackageDetails;
