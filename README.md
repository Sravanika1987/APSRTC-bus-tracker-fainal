# APSRTC Bus Tracker

Real-time bus tracking system for Andhra Pradesh State Road Transport Corporation (APSRTC).

## Features

- 🚌 Real-time bus location tracking
- 🗺️ Interactive map with OpenStreetMap
- 📍 Click on buses to see details
- 🎯 Auto-zoom to selected bus
- 📊 Live bus status (Running/Stopped/Delayed)
- ⚡ Real-time speed monitoring
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Leaflet** - Interactive Maps
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
apsrtc-project/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── RealMap.tsx      # Map component with bus markers
│   │   └── App.tsx               # Main application component
│   ├── styles/
│   │   └── index.css             # Global styles and Tailwind
│   ├── main.tsx                  # Application entry point
│   └── vite-env.d.ts            # TypeScript definitions
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

## Features in Detail

### Real-time Tracking
Buses are tracked in real-time with automatic position updates every 3 seconds. The simulation shows buses moving along their routes.

### Interactive Map
- Click on any bus marker to see detailed information
- Map automatically centers and zooms when you select a bus from the sidebar
- Color-coded markers:
  - 🟢 Green: Bus is running
  - 🔴 Red: Bus is stopped
  - 🟡 Yellow: Bus is delayed

### Bus Information
Each bus displays:
- Bus registration number
- Route information
- Current speed
- Real-time status
- GPS coordinates

## Future Enhancements

- Integration with real GPS tracking devices
- Route planning and ETA calculations
- User authentication and bus bookings
- Push notifications for bus arrivals
- Historical tracking data
- Multiple route support
- Driver dashboard

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for learning and development.

## Author

APSRTC Bus Tracker Project
