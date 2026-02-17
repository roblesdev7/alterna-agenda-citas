import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    service: null,
    resource: null,
    date: null,
    time: null,
    customer: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const resetBooking = () => {
    setBookingData({
      service: null,
      resource: null,
      date: null,
      time: null,
      customer: {
        name: '',
        email: '',
        phone: '',
      },
    });
  };

  const value = {
    bookingData,
    updateBookingData,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
