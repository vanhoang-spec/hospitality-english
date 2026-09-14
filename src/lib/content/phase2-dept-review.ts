import { sp } from "./phase0";
import type { SpeakingItem } from "./week-content";

/**
 * Review turns the shared frames cannot reach.
 *
 * Four weeks of Phase 2 are hand-authored — FB-15, HK-15, FO-17, SW-19 — and
 * two more are department lessons. Their headwords exist in no shared bank, so
 * every "Ôn tuần N" slot in the spine, which reads a bank group by index, is
 * blind to them. Fifty-six of the phase's orphaned headwords sit in those
 * weeks alone: a Front Office learner met "pre-authorisation", "incidental
 * charges" and "declined" once, in week 17, and never said any of them again —
 * while week 22 listed all three under reviewWords. Recognition was never the
 * gap. Production was.
 *
 * These are plain sentences rather than frames because the words they carry
 * are plain: they belong to one department and fill no bank slot the spine
 * could substitute into.
 */
export const DEPT_REVIEW: Record<string, SpeakingItem[]> = {
  // Same-week turns. A department lesson or a bank slot the shared frames
  // never speak left these cards taught and silent in the very week that
  // teaches them; each turn below is the first time the word is said.
  "FB-17": [
    sp(
      "No ice in my drink, please.",
      "Of course, madam. I will note your ice preference for the bar.",
      "Ghi ice preference cho quầy bar — nhắc lại yêu cầu để khách yên tâm.",
    ),
  ],
  "HK-17": [
    sp(
      "The guest left a note on the desk.",
      "Thank you. I will read the room note before I clean.",
      "Room note là lời khách để lại — đọc trước khi dọn, không vứt đi.",
      "colleague",
    ),
  ],
  "SW-17": [
    sp(
      "I take tablets for my blood pressure.",
      "Thank you, madam. May I add that to your medicine list?",
      "Thuốc khách đang dùng phải vào medicine list trước khi làm liệu trình.",
    ),
  ],
  "GR-17": [
    sp(
      "My two children will join the tour.",
      "Wonderful, sir. May I note the children's ages for the guide?",
      "Hỏi tuổi trẻ em để hướng dẫn viên chuẩn bị — xin phép bằng May I.",
    ),
  ],
  "BO-17": [
    sp(
      "Please set the tables in rows for our meeting.",
      "Noted, sir. I will put that in the room layout.",
      "Ghi yêu cầu bố trí vào room layout rồi mới xác nhận lại.",
    ),
  ],
  "FO-18": [
    sp(
      "Can I pay in dollars?",
      "Of course, sir. Which currency would you prefer?",
      "Hỏi loại tiền bằng Which + currency, không tự quyết thay khách.",
    ),
  ],
  "SW-18": [
    sp(
      "Can I pay by card or cash?",
      "Both are fine, madam. Which payment type would you prefer?",
      "Nói cả hai đều được, rồi để khách chọn bằng Which … would you prefer.",
    ),
  ],
  "GR-18": [
    sp(
      "How do I pay for the car?",
      "Which billing option would you prefer, sir — room bill or card?",
      "Nêu luôn hai lựa chọn sau câu hỏi Which để khách khỏi phải đoán.",
    ),
    sp(
      "Do I still get lounge access?",
      "Yes, madam. The club benefit is on file.",
      "On file là đã có trong hồ sơ — trả lời chắc chắn vì mình đã kiểm.",
    ),
  ],
  "BO-18": [
    sp(
      "Can we pay by bank transfer?",
      "Yes, sir. Which transfer option would you prefer?",
      "Xác nhận được, rồi hỏi hình thức chuyển khoản bằng Which.",
    ),
    sp(
      "When do we need to pay?",
      "The payment term is thirty days, sir. It is on file.",
      "Nêu con số của payment term trước, rồi mới nói đã lưu hồ sơ.",
    ),
  ],
  "HK-19": [
    sp(
      "The corridor is still wet. What do I do?",
      "Put the wet floor sign out first, then finish the floor.",
      "Đặt wet floor sign trước khi làm tiếp — an toàn của khách đi trước tốc độ.",
      "colleague",
    ),
  ],
  "FB-18": [
    sp(
      "Whose name goes on the invoice?",
      "The billing name is on file, madam. May I read it back?",
      "Billing name đã có trong hồ sơ — đọc lại cho khách xác nhận trước khi in.",
    ),
    sp(
      "When does this expire?",
      "Your breakfast voucher is valid until ten, madam.",
      "Ôn tuần 15: nêu hạn dùng bằng valid until + giờ.",
    ),
    sp(
      "Do you need my room number?",
      "May I verify your room number, please?",
      "Ôn tuần 15: verify là kiểm tra đối chiếu, không phải hỏi lại.",
    ),
    sp(
      "Where is the hot food?",
      "The live station serves hot dishes, sir.",
      "Ôn tuần 15: gọi tên quầy rồi mới nói nó phục vụ gì.",
    ),
    sp(
      "Where is the bread, please?",
      "Please follow me to the bakery corner.",
      "Ôn tuần 15: dẫn tận nơi bằng Please follow me.",
    ),
    sp(
      "We have finished.",
      "May I clear your empty plate, madam?",
      "Ôn tuần 15: xin phép dọn bằng May I clear.",
    ),
    sp(
      "The food was lovely.",
      "I hope you are satisfied with breakfast.",
      "Ôn tuần 15: satisfied là hài lòng, đi với be.",
    ),
  ],
  "FB-20": [
    sp(
      "Is it busy right now?",
      "The queue is short at this entrance, sir.",
      "Ôn tuần 15: queue là hàng người đang chờ.",
    ),
    sp(
      "When is it busiest?",
      "Peak hours are between seven and nine.",
      "Ôn tuần 15: peak hours là danh từ số nhiều, đi với are.",
    ),
    sp(
      "Where do I get juice?",
      "I will escort you to the juice area.",
      "Ôn tuần 15: escort trang trọng hơn take.",
    ),
    sp(
      "Do I need to pay?",
      "Are you an in-house guest, madam?",
      "Ôn tuần 15: in-house guest là khách đang lưu trú.",
    ),
    sp(
      "Thank you very much.",
      "You are welcome, sir. Is everything to your liking?",
      "Ôn tuần 15: to your liking — hỏi độ vừa ý thay cho lời chúc chung.",
    ),
  ],
  "HK-18": [
    sp(
      "Can I put the new guest in 1408?",
      "No. The system shows room blocked tonight.",
      "Room blocked là phòng khoá, không nhận khách — kiểm hệ thống trước khi xếp.",
      "colleague",
    ),
    sp(
      "How do you enter a room?",
      "I will knock twice and announce housekeeping.",
      "Ôn tuần 15: hai việc cùng một chủ ngữ, nối bằng and.",
    ),
    sp(
      "Someone is inside.",
      "The room is occupied, so I will return later.",
      "Ôn tuần 15: occupied là đang có người; nối kết quả bằng so.",
    ),
    sp(
      "Could I have more towels?",
      "I will bring a bath towel and a razor.",
      "Ôn tuần 15: mạo từ a đứng trước từng danh từ đếm được.",
    ),
    sp(
      "Do I pay for these?",
      "The amenities are complimentary, madam.",
      "Ôn tuần 15: complimentary trang trọng hơn free.",
    ),
    sp(
      "My nephew arrives tonight.",
      "We can add a rollaway bed for one night.",
      "Ôn tuần 15: rollaway bed là giường phụ gấp được.",
    ),
  ],
  "HK-20": [
    sp(
      "My charger does not fit.",
      "Would you like an adapter or an iron, sir?",
      "Ôn tuần 15: mạo từ an đứng trước âm nguyên âm.",
    ),
    sp(
      "Is that included?",
      "There is an extra charge for that, madam.",
      "Ôn tuần 15: There is đi với danh từ số ít.",
    ),
    sp(
      "Why did you not clean?",
      "The Do Not Disturb sign was on the door.",
      "Ôn tuần 15: nêu dữ kiện, không trách khách.",
    ),
    sp(
      "Will you check back?",
      "I will make a courtesy call before six.",
      "Ôn tuần 15: courtesy call là cuộc gọi hỏi thăm.",
    ),
    sp(
      "I did not hear anything.",
      "I left a voicemail and a slip under the door.",
      "Ôn tuần 15: hai cách để lại tin nhắn, nối bằng and.",
    ),
  ],
  "FO-19": [
    sp(
      "I booked online last week.",
      "May I have your booking reference, please?",
      "Ôn tuần 17: booking reference là mã đặt phòng.",
    ),
    sp(
      "Good evening.",
      "Do you have a reservation with us, sir?",
      "Ôn tuần 17: câu hỏi Do + chủ ngữ + động từ gốc.",
    ),
    sp(
      "Why do you need my passport?",
      "Local registration is mandatory for all guests.",
      "Ôn tuần 17: mandatory là bắt buộc theo quy định.",
    ),
    sp(
      "Will you keep it long?",
      "We keep it briefly, sir — about two minutes.",
      "Ôn tuần 17: briefly là trạng từ, đứng ngay sau động từ.",
    ),
    sp(
      "How do I get in?",
      "Here is your room key, sir.",
      "Ôn tuần 17: trao đồ bằng Here is + danh từ.",
    ),
  ],
  "FO-21": [
    sp(
      "What is this hold for?",
      "We require a credit card pre-authorisation, madam.",
      "Ôn tuần 17: pre-authorisation là khoản tạm giữ trên thẻ.",
    ),
    sp(
      "Why do you take that?",
      "The deposit covers any incidental charges.",
      "Ôn tuần 17: chủ ngữ số ít the deposit đi với covers.",
    ),
    sp(
      "When do I get it back?",
      "The refund appears after check-out, sir.",
      "Ôn tuần 17: refund là khoản hoàn lại.",
    ),
    sp(
      "The payment did not work.",
      "The card was declined, so I tried again.",
      "Ôn tuần 17: bị động was declined, rồi nối kết quả bằng so.",
    ),
    sp(
      "Which way to my room?",
      "The elevator is behind you, madam.",
      "Ôn tuần 17: chỉ chỗ bằng behind you.",
    ),
    sp(
      "What time is breakfast?",
      "The breakfast buffet closes at ten, sir.",
      "Ôn tuần 17: chủ ngữ số ít đi với closes.",
    ),
  ],
  "SW-21": [
    sp(
      "Where are the towels?",
      "Fresh towels are at the towel station, madam.",
      "Ôn tuần 19: danh từ số nhiều đi với are.",
    ),
    sp(
      "How do I open this?",
      "Your key card opens the locker and the cabana.",
      "Ôn tuần 19: chủ ngữ số ít your key card đi với opens.",
    ),
    sp(
      "Can I swim in this?",
      "Proper swimwear is required in the pool, sir.",
      "Ôn tuần 19: bị động is required dùng để nêu quy định.",
    ),
    sp(
      "My son wants to swim.",
      "The lifeguard will supervise the children.",
      "Ôn tuần 19: supervise là trông chừng, giám sát.",
    ),
    sp(
      "Why is the total higher than the price list?",
      "A service charge of ten percent is added, madam.",
      "Ôn tuần 18: service charge là phí phục vụ cộng vào hoá đơn, không phải tiền tip.",
    ),
    sp(
      "What do I do first?",
      "Please fill in the form and confirm your payment type.",
      "Ôn tuần 18: hai câu mệnh lệnh nối bằng and.",
    ),
  ],
  "SW-22": [
    sp(
      "Why is that flag up?",
      "The red flag is a warning about rough sea.",
      "Ôn tuần 19: red flag là cờ báo nguy hiểm.",
    ),
    sp(
      "The water looks calm.",
      "The current is strong today, madam.",
      "Ôn tuần 19: current ở đây là dòng chảy, không phải hiện tại.",
    ),
    sp(
      "My leg hurts in the water.",
      "If you feel a cramp, please signal us.",
      "Ôn tuần 19: câu điều kiện If + hiện tại đơn.",
    ),
    sp(
      "It is very hot today.",
      "Heat exhaustion is a risk, so please rest in the shade.",
      "Ôn tuần 19: nêu rủi ro trước, rồi mới đưa lời khuyên.",
    ),
    sp(
      "I do not feel well.",
      "You look dizzy, sir. Please sit down slowly.",
      "Ôn tuần 19: dizzy là chóng mặt.",
    ),
    sp(
      "How do I reserve?",
      "You can book online or at the spa desk.",
      "Ôn tuần 18: hai lựa chọn nối bằng or.",
    ),
    sp(
      "Is my appointment sure?",
      "Yes, madam. Your booking is confirmed.",
      "Ôn tuần 18: confirmed là đã xác nhận chắc chắn.",
    ),
    sp(
      "What do I wear?",
      "Here is your treatment robe and towel cover.",
      "Ôn tuần 18: trao hai thứ cùng lúc, nối bằng and.",
    ),
  ],
  "HK-21": [
    sp(
      "Is there anything to sign?",
      "Please sign the sheet before you leave, madam.",
      "Ôn tuần 18: mệnh lệnh lịch sự trước, mốc thời gian sau.",
    ),
    sp(
      "The tap is broken.",
      "I sent a maintenance request this morning.",
      "Ôn tuần 18: quá khứ đơn sent, mốc thời gian đặt cuối câu.",
    ),
    sp(
      "Can I move in today?",
      "The system shows room blocked, because the tap is leaking.",
      "Ôn tuần 18: nêu kết quả rồi nối nguyên nhân bằng because.",
    ),
    sp(
      "I left my watch here.",
      "I will log the item as lost property.",
      "Ôn tuần 18: log the item là ghi vào sổ.",
    ),
  ],
  "GR-21": [
    sp(
      "What time is the car?",
      "May I confirm your pick-up time, madam?",
      "Ôn tuần 18: pick-up time là giờ đón khách.",
    ),
    sp(
      "Who is driving me?",
      "The driver's name is Mr Hung, sir.",
      "Ôn tuần 18: sở hữu cách driver's — dấu nháy rồi s.",
    ),
    sp(
      "How long will it take?",
      "The journey time is about forty minutes.",
      "Ôn tuần 18: about đứng trước con số nghĩa là khoảng.",
    ),
    sp(
      "Is there a charge?",
      "There is an arrangement fee for that, madam.",
      "Ôn tuần 18: There is đi với danh từ số ít.",
    ),
    sp(
      "Is everything correct?",
      "Let me check the details once more.",
      "Ôn tuần 18: Let me + động từ gốc để xin phép làm việc gì.",
    ),
  ],
  // The eight keys below came out of one measurement: 34 headwords taught in
  // weeks 15-21 were never produced again in any later week, concentrated in
  // exactly the weeks the spine's index-driven review slots cannot see. Each
  // turn is asked to earn its place twice — put a dead headword back in the
  // mouth, or close a scenario three independent reviews named as absent
  // (wet floor, missing property, an allergy answered honestly, security,
  // a guest who is angry and a desk that says so out loud).
  "FO-20": [
    sp(
      "Is my room ready? We landed early.",
      "I am sorry, sir. I checked, and the room is ready at two. Please have a welcome drink in the lounge.",
      "Ôn tuần 16: khách đến sớm — xin lỗi, nêu giờ đã kiểm tra, mời welcome drink trong lúc chờ.",
    ),
    sp(
      "Can I get a room away from the lift?",
      "Of course, madam. A higher floor is quiet — the choice is yours.",
      "Ôn tuần 16: higher floor — gợi ý một phương án rồi trao quyền chọn.",
    ),
    sp(
      "Can someone show me the way?",
      "Certainly, madam. I will escort you upstairs myself.",
      "Ôn tuần 15: escort you upstairs — tự dẫn khách đi, không chỉ tay.",
    ),
    sp(
      "Anything for the next shift?",
      "Two notes in the handover, and one checklist item is still open.",
      "Ôn tuần 15: handover và checklist item — bàn giao ca bằng con số.",
      "colleague",
    ),
  ],
  "FO-22": [
    sp(
      "Does the room rate include everything?",
      "Yes, madam. All taxes are included, and the airport pick up is optional.",
      "Ôn tuần 16: all taxes, airport pick up, optional — ba ý giá cả trong một câu.",
    ),
    sp(
      "Why is the bill higher than the room rate?",
      "The service charge is on its own line, sir. May I show you?",
      "Ôn tuần 18: service charge nằm riêng một dòng trên hoá đơn.",
    ),
    sp(
      "My company will pay for this stay.",
      "Certainly, sir. I will note the company name. You can settle the bill at check-out.",
      "Ôn tuần 18: company name cho hoá đơn; settle the bill là thanh toán xong.",
    ),
    sp(
      "You are useless! I will stand here until you give me that key!",
      "I am sorry you feel that way, sir. My manager and our security team will help us now.",
      "Khách gây gổ: không tự xử lý — gọi manager và security, giữ lời xin lỗi ngắn.",
    ),
  ],
  "FB-21": [
    sp(
      "We are ready to order now.",
      "Certainly, madam. May I take your order?",
      "Câu mở màn gọi món chuẩn — May I take your order?",
    ),
    sp(
      "Is the green curry safe for my nut allergy?",
      "I checked with the chef, madam. It has no nuts, but our kitchen does handle nuts.",
      "Trả lời dị ứng: nói điều đã kiểm tra và nêu rủi ro thật — không hứa an toàn tuyệt đối.",
    ),
    sp(
      "Medium, please, and nothing too spicy.",
      "Noted, sir. I will tell the kitchen your cooking level and meat preference.",
      "Ôn tuần 17: cooking level và meat preference — nhắc lại để bếp làm đúng.",
    ),
    sp(
      "What drink goes well with this dish?",
      "For your drink choice, may I suggest the fresh mango juice, madam?",
      "Ôn tuần 17: drink choice — gợi ý một món cụ thể, không hỏi lại chung chung.",
    ),
  ],
  "FB-22": [
    sp(
      "Does this dish have pork? We eat halal.",
      "Let me check with the kitchen about halal options, sir. Many dishes can be cooked without pork.",
      "Hỏi halal hay pork: kiểm với bếp, nêu phương án — không tự đoán thành phần.",
    ),
    sp(
      "Another bottle of wine, and be quick about it!",
      "Of course, sir. May I bring some water and a small snack as well?",
      "Khách uống nhiều: không từ chối thẳng — chậm nhịp bằng nước và đồ ăn nhẹ.",
    ),
    sp(
      "There is a mark on this glass.",
      "I am very sorry, madam. I will take it back and bring another one.",
      "Ôn tuần 19: take it back và bring another one — nhận lỗi rồi đổi ngay.",
    ),
    sp(
      "Can I pay for everything later tonight?",
      "Yes, sir. Your bill is on hold until the last order.",
      "Ôn tuần 18: on hold — hoá đơn gộp lại, chốt ở món cuối.",
    ),
    sp(
      "Can I get a red invoice for my company?",
      "Certainly, sir. May I have your billing name, please?",
      "Ôn tuần 18: billing name — tên xuất hoá đơn, hỏi trước khi in.",
    ),
  ],
  "HK-22": [
    sp(
      "Can I walk through here?",
      "Please be careful, madam — the floor is wet. Mind your step.",
      "Cảnh báo sàn ướt: nói ngay khi thấy khách, kèm hành động mind your step.",
    ),
    sp(
      "You can move my things when you clean.",
      "Thank you, madam, but we do not move guest belongings. I will clean around them.",
      "Không đụng đồ của khách — kể cả khi được phép; nói rõ mình sẽ làm gì thay thế.",
    ),
    sp(
      "My watch is not in my room!",
      "I am very sorry, sir. I will call my supervisor now, and we will check together.",
      "Khách báo mất đồ: xin lỗi, gọi supervisor ngay — không tự kết luận, không tự tìm một mình.",
    ),
    sp(
      "When does my laundry come back?",
      "Before six, madam. The laundry count is on your valet ticket.",
      "Ôn tuần 17 và 18: laundry count ghi trên valet ticket — trả lời giờ trước, giấy tờ sau.",
    ),
    sp(
      "The guest in 512 wants no ice in the bucket.",
      "I will write it in the service note now.",
      "Ôn tuần 17: service note — dặn dò của khách phải vào sổ, không nhớ miệng.",
      "colleague",
    ),
    sp(
      "How do I know what each guest wants?",
      "Read the guest instruction first, then the cleaning note for each room.",
      "Ôn tuần 17: guest instruction và cleaning note — đọc trước khi vào phòng.",
      "colleague",
    ),
    sp(
      "This room was not cleaned properly at all!",
      "I am very sorry, madam. I will clean it again now, and my supervisor will check it.",
      "Khách chê chất lượng: xin lỗi, làm lại ngay, cấp trên kiểm tra — đủ ba bước.",
    ),
    sp(
      "Do I have to change the towels every day?",
      "Not at all, madam. Towel reuse or fresh towels — the choice is yours.",
      "Ôn tuần 20: towel reuse — trao quyền chọn cho khách.",
    ),
  ],
  "SW-20": [
    sp(
      "Which therapist will I have tomorrow?",
      "Your therapist choice is on the booking sheet, madam.",
      "Ôn tuần 17 và 18: therapist choice ghi trên booking sheet.",
    ),
    sp(
      "Is room three ready for Mrs Lan?",
      "Yes. The preparation is complete, and her health form is accurate.",
      "Ôn tuần 15 và 17: preparation xong, health form phải accurate — kiểm cả hai trước khi mời khách vào.",
      "colleague",
    ),
    sp(
      "I am ready to start.",
      "Please lie face down first, madam. I will adjust the towel to keep you covered.",
      "Ngôn ngữ trong liệu trình: lie face down, adjust the towel — khách luôn được che.",
    ),
    sp(
      "Should I move now?",
      "Yes, madam. Please turn over slowly — take your time.",
      "Ngôn ngữ trong liệu trình: turn over — hướng dẫn chậm, từng bước một.",
    ),
  ],
  "GR-20": [
    sp(
      "Can my children join the kids club?",
      "Of course, madam. May I note the children's ages for the kids club?",
      "Ôn tuần 17: children's ages — hỏi tuổi để xếp nhóm, ghi vào hồ sơ.",
    ),
    sp(
      "The pillows are too soft for me.",
      "I understand, sir. I will note your pillow type and send a firmer one up.",
      "Ôn tuần 17: pillow type — đồng cảm trước, hành động ngay sau.",
    ),
    sp(
      "What comes next for the guests in 1802?",
      "The next service stage is the welcome tea.",
      "Ôn tuần 15: service stage — từ nội bộ, nói với đồng nghiệp, không nói với khách.",
      "colleague",
    ),
    sp(
      "Well? Did you find my booking?",
      "Thank you for waiting, sir. Yes — your booking is confirmed.",
      "Thank you for waiting — câu mở lại hội thoại sau khi khách phải chờ.",
    ),
  ],
  "GR-22": [
    sp(
      "Can my friend stay in my room tonight?",
      "The room policy asks us to register every guest, sir. Could I see their travel documents?",
      "Ôn tuần 19: room policy và travel documents — đăng ký khách là bắt buộc.",
    ),
    sp(
      "I have waited twenty minutes for my car!",
      "I do apologise, madam. Let me look into this personally right now.",
      "Khách giận: I do apologise + Let me look into this personally — nhận việc về mình.",
    ),
    sp(
      "I am a Diamond member. I should not have to queue.",
      "You are right to expect more, sir. Please come with me — I will handle it myself.",
      "Khách hạng cao đòi hỏi: công nhận kỳ vọng, tự xử lý, không phân bua.",
    ),
    sp(
      "Which seat should I take in the lounge?",
      "Window or garden, madam — the choice is yours.",
      "Ôn tuần 20: trao quyền chọn bằng the choice is yours.",
    ),
  ],
};
