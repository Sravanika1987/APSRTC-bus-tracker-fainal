import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBuses, BusData } from '@/context/BusContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, LogOut, Plus, Trash2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RealMap from '@/components/RealMap';

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { buses, addBus, deleteBus } = useBuses();
  const navigate = useNavigate();

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusData | null>(buses[0]);
  
  // Form state
  const [formData, setFormData] = useState({
    number: '',
    route: '',
    from: '',
    to: '',
    capacity: '',
    driver: '',
    latitude: '',
    longitude: ''
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleAddBus = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBus: Omit<BusData, 'id'> = {
      number: formData.number,
      route: `${formData.from} - ${formData.to} ${formData.route}`,
      from: formData.from,
      to: formData.to,
      position: [parseFloat(formData.latitude), parseFloat(formData.longitude)],
      speed: 0,
      status: 'stopped',
      capacity: parseInt(formData.capacity),
      driver: formData.driver
    };
    
    addBus(newBus);
    setShowAddForm(false);
    setFormData({
      number: '',
      route: '',
      from: '',
      to: '',
      capacity: '',
      driver: '',
      latitude: '',
      longitude: ''
    });
  };

  const handleDeleteBus = (id: string) => {
    if (confirm('Are you sure you want to delete this bus?')) {
      deleteBus(id);
      if (selectedBus?.id === id) {
        setSelectedBus(buses[0] || null);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Bus className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t('appName')} - Admin Panel</h1>
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
              <p className="text-sm opacity-90">{t('manageBuses')}</p>
              <p className="text-xl font-bold">{buses.length} Buses</p>
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
            {/* Add Bus Button */}
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full"
              variant={showAddForm ? 'secondary' : 'default'}
            >
              <Plus className="w-4 h-4 mr-2" />
              {showAddForm ? t('cancel') : t('addBus')}
            </Button>

            {/* Add Bus Form */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('addBus')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddBus} className="space-y-3">
                    <Input
                      placeholder={t('busNumber')}
                      value={formData.number}
                      onChange={(e) => setFormData({...formData, number: e.target.value})}
                      required
                    />
                    <Input
                      placeholder={`${t('from')} (City)`}
                      value={formData.from}
                      onChange={(e) => setFormData({...formData, from: e.target.value})}
                      required
                    />
                    <Input
                      placeholder={`${t('to')} (City)`}
                      value={formData.to}
                      onChange={(e) => setFormData({...formData, to: e.target.value})}
                      required
                    />
                    <Input
                      placeholder={`${t('route')} Type (Express/Local)`}
                      value={formData.route}
                      onChange={(e) => setFormData({...formData, route: e.target.value})}
                      required
                    />
                    <Input
                      type="number"
                      placeholder="Capacity"
                      value={formData.capacity}
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Driver Name"
                      value={formData.driver}
                      onChange={(e) => setFormData({...formData, driver: e.target.value})}
                      required
                    />
                    <Input
                      type="number"
                      step="any"
                      placeholder="Latitude (e.g., 16.5062)"
                      value={formData.latitude}
                      onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                      required
                    />
                    <Input
                      type="number"
                      step="any"
                      placeholder="Longitude (e.g., 80.6480)"
                      value={formData.longitude}
                      onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                      required
                    />
                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      {t('addBus')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Bus List */}
            <div>
              <h3 className="font-semibold mb-3">All Buses ({buses.length})</h3>
              <div className="space-y-3">
                {buses.map((bus) => (
                  <Card
                    key={bus.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedBus?.id === bus.id ? 'ring-2 ring-purple-600' : ''
                    }`}
                    onClick={() => setSelectedBus(bus)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bus className="w-5 h-5 text-purple-600" />
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
                      <div className="space-y-1 text-sm mb-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{bus.from} → {bus.to}</span>
                        </div>
                        <p className="text-gray-600">Driver: {bus.driver}</p>
                        <p className="text-gray-600">Capacity: {bus.capacity}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBus(bus.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {t('delete')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1">
          <RealMap buses={buses} selectedBus={selectedBus} />
        </main>
      </div>
    </div>
  );
}
