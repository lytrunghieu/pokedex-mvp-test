import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export default function SearchBar({ value, onChange, onSubmit, loading }: SearchBarProps) {
  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}
    >
      <div style={{ position: 'relative', flex: 1 }}>
        <input 
          type="text"
          placeholder="Tìm kiếm Pokemon theo tên hoặc ID..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 2.5rem',
            borderRadius: '8px',
            border: '1px solid #444',
            backgroundColor: '#1a1a1a',
            color: 'white',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <Search size={20} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        style={{
          padding: '0 1.5rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#646cff',
          color: 'white',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Đang tìm...' : 'Tìm'}
      </button>
    </form>
  );
}
