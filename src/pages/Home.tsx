import { useState, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import { fetchPokemonList, fetchPokemonDetail } from '../api/pokemon';
import type { FavoriteItem } from '../types';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Extract ID from url to build image URL
  const getIdFromUrl = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    return parseInt(parts[parts.length - 1], 10);
  };

  const getImageUrl = (id: number) => 
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  const loadDefaultList = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonList(20, 0);
      const formatted: FavoriteItem[] = data.results.map(p => {
        const id = getIdFromUrl(p.url);
        return {
          id,
          name: p.name,
          imageUrl: getImageUrl(id)
        };
      });
      setPokemonList(formatted);
    } catch (err) {
      setError('Không thể tải danh sách Pokemon.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDefaultList();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return loadDefaultList();
    }
    try {
      setLoading(true);
      setError(null);
      const detail = await fetchPokemonDetail(searchQuery.trim());
      setPokemonList([{
        id: detail.id,
        name: detail.name,
        imageUrl: detail.sprites.front_default || getImageUrl(detail.id)
      }]);
    } catch (err) {
      setError('Không tìm thấy Pokemon nào phù hợp.');
      setPokemonList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        onSubmit={handleSearch}
        loading={loading}
      />

      {error && <p style={{ color: '#ff4757', textAlign: 'center' }}>{error}</p>}
      
      {!loading && !error && pokemonList.length === 0 && (
        <p style={{ textAlign: 'center', color: '#888' }}>Không có dữ liệu.</p>
      )}

      {loading && <p style={{ textAlign: 'center', color: '#888' }}>Đang tải...</p>}

      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {pokemonList.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
