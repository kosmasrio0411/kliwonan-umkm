import { useState } from 'react';

export default function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin_desa');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/auth/register', {
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
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Terjadi kesalahan tidak terduga.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md font-bold text-primary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[32px]">person_add</span>
          Tambah Akun
        </h1>
        <p className="font-body-md text-on-surface-variant">
          Buat akun baru untuk Admin Desa atau Owner Produk agar mereka dapat login ke sistem.
        </p>
      </div>

      <div className="bg-surface border border-outline-variant/30 rounded-2xl shadow-level-1 p-6 md:p-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center gap-3 text-sm font-label-md animate-fade-in ${
            message.type === 'success' ? 'bg-primary-container text-on-primary-container border-primary/20' : 'bg-error-container text-on-error-container border-error/20'
          }`}>
            <span className="material-symbols-outlined">
              {message.type === 'success' ? 'check_circle' : 'error'}
            </span>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6 max-w-md">
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
  );
}
