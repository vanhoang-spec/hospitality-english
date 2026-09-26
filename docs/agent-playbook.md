# Playbook cho agent — những bài học đã trả giá

Mỗi mục dưới đây là **một lỗi đã xảy ra thật** trong repo này, thường nhiều lần. Đọc trước khi
sửa nội dung, bộ chấm, hay bài thi. Cấu trúc mỗi mục: chuyện gì đã xảy ra · vì sao · làm gì.

---

## 1. Một hiện vật là một CỤM, không phải một trường

**Đã xảy ra:** bốn vòng chấm liền, lỗi nặng nhất không phải nội dung sai mà là sửa một nửa.

- Đổi câu mẫu mà không đọc tip đứng cạnh → tip dạy ngược câu học viên đang luyện.
- Viết lại câu hỏi mà không đọc lại câu đáp → câu hỏi WH được trả lời bằng `Yes`.
- Sửa lượt 2 mà quên `follows` của lượt 3 → chuỗi hội thoại đứt, 62,6% → 0,0%.
- Đổi `word` của ô ngân hàng mà giữ `phonetic` và `definition` → **38 thẻ ship với phiên âm của
  từ CŨ** (thẻ `Garden seat` đọc là /ˈɜːli ɔː leɪt/ = "early or late").
- Sửa "bốn bước" thành "tám bước" ở 6 chỗ, bỏ sót 4 chỗ → **6/10 auditor** bắt được, và 1,8%
  đề thi chứa cả hai con số.
- Đổi câu đích thành "Please help me bring him out, sir." mà không đổi `speakerRole` → khoá dạy
  nhân viên spa **nhờ chính vị khách** khiêng người bất tỉnh ra khỏi phòng xông.

**Vì sao:** mọi trường đều là chuỗi hợp lệ, nên không cổng nào thấy — chỉ người đọc to lên mới
biết.

**Làm gì:** sau mỗi lần sửa, đọc trọn cụm. Sửa hàng loạt bằng script thì diff rồi liệt kê
trường nào ĐỔI và trường nào KHÔNG. Khi một lớp lỗi dựng được cổng thì dựng — Layer N (chuỗi
`follows`), O (phiên âm khớp headword), Q (số khớp nhau trong một bài), R (vai người nghe) đều
sinh ra từ đúng mục này.

## 2. Gọi hàm thật khi đo

**Đã xảy ra:** `qa:full` và mọi script đo từng **chép lại** luật của `buildPaper`. Kết quả:
`buildPaper` ném `ReferenceError` ở **cả 30 cặp bộ phận × tuần checkpoint** suốt nhiều vòng — học
viên tới tuần 14 là đứng lại vĩnh viễn — trong khi `typecheck`, `verify:content`, `qa:full` đều
xanh.

**Vì sao:** một phép mô phỏng chỉ kiểm được thứ nó mô phỏng, và phân kỳ khỏi hàm thật ngay lần
refactor đầu tiên.

**Làm gì:** hàm nào quyết định thứ học viên nhìn thấy thì tách ra module thuần và cho cổng
**import và gọi** nó. Hai nơi cùng thực hiện một quy ước thì sớm muộn cũng lệch — cho cả hai đi
qua CÙNG một hàm.

## 3. Khung đọc ngân hàng theo CHỈ SỐ

**Đã xảy ra:** nội dung chạy bằng khung câu dùng chung + ngân hàng từ riêng theo bộ phận, và
khung đọc ngân hàng theo chỉ số. Một ô lệch lớp chỉ render sai ở vài bộ phận: _"Please leave the
tip here."_ (F&B), _"The item is rainy."_ (GR), _"Could I have your table number, please?"_ — hỏi
khách một thứ nhà hàng tự biết.

**Làm gì:** mỗi chỉ số là một hợp đồng ngữ nghĩa (vd `paperwork[8]` phải là _trạng thái đang
chạy_ của một yêu cầu). Trước khi đổi khung hay ô: `bun scripts/probes/six1.ts slot <nhóm> <i>`
để thấy cả sáu bộ phận. Đổi thẻ thì **đổi 1-đổi-1** để giữ ngân sách thẻ.

`DEPT_LESSONS` thay hẳn một bài khung cho một bộ phận, nhưng **phải giữ đúng bộ headword** của
bài nó thay. **Một tuần soạn tay thay tuần khung** thì ô ngân hàng của tuần đó không còn ai cấp
thẻ, nhưng các tuần khác vẫn đọc nó — đó là cách 46 cụm bị bắt nói mà không tuần nào dạy.

## 4. Vá theo hình dạng, không theo danh sách

**Đã xảy ra:** mọi lần bịt lỗi "hai đáp án đúng" bằng cách kể tên cặp câu đều bị mở lại ngay mẻ
nội dung kế tiếp (GR bật từ 0,00% lên 11,20% số đề). Và lần nữa: ranh giới với quầy concierge
được sửa ở 2 bài được nêu tên, sót 8 chỗ cùng hình dạng ở các tuần sau — hai thí sinh bị chấm
theo hai luật ngược nhau với tần suất gần bằng nhau.

**Làm gì:** khi ai đó báo "X và Y đều sai", đừng sửa X và Y. Hỏi _hình dạng nào khiến chúng
sai_, viết **một phép quét**, sửa hết những gì phép quét tìm ra, và dán kết quả quét vào báo cáo.
Hàng đợi giao cho người khác phải là lệnh chạy cổng, không phải danh sách dòng.

## 5. Nới lỏng bộ chấm thì phải đo lại

**Đã xảy ra:** "đã nói đủ mọi chữ của câu mẫu, đúng thứ tự, thì tha một chữ thừa" nghe hợp lý.
Nó cho **95/255 chuỗi `nearMiss` của chính khoá** đi qua — vì "câu mẫu + một chữ" chính là hình
dạng phổ biến nhất của nhiễu.

**Làm gì:** trước khi nới bất kỳ ngưỡng nào, chạy **hai** phép đo sau mỗi thay đổi: (1) các ca
cần qua PHẢI qua; (2) mọi `nearMiss`/`rude` PHẢI trượt (`bun scripts/probes/leakall.ts`) và
chín hồ sơ gian lận không xấu đi (`bun scripts/probes/cheat.ts`). **Đáp án sai do chính khoá
soạn là bộ hồi quy tốt nhất đang có.**

Chiều ngược lại cũng thế: siết để chặn rò mà làm chấm oan người trả lời đúng là **tệ hơn** rò.
Đã có 76 lượt bị đánh trượt oan vì khoá dấu lịch sự (`very`, `please`), và bản vá đầu chỉ sửa
một trong hai lớp của bộ chấm.

## 6. Đừng thu bể đề

**Đã xảy ra:** loại các ô nói "trùng ý" khỏi `buildOral`. Bể tụt từ ~240 xuống 132–149 câu, và
học thuộc 60 câu đủ qua nửa nói **57–65%** (trước đó 28–33%) — bản vá chống học vẹt biến bài thi
thành bài học vẹt.

**Làm gì:** cho các ô trùng ý **chấp nhận đáp án của nhau** (`speaking-alternates.ts`), đừng
loại chúng. Mọi lần định "bỏ bớt cho sạch", đo **kích thước bể** và **đường cong học vẹt**
(`bun scripts/probes/oralmeasure.ts 2000`) trước và sau.

## 7. Tính mức ngẫu nhiên trước khi nhận một mốc số

**Đã xảy ra:** một auditor đòi "không chiến lược nào vượt sàn khối đọc trên quá 15% số đề".
Khối đọc có 4 câu, sàn 2/4, 3 phương án: **đoán bừa đã vượt sàn 40,7%**. Không nội dung nào đưa
xuống 15% được.

**Làm gì:** tính baseline ngẫu nhiên của chính phép đo đó trước. Mốc đúng là _"không chiến lược
bề mặt nào ăn hơn mức đoán bừa"_. Mức vượt sàn do may: từ vựng 16,9% · nghe 32,0% · ngữ pháp và
đọc 40,7%.

## 8. Một bản vá lan sang phase khác

**Đã xảy ra:** một vòng lặp trên `REGISTRY` gắn ghi chú ngữ pháp vào mọi tuần 1–40, trong khi
mọi phép đo chỉ chạy trên tuần 15–22. Phase 3–4 nhận **ít nhất 23 ghi chú sai**, kể cả ở hai tuần
đã qua cổng.

**Làm gì:** mọi thay đổi ở `speaking-score.ts`, `checkpoint-*.ts`, các suite, hay bất kỳ vòng
lặp nào trên `REGISTRY` → đo cho **cả năm phase**.

## 9. Đo trên nửa tập mẫu là đo sai

**Đã xảy ra:** bản vá khoá headword được đo ra "còn rò 11,3%" và được báo là thắng. Phép đo chạy
trên **lượt khung**; lượt ôn riêng theo bộ phận — nơi mọi câu rủi ro của Buồng phòng nằm —
không hề được khoá, vì một hàm chạy SAU hàm khoá.

**Làm gì:** in các nhóm con riêng (lượt khung / lượt ôn; đường chấm luyện / đường chấm thi),
đừng in tổng. Đường chấm của bài thi từng **lỏng hơn** bài luyện (11,7% so với 3,3%) mà không ai
biết cho tới khi in hai cột.

## 10. Cổng cũng phải bị kiểm

**Đã xảy ra, trong một tuần:**

- Layer T tra thẻ theo **dạng khớp đầu tiên** thay vì **tuần sớm nhất** → thẻ `Fresh towels` ở
  tuần 16 che mất `Towel` ở tuần 2; **22/64** vi phạm là dương tính giả, gồm cả ba ca "nặng
  nhất" mà hàng đợi đã giao đi sửa.
- Layer T **bỏ qua token không có thẻ ở đâu cả** → chỉ bắt được "dạy muộn", mù với "không bao
  giờ dạy" — trường hợp tệ hơn.
- Layer S kiểm **sự có mặt** của `requiredTokens` thay vì **sức chịu đựng** → ô dự trữ vẫn qua
  khi mất `alcohol`, `ID`, `halal`, `duty`.
- `ratchetFile` **không bao giờ ghi** một gauge MỚI vào file baseline ĐÃ CÓ → cổng tự lấy số của
  lần chạy làm chốt, in "ratchet holds" mãi mãi, và không chặn gì cả.
- Một lớp kiểm chết thì luôn đếm ÍT vi phạm hơn → nó tự hạ chốt từ 4 xuống 0 trong một lần chạy.

**Làm gì:** mỗi cổng mang một hồi quy chạy **trong chính lần lint**: đầu độc bản sao nội dung
trong bộ nhớ để tái hiện đúng ca đã sửa, đòi cổng đỏ. **Kill-test từng hàm dò** (vô hiệu hoá nó,
xem hồi quy có đỏ không). Từ chối ghi baseline khi hồi quy đang đỏ. Và khi một cổng ra lệnh sửa
nội dung, **kiểm cái cổng trước khi tuân theo**.

## 11. Bàn giao hai nửa thì phải giao cả hai

**Đã xảy ra hai lần liên tiếp:** một thay đổi cần sửa ở hai file do hai người khác nhau giữ.
Người thứ nhất làm nửa của mình và ghi nửa kia vào file bàn giao. File bàn giao nằm đó, không ai
nhận. Kết quả: F&B ship câu mẫu _"Your request is on hold now."_ trong khi bốn bộ phận kia nhận
trạng thái đang chạy; và bài thi tuần 22 bắt nói `laundry count`, một thuật ngữ không còn là thẻ
ở tuần nào.

**Làm gì:** mọi mục bàn giao phải thành một việc được giao ngay, có chủ. Không để việc nằm chờ
trong file.

## 12. Thêm tình huống khó hàng loạt

**Đã xảy ra:** thêm ~60 lượt "ca khó" (khách say, halal, khách gây gổ…) để lấp danh sách thiếu.
Vòng chấm sau **tụt 7,05 → 6,20**, và các trưởng bộ phận trích đúng những câu vừa thêm làm lỗi
an toàn: hứa rượu cho khách say, treo hoá đơn cho khách chưa xác minh, "không thịt heo" thay cho
"halal".

**Làm gì:** mỗi lượt nói mới về ca khó phải qua ba câu hỏi: (1) có hứa điều người nói không có
quyền quyết không? (2) có nói trước điều chưa kiểm tra không? (3) nói đúng nguyên văn trước mặt
khách có gây sự cố không? Và khi mọi báo cáo cùng chấm "đo lường" thấp, **sửa engine trước khi
thêm nội dung.**

## 13. Độ phủ và nhịp giãn cách là hai trục khác nhau

**Đã xảy ra:** auditor đòi "giãn nhịp ôn, không thêm ô nào, chỉ đổi nguồn". Làm đúng như vậy thì
số từ mồ côi tăng 209 → 266 — các ô "+1 tuần" bị đổi đi chính là con đường duy nhất giữ từ tuần
trước còn được nói.

**Làm gì:** trước khi đổi chỗ một tài nguyên, đo cái nó **đang** làm. Giữ ô cũ và thêm ô mới.

## 14. Ngân sách thẻ và luật không trùng headword

- Trần thẻ: Phase 0 là 8–10/tuần, Phase 2 là 12–16/tuần.
- **Một headword không được dạy hai lần trong tuần 1–22** — cổng chặn cứng, vì lịch ôn khoá
  theo chính chuỗi headword. Ratchet riêng đếm trùng ở tuần 23–40.
- Muốn thêm một từ mới vào tuần đã kín thì phải **bỏ một thẻ** — và kiểm từ đó không nằm trong
  `reviewWords` của tuần nào sau này.
- Nội dung cần có mặt mà không đáng một suất thẻ thì đưa vào `rule`, `helpTip`, bài đọc hoặc
  game.

## 15. Bẫy nuốt dấu `\`

**Đã cắn ít nhất sáu lần**, lần gần nhất ngay trong phiên viết file này.

- `\b` trong chuỗi JSON là ký tự backspace, không phải ranh giới từ.
- `\s` bị nuốt khi viết JS qua `node -e '…'` → `split(/\s+/)` thành `split(/s+/)`, tách trên chữ
  "s" → "please" thành "plea", và câu trả lời đúng bị chấm sai.
- Heredoc `<<'EOF'` **không cứu được**; `sed -i` ăn `\n`.
- **Phép kiểm viết cùng cách cũng bị nuốt theo**, nên nó báo "sạch" trong khi thay thế không chạy.

**Làm gì:** sửa file bằng công cụ Edit/Write của agent, không qua shell. Nếu phải viết regex
trong script, tránh backslash (`([ ,.?!]|$)` thay cho `\b`). **Sau mọi lần vá, grep lại đúng chuỗi
vừa ghi.**

## 16. Kiểm lại phép cộng của auditor

Một báo cáo ghi tổng **7,6** trong khi sáu tiêu chí của chính nó trung bình **7,25** — khác nhau
giữa đạt và không đạt. Rubric nói tổng là trung bình cộng; lấy số tính lại.

## 17. Quy trình kiểm định

- Mỗi phase: 10 auditor mù, brief chuẩn ở [`docs/audit/brief-p2-r9.md`](audit/brief-p2-r9.md).
- **Tới lượt chấm thì chạy luôn**, không hỏi xin phép người dùng.
- Một ô chưa đạt: hỏi thẳng chính auditor đó cần sửa gì, tự sửa, cho chấm lại đúng ô đó — không
  dừng giữa chừng hỏi người dùng. Báo cáo theo mốc (bảng điểm mỗi vòng).
- **Phương sai giữa hai lần chạy cùng persona trên gần như cùng nội dung là ~1,1 điểm.** Một
  lượt cao là bằng chứng đủ; một lượt thấp thì chưa. Có phát hiện thật thì sửa trước — không cày
  lượt để kéo trung bình.
- Điểm chỉ tính trên bản đóng băng. Sửa khung là đổi nội dung cả sáu bộ phận cùng lúc.
- **Luôn đối chiếu trích dẫn của auditor về nguồn trước khi sửa.** Auditor giỏi vẫn sai.

## 18. Mẹo vặt về môi trường

- `bun run lint` chạy vài phút. Nhanh: `eslint . --rule '{"prettier/prettier":"off"}' --quiet`.
- Working tree lẫn CRLF (Windows) thì prettier báo hàng chục nghìn lỗi ma. `.gitattributes` đã ép
  `eol=lf`; nếu lại lẫn: `git rm --cached -r . && git reset --hard` khi cây sạch.
- Danh sách ignore của `eslint.config.js` phải khớp `.prettierignore` + artifact build, nếu không
  eslint sẽ lint cả bundle trong `.netlify`.
- Đổi hàng loạt file khi dev server đang chạy làm HMR nhân đôi React ("Invalid hook call"). Không
  phải hồi quy — restart server, mở tab mới.
- Muốn chứng minh một thay đổi cơ học không đụng nội dung: `bun scripts/dump-week.ts $(seq 1 40)`
  rồi so sha256 trước/sau.
