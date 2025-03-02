const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-4 px-6 fixed bottom-0 left-0 w-full shadow-lg">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-white">Online Voting System</span>. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
