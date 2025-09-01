import { FaStar, FaRegCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";

export default function PackageCard({ pkg, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
            {/* Image */}
            <img
                src={`http://localhost:5000${pkg.image}`}
                alt={pkg.name}
                className="w-full h-52 object-cover"
            />

            {/* Card Content */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transform transition duration-300 ease-out hover:scale-105">
                <div className="p-4 flex-1 flex flex-col justify-between">

                    <div>
                        <h3 className="text-lg font-semibold">{pkg.name}</h3>
                        <p className="text-gray-600 text-sm">{pkg.description}</p>

                        <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
                            <div className="flex items-center gap-1">
                                <FaRegCalendarAlt /> {pkg.duration}
                            </div>
                            <div className="flex items-center gap-1">
                                <FaStar className="text-yellow-400" /> {pkg.rating}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {pkg.tags?.map((tag, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Price */}
                        <p className="text-xl font-bold text-gray-800 mt-4">
                            ₹{pkg.price}
                            <span className="text-sm font-normal text-gray-600">/person</span>
                        </p>
                    </div>

                    {/* Buttons at bottom */}
                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => onEdit(pkg)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                            <FaEdit /> Edit
                        </button>
                        <button
                            onClick={() => onDelete(pkg._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                            <FaTrash /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
