---
name: prime
description: |
  Khởi động context dự án: đọc plans/, tóm tắt tiến độ, xác định task tiếp theo.
  Dùng khi bắt đầu phiên làm việc mới hoặc cần nhắc lại trạng thái hiện tại.

  Trigger khi user nói:
  - "prime", "/prime"
  - "dự án đang làm gì", "tiến độ thế nào"
  - "task tiếp theo là gì", "làm gì tiếp"
  - "nhớ lại dự án", "tóm tắt project"
---

# Skill: Prime — Khởi động Context Dự Án

## Mục đích

Giúp Claude nắm nhanh trạng thái dự án khi bắt đầu phiên mới, không cần user giải thích lại từ đầu.

## Các bước thực hiện

### Bước 1 — Đọc toàn bộ plans/

```bash
ls plans/
```

Đọc **tất cả** file trong `plans/`. Đây là nguồn sự thật duy nhất về kế hoạch và backlog.

### Bước 2 — Kiểm tra git log gần nhất

```bash
git log --oneline -10
```

Xem commit gần nhất để biết đã làm gì (code evidence > plan evidence).

### Bước 3 — Kiểm tra file chưa commit

```bash
git status
```

Xem có work in progress nào chưa được commit không.

### Bước 4 — Đọc memory

Đọc `/home/codespace/.claude/projects/-workspaces-saigon-logistics-landing/memory/MEMORY.md` nếu tồn tại, để lấy context từ các phiên trước.

### Bước 5 — Tổng hợp và trình bày

Trình bày theo format sau (bằng tiếng Việt):

---

## Trạng thái dự án: [tên project]

**Đang làm:** [mô tả ngắn phase hiện tại]

**Đã hoàn thành gần đây:**
- [commit/task 1]
- [commit/task 2]

**Task tiếp theo (theo priority):**
1. [task cao nhất] — [file cần tạo/sửa]
2. [task tiếp theo] — [file]
3. [task tiếp theo] — [file]

**Backlog còn lại:**
- [danh sách ngắn các task chưa làm]

**Lưu ý quan trọng:**
- [bất kỳ context nào cần nhớ]

---

## Hướng dẫn áp dụng cho dự án này

Dự án hiện tại: **SAIGON LOGISTICS** — landing page logistics quốc tế.

Kế hoạch chính: `plans/seo-aeo-geo-30-ngay.md`

**Backlog kỹ thuật (đọc từ cuối file plan):**

| Task | File | Priority |
|---|---|---|
| Trang hub `/tuyen` | `app/tuyen/page.tsx` | Cao |
| Breadcrumb schema | `app/tuyen/[slug]/page.tsx` | Cao |
| Price schema | `app/tuyen/[slug]/page.tsx` | Cao |
| OG image động | `app/tuyen/[slug]/opengraph-image.tsx` | Trung bình |
| Blog route | `app/blog/[slug]/page.tsx` | Trung bình |
| Freshness timestamp | `components/RouteHighlight.tsx` | Thấp |
| Trang `/ve-chung-toi` | `app/ve-chung-toi/page.tsx` | Thấp |
| Trang `/chinh-sach-boi-thuong` | `app/chinh-sach-boi-thuong/page.tsx` | Thấp |

**Khi trả lời prime, luôn:**
1. Đối chiếu git log với checklist trong plan để biết cái gì đã code xong
2. Đề xuất task tiếp theo cụ thể nhất (task cao nhất chưa làm)
3. Cập nhật memory sau khi user xác nhận hướng đi

## Sau khi trình bày

Hỏi user: "Bạn muốn tiếp tục với task nào?" rồi bắt đầu implement ngay.

## Quan trọng — Cập nhật memory sau mỗi phiên

Sau khi hoàn thành task, lưu vào memory:
- Những task đã hoàn thành
- Quyết định kỹ thuật quan trọng
- Bất kỳ thay đổi nào so với kế hoạch ban đầu

File memory: `/home/codespace/.claude/projects/-workspaces-saigon-logistics-landing/memory/`
