// PackageModal.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function PackageModal({ isOpen, onClose, onSave, editingPackage }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    rating: "",
    features: "",
  });
  const [image, setImage] = useState(null);

  // Prefill form when editing
  useEffect(() => {
    if (editingPackage) {
      setFormData({
        title: editingPackage.title || "",
        description: editingPackage.description || "",
        price: editingPackage.price || "",
        duration: editingPackage.duration || "",
        rating: editingPackage.rating || "",
        features: editingPackage.features?.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        rating: "",
        features: "",
      });
      setImage(null);
    }
  }, [editingPackage]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("duration", formData.duration);
    if (formData.rating) fd.append("rating", formData.rating);
    if (image) fd.append("image", image);

    if (formData.features) {
      formData.features.split(",").forEach((f) => fd.append("features[]", f.trim()));
    }

    try {
      let res;
      if (editingPackage) {
        // Update existing
        res = await axios.put(
          `http://localhost:5000/api/packages/${editingPackage._id}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Create new
        res = await axios.post(
          "http://localhost:5000/api/packages/create",
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      alert(`Package ${editingPackage ? "updated" : "created"} successfully!`);
      if (onSave) onSave(res.data);
      onClose();
    } catch (error) {
      console.error("Error saving package:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">
          {editingPackage ? "Edit Package" : "Add Package"}
        </h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter package title"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. 5 Days"
              required
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="e.g. 4.5"
            />
          </div>

          {/* Image */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full border rounded-lg px-3 py-2"
              accept="image/*"
              {...(!editingPackage ? { required: true } : {})}
            />
            {editingPackage?.image && !image && (
              <p className="text-sm text-gray-500 mt-1">Current image will be kept if not changed</p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows="3"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          {/* Features */}
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Features</label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Comma separated: Hotel Stay, Sightseeing"
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
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
              {editingPackage ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
