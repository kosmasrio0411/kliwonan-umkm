import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logoImg from '../../assets/logo_kliwonan.png';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role;

  let isTokenValid = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && payload.exp * 1000 > Date.now()) {
        isTokenValid = true;
      }
    } catch (e) {
      // Ignore parse error
    }
  }

  if (!isTokenValid) {
    if (token) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex">
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <nav
        aria-label="Main Navigation"
        className={`h-screen w-64 fixed left-0 top-0 bg-surface dark:bg-inverse-surface shadow-sm border-r border-outline-variant/30 flex-col z-50 transition-transform duration-300 md:translate-x-0 flex ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-4 border-r border-outline-variant/30 bg-surface-container-low dark:bg-surface-dim">
          {/* Admin Info */}
          <div className="mb-8 px-4 flex flex-col items-center gap-3">
            <img
              src={logoImg}
              alt="Logo Kliwonan"
              className="w-20 h-20 object-contain drop-shadow-sm"
            />
            <div className="text-center">
              <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">
                Lapak Kliwonan
              </h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-2 font-body-md text-body-md h-full">
            <li>
              <NavLink
                to="/admin"
                end
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out active:scale-95 ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant'
                  }`
                }
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  dashboard
                </span>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out active:scale-95 ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant'
                  }`
                }
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  inventory_2
                </span>
                {role === 'owner_produk' ? 'Produk Saya' : 'Kelola Produk'}
              </NavLink>
            </li>
            
            {role === 'admin' && (
              <li>
                <NavLink
                  to="/admin/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out active:scale-95 ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-bold'
                        : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant'
                    }`
                  }
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    manage_accounts
                  </span>
                  Manage Akun
                </NavLink>
              </li>
            )}
            <li className="mt-auto mb-2">
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out active:scale-95 ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant'
                  }`
                }
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  public
                </span>
                Ke Halaman Utama
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant transition-colors rounded-lg transition-all duration-200 ease-in-out active:scale-95"
              >
                <span className="material-symbols-outlined">logout</span>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-64 w-full md:w-[calc(100%-16rem)] flex flex-col">
        {/* Mobile Header (Fallback for non-desktop) */}
        <header className="md:hidden flex items-center justify-between p-4 bg-surface/80 backdrop-blur-md sticky top-0 z-30 shadow-level-1">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Logo Kliwonan" className="h-8 w-auto object-contain" />
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
              Lapak Kliwonan
            </h1>
          </div>
          <button className="text-primary p-2" onClick={() => setIsMobileMenuOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        
        {/* Render child routes here */}
        <Outlet />
      </main>
    </div>
  );
}
