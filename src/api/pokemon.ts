import type { PokemonBasic, PokemonDetail } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonBasic[];
}

/**
 * Fetch danh sách Pokemon cơ bản (phân trang)
 */
export async function fetchPokemonList(limit: number = 20, offset: number = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  return response.json();
}

/**
 * Fetch chi tiết 1 Pokemon dựa trên ID hoặc Tên (dùng để hiển thị ảnh, type hoặc tìm kiếm trực tiếp)
 */
export async function fetchPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`);
  if (!response.ok) {
    throw new Error(`Pokemon ${nameOrId} not found`);
  }
  return response.json();
}
