---
name: spec-driven-development
description: Quy trình 4 bước chuẩn mực để xử lý yêu cầu phần mềm từ số 0 đến CI/CD, đảm bảo không bỏ sót yêu cầu và giảm thiểu bug.
---

# Hướng dẫn thực thi Kỹ năng Phát triển Hướng Đặc tả (Spec-Driven Development)

Bất cứ khi nào người dùng giao một yêu cầu phát triển mới (đặc biệt là yêu cầu tổng hợp hoặc tài liệu PDF/Word), hãy TUYỆT ĐỐI tuân thủ quy trình 4 bước sau. Không bao giờ viết code dự án ngay lập tức.

## Bước 1: Phân tích & Đặc tả (Spec & Alignment)
1. **Trích xuất Yêu cầu:** Phân chia rạch ròi Functional Requirements (Tính năng) và Non-functional Requirements (Hiệu năng, Công nghệ, Triển khai). Xác định rõ những gì "Out of Scope".
2. **Xử lý Xung đột Đặc tả (Spec Conflict):** Nếu phát hiện các yêu cầu mâu thuẫn nhau trong tài liệu (Ví dụ: "Không dùng backend" nhưng lại yêu cầu "Đồng bộ dữ liệu đa thiết bị"), TUYỆT ĐỐI KHÔNG TỰ Ý ĐOÁN MÒ. Phải dừng lại ngay lập tức, phân tích sự mâu thuẫn và yêu cầu người dùng xác nhận phương án ưu tiên.
3. **Làm rõ (Clarification):** Đặt 3-5 câu hỏi cho người dùng về các điểm mập mờ (Công nghệ, CSDL ưu tiên, giới hạn thời gian).
4. **Tài liệu hóa:** Viết tất cả ra file `specs/01-spec.md`.

## Bước 2: Lên Kế hoạch Kiến trúc & Phân rã Task (Architecture & Atomic Tasks)
1. **Đề xuất Kiến trúc:** Đưa ra ít nhất 2 phương án (ví dụ: Nhanh/MVP vs Sạch/Có thể mở rộng) kèm Trade-offs để người dùng chọn. Viết vào `specs/02-plan.md`.
2. **Phân rã Task:** Chuyển kế hoạch thành các task nguyên tử (Atomic Tasks) dạng danh sách checklist `[ ]` vào `specs/03-tasks.md`.
   - Mỗi task chỉ ảnh hưởng 1-2 file.
   - Mỗi task phải có bước "Verification Step" (Tiêu chí nghiệm thu).

## Bước 3: Triển khai Lặp (Iterative Implementation)
1. Dừng lại chờ người dùng gọi "Làm Task X".
2. **Kiểm tra API Contract (Nếu có gọi API bên ngoài):** Nếu dự án phải giao tiếp với API nhưng chưa có tài liệu/schema rõ ràng, phải thực hiện gọi thử API trước (qua script hoặc log) để xác nhận chính xác cấu trúc dữ liệu trả về và lấy đúng các field cần thiết.
3. **Mock First:** Xây dựng giao diện (UI) bằng dữ liệu giả (Mock Data) dựa trên API contract đã xác định để đảm bảo layout không vỡ.
4. **Logic Second:** Sau khi UI hoàn thiện, mới gắn logic dữ liệu thật (Fetch API/Store/Database) vào.
5. **Xác thực:** Chạy lệnh build (`npm run build` hoặc tương đương) ngay sau MỖI task để bắt lỗi cú pháp/type sớm. Cập nhật `[x]` vào file `specs/03-tasks.md`.

## Bước 4: Đóng gói, CI/CD & Fix Bug
1. **Tài liệu:** Cập nhật `README.md` với đầy đủ hướng dẫn chạy, kiến trúc, và hướng dẫn Deploy.
2. **Đồng bộ Môi trường CI/CD:** Nếu cài đặt workflow (GitHub Actions), luôn đối chiếu phiên bản ngôn ngữ (Node.js, Python, v.v.) giữa requirements của thư viện và cấu hình CI để tránh lỗi chênh lệch phiên bản.
3. **Fix Bug:** Nếu gặp lỗi cấu hình môi trường, lỗi mạng hay lỗi build, không được đoán mò. Phải đọc kỹ log lỗi, giải thích nguyên nhân gốc rễ (root cause) và đưa ra giải pháp triệt để cho người dùng.
