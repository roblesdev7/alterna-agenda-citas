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

- **Portal de Reservas (Cliente)**
  - Selección de servicios con imágenes
  - Selector de fecha y hora
  - Formulario de información del cliente
  - Confirmación con número de referencia
  - Integración con Google Calendar
  - Búsqueda de citas por referencia
  - Cancelación de citas

- **Panel de Administración**
  - Sistema de autenticación
  - Dashboard con estadísticas en tiempo real
  - Gestión completa de citas
  - Manejo de estados múltiples:
    - ✅ Confirmada
    - 🟡 En Curso
    - ✅ Completada
    - ❌ Cancelada
    - 🔴 No Asistió (No-Show)
    - 🟠 Llegó Tarde
  - Historial de cambios de estado
  - Filtros avanzados (estado, fecha, búsqueda)
  - Notas y observaciones por cita
  - Resumen financiero

- **Reglas de Negocio**
  - Política de cancelación (2 horas)
  - Manejo de llegadas tarde (>15 min)
  - Penalización por no-show (50%)
  - Validaciones de disponibilidad
  - Notificaciones automáticas (simuladas)

- **UI/UX**
  - Diseño responsive (móvil y desktop)
  - Indicador de progreso
  - Estados de carga
  - Validación de formularios
  - Feedback visual
  - Dashboard intuitivo

### 🔄 Pendiente (Requiere Backend)

- Consumo de APIs reales  
- Notificaciones por email/SMS reales
- Historial de citas completo
- Reportes y analytics avanzados
- Pasarela de pagos
- Gestión de recursos y servicios desde admin

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

## 🔐 Panel de Administración

El sistema incluye un panel completo para gestionar las citas y manejar diferentes escenarios.

### Acceso

- **URL**: `http://localhost:5173/admin/login`
- **Credenciales de prueba**:
  - Email: `admin@agenda.com`
  - Contraseña: `admin123`

### Funcionalidades

1. **Dashboard**
   - Estadísticas del día (citas, completadas, ingresos)
   - Vista rápida de citas de hoy
   - Acceso rápido a funciones principales

2. **Gestión de Citas**
   - Lista completa de todas las citas
   - Filtros por estado, fecha, y búsqueda
   - Vista detallada de cada cita
   - Cambio de estado con notas
   - Historial completo de cambios

3. **Estados y Escenarios**

   **Cliente Llegó** → Marcar como "En Curso"
   - Servicio comienza normalmente
   - Bloquea el horario del profesional

   **Llegó Tarde** → Indicar retraso
   - Registra tiempo de retraso
   - Aplica reglas según minutos tarde:
     - 10-15 min: Advertencia
     - 15-30 min: Cargo extra + servicio acortado
     - >30 min: Opción de reagendar

   **No Asistió (No-Show)** → Penalización
   - Cargo automático del 50%
   - Registro en historial del cliente
   - 3 no-shows = Requerir depósito

   **Completada** → Finalizar servicio
   - Confirma cobro
   - Libera al profesional
   - Envía notificación de agradecimiento

   **Cancelada** → Por cliente o admin
   - Aplica política de cancelación
   - Notifica a todas las partes
   - Libera el horario

4. **Reglas de Negocio**
   - Ver `BUSINESS_RULES.md` para documentación completa
   - Políticas de cancelación automáticas
   - Validaciones de tiempo
   - Cálculo de penalizaciones

### Navegación

```
/admin/login         - Inicio de sesión
/admin/dashboard     - Panel principal
/admin/appointments  - Lista de citas
/admin/appointments/:id - Detalle de cita
```

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
