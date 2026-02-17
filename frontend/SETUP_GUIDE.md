# Project Setup Guide

## ✅ What's Been Done

### Frontend Structure
The complete customer booking portal has been implemented with:

1. **Core Pages**
   - Home page with hero section and features
   - Multi-step booking flow (Service → Date/Time → Info → Confirmation)
   - My Appointments page for looking up bookings

2. **Components**
   - Layout components (Header, Footer)
   - Booking flow components
   - Reusable UI components (Modal, Loading, Progress)

3. **State Management**
   - Context API for booking state
   - React Router for navigation

4. **Services Layer**
   - API client configuration with Axios
   - Service methods for all endpoints (ready for backend integration)
   - Mock data for development/testing

5. **Styling**
   - Tailwind CSS fully configured
   - Responsive design (mobile and desktop)
   - Custom utility classes for common patterns

## 🚀 Next Steps

### For You (Frontend)

1. **Test the Application**
   ```bash
   cd frontend
   npm run dev
   ```
   Visit http://localhost:5173 and test the booking flow

2. **Customize Branding**
   - Update colors in `tailwind.config.js`
   - Replace placeholder images in ServiceSelection component
   - Update business name and contact info in Footer

3. **Add More Features** (Optional)
   - User authentication
   - Favorite professionals
   - Service categories
   - Reviews/ratings
   - Payment integration
   - Push notifications (PWA)

4. **Testing**
   - Add unit tests for components
   - Add integration tests for booking flow
   - Test on different devices/browsers

### For Your Partner (Backend)

Share these files with your backend partner:
- `API_DOCS.md` - Complete API specification
- `frontend/src/services/bookingService.js` - See expected endpoints

They need to implement:
1. All CRUD operations for Services, Resources, Appointments
2. Availability checking logic
3. Conflict detection (overlapping appointments/blocks)
4. 2-hour cancellation policy
5. Email notifications (simulated)

### Integration Steps

1. **Backend Setup**
   - Your partner implements the API endpoints
   - Tests endpoints with Postman/Insomnia

2. **Connect Frontend to Backend**
   ```bash
   # frontend/.env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

3. **Replace Mock Data**
   - Remove mock data timeouts in components
   - Uncomment real API calls
   - Test end-to-end flow

4. **Deploy**
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Backend: Heroku, Railway, or DigitalOcean
   - Database: PostgreSQL, MongoDB, or MySQL

## 📁 Project Structure

```
alterna-agenda-citas/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── booking/      # Booking flow components
│   │   │   ├── layout/       # Header, Footer, Layout
│   │   │   └── ui/           # Reusable components
│   │   ├── context/          # React Context
│   │   ├── pages/            # Main pages
│   │   ├── services/         # API services
│   │   └── utils/            # Helper functions
│   ├── .env.example
│   ├── API_DOCS.md          # Share with backend team
│   ├── README.md
│   └── package.json
└── backend/                  # Your partner's work
    └── (to be implemented)
```

## 🔧 Configuration Files

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Key Dependencies
- react-router-dom - Routing
- axios - HTTP client
- date-fns - Date utilities
- tailwindcss - Styling

## 🎨 Customization Guide

### Colors
Edit `tailwind.config.js`:
```js
primary: {
  600: '#0284c7',  // Main brand color
}
```

### Business Hours
Edit in `DateTimeSelection.jsx`:
```js
const getAvailableDates = () => {
  // Modify date range
}
```

### Services
Mock data in `ServiceSelection.jsx` - replace with real data when backend is ready

## 📱 Components Reference

### Booking Flow
1. `ServiceSelection` - Display services, select one
2. `DateTimeSelection` - Choose date, professional, and time slot
3. `CustomerInfo` - Collect customer details
4. `BookingConfirmation` - Show confirmation and reference number

### Shared Components
- `ProgressSteps` - Multi-step indicator
- `LoadingSpinner` - Loading state
- `Modal` - Modal dialogs

## 🐛 Troubleshooting

### Tailwind not working
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Port already in use
```bash
# Change port in vite.config.js
server: {
  port: 3001
}
```

### API calls failing
1. Check backend is running
2. Verify VITE_API_BASE_URL in .env
3. Check CORS settings on backend
4. Look at browser console for errors

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)

## 🤝 Collaboration Tips

### Git Workflow
```bash
# Create feature branches
git checkout -b feature/your-feature-name

# Commit often with clear messages
git commit -m "Add service selection component"

# Push and create pull request
git push origin feature/your-feature-name
```

### Communication with Backend Team
- Share API_DOCS.md early
- Agree on data formats
- Test integration frequently
- Document any changes
- Use tools like Postman Collections

## 🎯 Success Criteria

Your frontend is ready when:
- [x] All pages are implemented
- [x] Components are responsive
- [x] State management works
- [x] Mock data flows through app
- [ ] Connected to real backend
- [ ] End-to-end booking works
- [ ] Error handling is solid
- [ ] Deployed to production

## 📞 Support

If you get stuck:
1. Check browser console for errors
2. Review API_DOCS.md
3. Test with mock data first
4. Coordinate with backend partner
5. Ask your instructor for help

---

Good luck with your project! 🚀
