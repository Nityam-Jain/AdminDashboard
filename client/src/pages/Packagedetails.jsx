import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { FaStar, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
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
import { useParams } from "react-router-dom";
import RecommendationCard from "../components/RecommendationCard";

function PackageDetails() {
  const { id } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch main package details
        const res = await axios.get(
          `http://localhost:5000/api/packages/details/${id}`
        );
        setPackageData(res.data);

        // ✅ Fetch recommendations based on city
        if (res.data?.city) {
          const recRes = await axios.get(
            `http://localhost:5000/api/packages/recommendations/${res.data.city}`
          );
          setRecommendations(recRes.data);
        }
      } catch (err) {
        console.error("Error fetching package details:", err);
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

  return (
    <div className="max-w-6xl mx-auto p-5 bg-gray-50 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-start">
        {/* Image */}
        <section className="bg-white p-2 rounded-lg shadow">
          <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden rounded-lg shadow">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={packageData.city}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        {/* Details */}
        <section 
        className="bg-white p-6 rounded-lg shadow flex flex-col justify-between">
          <div>
            {/* City Title */}
            <h1 className="text-2xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-4">
              {packageData.city}
            </h1>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={18} className="mr-2 text-black" />
              <span>{packageData.city}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 text-sm ">
              {packageData.description || "Default overview text."}
            </p>

            {/* Price */}
            <span className="block text-xl sm:text-xl font-semibold text-black mb-6">
              From{" "}
              <span className="text-2xl sm:text-2xl font-bold">
                ₹{packageData.price}
              </span>
            </span>
          </div>
        </section>
      </div>
      {/* ✅ Buttons OUTSIDE the details box, responsive aligned right */}
      <div className="flex justify-end gap-3 mt-4 md:mt-0 md:absolute md:right-6 md:top-90">
        <button
          className="w-20 sm:w-24 md:w-28 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 flex justify-center items-center"
          onClick={() => alert(`Edit package: ${packageData._id}`)}
        >
          <FaEdit />
        </button> 
        <button
          className="w-20 sm:w-24 md:w-28 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 flex justify-center items-center"
          onClick={() => alert(`Delete package: ${packageData._id}`)}
        >
          <FaTrash />
        </button>
      </div>


      {/* Content */}
      <div className="grid grid-cols-1 gap-8">
        {/* Overview */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-4">
            About
          </h2>
          <p className="text-gray-600 text-sm ">
            {packageData.description || "Default overview text."}
          </p>
        </section>

        {/* Highlights */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
            Package Highlights
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <Calendar size={22} className="text-black mt-1" />
              <div>
                <h3 className="font-medium">Duration</h3>
                <p className="text-sm text-gray-600 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <SunIcon className="h-5 w-5 text-yellow-500" />
                    {packageData.durationDays} Days
                  </span>
                  <span className="flex items-center gap-1">
                    <MoonIcon className="h-5 w-5 text-indigo-500" />
                    {packageData.durationNights} Nights
                  </span>
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
          <h2 className="text-xl sm:text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
            What's Included & Excluded
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Includes */}
            <div>
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-5">
                <Check size={20} className="text-green-700" />
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
              <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-5">
                <X size={20} className="text-red-700" />
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
      </div>
    </div>
  );
}

export default PackageDetails;
