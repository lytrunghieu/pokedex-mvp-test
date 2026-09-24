import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Heart } from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const getLinkStyle = (path: string) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: location.pathname === path ? '#646cff' : 'inherit',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal'
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingBottom: '1rem', 
        borderBottom: '1px solid #444', 
        marginBottom: '2rem' 
      }}>
        <h2 style={{ margin: 0, color: '#646cff' }}>PokéDex MVP</h2>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={getLinkStyle('/')}>
            <Home size={20} /> Trang chủ
          </Link>
          <Link to="/favorites" style={getLinkStyle('/favorites')}>
            <Heart size={20} /> Yêu thích
          </Link>
        </nav>
      </header>
      
      <main>
        {/* Nơi render nội dung của các trang con (Home, Favorites) */}
        <Outlet />
      </main>
    </div>
  );
}
