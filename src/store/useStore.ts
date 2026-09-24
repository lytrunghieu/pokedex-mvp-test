import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState, FavoriteItem } from '../types';

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      groups: [],
      ungroupedFavorites: [],

      addFavorite: (pokemon) => set((state) => {
        // Kiểm tra xem đã có trong ungroupedFavorites chưa
        const inUngrouped = state.ungroupedFavorites.find(p => p.id === pokemon.id);
        // Kiểm tra xem đã có trong nhóm nào chưa
        const inGroups = state.groups.some(g => g.favorites.some(p => p.id === pokemon.id));

        if (inUngrouped || inGroups) return state; // Đã yêu thích rồi thì bỏ qua

        return {
          ungroupedFavorites: [...state.ungroupedFavorites, pokemon]
        };
      }),

      removeFavorite: (id) => set((state) => ({
        ungroupedFavorites: state.ungroupedFavorites.filter(p => p.id !== id),
        groups: state.groups.map(group => ({
          ...group,
          favorites: group.favorites.filter(p => p.id !== id)
        }))
      })),

      createGroup: (groupName) => set((state) => ({
        groups: [
          ...state.groups,
          {
            id: crypto.randomUUID(), // Tạo id ngẫu nhiên
            name: groupName,
            favorites: []
          }
        ]
      })),

      deleteGroup: (groupId) => set((state) => {
        const groupToDelete = state.groups.find(g => g.id === groupId);
        if (!groupToDelete) return state;

        return {
          // Các pokemon trong nhóm bị xóa sẽ trở lại danh sách ungroupedFavorites
          ungroupedFavorites: [...state.ungroupedFavorites, ...groupToDelete.favorites],
          groups: state.groups.filter(g => g.id !== groupId)
        };
      }),

      moveFavoriteToGroup: (favoriteId, groupId) => set((state) => {
        // Tìm pokemon trong ungroupedFavorites hoặc từ các nhóm khác
        let pokemonToMove: FavoriteItem | undefined = state.ungroupedFavorites.find(p => p.id === favoriteId);
        
        if (!pokemonToMove) {
          for (const group of state.groups) {
            const found = group.favorites.find(p => p.id === favoriteId);
            if (found) {
              pokemonToMove = found;
              break;
            }
          }
        }

        if (!pokemonToMove) return state; // Không tìm thấy

        return {
          // Xóa khỏi ungroupedFavorites
          ungroupedFavorites: state.ungroupedFavorites.filter(p => p.id !== favoriteId),
          // Thêm vào nhóm mới và xóa khỏi nhóm cũ (nếu có)
          groups: state.groups.map(group => {
            if (group.id === groupId) {
              // Nếu là nhóm đích, thêm vào
              // Đảm bảo không bị trùng
              const exists = group.favorites.some(p => p.id === favoriteId);
              return exists ? group : { ...group, favorites: [...group.favorites, pokemonToMove!] };
            } else {
              // Nếu là nhóm khác, xóa đi
              return { ...group, favorites: group.favorites.filter(p => p.id !== favoriteId) };
            }
          })
        };
      }),

      removeFavoriteFromGroup: (favoriteId, groupId) => set((state) => {
        const group = state.groups.find(g => g.id === groupId);
        const pokemon = group?.favorites.find(p => p.id === favoriteId);

        if (!pokemon) return state;

        return {
          ungroupedFavorites: [...state.ungroupedFavorites, pokemon],
          groups: state.groups.map(g => 
            g.id === groupId 
              ? { ...g, favorites: g.favorites.filter(p => p.id !== favoriteId) }
              : g
          )
        };
      })
    }),
    {
      name: 'pokemon-favorites-storage', // Tên key trong localStorage
    }
  )
);
