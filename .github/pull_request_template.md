## Thay đổi gì

<!-- Một đoạn. Nếu là batch nội dung: batch nào, bộ phận nào, tuần nào. -->

## Gate tự động

- [ ] `bun run ci` xanh ở máy local trước khi mở PR
- [ ] Ba job CI (`code` · `content` · `build`) xanh trên PR này

## Chỉ với batch NỘI DUNG (tuần soạn tay / sửa khung / sửa bank)

Gate xanh là sàn, không phải trần. Batch nội dung chỉ merge khi qua đủ ba bước:

- [ ] **Kiểm định mù kép** đã chạy — hai auditor (Academic Director · Hotel Manager)
      trong hai context cách ly, không đọc báo cáo cũ, không đọc git log.
      Link hai báo cáo: <!-- docs/review-...-batch-N.md -->
- [ ] **Trích dẫn đã đối chiếu** — ≥5 trích dẫn mỗi báo cáo khớp nguyên văn với nguồn
- [ ] **Kiểm đường nối** với phần sinh tự động còn lại:
  - [ ] Tuần 39 tổng duyệt vẫn đọc đúng từ của tuần 37–38 mới (bài học `typhoon`)
  - [ ] Pool nói checkpoint của phase ≥ 5 item (`verify:content` GATE 4)
  - [ ] `reviewWords` của tuần mới resolve hết (`qa:full` T4)
  - [ ] Không bộ phận nào trùng headword với tuần mới quá hạn mức
- [ ] Điểm của cả hai auditor ≥ 7 cho batch này, hoặc ghi rõ lý do vẫn merge

## Không được

- [ ] Không sửa lịch sử git đã publish (repo Lovable-originated)
- [ ] Không commit `.env` hay bất kỳ secret nào
