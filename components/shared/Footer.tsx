import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
      <p>
        Desarrollado por Daniel Martín Pérez
      </p>
      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="https://github.com/danimap27"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-martin-perez-27038421b"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
