import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password, role);
    
    if (success) {
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant={i18n.language === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => changeLanguage('en')}
        >
          English
        </Button>
        <Button
          variant={i18n.language === 'te' ? 'default' : 'outline'}
          size="sm"
          onClick={() => changeLanguage('te')}
        >
          తెలుగు
        </Button>
        <Button
          variant={i18n.language === 'hi' ? 'default' : 'outline'}
          size="sm"
          onClick={() => changeLanguage('hi')}
        >
          हिंदी
        </Button>
      </div>

      {/* APSRTC Logo and Header */}
      <div className="flex flex-col items-center justify-center pt-12 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Bus className="w-12 h-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{t('appName')}</h1>
        <p className="text-gray-600 text-lg">{t('tagline')}</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {role === 'admin' ? t('adminLogin') : t('userLogin')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Role Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setRole('user')}
                  className={`py-2 px-4 rounded-md transition-all ${
                    role === 'user'
                      ? 'bg-white shadow text-blue-600 font-semibold'
                      : 'text-gray-600'
                  }`}
                >
                  {t('loginAsUser')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2 px-4 rounded-md transition-all ${
                    role === 'admin'
                      ? 'bg-white shadow text-blue-600 font-semibold'
                      : 'text-gray-600'
                  }`}
                >
                  {t('loginAsAdmin')}
                </button>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('email')}</label>
                <Input
                  type="email"
                  placeholder={role === 'admin' ? 'admin@apsrtc.com' : 'user@apsrtc.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('password')}</label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              {/* Demo Credentials */}
              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
                <p className="font-semibold mb-1">Demo Credentials:</p>
                <p>User: user@apsrtc.com / user123</p>
                <p>Admin: admin@apsrtc.com / admin123</p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                {t('login')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
