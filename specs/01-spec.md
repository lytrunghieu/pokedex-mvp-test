# Spec: Front End Developer Site Build (Miroma Project Factory)

## Business Goal & Target Audience
**Business Goal:** Xây dựng một ứng dụng web để đánh giá năng lực của Front-end Developer dựa trên các tiêu chí cốt lõi: kiến trúc mã nguồn (architecture), quản lý trạng thái (state management), khả năng tương tác với API, và trải nghiệm người dùng (UX). Ứng dụng cho phép người dùng tương tác với một chủ đề cụ thể (Pokemon, Phim ảnh, hoặc Quốc gia).
**Target Audience:** Người hâm mộ (fans) của chủ đề được chọn, mong muốn tìm kiếm thông tin, lưu trữ và phân loại các mục yêu thích của họ.

## Core Features & Edge Cases
### Functional Requirements (Bắt buộc)
1. **Routing:** Ứng dụng phải có ít nhất 2 trang (pages).
2. **API Integration:** Hiển thị dữ liệu từ một trong các API công khai: PokeAPI, TMDB, hoặc RestCountries.
3. **Search:** Người dùng có thể tìm kiếm các thực thể (entities) từ API.
4. **Favorites Management:** Người dùng có thể đánh dấu (mark) các thực thể là yêu thích.
5. **Grouping:** Người dùng có thể nhóm các mục yêu thích lại với nhau.
6. **Deletion:** Người dùng có thể xóa các mục khỏi danh sách yêu thích và xóa các nhóm đã tạo.
7. **Storage:** Dữ liệu về nhóm và danh sách yêu thích phải được lưu trữ lại để giữ nguyên trạng thái khi người dùng quay lại trang (persistence).
8. **Documentation:** Cung cấp README.md bao gồm hướng dẫn chạy dự án, quyết định kiến trúc, đánh đổi (trade-offs) do giới hạn thời gian, và các tính năng tương lai.

### Edge Cases & Error Handling (Optional nhưng đánh giá cao)
- Trạng thái đang tải (Loading states) khi gọi API.
- Xử lý lỗi mạng (Network errors) hoặc API không phản hồi một cách mượt mà (không crash app, không hiện màn hình trắng).
- Xử lý kết quả tìm kiếm rỗng (Empty search results).

## Non-Functional Requirements (Performance, Storage, Responsive)
1. **Framework:** Sử dụng React hoặc Vue (có thể kèm Next.js hoặc Nuxt.js).
2. **State Management:** Phải triển khai quản lý state rõ ràng cho dữ liệu và UI (phân định rõ global state và local state).
3. **Responsive Design:** Bắt buộc hoạt động tốt trên màn hình từ Laptop đến Desktop. Tùy chọn hỗ trợ Mobile/Touch.
4. **Storage Mechanism:** Yêu cầu lưu trữ phía client (Client-side storage) hoặc cơ sở dữ liệu để đáp ứng yêu cầu persistence (LocalStorage/SessionStorage là lựa chọn hợp lý nhất cho bài test 2 giờ).
5. **Hosting & Deployment:** Mã nguồn phải được lưu trên Git repository (GitHub/GitLab) và ứng dụng phải được deploy live (Vercel/Netlify).
6. **Code Quality:** Đề cao Type Safety (TypeScript), format/lint code chuẩn, và tổ chức thư mục logic, tách biệt UI và logic fetching.

## Out of Scope (Những thứ cố tình không làm để kịp tiến độ 2 giờ)
- **Hệ thống Backend & Authentication:** Không xây dựng backend riêng hoặc đăng nhập người dùng (sử dụng LocalStorage để tiết kiệm thời gian).
- **Giao diện thiết kế phức tạp (Complex UI/UX Design):** Không đi sâu vào thiết kế đồ họa hoặc custom assets phức tạp, ưu tiên sử dụng UI library hoặc Design System đơn giản để đảm bảo tính gọn gàng, có thể tái sử dụng.
- **Coverage Test 100%:** Chỉ setup cơ bản E2E/Unit test nếu thời gian cho phép, không bắt buộc đạt coverage cao.
- **Micro-animations quá phức tạp:** Chỉ sử dụng các transition cơ bản (hover, loading spinner) thay vì các animation tốn thời gian.
