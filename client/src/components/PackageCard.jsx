import { FaStar, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PackageCard({ pkg, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgba(222, 30, 30, 1)",
      cancelButtonColor: "#2771b6ff",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire("Deleted!", "The package has been deleted.", "success");
      }
    });
  };

  // Ensure image path works both with and without leading slash
  const imageUrl = pkg.image?.startsWith("http")
    ? pkg.image
    : `http://localhost:5000${pkg.image}`;

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
      {/* Image */}
      <img
        src={imageUrl}
        alt={pkg.city}
        className="w-full h-52 object-cover"  // no inner rounding; parent clips it
      />

      {/* Card Content (single container to avoid double shadows) */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{pkg.city}</h3>
          <p className="text-gray-600 text-sm">{pkg.description}</p>

          <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
            {/* duration */}
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <SunIcon className="h-5 w-5 text-yellow-500" />
              {pkg.durationDays} Days
              <MoonIcon className="h-5 w-5 text-indigo-500 ml-4" />
              {pkg.durationNights} Nights
            </p>

            {/* number of person */}
            <div className="flex items-center gap-1">
              <FaUser /> {pkg.persons}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mt-2">
            {pkg.features?.map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Price & View Details */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-xl font-bold text-gray-800">
              From ₹{pkg.price}
              <span className="text-sm font-normal text-gray-600">/person</span>
            </p>

            <button
              onClick={() => navigate(`/packages/details/${pkg._id}`)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Bottom buttons separated to prevent overlap/“override” */}
        <div className="flex justify-between pt-4 mt-4 border-t">
          <button
            onClick={() => onEdit(pkg)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(pkg._id)}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
