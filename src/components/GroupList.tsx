import { Trash2 } from 'lucide-react';
import type { Group } from '../types';
import { useStore } from '../store/useStore';
import PokemonCard from './PokemonCard';

interface GroupListProps {
  group: Group;
}

export default function GroupList({ group }: GroupListProps) {
  const { deleteGroup, removeFavoriteFromGroup } = useStore();

  return (
    <div style={{
      border: '1px solid #444',
      borderRadius: '8px',
      padding: '1.5rem',
      backgroundColor: '#1a1a1a',
      marginBottom: '1.5rem'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #333', 
        paddingBottom: '1rem', 
        marginBottom: '1rem' 
      }}>
        <h3 style={{ margin: 0, color: '#646cff' }}>{group.name}</h3>
        <button 
          onClick={() => deleteGroup(group.id)}
          title="Xóa nhóm này"
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            color: '#ff4757', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem' 
          }}
        >
          <Trash2 size={20} /> Xóa nhóm
        </button>
      </div>

      {group.favorites.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>Chưa có Pokemon nào trong nhóm này.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {group.favorites.map(pokemon => (
            <div key={pokemon.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <PokemonCard pokemon={pokemon} />
              <button 
                onClick={() => removeFavoriteFromGroup(pokemon.id, group.id)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #555',
                  backgroundColor: '#2a2a2a',
                  color: '#ddd',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}
              >
                Đưa ra khỏi nhóm
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
