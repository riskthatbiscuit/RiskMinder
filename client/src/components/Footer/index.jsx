const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-gray-100 text-gray-800 p-4">
      <div className="container mx-auto text-center mb-5">
        <h4>&copy; {new Date().getFullYear()} - Risk Taker</h4>
      </div>
    </footer>
  );
};

export default Footer;