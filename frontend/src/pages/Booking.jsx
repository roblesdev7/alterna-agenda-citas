import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import ProgressSteps from '../components/ui/ProgressSteps';
import ServiceSelection from '../components/booking/ServiceSelection';
import DateTimeSelection from '../components/booking/DateTimeSelection';
import CustomerInfo from '../components/booking/CustomerInfo';
import BookingConfirmation from '../components/booking/BookingConfirmation';

const STEPS = ['Servicio', 'Fecha y Hora', 'Información', 'Confirmación'];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { resetBooking } = useBooking();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleComplete = () => {
    resetBooking();
    navigate('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection onNext={handleNext} />;
      case 2:
        return <DateTimeSelection onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <CustomerInfo onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <BookingConfirmation onComplete={handleComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Reservar Cita</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <ProgressSteps currentStep={currentStep} steps={STEPS} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default Booking;
