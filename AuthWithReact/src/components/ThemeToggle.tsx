import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons for Sun and Moon

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Store the theme preference
  };

  // Set theme based on local storage or default to light
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  return (
    <div className="flex justify-center items-center fixed top-2 right-6">
      <button
        className="btn btn-circle bg-base-200 shadow-lg"
        onClick={handleThemeToggle}
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-500 text-xl" /> // Sun icon for dark mode
        ) : (
          <FaMoon className="text-blue-500 text-xl" /> // Moon icon for light mode
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
