import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
      <p>
        © {new Date().getFullYear()} Recipe Finder App. Built with React and Tailwind CSS.
      </p>
    </footer>
  );
};

export default Footer;
