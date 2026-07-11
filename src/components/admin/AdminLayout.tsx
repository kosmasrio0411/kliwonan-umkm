import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role;

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex">
      {/* SideNavBar */}
      <nav
        aria-label="Main Navigation"
        className="h-screen w-64 fixed left-0 top-0 bg-surface dark:bg-inverse-surface shadow-sm border-r border-outline-variant/30 flex-col z-40 hidden md:flex"
      >
        <div className="flex flex-col h-full p-4 border-r border-outline-variant/30 bg-surface-container-low dark:bg-surface-dim">
          {/* Admin Info */}
          <div className="mb-8 px-4 flex flex-col items-center gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtg7hRHwFPauRDOPwfIddc22tPDeGdx-b_xJF5lGet5zeU7eo_DBARiKGUWGvhtcMjUQjl45Lhd-HZzc77IjVdigoSIdbsAxXidrcszkahWCW4SY8h2TGHtLsBNtR_q2Y7YvP5r-sx-EO9XWxeOThi8uU02EawrlTFCGaUETP4D-8Yyhi-xEkG9mnEG6MlAu-WlqoiQLUgLoMXIH6MbE1vlOc9wm5_66dS6fAGPfqf0v0I44P9919b"
              alt="Admin Profile"
              className="w-16 h-16 rounded-full object-cover shadow-level-1"
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
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out active:scale-95 ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-bold'
                        : 'text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant'
                    }`
                  }
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    person_add
                  </span>
                  Tambah Akun
                </NavLink>
              </li>
            )}
            <li className="mt-auto">
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
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary">
            Lapak Kliwonan
          </h1>
          <button className="text-primary p-2">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>
        
        {/* Render child routes here */}
        <Outlet />
      </main>
    </div>
  );
}
