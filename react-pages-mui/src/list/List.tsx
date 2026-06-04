import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MountainsGrid from './components/MountainsGrid';

export default function List() {
  return (
    <div>
      <Navbar active="2" />
      <MountainsGrid />
      <Footer />
    </div>
  );
}
