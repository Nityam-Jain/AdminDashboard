// src/components/RecommendationCard.jsx
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function RecommendationCard({ pkg }) {
  const navigate = useNavigate();

  // fix image path
  const imageUrl = pkg.image?.startsWith("http")
    ? pkg.image
    : `http://localhost:5000${pkg.image}`;

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Image */}
      <img
        src={imageUrl}
        alt={pkg.city}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-1">{pkg.city}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{pkg.description}</p>

        <div className="flex justify-between items-center text-gray-500 text-sm mt-3">
          {/* Duration */}
          <p className="flex items-center gap-2">
            <SunIcon className="h-4 w-4 text-yellow-500" />
            {pkg.durationDays}D
            <MoonIcon className="h-4 w-4 text-indigo-500 ml-2" />
            {pkg.durationNights}N
          </p>

          {/* Persons */}
          <p className="flex items-center gap-1">
            <FaUser className="h-3 w-3" /> {pkg.persons}
          </p>
        </div>

        {/* Price & Button */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-bold text-gray-800">
            ₹{pkg.price} <span className="text-xs font-normal">/person</span>
          </p>
          <button
            onClick={() => navigate(`/packages/details/${pkg._id}`)}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition text-xs font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
