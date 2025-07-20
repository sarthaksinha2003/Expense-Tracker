import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaCrown } from 'react-icons/fa';
import SideMenu from "./SideMenu";
import PremiumFeaturesModal from '../PremiumFeaturesModal';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showPremium, setShowPremium] = useState(false);

  return (
    <div className="flex gap-5 bg-gray-900 border-b border-violet-800 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 items-center">
      <button
        className="block lg:hidden text-violet-400 hover:text-white"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (<HiOutlineX className='text-2xl'/>
        ) : (
        <HiOutlineMenu className='text-2xl'/>
        )}
      </button>

      <h2 className="text-lg font-bold text-white tracking-wide flex-1">Expense Tracker</h2>

      <button
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#875cf5] text-white font-bold shadow hover:bg-[#7c3aed] border border-[#875cf5]"
        onClick={() => setShowPremium(true)}
      >
        <FaCrown className="text-white" />
        Premium Features
      </button>

      {showPremium && <PremiumFeaturesModal onClose={() => setShowPremium(false)} />}

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-black">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
