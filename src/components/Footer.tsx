
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-6 px-4 border-t border-gray-800 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Subway Surfers Universe. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms-of-use" className="text-gray-400 hover:text-white text-sm transition-colors">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
