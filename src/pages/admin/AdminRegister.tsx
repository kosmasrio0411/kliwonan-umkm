import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
}

export default function AdminRegister() {
  // Add User States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin_desa');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Manage Users States
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch users', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal membuat akun');
      }

      setMessage({ type: 'success', text: `Berhasil membuat akun ${username} (${role})` });
      setUsername('');
      setPassword('');
      setRole('admin_desa');
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Terjadi kesalahan tidak terduga.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, username: string) => {
    if (!window.confirm(`Yakin ingin menghapus akun ${username}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Gagal menghapus akun');
      
      setMessage({ type: 'success', text: `Akun ${username} berhasil dihapus.` });
      fetchUsers();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Terjadi kesalahan' });
    }
  };

  const handleChangePassword = async (id: string, username: string) => {
    const newPassword = window.prompt(`Masukkan password baru untuk akun ${username}:`);
    if (!newPassword) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/auth/users/${id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password: newPassword })
      });

      if (!response.ok) throw new Error('Gagal mengubah password');
      
      setMessage({ type: 'success', text: `Password untuk akun ${username} berhasil diubah.` });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Terjadi kesalahan' });
    }
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-7xl mx-auto animate-fade-in flex flex-col xl:flex-row gap-8">
      {/* Left Column: Form Tambah Akun */}
      <div className="w-full xl:w-1/3">
        <div className="mb-6">
          <h1 className="font-headline-md text-headline-md font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[32px]">manage_accounts</span>
            Manage Akun
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Buat dan kelola akun pengguna sistem.
          </p>
        </div>

        <div className="bg-surface border border-outline-variant/30 rounded-2xl shadow-level-1 p-6">
          <h2 className="font-title-md text-title-md font-bold mb-4">Tambah Akun Baru</h2>
          {message && (
            <div className={`mb-6 p-3 rounded-lg border flex items-center gap-3 text-sm font-label-md animate-fade-in ${
              message.type === 'success' ? 'bg-primary-container text-on-primary-container border-primary/20' : 'bg-error-container text-on-error-container border-error/20'
            }`}>
              <span className="material-symbols-outlined">
                {message.type === 'success' ? 'check_circle' : 'error'}
              </span>
              {message.text}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-label-md text-on-surface mb-2" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/70"
                  placeholder="Masukkan username unik"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-label-md text-on-surface mb-2" htmlFor="password">
                Password Sementara
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-on-surface-variant/70"
                  placeholder="Masukkan password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-label-md text-on-surface mb-2" htmlFor="role">
                Peran (Role)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                </div>
                <select
                  id="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface font-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                >
                  <option value="admin_desa">Admin Desa</option>
                  <option value="owner_produk">Owner Produk</option>
                  <option value="admin">Super Admin</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary/90 text-on-primary rounded-lg font-label-md font-bold transition-all shadow-level-1 hover:shadow-level-2 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-4"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  Memproses...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  Buat Akun
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Column: Daftar Akun */}
      <div className="w-full xl:w-2/3">
        <div className="bg-surface border border-outline-variant/30 rounded-2xl shadow-level-1 overflow-hidden h-full flex flex-col">
          <div className="p-6 border-b border-outline-variant/30 bg-surface-container-lowest">
            <h2 className="font-title-md text-title-md font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">group</span>
              Daftar Pengguna
            </h2>
          </div>
          
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-sm border-b border-outline-variant/30">
                  <th className="p-4 font-bold min-w-[150px]">Username</th>
                  <th className="p-4 font-bold min-w-[120px]">Role</th>
                  <th className="p-4 font-bold text-right min-w-[120px]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined animate-spin text-[32px] inline-block mb-2">progress_activity</span>
                      <p className="text-sm font-label-md">Memuat pengguna...</p>
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[32px] mb-2 opacity-50 inline-block">group_off</span>
                      <p className="font-body-md">Belum ada pengguna ditemukan.</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-outline-variant/30 hover:bg-surface-container-lowest transition-colors">
                      <td className="p-4 font-body-md font-medium text-on-surface">{user.username}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-label-md font-bold inline-block ${
                          user.role === 'admin' ? 'bg-error-container text-on-error-container' :
                          user.role === 'admin_desa' ? 'bg-primary-container text-on-primary-container' :
                          'bg-tertiary-container text-on-tertiary-container'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleChangePassword(user.id, user.username)}
                            className="p-2 rounded-lg bg-surface-container-highest hover:bg-primary-container hover:text-on-primary-container text-on-surface-variant transition-colors"
                            title="Ganti Password"
                          >
                            <span className="material-symbols-outlined text-[20px] block">key</span>
                          </button>
                          <button
                            onClick={() => handleDelete(user.id, user.username)}
                            disabled={user.role === 'admin'}
                            className="p-2 rounded-lg bg-surface-container-highest hover:bg-error-container hover:text-on-error-container text-on-surface-variant transition-colors disabled:opacity-50 disabled:hover:bg-surface-container-highest disabled:hover:text-on-surface-variant disabled:cursor-not-allowed"
                            title={user.role === 'admin' ? 'Tidak dapat menghapus super admin' : 'Hapus Akun'}
                          >
                            <span className="material-symbols-outlined text-[20px] block">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
