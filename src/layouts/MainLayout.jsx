import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * Main layout wrapper with navbar and footer.
 */
export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
