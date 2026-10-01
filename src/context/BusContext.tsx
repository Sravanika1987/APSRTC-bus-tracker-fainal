import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface BusData {
  id: string;
  number: string;
  route: string;
  from: string;
  to: string;
  position: [number, number];
  speed: number;
  status: 'running' | 'stopped' | 'delayed';
  capacity: number;
  driver: string;
}

interface BusContextType {
  buses: BusData[];
  addBus: (bus: Omit<BusData, 'id'>) => void;
  deleteBus: (id: string) => void;
  updateBus: (id: string, bus: Partial<BusData>) => void;
  searchByRoute: (from: string, to: string) => BusData[];
  searchByNumber: (number: string) => BusData | undefined;
}

const BusContext = createContext<BusContextType | undefined>(undefined);

const INITIAL_BUSES: BusData[] = [
  {
    id: '1',
    number: 'AP 39 TA 1234',
    route: 'Vijayawada - Hyderabad Express',
    from: 'Vijayawada',
    to: 'Hyderabad',
    position: [16.5062, 80.6480],
    speed: 45,
    status: 'running',
    capacity: 50,
    driver: 'Ravi Kumar'
  },
  {
    id: '2',
    number: 'AP 39 TB 5678',
    route: 'Guntur - Vijayawada Local',
    from: 'Guntur',
    to: 'Vijayawada',
    position: [16.3067, 80.4365],
    speed: 0,
    status: 'stopped',
    capacity: 40,
    driver: 'Suresh Babu'
  },
  {
    id: '3',
    number: 'AP 39 TC 9012',
    route: 'Visakhapatnam - Vijayawada Super Deluxe',
    from: 'Visakhapatnam',
    to: 'Vijayawada',
    position: [16.7062, 80.7480],
    speed: 50,
    status: 'running',
    capacity: 45,
    driver: 'Prasad Rao'
  },
  {
    id: '4',
    number: 'AP 39 TD 3456',
    route: 'Tirupati - Vijayawada AC Sleeper',
    from: 'Tirupati',
    to: 'Vijayawada',
    position: [16.2062, 80.3480],
    speed: 55,
    status: 'running',
    capacity: 35,
    driver: 'Venkat Reddy'
  }
];

export function BusProvider({ children }: { children: ReactNode }) {
  const [buses, setBuses] = useState<BusData[]>(INITIAL_BUSES);

  // Simulate real-time bus movement
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses =>
        prevBuses.map(bus => {
          if (bus.status === 'running') {
            return {
              ...bus,
              position: [
                bus.position[0] + (Math.random() - 0.5) * 0.01,
                bus.position[1] + (Math.random() - 0.5) * 0.01
              ] as [number, number],
              speed: Math.floor(Math.random() * 40) + 30
            };
          }
          return bus;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addBus = (bus: Omit<BusData, 'id'>) => {
    const newBus: BusData = {
      ...bus,
      id: Date.now().toString()
    };
    setBuses(prev => [...prev, newBus]);
  };

  const deleteBus = (id: string) => {
    setBuses(prev => prev.filter(bus => bus.id !== id));
  };

  const updateBus = (id: string, updates: Partial<BusData>) => {
    setBuses(prev =>
      prev.map(bus => (bus.id === id ? { ...bus, ...updates } : bus))
    );
  };

  const searchByRoute = (from: string, to: string): BusData[] => {
    return buses.filter(
      bus =>
        bus.from.toLowerCase().includes(from.toLowerCase()) &&
        bus.to.toLowerCase().includes(to.toLowerCase())
    );
  };

  const searchByNumber = (number: string): BusData | undefined => {
    return buses.find(bus =>
      bus.number.toLowerCase().includes(number.toLowerCase())
    );
  };

  return (
    <BusContext.Provider
      value={{
        buses,
        addBus,
        deleteBus,
        updateBus,
        searchByRoute,
        searchByNumber
      }}
    >
      {children}
    </BusContext.Provider>
  );
}

export function useBuses() {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error('useBuses must be used within BusProvider');
  }
  return context;
}
