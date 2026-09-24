# Technical Plan: Front End Developer Site Build (Pokemon API)

## Architecture Proposals

### Phương án A: Tối ưu tốc độ giao hàng (Quick MVP)
**Triết lý:** Tập trung vào việc hoàn thành tất cả các yêu cầu cốt lõi của đề bài trong giới hạn thời gian 2 giờ. Tránh các boilerplate không cần thiết, giữ kiến trúc phẳng và đơn giản.
- **Tech Stack:** React + Vite + TypeScript.
- **State Management:** Zustand (sử dụng middleware `persist` để tự động đồng bộ groups/favorites với LocalStorage).
- **Data Fetching:** Fetch API cơ bản thông qua custom hooks (VD: `usePokemon`) hoặc một file service đơn giản, không sử dụng thư viện quản lý server-state phức tạp.
- **Routing:** React Router v6 (2 trang cơ bản: Home/Search và Favorites/Groups).
- **Styling:** CSS cơ bản hoặc CSS Modules để đảm bảo tính gọn nhẹ và dễ custom giao diện nhanh.
- **Đánh đổi (Trade-offs):** Ít phân tầng kiến trúc (logic xử lý và UI có thể nằm gần nhau hơn), khó maintain nếu ứng dụng phình to đột biến, thời gian viết test bị hạn chế.

### Phương án B: Tối ưu tính mở rộng & chuẩn doanh nghiệp (Scalability / Clean Architecture)
**Triết lý:** Tổ chức dự án theo chuẩn doanh nghiệp lớn, sẵn sàng để scale. Tách biệt rõ ràng các lớp trách nhiệm (Domain, Data, Presentation).
- **Tech Stack:** React + Vite + TypeScript.
- **Kiến trúc:** Phân tầng theo Feature-based hoặc Clean Architecture (Interfaces nghiêm ngặt cho API responses, Mappers, Repositories).
- **Data Fetching:** TanStack Query (React Query) để quản lý server state, caching, retry logic, và tự động xử lý loading/error states.
- **State Management:** Redux Toolkit (hoặc Zustand chia domain phức tạp).
- **Testing:** Khung test tự động chuẩn mực (Jest + React Testing Library) cho utils và các hooks quan trọng.
- **Đánh đổi (Trade-offs):** Tốn rất nhiều thời gian thiết lập ban đầu (Boilerplate, Type Definitions, Contracts). Rủi ro lố giờ và không hoàn thành kịp các tính năng bắt buộc.

### Bảng So Sánh Chi Tiết

| Tiêu chí | Phương án A (Quick MVP) | Phương án B (Clean Architecture) |
| :--- | :--- | :--- |
| **Thời gian thực hiện ước tính** | 1.5 - 2 giờ | 3 - 5 giờ |
| **Độ phức tạp (Complexity)** | Thấp - Hướng thẳng tới kết quả | Cao - Setup nhiều lớp và boilerplate |
| **Rủi ro lỗi (Bug Risk)** | Trung bình (Ít ràng buộc strict) | Thấp (Type strict, kiến trúc rạch ròi) |
| **Sự phù hợp với bài test 2h** | **Rất cao (Nên chọn)** | Thấp (Dễ over-engineering và trễ hạn) |

---

## Quyết định Kiến trúc & Cấu trúc
**Phương án được chọn:** Phương án A (Quick MVP)

### Cấu trúc thư mục (Folder Structure)
Dựa trên Phương án A, cấu trúc thư mục sẽ được giữ phẳng và đơn giản, đảm bảo tách biệt UI và Logic cơ bản:
```text
src/
├── api/             # Chứa logic fetch data từ PokeAPI
│   └── pokemon.ts   # Hàm fetch danh sách Pokemon, fetch chi tiết
├── components/      # Các UI component có thể tái sử dụng
│   ├── PokemonCard.tsx
│   ├── SearchBar.tsx
│   ├── GroupList.tsx
│   └── Layout.tsx   # Header, Navigation dùng chung
├── pages/           # Các trang chính theo React Router
│   ├── Home.tsx     # Trang tìm kiếm & danh sách chính
│   └── Favorites.tsx # Trang quản lý nhóm và mục yêu thích
├── store/           # Global state với Zustand
│   └── useStore.ts  # Chứa state cho favorites, groups và persist logic
├── types/           # Data contracts (TypeScript interfaces)
│   └── index.ts     
├── App.tsx          # Cấu hình React Router
└── main.tsx         # Entry point
```

### Data Contracts (Types)
Định nghĩa sẵn các interfaces trong `src/types/index.ts` để đảm bảo type-safety khi gọi API và quản lý state:

```typescript
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
```
