import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Common
      appName: "APSRTC Bus Tracker",
      tagline: "Real-time Bus Tracking System",
      
      // Auth
      login: "Login",
      email: "Email",
      password: "Password",
      userLogin: "User Login",
      adminLogin: "Admin Login",
      loginAsUser: "Login as User",
      loginAsAdmin: "Login as Admin",
      
      // Navigation
      dashboard: "Dashboard",
      findRoute: "Find Route",
      trackBus: "Track Bus",
      myBookings: "My Bookings",
      logout: "Logout",
      
      // Admin
      manageBuses: "Manage Buses",
      addBus: "Add Bus",
      deleteBus: "Delete Bus",
      busNumber: "Bus Number",
      route: "Route",
      status: "Status",
      
      // Search
      searchRoute: "Search Route",
      from: "From",
      to: "To",
      searchByBusNumber: "Search by Bus Number",
      enterBusNumber: "Enter Bus Number",
      search: "Search",
      
      // Bus Status
      running: "Running",
      stopped: "Stopped",
      delayed: "Delayed",
      available: "Available",
      
      // Info
      activeBuses: "Active Buses",
      totalRoutes: "Total Routes",
      speed: "Speed",
      location: "Location",
      
      // Actions
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      
      // Messages
      welcome: "Welcome",
      selectLanguage: "Select Language",
    }
  },
  te: {
    translation: {
      // Common
      appName: "APSRTC బస్ ట్రాకర్",
      tagline: "రియల్-టైమ్ బస్ ట్రాకింగ్ సిస్టమ్",
      
      // Auth
      login: "లాగిన్",
      email: "ఇమెయిల్",
      password: "పాస్వర్డ్",
      userLogin: "యూజర్ లాగిన్",
      adminLogin: "అడ్మిన్ లాగిన్",
      loginAsUser: "యూజర్ గా లాగిన్",
      loginAsAdmin: "అడ్మిన్ గా లాగిన్",
      
      // Navigation
      dashboard: "డాష్బోర్డ్",
      findRoute: "రూట్ కనుగొనండి",
      trackBus: "బస్ ట్రాక్ చేయండి",
      myBookings: "నా బుకింగ్‌లు",
      logout: "లాగ్ అవుట్",
      
      // Admin
      manageBuses: "బస్సులను నిర్వహించండి",
      addBus: "బస్ జోడించండి",
      deleteBus: "బస్ తొలగించండి",
      busNumber: "బస్ నంబర్",
      route: "రూట్",
      status: "స్థితి",
      
      // Search
      searchRoute: "రూట్ వెతకండి",
      from: "నుండి",
      to: "వరకు",
      searchByBusNumber: "బస్ నంబర్ ద్వారా శోధించండి",
      enterBusNumber: "బస్ నంబర్ నమోదు చేయండి",
      search: "వెతకండి",
      
      // Bus Status
      running: "నడుస్తోంది",
      stopped: "ఆగింది",
      delayed: "ఆలస్యమైంది",
      available: "అందుబాటులో",
      
      // Info
      activeBuses: "క్రియాశీల బస్సులు",
      totalRoutes: "మొత్తం రూట్లు",
      speed: "వేగం",
      location: "ప్రదేశం",
      
      // Actions
      save: "సేవ్ చేయండి",
      cancel: "రద్దు చేయండి",
      delete: "తొలగించండి",
      edit: "సవరించండి",
      view: "చూడండి",
      
      // Messages
      welcome: "స్వాగతం",
      selectLanguage: "భాష ఎంచుకోండి",
    }
  },
  hi: {
    translation: {
      // Common
      appName: "APSRTC बस ट्रैकर",
      tagline: "रियल-टाइम बस ट्रैकिंग सिस्टम",
      
      // Auth
      login: "लॉगिन",
      email: "ईमेल",
      password: "पासवर्ड",
      userLogin: "यूजर लॉगिन",
      adminLogin: "एडमिन लॉगिन",
      loginAsUser: "यूजर के रूप में लॉगिन",
      loginAsAdmin: "एडमिन के रूप में लॉगिन",
      
      // Navigation
      dashboard: "डैशबोर्ड",
      findRoute: "रूट खोजें",
      trackBus: "बस ट्रैक करें",
      myBookings: "मेरी बुकिंग",
      logout: "लॉग आउट",
      
      // Admin
      manageBuses: "बसों का प्रबंधन",
      addBus: "बस जोड़ें",
      deleteBus: "बस हटाएं",
      busNumber: "बस नंबर",
      route: "रूट",
      status: "स्थिति",
      
      // Search
      searchRoute: "रूट खोजें",
      from: "से",
      to: "तक",
      searchByBusNumber: "बस नंबर से खोजें",
      enterBusNumber: "बस नंबर दर्ज करें",
      search: "खोजें",
      
      // Bus Status
      running: "चल रही है",
      stopped: "रुकी हुई",
      delayed: "विलंबित",
      available: "उपलब्ध",
      
      // Info
      activeBuses: "सक्रिय बसें",
      totalRoutes: "कुल रूट",
      speed: "गति",
      location: "स्थान",
      
      // Actions
      save: "सेव करें",
      cancel: "रद्द करें",
      delete: "हटाएं",
      edit: "संपादित करें",
      view: "देखें",
      
      // Messages
      welcome: "स्वागत है",
      selectLanguage: "भाषा चुनें",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
