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
  "FB-18": [
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
      "Please enjoy your breakfast, sir.",
      "Ôn tuần 15: enjoy đi thẳng với danh từ, không cần to.",
    ),
  ],
  "HK-18": [
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
      "We keep briefly, sir — about two minutes.",
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
      "How much is the massage?",
      "The treatment fee is on the booking sheet.",
      "Ôn tuần 18: treatment fee là phí liệu trình.",
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
};
