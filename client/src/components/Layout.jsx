import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};