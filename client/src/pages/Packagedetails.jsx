import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
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
    <div className="max-w-6xl mx-auto p-5 bg-gray-50">
      {/* 🔥 Top Section - Image Left + Details Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 items-center">
        {/* Image */}
        <section className="bg-white p-2 rounded-lg shadow">
          <div className="w-full h-[400px] overflow-hidden rounded-lg shadow">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={packageData.city}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        {/* Details */}
        <section className="bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {packageData.city}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={18} className="mr-2 text-black" />
              <span>{packageData.city}</span>
            </div>
            <p className="text-gray-600 mb-6">
              {packageData.description || "Default overview text."}
            </p>
            <span className="block text-2xl font-semibold text-black mb-6">
              From{" "}
              <span className="text-3xl font-bold">₹{packageData.price}</span>
            </span>
          </div>
        </section>
      </div>

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
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
            What's Included & Excluded
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Includes */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-5">
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
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-5">
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



        {/* ✅ Recommendations Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-6">
            Recommended Packages in {packageData.city}
          </h2>

          {recommendations.filter((pkg) => pkg._id !== packageData._id).length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{
                delay: 0, // no delay between slides
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={3000} // controls how fast it scrolls (higher = slower)
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {recommendations
                .filter((pkg) => pkg._id !== packageData._id)
                .map((pkg) => (
                  <SwiperSlide key={pkg._id}>
                    <RecommendationCard pkg={pkg} />
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <p className="text-gray-600">No recommendations available.</p>
          )}
        </section>

      </div>
    </div>
  );
}

export default PackageDetails;
