import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoIosSettings } from "react-icons/io";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout as logoutAction } from "../slices/authSlice";
import { useFetchCartQuery } from "../slices/cartApiSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cartData } = useFetchCartQuery();
  const cartLength = cartData?.items?.length || 0;

  const [logout] = useLogoutMutation();
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [ isFocused,setIsFocused ] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // Logout handler
  const handleLogout = async () => {
    try {
      dispatch(logoutAction());
      await logout();
      toast.success("Logged Out");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Logout failed");
    }
  };

  // Fetch suggestions on input change
  useEffect(() => {
    if (!searchInput.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const { data: suggestionsData } = await axios.get(
          `http://localhost:5000/api/v1/products/suggestions?keyword=${searchInput}`
        );
        // Ensure it's an array
        const list = Array.isArray(suggestionsData?.suggestions)
          ? suggestionsData.suggestions
          : [];
        setSuggestions(list);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchInput]);

  // Search handler
  const handleSearch = (keyword) => {
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${keyword.trim()}`);
    setSearchInput("");
    setSuggestions([]);
  };

  // Enter key press handler
  const handleKeyDown = (e) => {
  if (!suggestions.length) return;

  switch (e.key) {

    case "ArrowDown":
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
      break;

    case "ArrowUp":
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
      break;

    case "Enter":
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        handleSearch(
          typeof suggestions[highlightIndex] === "string"
            ? suggestions[highlightIndex]
            : suggestions[highlightIndex].name
        );
      } else if (searchInput.trim()) {
        handleSearch(searchInput);
      }
      setHighlightIndex(-1);
      break;

    case "Escape":
      setSuggestions([]);
      setHighlightIndex(-1);
      break;
  }
};

useEffect(() => {
  setHighlightIndex(-1);
}, [searchInput]);


  return (
    <header>
      <div className="flex justify-between p-5 navbar bg-base-100 shadow-sm px-4">
        {/* Logo */}
        <div className="flex">
          <Link
            to="/"
            className="text-xl font-bold tracking-wide text-primary hover:text-primary/80 transition"
          >
            E-Commerce
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative w-80">
          <input
            type="search"
            value={searchInput}
            onFocus={ ()=> setIsFocused(true) }
            onBlur={ ()=> setTimeout( ()=>setIsFocused(false),100 )}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="input input-bordered w-full"
          />

          {/* Suggestions Dropdown */}
          { isFocused && Array.isArray(suggestions) && suggestions.length > 0 && (
            <ul className="absolute bg-white border w-full mt-1 rounded shadow-lg z-50 max-h-60 overflow-auto">
              { suggestions.map((s, index) => {
                const name = typeof s === "string" ? s : s.name;
                return (
                  <li
                    key={index}
                    className={`px-3 py-2 text-black cursor-pointer ${
                      index === highlightIndex ? "bg-gray-300" : "hover:bg-gray-200"
                    }`}
                    onMouseDown={() => handleSearch(name)} // use onMouseDown to avoid blur
                    onMouseEnter={() => setHighlightIndex(index)} // highlight on hover
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Right Side: Cart + Settings + User */}
        <div>
          <ul className="flex items-center gap-2">
            {/* Cart */}
            <li>
              <Link
                to="/cart"
                className="relative flex items-center gap-1 hover:bg-base-200 rounded-lg px-3 py-2 transition"
              >
                🛒 Cart
                {cartLength > 0 && (
                  <span className="badge badge-primary badge-sm absolute -top-2 -right-2">
                    {cartLength}
                  </span>
                )}
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link
                to="/settings"
                className="relative text-xl flex items-center hover:bg-base-200 rounded-lg px-3 py-2 transition"
              >
                <IoIosSettings />
              </Link>
            </li>

            {/* User Info / Login */}
            <li>
              {userInfo ? (
                <details className="dropdown dropdown-end">
                  <summary className="btn btn-ghost rounded-lg">
                    {userInfo.user.name}
                  </summary>
                  <ul className="menu dropdown-content bg-base-100 shadow-lg rounded-xl w-40 p-2 mt-2">
                    <li>
                      <Link to="/profile" className="hover:bg-base-200 rounded-lg">
                        👤 Profile
                      </Link>
                    </li>
                    <li>
                      <button className="hover:bg-base-200 rounded-lg">💡 Light</button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="hover:bg-base-200 rounded-lg text-error"
                      >
                        🚪 Log Out
                      </button>
                    </li>
                  </ul>
                </details>
              ) : (
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm rounded-lg px-4"
                >
                  Log In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
