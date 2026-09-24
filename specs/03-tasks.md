# Danh sách Tác vụ (Task List)

Dưới đây là bảng phân rã các tác vụ theo nguyên tắc nguyên tử (atomic). Vui lòng ra lệnh "Làm Task X" để tôi bắt đầu thực hiện.

- [x] **Task 1: Khởi tạo dự án & Cài đặt thư viện**
  - **Mô tả:** Khởi tạo dự án React + Vite (TypeScript). Cài đặt các thư viện cần thiết: `zustand`, `react-router-dom`, `lucide-react` (icon). Dọn dẹp boilerplate mặc định của Vite.
  - **Files tác động:** `package.json`, `src/main.tsx`
  - **Verification Step:** Chạy `npm install` và `npm run dev` thành công, giao diện hiển thị trang trắng không lỗi ở console.

- [x] **Task 2: Định nghĩa Data Contracts (Types)**
  - **Mô tả:** Chuyển các định nghĩa Interfaces từ file plan vào mã nguồn thực tế.
  - **Files tác động:** `src/types/index.ts`
  - **Verification Step:** File TypeScript không có lỗi syntax, IDE nhận diện đúng type.

- [x] **Task 3: Thiết lập State Management (Zustand Store)**
  - **Mô tả:** Tạo store quản lý danh sách `favorites` và `groups`, tích hợp middleware `persist` để tự động lưu vào LocalStorage.
  - **Files tác động:** `src/store/useStore.ts`
  - **Verification Step:** Viết logic gọi hàm thử nghiệm trong console hoặc component tạm, verify xem dữ liệu có lưu xuống `localStorage` của trình duyệt không.

- [x] **Task 4: Xây dựng API Service**
  - **Mô tả:** Viết các hàm fetch dữ liệu (List và Detail) kết nối tới PokeAPI sử dụng `fetch` API.
  - **Files tác động:** `src/api/pokemon.ts`
  - **Verification Step:** Gọi hàm thử trong `App.tsx` xem dữ liệu in ra console có đúng định dạng `PokemonDetail` không.

- [x] **Task 5: Thiết lập Layout & Routing**
  - **Mô tả:** Cài đặt React Router. Tạo Layout chung chứa thanh điều hướng (Navbar) để chuyển giữa Home và Favorites.
  - **Files tác động:** `src/App.tsx`, `src/components/Layout.tsx`
  - **Verification Step:** Click vào link trên Navbar, URL chuyển đổi giữa `/` và `/favorites` mà không reload trang.

- [x] **Task 6: Xây dựng Component: PokemonCard**
  - **Mô tả:** Tạo UI card hiển thị ảnh, tên Pokemon và nút thao tác "Thêm vào Yêu thích".
  - **Files tác động:** `src/components/PokemonCard.tsx`
  - **Verification Step:** Truyền mock data vào và hiển thị thành công card lên giao diện màn hình.

- [x] **Task 7: Hoàn thiện Trang Home & Search**
  - **Mô tả:** Kết nối API để hiển thị danh sách Pokemon trên trang chủ. Thêm component tìm kiếm. Gắn action "Yêu thích" vào store.
  - **Files tác động:** `src/pages/Home.tsx`, `src/components/SearchBar.tsx`
  - **Verification Step:** Gõ từ khóa tìm kiếm lọc được Pokemon. Bấm "Thích" và xem trong `localStorage` thấy dữ liệu tăng lên.

- [x] **Task 8: Xây dựng Component: GroupList**
  - **Mô tả:** Tạo UI hiển thị một nhóm, danh sách các Pokemon trong nhóm đó, và các nút xóa/di chuyển.
  - **Files tác động:** `src/components/GroupList.tsx`
  - **Verification Step:** Gắn thử nghiệm lên màn hình với mock data, click nút xóa log ra id chính xác.

- [x] **Task 9: Hoàn thiện Trang Favorites**
  - **Mô tả:** Hiển thị danh sách "Ungrouped Favorites". Thêm UI để tạo nhóm mới và chọn đưa Pokemon từ Ungrouped vào các Nhóm.
  - **Files tác động:** `src/pages/Favorites.tsx`
  - **Verification Step:** Thao tác tạo 1 nhóm mới, đưa 1 Pokemon vào nhóm. F5 tải lại trang và thấy dữ liệu vẫn giữ nguyên vị trí (persistence hoạt động tốt).

- [x] **Task 10: Cập nhật README & Đánh giá cuối**
  - **Mô tả:** Viết tài liệu hướng dẫn chạy dự án vào `README.md`. Lướt qua CSS toàn cục để đảm bảo độ mượt mà.
  - **Files tác động:** `README.md`, `src/index.css`
  - **Verification Step:** Chạy `npm run build` không lỗi, xem được thành quả bản build.
