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
      "What do you need to know about my allergy?",
      "May I have your allergy details, madam? I will tell the chef.",
      "Hỏi đủ thông tin dị ứng rồi báo bếp — mình không tự trả lời món nào an toàn.",
    ),
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
      "Thank you, madam. I will note your medicine list and ask my manager.",
      "Thuốc khách đang dùng phải vào medicine list, và thuốc huyết áp thì hỏi quản lý trước khi bắt đầu.",
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
      "The bill is in Vietnamese dong, sir. May I check today's rate?",
      "Không tự nhận thu ngoại tệ: nói rõ hoá đơn tính bằng đồng, rồi đi hỏi tỷ giá.",
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
    sp(
      "I will have the steak.",
      "Certainly, sir. How would you like it cooked?",
      "Hỏi độ chín cho thịt bò: How would you like it cooked?",
    ),
    sp(
      "Just water, please.",
      "Of course, madam. Still or sparkling?",
      "Hỏi loại nước ngay, khách khỏi phải gọi lần hai.",
    ),
    sp(
      "Can we see the wine list?",
      "Certainly, sir. Here is our wine list.",
      "Đưa danh sách rượu kèm một câu ngắn, không bình luận giá.",
    ),
  ],
  "HK-18": [
    sp(
      "Can I put the new guest in 1408?",
      "No. 1408 is a blocked room tonight.",
      "Blocked room là phòng khoá, không nhận khách — kiểm hệ thống trước khi xếp.",
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
      "Could I have a towel and a razor?",
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
      "I will ask the front desk about a rollaway bed.",
      "Ôn tuần 15: rollaway bed là giường phụ; thêm người ngủ lại là việc của lễ tân.",
    ),
  ],
  "HK-20": [
    sp(
      "What can I borrow from housekeeping?",
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
      "I left a voicemail and a note under the door.",
      "Ôn tuần 15: hai cách để lại tin nhắn, nối bằng and.",
    ),
    sp(
      "Can you come back later?",
      "Of course, madam. What time would suit you?",
      "Hỏi giờ khách muốn, không tự chọn giờ thay khách.",
    ),
    sp(
      "When will you come back?",
      "I will come back in thirty minutes, madam.",
      "Hẹn giờ quay lại bằng một con số cụ thể.",
    ),
    sp(
      "Please do not clean today.",
      "Certainly, sir. Would you like some fresh towels?",
      "Khách không cần dọn: vẫn hỏi có muốn thay khăn không.",
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
      "The hold is released at check-out, sir. Your bank shows the refund later.",
      "Ôn tuần 17: khách sạn giải phóng khoản giữ khi trả phòng; ngân hàng mới quyết bao giờ tiền hiện lại.",
    ),
    sp(
      "The payment did not work.",
      "It did not go through, madam. May I try the other terminal?",
      "Ôn tuần 17: không nói thẻ bị từ chối trước mặt khách — dùng did not go through rồi đề nghị máy khác.",
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
    sp(
      "Can I check out at two?",
      "Let me check with my manager, madam. I will call your room.",
      "Trả phòng muộn cần quản lý duyệt — hẹn gọi lại, không tự hứa.",
    ),
    sp(
      "Could you wake me at six?",
      "Certainly, sir. I will book a wake-up call for six.",
      "Ôn tuần 9: wake-up call, nhắc lại giờ để khách yên tâm.",
    ),
    sp(
      "Can I speak to the spa, please?",
      "Please hold on, madam. I will transfer the call.",
      "Ôn tuần 12: hold on rồi transfer the call — báo trước khi chuyển máy.",
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
      "Please supervise your son in the water, madam.",
      "Ôn tuần 19: trẻ em xuống nước phải có người lớn trông — cứu hộ không trông trẻ thay cha mẹ.",
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
    sp(
      "Can I pay later?",
      "Would you like to charge it to your room, madam?",
      "Charge it to your room — lựa chọn cho khách đang lưu trú.",
    ),
    sp(
      "Please start.",
      "Of course. Is the pressure all right for you, madam?",
      "Hỏi lực ngay khi bắt đầu, không đợi khách than.",
    ),
    sp(
      "Is it finished?",
      "Yes, madam. Please take your time getting up and drink some water.",
      "Sau liệu trình: dặn đứng dậy từ từ và uống nước.",
    ),
  ],
  "SW-22": [
    sp(
      "Why is that flag up?",
      "The red flag is a warning about the rough sea.",
      "Ôn tuần 19: red flag là cờ báo nguy hiểm.",
    ),
    sp(
      "The water looks calm.",
      "The current is strong today, madam.",
      "Ôn tuần 19: current ở đây là dòng chảy, không phải hiện tại.",
    ),
    sp(
      "What should I do if I get a cramp?",
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
      "Do you feel dizzy, sir? Please sit down slowly.",
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
      "Here are your treatment robe and towel cover.",
      "Ôn tuần 18: trao hai thứ cùng lúc, nối bằng and.",
    ),
    sp(
      "I want my money back!",
      "I am very sorry, madam. I cannot approve a refund, but I will ask my manager now.",
      "Đòi hoàn tiền: xin lỗi, nói rõ mình không quyết, gọi quản lý ngay.",
    ),
    sp(
      "My skin is burning!",
      "I will stop now, madam, and call the nurse.",
      "Phản ứng giữa liệu trình: dừng tay trước, gọi y tá sau.",
    ),
    sp(
      "I had a few beers. Can I use the sauna now?",
      "I'm afraid not after drinking, sir. It is for your safety.",
      "Khách đã uống rượu: không cho vào phòng xông — nói lý do an toàn.",
    ),
    sp(
      "Someone has fainted in the steam room!",
      "Please stay here, sir. I am calling the nurse now.",
      "Khách ngất: không tự di chuyển khách, gọi y tá ngay và ở lại hiện trường.",
    ),
    sp(
      "A guest is struggling in the deep end.",
      "Call the lifeguard now. I am going to the pool.",
      "Báo cứu hộ bằng một câu mệnh lệnh ngắn, rồi chạy tới hồ.",
      "colleague",
    ),
    sp(
      "The flag is red but I will swim anyway.",
      "I am sorry, madam. The red flag means no swimming.",
      "Cờ đỏ là quy định an toàn, không phải lời khuyên — nói rõ và giữ nguyên.",
    ),
    sp(
      "My back hurts after yesterday.",
      "I am very sorry, sir. I will call my manager now.",
      "Khách nói bị đau sau liệu trình: không bàn nguyên nhân, báo quản lý để lập biên bản.",
    ),
    sp(
      "Do you need to know anything first?",
      "Do you have any allergies or injuries, madam?",
      "Hỏi thẳng dị ứng và chấn thương trước mỗi liệu trình, không chờ khách tự nói.",
    ),
    sp(
      "This room feels cold.",
      "I will warm the room now, madam.",
      "Nhiệt độ phòng là thứ khách ngại nói ra — sửa ngay khi nghe.",
    ),
    sp(
      "Where do I put my ring?",
      "Please keep your jewellery in your locker, madam.",
      "Trang sức luôn vào tủ khoá, đừng để trên bàn trị liệu.",
    ),
    sp(
      "Where is the treatment room?",
      "Please follow me to the treatment room, madam.",
      "Dẫn khách đi, không chỉ tay — đó là khác biệt của spa năm sao.",
    ),
    sp(
      "I am ready to leave now.",
      "How was your treatment today, madam?",
      "Hỏi cảm nhận trước khi khách rời đi, lúc còn sửa được.",
    ),
    sp(
      "Do I need to sign anything?",
      "Please sign the consent form first, madam.",
      "Ôn tuần 18: consent form ký trước khi bắt đầu, không ký sau.",
    ),
    sp(
      "Which oil should I take?",
      "Either one, madam. The choice is yours.",
      "Ôn tuần 20: khen cả hai rồi trả quyền chọn cho khách.",
    ),
    sp(
      "Can I come in the morning?",
      "We have a morning slot at nine, madam.",
      "Ôn tuần 20: morning slot — đưa giờ cụ thể thay vì nói còn chỗ.",
    ),
    sp(
      "When did the guest leave?",
      "The guest left ten minutes ago.",
      "Ôn tuần 21: ago đứng sau mốc thời gian trong câu quá khứ.",
      "colleague",
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
      "I am sorry, madam. That room is not ready, because the tap is leaking.",
      "Ôn tuần 18: nêu kết quả rồi nối nguyên nhân bằng because.",
    ),
    sp(
      "I found this watch in the corridor.",
      "I will log the item as lost property.",
      "Ôn tuần 18: log the item là ghi vào sổ.",
    ),
    sp(
      "Is 1204 ready?",
      "Yes. Room 1204 is ready for inspection.",
      "Báo phòng xong cho giám sát bằng ready for inspection.",
      "colleague",
    ),
    sp(
      "What about 1506?",
      "1506 is out of order. The air conditioner is not working.",
      "Out of order là phòng hỏng, chưa bán được — nói luôn lý do.",
      "colleague",
    ),
    sp(
      "Where are the extra towels?",
      "They are in the linen room, next to the store room.",
      "Ôn tuần 8: linen room và store room — hai phòng khác nhau.",
      "colleague",
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
    sp(
      "I did not order this.",
      "I am sorry, sir. Let me check the bill with you now.",
      "Khách không nhận khoản trên hoá đơn: xin lỗi, cùng khách kiểm tra — không cãi.",
    ),
    sp(
      "Can you hold on a moment? I need my glasses.",
      "Of course, madam. My pleasure. Take your time.",
      "Ôn tuần 14: my pleasure — lịch sự, không giục khách.",
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
      "I am sorry, sir. The room will be ready at two. Please have a welcome drink in the lounge.",
      "Ôn tuần 16: khách đến sớm — xin lỗi, nêu giờ phòng sẵn sàng, mời welcome drink trong lúc chờ.",
    ),
    sp(
      "Can I get a room away from the lift?",
      "Let me check what is free, madam. A higher floor is quiet.",
      "Ôn tuần 16: higher floor — kiểm phòng trống trước, chưa kiểm thì chưa hứa.",
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
    sp(
      "I have been standing here for a while.",
      "Thank you for waiting, sir. How may I help you?",
      "Thank you for waiting — mở lại cuộc nói chuyện sau khi khách phải chờ.",
    ),
    sp(
      "What is the Wi-Fi password?",
      "It is on your key card holder, madam.",
      "Chỉ chỗ khách tự xem được, không đọc mật khẩu to trước quầy.",
    ),
    sp(
      "Hello again. It is Mr Tanaka.",
      "Welcome back, Mr Tanaka. It is lovely to see you again.",
      "Gọi khách bằng Mr hoặc Ms cộng họ ngay khi khách xưng tên.",
    ),
    sp(
      "My bags? Where did you put them?",
      "Your bags are in the luggage room, sir.",
      "Ôn tuần 8: luggage room là phòng giữ hành lý.",
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
      "Thank you, sir. I will check the company name with my manager. Then you can settle the bill at check-out.",
      "Ôn tuần 18: công ty trả tiền phải được duyệt công nợ, nên hỏi quản lý trước khi hứa.",
    ),
    sp(
      "You are useless! I will stand here until you give me that key!",
      "I understand, sir. I want to help you. My duty manager is coming now.",
      "Khách gây gổ: giữ giọng bình tĩnh và gọi duty manager; gọi bảo vệ qua bộ đàm, không nói trước mặt khách.",
    ),
    sp(
      "The room next door is very loud.",
      "I do apologise, sir. I will send someone to check now.",
      "I do apologise trang trọng hơn sorry; nói ngay việc mình làm.",
    ),
    sp(
      "My husband feels very sick.",
      "I will call our doctor now, madam. Which room are you in?",
      "Khách ốm: gọi bác sĩ trước, hỏi số phòng sau — không tự cho thuốc.",
    ),
    sp(
      "I booked a sea view room!",
      "I am very sorry, madam. Let me check what we can do today.",
      "Sai loại phòng: xin lỗi và kiểm tra — chưa kiểm thì chưa hứa đổi.",
    ),
    sp(
      "Give me my key now! I am in a hurry.",
      "Good evening, sir. May I see your passport, please?",
      "Khách đã uống rượu vẫn phải qua bước xác minh — giọng bình tĩnh, câu ngắn.",
    ),
    sp(
      "I lost it. Just give me the key!",
      "I understand, sir. I must check your name first.",
      "Nhắc lại lý do một lần, không tranh luận, không nhượng bộ chìa khoá.",
    ),
    sp(
      "I am going up there anyway!",
      "Please take a seat, sir. My duty manager is coming.",
      "Khách không hợp tác: mời ngồi và gọi duty manager, gọi bảo vệ qua bộ đàm.",
    ),
    sp(
      "My room is dirty and the air-con is broken.",
      "I am very sorry, madam. I will send Housekeeping now.",
      "Phàn nàn phòng: xin lỗi rồi nói việc mình làm ngay, không hứa thay bộ phận khác.",
    ),
    sp(
      "And if it is still not fixed tonight?",
      "Then I will ask my manager about another room.",
      "Phương án hai là quyền của quản lý, nên nói rõ mình sẽ đi hỏi.",
    ),
    sp(
      "I want a discount for this.",
      "I cannot decide that, madam. May I ask my manager?",
      "Giảm giá không phải quyền của lễ tân — nói thẳng và chuyển lên quản lý.",
    ),
    sp(
      "Do you have a room for tonight?",
      "I am afraid we are full tonight, sir. May I call another hotel?",
      "Hết phòng: nói thật rồi đưa ngay một lối đi tiếp cho khách.",
    ),
    sp(
      "What time is check-out?",
      "Check-out is at twelve noon, sir.",
      "Giờ trả phòng là con số cố định, trả lời gọn một câu.",
    ),
    sp(
      "Can I keep the room until four?",
      "I will ask my manager about a late check-out, madam.",
      "Trả phòng muộn do quản lý và bộ phận đặt phòng quyết, không hứa tại quầy.",
    ),
    sp(
      "Which room am I in?",
      "Your room number is inside this key folder, madam.",
      "Không đọc to số phòng ở sảnh — chỉ vào chỗ đã ghi sẵn.",
    ),
    sp(
      "My friend will sleep in my room tonight.",
      "Of course, madam. May I have your friend's passport for registration?",
      "Thêm người ở lại phải khai báo tạm trú, nên xin giấy tờ ngay.",
    ),
    sp(
      "The website said I might get an upgrade.",
      "I will ask my manager about an upgrade, madam.",
      "Ôn tuần 16: nâng hạng là quyết định của quản lý, nói rõ mình đi hỏi.",
    ),
    sp(
      "Is the paperwork finished for 512?",
      "Yes. The check-in form is signed, and the passport scan is done.",
      "Ôn tuần 17: check-in form và passport scan — báo đủ hai việc trong một câu.",
      "colleague",
    ),
    sp(
      "What did the terminal say?",
      "The card was declined, so I called the duty manager.",
      "Ôn tuần 17: declined chỉ nói với đồng nghiệp, kèm việc mình đã làm.",
      "colleague",
    ),
    sp(
      "Do you have something quieter?",
      "We have a corner room, madam. Would that suit you?",
      "Ôn tuần 20: corner room — gợi ý một phương án rồi để khách quyết.",
    ),
    sp(
      "Which one should I take?",
      "Either one, madam. The choice is yours.",
      "Ôn tuần 20: khen cả hai rồi trả quyền chọn cho khách.",
    ),
    sp(
      "How do we get to the airport?",
      "I can arrange an airport pick-up, madam.",
      "Ôn tuần 16: airport pick-up là dịch vụ quầy đặt được.",
    ),
    sp(
      "When did the guest leave?",
      "The guest left ten minutes ago.",
      "Ôn tuần 21: ago đứng sau mốc thời gian, dùng với thì quá khứ.",
      "colleague",
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
    sp(
      "My card did not work.",
      "No problem, sir. Would you like to try again?",
      "Không nói thẻ bị từ chối — mời thử lại, giọng bình thường.",
    ),
    sp(
      "Oh no, I dropped my glass!",
      "Please do not move, madam. I will clean it up.",
      "Ly vỡ: bảo khách đứng yên trước, rồi mới dọn.",
    ),
  ],
  "FB-22": [
    sp(
      "Does this dish have pork? We eat halal.",
      "Let me check with the kitchen about halal options, sir. The chef will confirm which dishes are suitable.",
      "Hỏi halal hay pork: kiểm với bếp, nêu phương án — không tự đoán thành phần.",
    ),
    sp(
      "Another bottle of wine, and be quick about it!",
      "Let me check with my supervisor, sir. May I bring some water and a small snack as well?",
      "Khách có dấu hiệu say: không tự mang thêm rượu — mời nước, đồ ăn nhẹ và báo supervisor.",
    ),
    sp(
      "There is a mark on this glass.",
      "I am very sorry, madam. I will take it back and bring another one.",
      "Ôn tuần 19: take it back và bring another one — nhận lỗi rồi đổi ngay.",
    ),
    sp(
      "Can I pay for everything later tonight?",
      "May I have your room number and signature, sir? Then your bill can stay on hold.",
      "Ôn tuần 18: on hold — treo hoá đơn cần số phòng VÀ chữ ký, để đúng người ký nhận.",
    ),
    sp(
      "Can I get a red invoice for my company?",
      "Certainly, sir. May I have your billing name, please?",
      "Ôn tuần 18: billing name — tên xuất hoá đơn, hỏi trước khi in.",
    ),
    sp(
      "My throat feels strange. I think it is the nuts.",
      "Please sit down, madam. I am calling our manager and first aid now.",
      "Nghi phản ứng dị ứng: không tự cho thuốc — gọi quản lý và sơ cứu, ở lại cạnh khách.",
    ),
    sp(
      "There is a hair in my soup!",
      "I am very sorry, madam. I will take it back and tell my manager.",
      "Dị vật trong món: xin lỗi, mang món đi và báo quản lý — không tranh luận.",
    ),
    sp(
      "This service is a joke! Get me someone useful!",
      "I am sorry, sir. I will call my manager now.",
      "Khách giận nói nặng: không cãi, không giải thích dài — gọi quản lý.",
    ),
    sp(
      "I would like the steak, please.",
      "Certainly, madam. Rare, medium or well done?",
      "Ba mức chín hay dùng nhất — hỏi đủ ba, đừng để khách phải tự nói.",
    ),
    sp(
      "Medium rare for me, please.",
      "Medium rare, madam. Thank you.",
      "Nhắc lại mức chín khách vừa chọn để xác nhận, rồi mới ghi phiếu.",
    ),
    sp(
      "Can I have eggs with that?",
      "How would you like your eggs, sir — fried or scrambled?",
      "Trứng luôn có hai cách làm phổ biến nhất; hỏi gọn trong một câu.",
    ),
    sp(
      "Is this dish vegetarian?",
      "I will check with the chef, madam.",
      "Món chay hay không là việc của bếp, không trả lời bằng trí nhớ.",
    ),
    sp(
      "Can I charge this to my room?",
      "Certainly, sir. May I have your room number and signature?",
      "Ghi vào phòng cần số phòng VÀ chữ ký, để đúng người ký nhận.",
    ),
    sp(
      "I need an invoice for my company.",
      "Certainly, sir. May I have your company name and tax code?",
      "Hoá đơn đỏ cần tên công ty và mã số thuế — hỏi đủ hai thứ một lần.",
    ),
    sp(
      "This is not what I ordered.",
      "I am very sorry, madam. I will bring your correct dish now.",
      "Mang nhầm món: xin lỗi và đổi ngay, không hỏi lại khách đã gọi gì.",
    ),
    sp(
      "You have spilled water on my jacket!",
      "I am so sorry, sir. My manager will come to help now.",
      "Làm đổ lên người khách: xin lỗi rồi gọi quản lý — giặt khô là quyết định của quản lý.",
    ),
    sp(
      "Your food made me sick last night.",
      "I am very sorry, madam. I will call my manager now.",
      "Khách nói bị ngộ độc: không nhận lỗi, không giải thích — báo quản lý ngay.",
    ),
    sp(
      "I am fine. One more beer, please.",
      "I understand, sir. My supervisor is coming to help you.",
      "Khách đã say đòi thêm: không phục vụ tiếp, không tranh luận — gọi giám sát.",
    ),
    sp(
      "What do you have for dessert?",
      "May I show you the dessert menu, madam?",
      "Mời xem thực đơn tráng miệng thay vì đọc thuộc từng món.",
    ),
    sp(
      "Give us a minute, please.",
      "Of course, madam. I will be back in a moment.",
      "Câu rời bàn lịch sự nhất trong ca — nói rõ mình sẽ quay lại.",
    ),
    sp(
      "Is VAT included in this price?",
      "Yes, madam. The price includes VAT.",
      "Ôn tuần 18: VAT đã nằm trong giá — trả lời gọn một câu.",
    ),
    sp(
      "Is this dish spicy?",
      "It has a mild flavour, sir.",
      "Ôn tuần 20: mild flavour — mô tả vị trước khi khách phải hỏi lần hai.",
    ),
    sp(
      "When did table six order?",
      "They ordered twenty minutes ago.",
      "Ôn tuần 21: ago đứng sau mốc thời gian trong câu quá khứ.",
      "colleague",
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
      "Read the cleaning request first, then the cleaning note for each room.",
      "Ôn tuần 17: cleaning request và cleaning note — đọc trước khi vào phòng.",
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
    sp(
      "Can you open 1204 for me? I lost my key.",
      "I am sorry, sir. For your security, please go to the front desk.",
      "Không bao giờ mở cửa phòng cho người xin — mời xuống lễ tân.",
    ),
    sp(
      "My necklace is gone. Did you take it?",
      "I understand, sir. I will call my supervisor now.",
      "Khách nghi mình lấy đồ: không phân bua — gọi giám sát ngay.",
    ),
    sp(
      "My husband fell in the bathroom!",
      "Please do not move him, madam. I will call for help now.",
      "Khách ngã: không đỡ dậy, không di chuyển — gọi người giúp ngay.",
    ),
    sp(
      "Can I clean the bathroom without gloves?",
      "No. Wear gloves when you use chemicals.",
      "Hoá chất luôn đi với găng tay — nói với đồng nghiệp ngắn và rõ.",
      "colleague",
    ),
    sp(
      "Come inside and close the door.",
      "I will keep the door open, sir. I will come back later.",
      "Giữ cửa mở là quy tắc bảo vệ chính bạn; rời phòng rồi báo giám sát.",
    ),
    sp(
      "I feel very unwell.",
      "Please sit down, sir. I will call the duty manager now.",
      "Khách mệt: mời ngồi và gọi quản lý trực, không tự cho thuốc.",
    ),
    sp(
      "I broke the lamp. How much is it?",
      "I will report it to my supervisor, madam.",
      "Đồ hỏng: không báo giá, không thu tiền — chuyển cho giám sát.",
    ),
    sp(
      "My friend will sleep here tonight.",
      "I will tell the front desk, madam. They register every guest.",
      "Người ở thêm phải do lễ tân đăng ký, buồng phòng chỉ báo tin.",
    ),
    sp(
      "There are needles in the bin.",
      "I will not touch them. I will call my supervisor now.",
      "Vật sắc nhọn: không nhặt bằng tay, gọi giám sát để xử lý đúng cách.",
      "colleague",
    ),
    sp(
      "These papers are rubbish. Take them.",
      "May I throw these away, madam?",
      "Hỏi trước khi vứt bất cứ thứ gì trong phòng khách.",
    ),
    sp(
      "How long will you take?",
      "I will be finished in twenty minutes, madam.",
      "Cho khách một mốc thời gian cụ thể để họ biết khi nào quay lại.",
    ),
    sp(
      "Can you clean while I am out?",
      "Certainly, sir. I will clean while you are out.",
      "Nhắc lại đúng điều khách vừa cho phép — đó là cách xác nhận an toàn nhất.",
    ),
    sp(
      "What if nobody answers the door?",
      "I will slip a note under the door.",
      "Ôn tuần 15: slip a note — không mở cửa, để lại giấy rồi báo giám sát.",
      "colleague",
    ),
    sp(
      "Why is 1408 not on my list?",
      "It is a blocked room this week.",
      "Ôn tuần 18: blocked room là phòng khoá không nhận khách.",
      "colleague",
    ),
    sp(
      "This pillow is too soft.",
      "I will bring you a foam pillow, madam.",
      "Ôn tuần 20: foam pillow — đổi gối là việc buồng phòng làm ngay được.",
    ),
    sp(
      "When did the guest check out?",
      "The guest checked out ten minutes ago.",
      "Ôn tuần 21: ago đi với thì quá khứ, đứng sau mốc thời gian.",
      "colleague",
    ),
  ],
  "SW-20": [
    sp(
      "Where are my notes from last time?",
      "Your treatment record is on the booking sheet, madam.",
      "Ôn tuần 17 và 18: treatment record ghi trên booking sheet.",
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
    sp(
      "I am allergic to nuts.",
      "Thank you, madam. I will note it, and we will not use nut oil.",
      "Dị ứng: cảm ơn, ghi lại, nói rõ mình sẽ tránh gì.",
    ),
    sp(
      "Who will do my massage?",
      "Would you prefer a male or female therapist, madam?",
      "Hỏi khách muốn kỹ thuật viên nam hay nữ trước khi xếp lịch.",
    ),
    sp(
      "When should I come?",
      "Please arrive fifteen minutes before your treatment, madam.",
      "Dặn giờ đến sớm bằng một con số, khách khỏi bị trễ.",
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
    sp(
      "Can you book me the sunset cruise?",
      "It is subject to availability, sir. I will check and call you back.",
      "Dịch vụ bên ngoài: subject to availability, kiểm rồi gọi lại — không hứa trước.",
    ),
    sp(
      "My room is too noisy.",
      "I am sorry to hear that, madam. I will call the front desk now.",
      "Sorry to hear that — đồng cảm trước, rồi chuyển đúng bộ phận.",
    ),
    sp(
      "Here is my card for the lounge.",
      "Thank you, madam. Here is your lounge card back.",
      "Ôn tuần 2: lounge card — trả thẻ kèm lời cảm ơn.",
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
      "I understand, sir. Please come with me — I will handle it myself.",
      "Khách hạng cao đòi hỏi: công nhận kỳ vọng, tự xử lý, không phân bua.",
    ),
    sp(
      "Which seat should I take in the lounge?",
      "Window or garden, madam — the choice is yours.",
      "Ôn tuần 20: trao quyền chọn bằng the choice is yours.",
    ),
    sp(
      "My room is still not ready!",
      "I am so sorry, madam. May I offer you a drink while you wait?",
      "Mở chuỗi phàn nàn: xin lỗi, cho khách một việc dễ chịu trong lúc chờ.",
    ),
    sp(
      "My room is not ready. Give me an upgrade for this.",
      "I cannot promise an upgrade, but I will ask my manager now.",
      "Không hứa nâng hạng — nói rõ mình sẽ hỏi ai.",
    ),
    sp(
      "You will ask your manager? How long will that take?",
      "I will call you back in ten minutes, madam.",
      "Hẹn gọi lại bằng một mốc thời gian cụ thể, không nói chung chung là sớm thôi.",
    ),
    sp(
      "That is not good enough! I want someone senior.",
      "I understand, sir. My duty manager is coming now.",
      "Khách đòi gặp cấp trên: không thương lượng thêm, gọi duty manager ngay.",
    ),
    sp(
      "I cannot find my daughter!",
      "Please stay here, madam. I am calling security now.",
      "Trẻ lạc: giữ khách ở một chỗ và gọi bảo vệ ngay lập tức.",
    ),
    sp(
      "My husband feels very unwell.",
      "Please sit down, sir. I am calling the doctor now.",
      "Sự cố y tế: mời ngồi, gọi bác sĩ, không tự cho thuốc.",
    ),
    sp(
      "That man is shouting at people.",
      "I am calling security now, madam. Please stay here.",
      "Khách gây rối: gọi bảo vệ, không tự can thiệp.",
    ),
    sp(
      "You have no room for us tonight?",
      "I am very sorry, sir. My manager will arrange another hotel.",
      "Quá tải phòng: chuyển khách sang khách sạn khác là quyết định của quản lý.",
    ),
    sp(
      "And if I need to cancel the tour?",
      "I will check the cancellation policy and call you back, sir.",
      "Điều kiện huỷ do đối tác quy định — đi kiểm rồi gọi lại, không đoán.",
    ),
    sp(
      "Good evening, Mr Brown speaking.",
      "Good evening, sir. I am calling to check your room is quieter now.",
      "Gọi lại sau khi xử lý phàn nàn là việc phân biệt Guest Relations với quầy lễ tân.",
    ),
    sp(
      "Can we sit somewhere calm?",
      "I will book you a quiet table, madam.",
      "Ôn tuần 20: quiet table — đặt giúp khách thay vì chỉ đường.",
    ),
    sp(
      "When did Mr Chen arrive?",
      "He arrived twenty minutes ago.",
      "Ôn tuần 21: ago đi với thì quá khứ, đứng sau mốc thời gian.",
      "colleague",
    ),
  ],
};
