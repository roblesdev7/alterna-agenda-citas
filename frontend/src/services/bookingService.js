import apiClient from './api';

// Services API
export const servicesAPI = {
  getAll: () => apiClient.get('/services'),
  getById: (id) => apiClient.get(`/services/${id}`),
};

// Resources (Staff) API
export const resourcesAPI = {
  getAll: () => apiClient.get('/resources'),
  getById: (id) => apiClient.get(`/resources/${id}`),
  getAvailableByService: (serviceId) => apiClient.get(`/resources?serviceId=${serviceId}`),
};

// Availability API
export const availabilityAPI = {
  checkAvailability: (params) => apiClient.post('/availability/check', params),
  getAvailableSlots: (date, serviceId, resourceId) => 
    apiClient.get('/availability/slots', {
      params: { date, serviceId, resourceId }
    }),
};

// Appointments API
export const appointmentsAPI = {
  create: (appointmentData) => apiClient.post('/appointments', appointmentData),
  getById: (id) => apiClient.get(`/appointments/${id}`),
  cancel: (id, reason) => apiClient.post(`/appointments/${id}/cancel`, { reason }),
  reschedule: (id, newDateTime) => apiClient.put(`/appointments/${id}/reschedule`, { newDateTime }),
  getByReference: (reference) => apiClient.get(`/appointments/reference/${reference}`),
};

export default {
  services: servicesAPI,
  resources: resourcesAPI,
  availability: availabilityAPI,
  appointments: appointmentsAPI,
};
