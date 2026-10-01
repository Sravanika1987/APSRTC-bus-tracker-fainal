# 🚌 APSRTC Bus Tracker - Complete System

## ✨ Features Implemented

### 🔐 Authentication System
- **Dual Login System**: Separate login for Users and Admins
- **User Account**: `user@apsrtc.com` / `user123`
- **Admin Account**: `admin@apsrtc.com` / `admin123`

### 🌍 Multi-Language Support
- **English** (EN)
- **తెలుగు** (Telugu)
- **हिंदी** (Hindi)
- Dynamic language switching in all pages

### 👤 User Dashboard Features
1. **Route Search**
   - Search by Destination (From → To)
   - Search by Bus Number
   - Real-time results filtering

2. **Bus Tracking**
   - Live bus location on interactive map
   - Click bus cards to zoom to location
   - Color-coded status indicators:
     - 🟢 Green = Running
     - 🔴 Red = Stopped
     - 🟡 Yellow = Delayed

3. **Bus Information Display**
   - Bus registration number
   - Route details (From → To)
   - Current speed
   - Capacity
   - Driver name
   - Real-time status

### 👨‍💼 Admin Dashboard Features
1. **Add New Buses**
   - Bus number
   - Route (From/To cities)
   - Route type (Express/Local/AC/Deluxe)
   - Capacity
   - Driver name
   - GPS coordinates

2. **Manage Existing Buses**
   - View all buses in system
   - Delete buses
   - Real-time monitoring
   - Bus location tracking

3. **Live Statistics**
   - Total number of active buses
   - Real-time bus positions
   - Status monitoring

### 🗺️ Interactive Map Features
- OpenStreetMap integration
- Custom bus icons with color coding
- Click markers for detailed bus info
- Auto-zoom to selected bus
- Real-time position updates every 3 seconds
- Smooth animations and transitions

## 🚀 How to Use

### Starting the Application
```bash
npm run dev
```
Open browser: **http://localhost:5173/**

### Login as User
1. Go to http://localhost:5173/
2. Click on "Login as User"
3. Enter: `user@apsrtc.com` / `user123`
4. Access User Dashboard

**User Features:**
- Search buses by route (From-To)
- Search buses by number
- Track buses on map
- View real-time bus information
- Switch between English/Telugu/Hindi

### Login as Admin
1. Go to http://localhost:5173/
2. Click on "Login as Admin"  
3. Enter: `admin@apsrtc.com` / `admin123`
4. Access Admin Dashboard

**Admin Features:**
- Add new buses to the system
- Delete existing buses
- View all buses on map
- Monitor bus status in real-time
- Manage entire fleet

## 📱 Application Structure

```
apsrtc-project/
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── card.tsx
│   │   └── RealMap.tsx       # Map component
│   ├── context/
│   │   ├── AuthContext.tsx   # Authentication state
│   │   └── BusContext.tsx    # Bus data management
│   ├── i18n/
│   │   └── config.ts         # Language translations
│   ├── pages/
│   │   ├── Login.tsx         # Login page
│   │   ├── UserDashboard.tsx # User interface
│   │   └── AdminDashboard.tsx # Admin interface
│   ├── lib/
│   │   └── utils.ts          # Utility functions
│   └── main.tsx              # App entry point
```

## 🎨 Design Features

### APSRTC Branding
- Custom bus logo
- Color scheme: Blue primary colors
- Professional gradient headers
- Modern card-based UI

### Responsive Design
- Mobile-friendly layout
- Sidebar navigation
- Adaptive components
- Touch-friendly buttons

### User Experience
- Smooth animations
- Loading states
- Real-time updates
- Intuitive navigation
- Multi-language support

## 🔧 Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Maps**: Leaflet + React-Leaflet
- **Routing**: React Router v6
- **Internationalization**: i18next
- **Icons**: Lucide React
- **UI Components**: Custom + Radix UI

## 📊 Sample Data

### Pre-loaded Buses
1. **AP 39 TA 1234** - Vijayawada → Hyderabad (Express)
2. **AP 39 TB 5678** - Guntur → Vijayawada (Local)
3. **AP 39 TC 9012** - Visakhapatnam → Vijayawada (Super Deluxe)
4. **AP 39 TD 3456** - Tirupati → Vijayawada (AC Sleeper)

## 🌟 Key Highlights

✅ **Dual Role System** - Separate interfaces for users and admins
✅ **Multi-Language** - Full support for English, Telugu, and Hindi
✅ **Real-time Tracking** - Live bus positions updated every 3 seconds
✅ **Smart Search** - Find buses by route or number
✅ **Admin Controls** - Add/Delete buses dynamically
✅ **Interactive Maps** - Click and zoom on buses
✅ **Professional UI** - Modern, clean, and intuitive design
✅ **APSRTC Branded** - Custom logo and color scheme

## 🎯 Future Enhancements

- Integration with real GPS devices
- SMS/Email notifications
- Booking system
- Payment integration
- Route planning with ETA
- Driver mobile app
- Historical tracking data
- Analytics dashboard
- Multi-depot management

## 📝 Notes

- All bus movements are simulated for demonstration
- Real GPS integration can be added via API
- Database can be connected for persistent storage
- Authentication can be upgraded to JWT tokens
- Add backend API for production deployment

## 🏆 Project Status

✅ Fully functional
✅ No compilation errors
✅ All features working
✅ Ready for demo/presentation
✅ Production-ready UI

---

**Built with ❤️ for APSRTC**
