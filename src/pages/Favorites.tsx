import { useState } from 'react';
import GroupList from '../components/GroupList';
import PokemonCard from '../components/PokemonCard';
import { useStore } from '../store/useStore';

export default function Favorites() {
  const { groups, ungroupedFavorites, createGroup, moveFavoriteToGroup } = useStore();
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    createGroup(newGroupName.trim());
    setNewGroupName('');
  };

  return (
    <div>
      <h2 style={{ color: '#646cff' }}>Quản lý Yêu thích & Nhóm</h2>

      {/* Box tạo nhóm mới */}
      <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #444' }}>
        <h3 style={{ marginTop: 0 }}>Tạo nhóm mới</h3>
        <form onSubmit={handleCreateGroup} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Tên nhóm (VD: Hệ Lửa, Yêu thích nhất...)"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              borderRadius: '6px', 
              border: '1px solid #555', 
              backgroundColor: '#2a2a2a', 
              color: 'white',
              fontSize: '1rem'
            }}
          />
          <button 
            type="submit" 
            style={{ 
              padding: '0 1.5rem', 
              borderRadius: '6px', 
              border: 'none', 
              backgroundColor: '#646cff', 
              color: 'white', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
          >
            Tạo
          </button>
        </form>
      </div>

      {/* Danh sách Pokemon chưa được phân nhóm */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Pokemon chưa phân nhóm ({ungroupedFavorites.length})</h3>
        {ungroupedFavorites.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>Không có Pokemon nào chưa được phân nhóm.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {ungroupedFavorites.map(pokemon => (
              <div key={pokemon.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <PokemonCard pokemon={pokemon} />
                
                {/* Dropdown để chuyển Pokemon vào nhóm */}
                {groups.length > 0 && (
                  <select 
                    value=""
                    onChange={(e) => moveFavoriteToGroup(pokemon.id, e.target.value)}
                    style={{ 
                      padding: '0.5rem', 
                      borderRadius: '6px', 
                      backgroundColor: '#2a2a2a', 
                      color: 'white', 
                      border: '1px solid #555',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="" disabled>-- Chuyển vào nhóm --</option>
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Danh sách các nhóm */}
      <div>
        <h3>Danh sách các nhóm ({groups.length})</h3>
        {groups.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>Bạn chưa tạo nhóm nào.</p>
        ) : (
          groups.map(group => (
            <GroupList key={group.id} group={group} />
          ))
        )}
      </div>
    </div>
  );
}
