import { useState } from "react";
import axios from "axios";

export default function CategoryModal({ isOpen, onClose, onSave }) {
    const [categoryName, setCategoryName] = useState("");
    const [image, setImage] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async(e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("categoryName", categoryName);
        if (image) {
            formData.append("image", image);
        }

        try {
            await axios.post("http://localhost:5000/api/categories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Category saved!");
            onClose();
        } catch (error) {
            console.error("Error saving category:", error.response?.data || error.message);
            alert("Error saving category");
        }

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
                <h2 className="text-xl font-bold mb-4">Add Category</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Category Name</label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter category name"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    {/* Description */}
                    {/* <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter description"
            ></textarea>
          </div> */}

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
