// Dữ liệu cơ bản từ PokeAPI List
export interface PokemonBasic {
  name: string;
  url: string; 
}

// Dữ liệu chi tiết trả về từ PokeAPI (Lấy các trường quan trọng)
export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

// Cấu trúc một mục yêu thích lưu trong Store
export interface FavoriteItem {
  id: number;
  name: string;
  imageUrl: string;
}

// Cấu trúc của một Nhóm (Group)
export interface Group {
  id: string; // UUID
  name: string;
  favorites: FavoriteItem[];
}

// Trạng thái (State) của Zustand Store
export interface AppState {
  groups: Group[];
  ungroupedFavorites: FavoriteItem[]; // Các Pokemon đã thích nhưng chưa gán vào nhóm nào
  
  // Actions
  addFavorite: (pokemon: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  createGroup: (groupName: string) => void;
  deleteGroup: (groupId: string) => void;
  moveFavoriteToGroup: (favoriteId: number, groupId: string) => void;
  removeFavoriteFromGroup: (favoriteId: number, groupId: string) => void;
}
