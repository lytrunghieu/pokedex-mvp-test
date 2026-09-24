
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { FavoriteItem } from '../types';

interface PokemonCardProps {
  pokemon: FavoriteItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { ungroupedFavorites, groups, addFavorite, removeFavorite } = useStore();

  const isFavorite = 
    ungroupedFavorites.some((p) => p.id === pokemon.id) ||
    groups.some((g) => g.favorites.some((p) => p.id === pokemon.id));

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <div style={{
      border: '1px solid #444',
      borderRadius: '8px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#2a2a2a',
      position: 'relative'
    }}>
      <button 
        onClick={toggleFavorite}
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: isFavorite ? '#ff4757' : '#999'
        }}
      >
        <Heart fill={isFavorite ? '#ff4757' : 'none'} size={24} />
      </button>
      
      <img 
        src={pokemon.imageUrl} 
        alt={pokemon.name} 
        style={{ width: '100px', height: '100px', objectFit: 'contain' }}
        loading="lazy"
      />
      <h3 style={{ textTransform: 'capitalize', marginTop: '0.5rem', marginBottom: '0' }}>
        {pokemon.name}
      </h3>
      <span style={{ color: '#888', fontSize: '0.9rem' }}>#{pokemon.id}</span>
    </div>
  );
}
