import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { BusData } from '@/context/BusContext'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Create a custom bus icon
const createBusIcon = (status: 'running' | 'stopped' | 'delayed') => {
  const color = status === 'running' ? '#22c55e' : status === 'stopped' ? '#ef4444' : '#eab308'
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 6v6"></path>
          <path d="M15 6v6"></path>
          <path d="M2 12h19.6"></path>
          <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"></path>
          <circle cx="7" cy="18" r="2"></circle>
          <path d="M9 18h5"></path>
          <circle cx="16" cy="18" r="2"></circle>
        </svg>
      </div>
    `,
    className: 'custom-bus-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  })
}

interface RealMapProps {
  buses: BusData[]
  selectedBus: BusData | null
}

function MapController({ selectedBus }: { selectedBus: BusData | null }) {
  const map = useMap()
  
  useEffect(() => {
    if (selectedBus) {
      map.flyTo(selectedBus.position, 13, {
        duration: 1.5
      })
    }
  }, [selectedBus, map])
  
  return null
}

export default function RealMap({ buses, selectedBus }: RealMapProps) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[16.5062, 80.6480]}
        zoom={10}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {buses.map(bus => (
          <Marker
            key={bus.id}
            position={bus.position}
            icon={createBusIcon(bus.status)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">{bus.number}</h3>
                <p className="text-sm text-gray-600 mb-2">{bus.route}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className={`capitalize ${
                      bus.status === 'running' ? 'text-green-600' :
                      bus.status === 'stopped' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {bus.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Speed:</span>
                    <span>{bus.speed} km/h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Driver:</span>
                    <span>{bus.driver}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Location:</span>
                    <span className="text-xs">
                      {bus.position[0].toFixed(4)}, {bus.position[1].toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        
        <MapController selectedBus={selectedBus} />
      </MapContainer>
    </div>
  )
}
