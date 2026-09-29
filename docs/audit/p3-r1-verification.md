# P3 vòng 1 — sổ đối chiếu của implementer

Ngày đo: 29/09/2026. Nguồn auditor đóng băng: `ac24e13`.

File này không phải báo cáo auditor và không được đưa vào nguồn của auditor. Nó chỉ ghi các
phát hiện đã được implementer tái lập bằng `getWeekContent` và các hàm production trước khi
sửa. Các thư mục nguồn riêng của auditor đều có 0 file lệch hash so với manifest.

## Báo cáo hợp lệ hiện có

| Ô     | Sáu điểm                          | Mean tính lại | Kết quả   |
| ----- | --------------------------------- | ------------: | --------- |
| AC-HK | 7,0 · 6,8 · 5,5 · 6,0 · 5,8 · 6,6 |        6,2833 | Không đạt |
| HM-HK | 4,5 · 2,5 · 5,0 · 7,0 · 4,0 · 3,0 |        4,3333 | Không đạt |
| AC-FO | 6,8 · 6,4 · 5,6 · 6,0 · 5,8 · 5,0 |        5,9333 | Không đạt |
| AC-FB | 6,8 · 6,3 · 5,5 · 6,4 · 8,2 · 5,8 |        6,5000 | Không đạt |
| AC-SW | 5,5 · 5,4 · 4,2 · 5,6 · 7,8 · 4,0 |        5,4167 | Không đạt |
| AC-GR | 6,4 · 5,9 · 5,6 · 6,1 · 7,6 · 4,8 |        6,0667 | Không đạt |

Bốn ô khác chưa có báo cáo hợp lệ; không suy điểm từ lần chạy lỗi.

HM-FO đã có một lượt đọc/đo nhưng bị dừng vì hạn mức trước final; không có `report.md`, exit
code 1 và nguồn không đổi. Toàn bộ nháp của lượt đó bị loại, không dùng để chấm hay gợi ý cho
phiên chạy lại.

## Luồng Academic Director đã đủ 5/5

Mean theo bộ phận: FO 5,9333 · FB 6,5000 · HK 6,2833 · SW 5,4167 · GR 6,0667.
Trung bình mô tả của cả luồng là **6,0400**, chỉ để nhìn xu hướng; không dùng bù điểm giữa
các ô.

Mean từng tiêu chí qua năm bộ phận:

| Tiêu chí                  | Mean |
| ------------------------- | ---: |
| t1 tiến trình & độ khó    | 6,50 |
| t2 can-do & tính sản sinh | 6,16 |
| t3 chất lượng ngôn ngữ    | 5,28 |
| t4 thiết kế luyện tập     | 6,02 |
| t5 ôn tập & ghi nhớ       | 7,04 |
| t6 giá trị bài sát hạch   | 5,24 |

Hai điểm yếu nhất của cả luồng là t6 và t3. Năm báo cáo độc lập cùng tái hiện các hình dạng
đã đo ở phần dưới: hội thoại nhiều lượt quá mỏng, ghép khung–ngân hàng sai ngữ cảnh, vai
người nghe tuần 29 sai, và ô oral reserved không đo đúng construct hoặc vắng hẳn.

## Các trích dẫn HK đã xác nhận

- `HK_28_4`: prompt “I want a full refund, nothing less.” nhưng target là “I cannot clean
  while you are out myself. My manager can review that for you.”
- `HK_23_2`: “The blackout curtains costs a little more.”
- `HK_26_3`: “I passed the note to the pest control team and the linen store keeper
  confirmed it.”
- `HK_26_4`: speaking/game dùng “The duty manager finished, and I checked before calling
  you.”
- `HK_29_4`: mọi việc trong ngày được nói là đã ghi vào “lost item log”.
- `HK_26_1`: lời giải reading in nguyên template
  `'${cap(lx.pron.subj)} makes the call ${lx.pron.refl}'`.
- `HK_28_1` và `HK_30_3`: helpTip cắt `re-clean` thành “can re”.

## Ô oral bắt buộc

`buildOral("HK", "30")` tạo item reserved:

- prompt: “How long will that take?”
- target: “Just a moment. This part belongs to the front desk.”
- alternate: “I will service your room within ten minutes, madam.”

Gọi `utterancePassedAny` bằng alternate trên trả `passed: true`; đưa kết quả đó vào chính
paper vừa dựng làm `oralHalfPassed` trả `true`. Vì vậy ô reserved tồn tại về kỹ thuật nhưng
alternate làm mất construct chuyển thẩm quyền.

## Hình dạng trên cả năm bộ phận phát hành

Đo trên tuần 23–30:

| Bộ phận | Speaking | Có `follows` | Mặc định `guest` | Target >16 từ | Từ P3 chỉ ôn lại ở tuần 30 |
| ------- | -------: | -----------: | ---------------: | ------------: | -------------------------: |
| FO      |       45 |            2 |               45 |             5 |             78/107 (72,9%) |
| FB      |       47 |            2 |               47 |             2 |             75/106 (70,8%) |
| HK      |       47 |            2 |               47 |             4 |             76/106 (71,7%) |
| SW      |       45 |            2 |               45 |             6 |             77/107 (72,0%) |
| GR      |       45 |            1 |               45 |             4 |             76/107 (71,0%) |

Như vậy các vấn đề sau là hình dạng chung, không riêng HK:

- chỉ 9/229 lượt speaking có `follows`;
- 229/229 lượt mang vai mặc định `guest`, gồm 35 lượt tuần 29 rõ ràng là bàn giao/báo cáo
  nội bộ;
- 0/160 game có explanation được tác giả viết;
- 0/325 grammar item có `nearMiss`;
- 21 target vượt trần spec 16 từ;
- khoảng 71–73% headword P3 không có retrieval trung gian trước checkpoint.

`bun run verify:content` vẫn xanh vì các số trên đang nằm ngoài cổng hoặc dưới ratchet cũ;
CI xanh không phủ nhận các phát hiện chất lượng này.

## Công cụ đối chiếu

`scripts/probes/six1.ts lesson` trước đây chỉ quét tuần 15–22 dù hướng dẫn nói dùng cho mọi
lesson. Đã mở phạm vi đọc lên tuần 1–40 để các cụm P3/P4 render đúng bằng cùng probe.
