import { useState } from "react";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");

  const handleSave = () => {
    console.log("Saved settings:", { darkMode, email });
    alert("Settings saved!");
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md shadow-lg rounded-2xl p-6 space-y-6 transition-colors duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-semibold text-center">Settings</h2>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300"
            }`}
          />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-5 w-5 accent-blue-500"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
