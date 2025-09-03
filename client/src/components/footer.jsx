export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
        
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Your Company</h2>
          <p className="text-sm mb-2">
            Building solutions to help your business grow.
            <br />
            Empowering users through technology and creativity.
          </p>
          <a
            href="/admin"
            className="inline-flex items-center text-sm text-black font-medium hover:text-blue-600"
          >
            Admin login <span className="ml-1">↪</span>
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
          <hr className="border-gray-300 mb-3" />
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
            <li><a href="/services" className="hover:text-blue-600">Services</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <hr className="border-gray-300 mb-3" />
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">📘 Facebook</a></li>
            <li><a href="#" className="hover:text-blue-600">🐦 Twitter</a></li>
            <li><a href="#" className="hover:text-blue-600">📸 Instagram</a></li>
            <li><a href="#" className="hover:text-blue-600">💼 LinkedIn</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        <p>© 2025 Your Company. All rights reserved.</p>
       
      </div>
    </footer>
  );
}
