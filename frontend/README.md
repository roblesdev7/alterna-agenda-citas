# Frontend - Sistema de Agenda de Citas

Sistema de reserva de citas en línea para barbería y clínica estética.

## 🚀 Tecnologías

- **React 18** - Framework UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **date-fns** - Manejo de fechas

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── booking/         # Componentes del flujo de reserva
│   ├── layout/          # Header, Footer, Layout
│   └── ui/              # Componentes reutilizables
├── context/             # Context API (estado global)
├── hooks/               # Custom hooks
├── pages/               # Páginas principales
├── services/            # APIs y servicios
└── utils/               # Utilidades y helpers
```

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/alterna-agenda-citas.git
   cd alterna-agenda-citas/frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Edita `.env` con la URL de tu backend.

## 🏃 Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en `/dist`

## 📋 Características

### ✅ Implementado

- **Portal de Reservas**
  - Selección de servicios con imágenes
  - Selector de fecha y hora
  - Formulario de información del cliente
  - Confirmación con número de referencia
  - Integración con Google Calendar

- **Gestión de Citas**
  - Búsqueda por número de referencia
  - Visualización de detalles
  - Cancelación de citas

- **UI/UX**
  - Diseño responsive (móvil y desktop)
  - Indicador de progreso
  - Estados de carga
  - Validación de formularios
  - Feedback visual

### 🔄 Pendiente (Requiere Backend)

- Consumo de APIs reales
- Autenticación de usuarios
- Historial de citas
- Notificaciones por email/SMS
- Pasarela de pagos

## 🔗 Integración con Backend

El frontend está preparado para integrarse con el backend. Los servicios están en `/src/services/`:

- `api.js` - Configuración de Axios
- `bookingService.js` - Endpoints de citas

Actualiza `VITE_API_BASE_URL` en `.env` cuando el backend esté disponible.

## 🎨 Personalización

### Colores
Edita los colores primarios en `tailwind.config.js`:

```js
colors: {
  primary: {
    500: '#0ea5e9',  // Color principal
    600: '#0284c7',
    // ...
  }
}
```

### Estilos Globales
Los componentes reutilizables están en `src/index.css`:
- `.btn-primary`
- `.btn-secondary`
- `.input-field`
- `.card`

## 📱 Componentes Principales

### Booking Flow
1. **ServiceSelection** - Muestra servicios disponibles
2. **DateTimeSelection** - Calendario y horarios
3. **CustomerInfo** - Formulario de datos
4. **BookingConfirmation** - Confirmación final

### Layout
- **Header** - Navegación principal
- **Footer** - Información de contacto
- **Layout** - Wrapper general

### UI Components
- **ProgressSteps** - Indicador de pasos
- **LoadingSpinner** - Indicador de carga
- **Modal** - Ventana modal

## 🧪 Datos de Prueba

Mientras el backend no esté disponible, el frontend usa datos mock:

- **Servicios**: Corte, Barba, Facial, Masaje
- **Profesionales**: Juan Pérez, María García, Carlos López
- **Horarios**: 09:00 - 18:00

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build
- `npm run lint` - Ejecuta ESLint

## 🤝 Colaboración con Backend

Este proyecto trabaja en conjunto con el backend. Endpoints esperados:

```
GET    /api/services           - Listar servicios
GET    /api/resources          - Listar profesionales
GET    /api/availability/slots - Obtener horarios disponibles
POST   /api/appointments       - Crear cita
GET    /api/appointments/:ref  - Consultar cita
POST   /api/appointments/:id/cancel - Cancelar cita
```

## 📄 Licencia

Este proyecto es parte del Módulo 10 de Alterna.

---

Desarrollado con ❤️ usando React + Vite + Tailwind CSS
