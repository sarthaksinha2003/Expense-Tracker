import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import {CharAvatar} from "../Cards/CharAvatar.jsx";
const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-gray-900 border-r border-violet-800 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImageUrl ? (
          <img src={user?.profileImageUrl || ""} alt="Profile Image" 
          className="w-20 h-20 rounded-full bg-slate-600 object-cover border-4 border-violet-700" 
        />) :( 
        <CharAvatar
          fullName={user?.fullName}
          width="w-20"
          height="h-20"
          style="text-xl"
        />
        )}

        <h5 className="text-white font-bold leading-6">
          {user?.fullName ||""}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] font-semibold text-white py-3 px-6 rounded-lg mb-3 transition-colors duration-150 ${
            activeMenu === item.label ? "bg-violet-700 text-white shadow-lg" : "hover:bg-violet-800 hover:text-violet-200"
          }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}

    </div>
)};

export default SideMenu;
