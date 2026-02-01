import Navbar from "./Navbar.jsx";

export default function Layout({ children, cartCount }) {
  return (
    <div>
      <Navbar cartCount={cartCount} />
      <div className="container">{children}</div>
    </div>
  );
}