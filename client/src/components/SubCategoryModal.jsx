import { useState } from "react";

export default function SubCategoryModal({ isOpen, onClose, categoryName }) {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      categoryName,
      subCategoryName,
      image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-100 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Add Sub Category</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Category Name (auto filled, readonly) */}
          <div>
            <label className="block text-sm font-medium mb-1">Category Name</label>
            <input
              type="text"
              value={categoryName}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Sub Category</label>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter sub category name"
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
