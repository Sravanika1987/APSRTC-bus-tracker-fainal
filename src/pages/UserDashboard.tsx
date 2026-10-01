import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBuses } from '@/context/BusContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Bus, LogOut, Search, MapPin, Clock, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RealMap from '@/components/RealMap';

export default function UserDashboard() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { buses, searchByRoute, searchByNumber } = useBuses();
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState<'route' | 'number'>('route');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [searchResults, setSearchResults] = useState(buses);
  const [selectedBus, setSelectedBus] = useState(buses[0]);

  const handleRouteSearch = () => {
    if (from && to) {
      const results = searchByRoute(from, to);
      setSearchResults(results.length > 0 ? results : []);
    } else {
      setSearchResults(buses);
    }
  };

  const handleNumberSearch = () => {
    if (busNumber) {
      const result = searchByNumber(busNumber);
      setSearchResults(result ? [result] : []);
    } else {
      setSearchResults(buses);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t('appName')}</h1>
              <p className="text-xs opacity-90">{t('welcome')}, {user?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex gap-1">
              <Button
                variant={i18n.language === 'en' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('en')}
                className="text-xs"
              >
                EN
              </Button>
              <Button
                variant={i18n.language === 'te' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('te')}
                className="text-xs"
              >
                తె
              </Button>
              <Button
                variant={i18n.language === 'hi' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => changeLanguage('hi')}
                className="text-xs"
              >
                हि
              </Button>
            </div>
            
            <div className="text-right">
              <p className="text-sm opacity-90">{t('activeBuses')}</p>
              <p className="text-xl font-bold">{buses.length}</p>
            </div>
            
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              {t('logout')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-96 bg-card border-r overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Search Type Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setSearchType('route')}
                className={`py-2 px-4 rounded-md transition-all text-sm ${
                  searchType === 'route'
                    ? 'bg-white shadow text-blue-600 font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {t('searchRoute')}
              </button>
              <button
                onClick={() => setSearchType('number')}
                className={`py-2 px-4 rounded-md transition-all text-sm ${
                  searchType === 'number'
                    ? 'bg-white shadow text-blue-600 font-semibold'
                    : 'text-gray-600'
                }`}
              >
                {t('searchByBusNumber')}
              </button>
            </div>

            {/* Search Form */}
            {searchType === 'route' ? (
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('from')}</label>
                    <Input
                      placeholder={i18n.language === 'te' ? 'నుండి' : i18n.language === 'hi' ? 'से' : 'From'}
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('to')}</label>
                    <Input
                      placeholder={i18n.language === 'te' ? 'వరకు' : i18n.language === 'hi' ? 'तक' : 'To'}
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleRouteSearch} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    {t('search')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('busNumber')}</label>
                    <Input
                      placeholder={t('enterBusNumber')}
                      value={busNumber}
                      onChange={(e) => setBusNumber(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleNumberSearch} className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    {t('search')}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Bus List */}
            <div>
              <h3 className="font-semibold mb-3">
                {searchResults.length} {t('available')} {searchResults.length === 1 ? 'Bus' : 'Buses'}
              </h3>
              <div className="space-y-3">
                {searchResults.map((bus) => (
                  <Card
                    key={bus.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedBus?.id === bus.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedBus(bus)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bus className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">{bus.number}</span>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            bus.status === 'running'
                              ? 'bg-green-500 text-white'
                              : bus.status === 'stopped'
                              ? 'bg-red-500 text-white'
                              : 'bg-yellow-500 text-white'
                          }`}
                        >
                          {t(bus.status)}
                        </span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{bus.from} → {bus.to}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{t('speed')}: {bus.speed} km/h</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>Capacity: {bus.capacity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {searchResults.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Bus className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No buses found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1">
          <RealMap buses={searchResults} selectedBus={selectedBus} />
        </main>
      </div>
    </div>
  );
}
