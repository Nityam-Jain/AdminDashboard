import Package from "../models/packageSchema.js";

//get package
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find(); 
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create package 
export const createPackage = async (req, res) => {
  try {
    // console.log("Data:", req.files);
    // console.log("📷 Incoming File:", req.file);

    // Build package data
    const packageData = {
      ...req.body,
      image: req.file ? `/uploads/package/${req.file.filename}` : null, // ✅ attach file path
    };

    const newPackage = new Package(packageData);
    await newPackage.save();

    res.status(201).json(newPackage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/packages/:id
export const updatePackage = async (req, res) => {
  try {
    
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }

   
    Object.keys(req.body).forEach((key) => {
      
      if (key === "features[]" || key === "features") {
        pkg.features = Array.isArray(req.body[key])
          ? req.body[key]
          : [req.body[key]];
      } else {
        pkg[key] = req.body[key];
      }
    });

    //  image upload  replace 
    if (req.file) {
      pkg.image = `/uploads/package/${req.file.filename}`;
    }

    const updated = await pkg.save();
    res.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: error.message });
  }
};


// DELETE /api/packages/:id
export const deletePackage = async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

// GET /api/package/details/:id
export const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findById(id);

    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.json(pkg);
  } catch (error) {
    console.error("Get package by ID error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get recommendations by city
export const getRecommendations = async (req, res) => {
  try {
    const { city } = req.params;

    // Find other packages from the same city
    const recommendations = await Package.find({ city: city }).limit(6); // limit results

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Failed to fetch recommendations" });
  }
};



