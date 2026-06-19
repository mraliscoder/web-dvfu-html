import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Quiz from './features/Quiz';

export default function Testing() {
  return (
    <div>
      <Navbar active="4" />
      <Quiz />
      <Footer />
    </div>
  );
}
