import { useState } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { PetProfile } from './components/PetProfile';

type View = 'login' | 'register' | 'dashboard' | 'profile';

interface Pet {
  name: string;
  species: string;
  age: number;
}

interface Owner {
  id: string;
  name: string;
  rut: string;
  email: string;
  phone: string;
  pets: Pet[];
}

// Datos de ejemplo que se mantienen constantes
const mockOwners: Owner[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    rut: '12.345.678-9',
    email: 'juan@email.com',
    phone: '+56 9 1234 5678',
    pets: [
      { name: 'Firulais', species: 'Perro', age: 5 }
    ]
  },
  {
    id: '2',
    name: 'María González',
    rut: '98.765.432-1',
    email: 'maria@email.com',
    phone: '+56 9 8765 4321',
    pets: [
      { name: 'Michi', species: 'Gato', age: 3 },
      { name: 'Toby', species: 'Perro', age: 2 }
    ]
  },
  {
    id: '3',
    name: 'Carlos López',
    rut: '11.223.344-5',
    email: 'carlos@email.com',
    phone: '+56 9 1122 3344',
    pets: [
      { name: 'Luna', species: 'Perro', age: 4 }
    ]
  },
  {
    id: '4',
    name: 'Ana Martínez',
    rut: '22.334.455-6',
    email: 'ana@email.com',
    phone: '+56 9 2233 4455',
    pets: [
      { name: 'Rocky', species: 'Perro', age: 6 },
      { name: 'Pelusa', species: 'Gato', age: 1 }
    ]
  },
  {
    id: '5',
    name: 'Pedro Silva',
    rut: '33.445.566-7',
    email: 'pedro@email.com',
    phone: '+56 9 3344 5566',
    pets: [
      { name: 'Max', species: 'Perro', age: 7 }
    ]
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [registeredOwners, setRegisteredOwners] = useState<Owner[]>([]);

  // Combinar datos de ejemplo con los registrados para validación
  const allOwners = [...mockOwners, ...registeredOwners];

  const handleLogin = (rut: string) => {
    setCurrentUser(rut);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  const handleRegisterComplete = (newOwner: Owner) => {
    // Agregar el nuevo dueño a la lista de registrados
    setRegisteredOwners([...registeredOwners, newOwner]);
    alert('✅ Registro completado con éxito.');
    setCurrentView('dashboard');
  };

  const handleViewProfile = (owner: Owner) => {
    setSelectedOwner(owner);
    setCurrentView('profile');
  };

  const handleBackToDashboard = () => {
    setSelectedOwner(null);
    setCurrentView('dashboard');
  };

  const handleNewRegister = () => {
    setCurrentView('register');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Marco de celular - iPhone 16 Pro Max */}
      <div className="w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden" style={{ maxWidth: '430px', height: '932px', maxHeight: '95vh' }}>
        <div className="h-full overflow-y-auto">
          {currentView === 'login' && (
            <Login
              onLogin={handleLogin}
              onGoToRegister={() => setCurrentView('register')}
            />
          )}

          {currentView === 'register' && (
            <Register
              onRegisterComplete={handleRegisterComplete}
              onBackToLogin={() => setCurrentView('login')}
              existingOwners={allOwners}
            />
          )}

          {currentView === 'dashboard' && (
            <Dashboard
              onLogout={handleLogout}
              onViewProfile={handleViewProfile}
              onNewRegister={handleNewRegister}
              owners={allOwners}
            />
          )}

          {currentView === 'profile' && selectedOwner && (
            <PetProfile
              owner={selectedOwner}
              onBack={handleBackToDashboard}
            />
          )}
        </div>
      </div>
    </div>
  );
}