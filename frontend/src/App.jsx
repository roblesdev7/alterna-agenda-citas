import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Booking from './pages/Booking';
import MyAppointments from './pages/MyAppointments';

function App() {
  return (
    <Router>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="booking" element={<Booking />} />
            <Route path="my-appointments" element={<MyAppointments />} />
          </Route>
        </Routes>
      </BookingProvider>
    </Router>
  );
}

export default App;
