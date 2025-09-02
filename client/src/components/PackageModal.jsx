import { useState, useEffect } from "react";
import axios from "axios";

export default function PackageModal({ isOpen, onClose, onSave, editingPackage }) {
  const initialFormData = {
    city: "",
    description: "",
    price: "",
    date: "",
    durationDays: "",
    durationNights: "",
    persons: "",
    features: "",
    included: "",
    excluded: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Prefill or reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (editingPackage && editingPackage._id) {
        setIsEditing(true);
        setFormData({
          city: editingPackage.city || "",
          description: editingPackage.description || "",
          price: editingPackage.price || "",
          date: editingPackage.date || "",
          durationDays: editingPackage.durationDays || "",
          durationNights: editingPackage.durationNights || "",
          persons: editingPackage.persons || "",
          features: editingPackage.features?.join(", ") || "",
          included: editingPackage?.included || "",
          excluded: editingPackage?.excluded || "",
        });
        setImage(null); // reset image so new one can be chosen
      } else {
        // fresh create
        setIsEditing(false);
        setFormData(initialFormData);
        setImage(null);
      }
    }
  }, [isOpen, editingPackage]);

  // Reset state when closing
  const handleClose = () => {
    setFormData(initialFormData);
    setImage(null);
    setIsEditing(false);
    onClose();
  };

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
    fd.append("city", formData.city);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("date", formData.date);
    fd.append("durationDays", formData.durationDays);
    fd.append("durationNights", formData.durationNights);
    fd.append("persons", formData.persons);

    // append image only if selected
    if (image) {
      fd.append("image", image);
    }

    if (formData.features) {
      formData.features.split(",").forEach((f) => fd.append("features[]", f.trim()));
    }
    fd.append("included", formData.included);
    fd.append("excluded", formData.excluded);

    try {
      let res;
      if (isEditing) {
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

      alert(`Package ${isEditing ? "updated" : "created"} successfully!`);
      if (onSave) onSave(res.data);

      handleClose();
    } catch (error) {
      console.error("Error saving package:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto hide-scrollbar rounded-lg shadow-lg p-6 relative">

        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Package" : "Add Package"}
        </h2>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* City */}
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter Package City"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price (In Rupees)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter price (In Rupees)"
              required
            />
          </div>

          {/* Duration */}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {/* Duration Days */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Duration Days <span className="text-red-500">*</span>
                </label>
                <select
                  name="durationDays"
                  value={formData.durationDays}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select Days</option>
                  {[...Array(15)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Nights */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Duration Nights <span className="text-red-500">*</span>
                </label>
                <select
                  name="durationNights"
                  value={formData.durationNights}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select Nights</option>
                  {[...Array(15)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Persons */}
          <div>
            <label className="block text-sm font-medium mb-1">Number of Persons</label>
            <input
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleChange}
              placeholder="Enter number of persons"
              className="border rounded px-3 py-2 w-full"
              required
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
              {...(!isEditing ? { required: true } : {})}
            />
            {isEditing && editingPackage?.image && !image && (
              <p className="text-sm text-gray-500 mt-1">
                Current image will be kept if not changed
              </p>
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

          {/* Package Details */}
          <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-md font-semibold mb-2">Package Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* What's Included */}
              <div>
                <label className="block text-sm font-medium mb-1">What's Included</label>
                <textarea
                  rows="4"
                  name="included"
                  value={formData.included}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter included points"
                ></textarea>
              </div>

              {/* What's Excluded */}
              <div>
                <label className="block text-sm font-medium mb-1">What's Excluded</label>
                <textarea
                  rows="4"
                  name="excluded"
                  value={formData.excluded}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter excluded points"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? "Update" : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
