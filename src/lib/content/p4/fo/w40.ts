// FO week 40 — one working day at the desk, from the morning departures to
// the night, mixing every function of the phase (see ../kit.ts).
//
// No new rule and no new headword: every card re-presents a word from weeks
// 31-39 in a new sentence, and every turn is a real situation of the shift —
// nothing about the course itself. Each situation keeps the rule its own week
// taught:
//  · Departures: international flights leave the hotel three hours before
//    take-off; an itemised bill before signing; a disputed charge under
//    500,000 VND is approved by the Shift Leader by phone and the approver is
//    written on the folio; a card refund is quoted at up to thirty working
//    days; late check-out up to two, subject to availability.
//  · Arrivals: a returning guest's preferences are confirmed in one sentence;
//    an occasion is asked once with a way out; allergies and the total come
//    before any cake; the desk gives a handwritten card on its own; in all
//    honesty before the guest goes up; a group guest missing from the list
//    is checked with the tour leader, never turned away.
//  · Bookers: needs before prices, one room and one reason, the day delegate
//    rate before service charge and VAT, like with like, the cut-off date,
//    a seven-day tentative hold, the Sales Manager for every change, read
//    back and sent in writing.
//  · The night: the last fifteen minutes, the fire alarm (stairwell,
//    assembly point, not accounted for, the all-clear), a power cut, and the
//    order — someone in danger first, then the guest in front of you, then
//    the phone.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "Good morning, madam. For an eleven o'clock international flight, I would suggest leaving the hotel by eight.";
const t1b =
  "It is, madam. Here is your itemised bill, so you can check every line before you sign.";
const t1c =
  "I am sorry, madam. It may have been posted in error, so I am checking with my supervisor now.";

const t2a =
  "Welcome back, madam. Your room is ready as before, and is there anything different you would like this time?";
const t2b =
  "Congratulations to you both, madam. Is it a celebration you would like help with, or a quiet evening?";
const t2c =
  "Of course, madam. Before I call the pastry chef, is anyone allergic to anything? Then I will quote the total.";

export const week: AuthoredWeek = {
  canDo:
    "Nói được: xử lý trọn một ngày ở quầy trộn mọi tình huống của giai đoạn — trả phòng và tranh chấp hoá đơn, đón khách quen và dịp đặc biệt, báo giá cho người đặt doanh nghiệp, sự cố ban đêm và bàn giao cuối ca — mỗi tình huống đúng luật của nó, theo đúng thứ tự ưu tiên.",
  lessons: [
    L(40, 1, "Morning: Departures and the Bill", "Buổi sáng: trả phòng và hoá đơn", {
      vocabulary: [
        c("Itemised", "Every departing guest gets an itemised bill before signing."),
        c("Posted in error", "A charge posted in error is reversed once a supervisor approves it."),
        c("Working days", "A card refund can take up to thirty working days."),
        c("Early start", "Guests with an early start can settle their bill the night before."),
      ],
      grammar: [
        g(
          "Here is your bill. Sign.",
          "Here is your itemised bill, madam, so you can check every line before you sign.",
          "Đưa hoá đơn kê chi tiết ('itemised') và mời khách tự kiểm từng dòng trước khi ký. Sau 'can' là động từ nguyên thể.",
          "Here is your itemised bill, madam, so you can checks every line before you sign.",
        ),
        g(
          "The money comes back in three days.",
          "A card refund can take up to thirty working days, sir, because it depends on your bank.",
          "Hoàn tiền vào thẻ: luôn nói mốc CHẬM NHẤT và lý do (ngân hàng của khách). Sau 'thirty' là danh từ số nhiều 'days'.",
          "A card refund can take up to thirty working day, sir, because it depends on your bank.",
        ),
      ],
      speaking: [
        sp(
          "Good morning. I am checking out. My flight to Seoul is at eleven.",
          t1a,
          "Bay quốc tế thì rời khách sạn ba tiếng trước giờ cất cánh. Lời khuyên dựa trên đúng giờ bay khách vừa nói, và động từ sau động từ gợi ý ở dạng V-ing.",
        ),
        sp(
          "Eight? Then I need to hurry. Is my bill ready?",
          t1b,
          "Đưa hoá đơn kê chi tiết ('itemised') và mời khách tự kiểm tra — minh bạch nhanh hơn giải thích.",
          undefined,
          undefined,
          t1a,
        ),
        risk({
          ...sp(
            "What is this minibar charge? I never even opened it.",
            t1c,
            "Câu phải đúng của tuần: khoản khách nói sai thì không cãi, không tự gỡ. Nói lỗi bằng bị động ('posted in error') và hỏi cấp trên duyệt ngay.",
            undefined,
            ["posted", "error", "checking", "supervisor"],
            t1b,
          ),
          alsoAccept: [
            "I am sorry, madam. It may have been posted in error, so I will check with my supervisor now.",
            "I am sorry, madam. It may have been posted in error, so let me check with my supervisor now.",
            "I am so sorry, madam. It may have been posted in error, so I am checking with my supervisor now.",
            "Then it may have been posted in error, madam, and I am sorry. Let me check with my supervisor now.",
            "I am sorry, madam. It may have been posted in error, so I am asking my supervisor now.",
          ],
        }),
        {
          ...sp(
            "Can I keep the room until four this afternoon?",
            "Our policy allows late check-out up to two, sir, subject to availability. After that, we can store your bags.",
            "Nói điều chính sách cho phép trước ('policy allows', 'up to'), rồi một phương án cho phần thời gian còn lại.",
            undefined,
            ["policy", "allows"],
          ),
          alsoAccept: [
            "Our policy allows late check-out up to two, sir, subject to availability. After that, we can keep your bags.",
          ],
        },
        {
          ...sp(
            "You agreed to refund the second night. When will it reach my card?",
            "A card refund can take up to thirty working days, sir, depending on your bank. I will follow up, and your case number is on the slip.",
            "Nói mốc CHẬM NHẤT ('working days') và lý do (ngân hàng của khách), rồi việc của chính mình: tự theo dõi tiếp ('follow up'), kèm mã hồ sơ ('case number') trên phiếu.",
            undefined,
            ["follow"],
          ),
          alsoAccept: [
            "A card refund can take up to thirty working days, sir, because it depends on your bank. I will follow up, and your case number is on the slip.",
            "It can take up to thirty working days, sir, because it depends on your bank, and I will follow up with you.",
            "It can take up to thirty working days, sir, depending on your bank, and I will follow up with you.",
          ],
        },
        {
          ...sp(
            "We leave at five tomorrow morning. Can we settle the bill tonight?",
            "Of course, sir. With an early start, it is best to settle tonight. May I also book you a breakfast box?",
            "Khách phải đi sớm ('early start'): đồng ý ngay, rồi đề nghị thêm một việc quầy làm được cho người đi sớm — đặt hộp ăn sáng ('breakfast box').",
          ),
          alsoAccept: [
            "Of course, sir. With an early start, it is best to settle tonight. Shall I also book you a breakfast box?",
            "Of course, sir. With an early start, it is best to settle tonight, and I will have your itemised bill ready.",
          ],
        },
        {
          ...sp(
            "The guest in 610 says a laundry charge is wrong. It is only two hundred thousand. Can I take it off?",
            "Only the Shift Leader can authorise it. Call for approval first, then post the correction and write the name on the folio.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Khoản nhỏ vẫn cần người duyệt ('authorise'): gọi Trưởng ca, sửa, rồi ghi tên người duyệt.",
            "colleague",
          ),
          alsoAccept: [
            "Call the Shift Leader for approval first, then post the correction and write the name on the folio.",
          ],
        },
        sp(
          "How was the morning check-out?",
          "It was busy but smooth. One guest thought a card hold on the statement was a second charge, and one minibar charge was posted in error.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: một câu tổng quát, rồi đúng hai việc đáng báo — khoản tạm giữ trên sao kê ('statement') bị tưởng là thu trùng ('second charge'), và một khoản ghi nhầm ('posted in error').",
          "manager",
        ),
        {
          ...sp(
            "We have been waiting ten minutes just to pay our bill!",
            "I am sorry for the wait, madam. Please bear with me; I am serving guests one at a time, and you are next.",
            "Hàng chờ trả phòng buổi sáng: xin lỗi vì phải chờ, xin khách chờ thêm ('bear with me'), nói cách làm ('one at a time') và cho khách biết mình là người tiếp theo.",
          ),
          alsoAccept: [
            "I am sorry for the wait, madam. Please bear with me. I am helping guests one at a time, and you are next.",
            "I am sorry, madam. Please bear with me — I am serving guests one at a time, and you are next.",
          ],
        },
        {
          ...sp(
            "Thank you for everything. It was a lovely anniversary.",
            "I am so glad, sir. On behalf of everyone at the hotel, thank you for celebrating the occasion with us.",
            "Lời tiễn khách trang trọng: vui cùng khách, rồi 'On behalf of' + người mình đại diện, và lời cảm ơn gắn với dịp của khách ('occasion').",
          ),
          alsoAccept: [
            "I am so glad, sir. On behalf of everyone at the hotel, thank you for staying with us.",
          ],
        },
      ],
      reading: read(
        `MORNING DEPARTURES — 07:00 TO 11:00
Seven departures before nine, and two of them have early flights. Their bills were printed the night before.
International guests leave the hotel three hours before take-off, and domestic guests two. The drive takes forty to seventy minutes.
Every guest gets an itemised bill and checks it before signing.
A charge the guest says is wrong is never argued at the desk. Under 500,000 VND, the Shift Leader approves the correction by phone.
Write the approver's name on the folio before you tell the guest it is done.
A card refund can take up to thirty working days. Say the slowest case, and set your own follow-up.
Late check-out is allowed up to two in the afternoon, subject to availability, with a small fee.
After that, offer to store the bags. We keep luggage for up to seven days.`,
        [
          {
            q: "Khách bay quốc tế lúc mười một giờ. Nên rời khách sạn lúc mấy giờ?",
            options: [
              "Mười giờ, vì đi sân bay chỉ mất khoảng bốn mươi phút",
              "Tám giờ",
              "Chín giờ rưỡi, nếu đường buổi sáng không quá đông",
            ],
            correct: 1,
            explanation:
              'Tài liệu dặn khách bay quốc tế rời khách sạn "three hours before take-off" — mười một giờ trừ ba tiếng là tám giờ.',
          },
          {
            q: "Khách nói một khoản 300.000 đồng bị tính sai. Ai duyệt việc sửa?",
            options: [
              "Lễ tân tự gỡ ngay, không cần hỏi ai cả",
              "Kế toán, vào sáng hôm sau khi đối chiếu sổ sách",
              "Trưởng ca duyệt qua điện thoại, rồi ghi tên người duyệt lên hoá đơn",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "Under 500,000 VND, the Shift Leader approves the correction by phone." — và ghi tên người duyệt lên hoá đơn trước khi báo khách.',
          },
          {
            q: "Khách muốn giữ phòng tới bốn giờ chiều. Quầy trả lời theo hướng nào?",
            options: [
              "Đồng ý luôn, vì khách đã trả đủ tiền phòng cho cả kỳ ở",
              "Tới hai giờ nếu còn phòng, rồi giữ hành lý",
              "Từ chối, vì giờ trả phòng là mười hai giờ trưa",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Late check-out is allowed up to two in the afternoon, subject to availability" và "offer to store the bags".',
          },
        ],
      ),
      game: [
        game(
          "My flight to Singapore is at noon. Leaving at eleven is fine, yes?",
          "I would leave earlier, sir. For an international flight, it is safest to leave three hours before take-off. Shall I book you a car?",
          "That should be fine, sir. The airport is quite close, and the traffic are usually light at that time of day.",
          "That should be fine, sir. The airport is quite close, and the traffic is usually light at that time of day.",
          undefined,
          "Hai câu 'should be fine… traffic is usually light' đều nghe dễ chịu nhưng sai quy định: bay quốc tế rời khách sạn ba tiếng trước giờ cất cánh, và đường ra sân bay mất bốn mươi tới bảy mươi phút. Câu 'the traffic are' còn sai: 'traffic' không đếm được, đi với 'is'.",
        ),
        game(
          "I was promised the refund in three days. Why has it not arrived?",
          "I am sorry you were told that, madam. A card refund can take up to thirty working days, and I will follow it up.",
          "I am sorry you were told that, madam. A card refund can take up to thirty working days, and I will following it up.",
          "Our system sent it the same day, madam, so the delay must be your bank's fault, and they are the ones to call.",
          undefined,
          "Sau 'will' là động từ nguyên thể 'follow'. Câu đổ cho ngân hàng của khách đúng tiếng Anh nhưng đẩy khách đi — xin lỗi vì khách được báo sai, nói mốc chậm nhất, rồi tự theo dõi tiếp.",
        ),
      ],
    }),

    L(40, 2, "Midday: Arrivals", "Buổi trưa: đón khách", {
      vocabulary: [
        c("Returning guest", "A returning guest is welcomed with what we already know."),
        c("In all honesty", "In all honesty, the new wing suits a family with a baby better."),
        c("Allergic", "Ask whether anyone is allergic before you order a cake."),
        c("Quote the total", "Quote the total, with service charge and tax, before you order."),
      ],
      grammar: [
        g(
          "You came before? What do you want this time?",
          "Welcome back, sir. Your preferences are on file. Is there anything different this time?",
          "Khách quen: chào lại, cho biết hồ sơ đã có, rồi mở MỘT cửa cho điều khác đi. 'preferences' số nhiều đi với 'are'.",
          "Welcome back, sir. Your preferences is on file. Is there anything different this time?",
        ),
        g(
          "Cake is six hundred thousand.",
          "Before I order the cake, madam, is anyone allergic to anything? Then I will quote the total.",
          "Hai việc TRƯỚC khi đặt bánh: hỏi dị ứng, rồi báo tổng tiền. Sau 'Before' dùng hiện tại đơn, không dùng 'will'.",
          "Before I will order the cake, madam, is anyone allergic to anything? Then I will quote the total.",
        ),
      ],
      speaking: [
        sp(
          "Hello again! We stayed here last spring.",
          t2a,
          "Khách quen không phải kể lại: phòng đã sẵn sàng như lần trước, rồi mở một cửa cho điều khác đi.",
        ),
        sp(
          "Actually, it is our anniversary on Saturday.",
          t2b,
          "Chúc mừng cả hai người, rồi hỏi MỘT lần với một lối ra: một dịp ăn mừng, hay một buổi tối yên tĩnh.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "A small chocolate cake would be lovely.",
          t2c,
          "Trước khi gọi bếp bánh: hỏi dị ứng ('allergic'), rồi báo tổng tiền ('quote the total') — hai việc, đúng thứ tự.",
          undefined,
          undefined,
          t2b,
        ),
        {
          ...sp(
            "We booked the old wing for the charm. Is it right for us with a baby?",
            "In all honesty, sir, the old wing is charming but compact. A room in the new wing, near the lift, would be easier with a baby.",
            "Nói thật ngay ở quầy ('In all honesty'): cánh cũ 'charming but compact' — hạn chế đi cùng điểm cộng — rồi khuyên phòng hợp với nhu cầu khách vừa nói: em bé thì gần thang máy.",
          ),
          alsoAccept: [
            "In all honesty, sir, the old wing is charming but compact. A new-wing room near the lift would be easier with a baby.",
            "In all honesty, sir, a room in the new wing near the lift would be easier with a baby.",
            "In all honesty, sir, a room in the new wing, near the lift, would be easier with a baby.",
          ],
        },
        {
          ...sp(
            "This is a special trip. Can you give us the suite for the same price?",
            "I am not able to change the rate myself, sir, but I will ask my Duty Manager now.",
            "Nâng hạng với giá cũ là quyết định của Duty Manager. Nói điều mình không làm, rồi việc mình làm ngay.",
          ),
          alsoAccept: [
            "I cannot change the rate myself, sir, but I will ask my Duty Manager now.",
            "I am not able to change the rate myself, sir, but I will ask the manager on duty now.",
          ],
        },
        {
          ...sp(
            "We are with the Sunrise group, and five of us are not on your list.",
            "Let me check with your tour leader first, madam. If rooms are still in the allotment, they are yours.",
            "Khách đứng ở quầy không bị từ chối vì một danh sách. Hỏi trưởng đoàn trước, rồi giao phòng còn trong khối ('allotment').",
          ),
          alsoAccept: [
            "Let me check with your tour leader first, madam. If there are rooms still in the allotment, they are yours.",
          ],
        },
        sp(
          "The couple in 405 have stayed with us four times. What do I do differently?",
          "Read the profile before they reach the desk. A returning guest should never have to explain twice.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Đọc hồ sơ TRƯỚC, để khách quen ('returning guest') không phải nói lại.",
          "colleague",
        ),
        sp(
          "Anything from the midday arrivals I should know?",
          "One anniversary. I asked about allergies and quoted the total before I called the pastry chef.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: việc gì, và mình đã làm đúng hai bước bắt buộc trước khi đặt bánh.",
          "manager",
        ),
        {
          ...sp(
            "What a beautiful lobby. Can you tell me a little about this building?",
            "It is a heritage building, madam, and the floor tiles are original. The staircase was restored by hand.",
            "Kể ngắn như đã học: loại công trình ('heritage building'), một chi tiết khách đang đứng trên ('original'), một câu bị động ('was restored') — rồi dừng, để khách hỏi tiếp nếu muốn.",
          ),
          alsoAccept: [
            "It is a heritage building, madam, and these floor tiles are original. The staircase was restored by hand.",
            "Of course, madam. It is a heritage building, and these floor tiles are original. The staircase was restored by hand.",
          ],
        },
        {
          ...sp(
            "I am with Lotus Pharma, and we have a corporate rate with you.",
            "Welcome, sir. May I see a business card or a company ID, so I can confirm you are eligible?",
            "Giá doanh nghiệp cần một bằng chứng nhẹ nhàng: danh thiếp ('business card') hoặc thẻ nhân viên ('company ID'), kèm lý do — để xác nhận khách 'eligible'. Không hỏi gì thêm.",
          ),
          alsoAccept: [
            "Welcome, sir. May I see a business card or a company ID, so I can confirm that you are eligible?",
          ],
        },
      ],
      reading: read(
        `MIDDAY ARRIVALS — 12:00 TO 16:00
A returning guest arrives at noon. Read the profile before she reaches the desk, and confirm her preferences in one sentence.
She mentions an anniversary. Ask once, with a way out: a celebration, or a quiet evening?
Before any cake, ask about allergies and quote the total, because food prices are before service charge and tax.
The desk may add a handwritten card on its own. Giving anything with a price for free is the Duty Manager's decision.
At two, a family wants the old wing with a baby. In all honesty, the new wing near the lift suits them better.
Say it at the desk, before they go up.
At three, the Sunrise group arrives, and five names are missing from the rooming list.
Check with the tour leader first. Rooms still in the allotment go to the guests standing at the desk.
Nobody is turned away because of a list.`,
        [
          {
            q: "Khách quen nhắc tới ngày kỷ niệm và muốn có bánh. Lễ tân làm gì trước khi đặt?",
            options: [
              "Đặt ngay một chiếc bánh để tạo bất ngờ cho khách",
              "Hỏi dị ứng và báo tổng tiền, vì giá chưa gồm phí phục vụ và thuế",
              "Hỏi Duty Manager xem có được tặng bánh miễn phí không",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Before any cake, ask about allergies and quote the total" — giá đồ ăn chưa gồm phí phục vụ và thuế.',
          },
          {
            q: "Đoàn tới mà năm khách không có tên trong danh sách. Lễ tân làm gì?",
            options: [
              "Từ chối nhận phòng vì danh sách đã chốt",
              "Bán cho năm khách đó phòng theo giá công bố trong ngày, không cần hỏi ai",
              "Hỏi trưởng đoàn; phòng còn trong khối thì giao cho khách",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "Check with the tour leader first. Rooms still in the allotment go to the guests standing at the desk."',
          },
          {
            q: "Gia đình có em bé muốn ở cánh cũ. Lễ tân nói thật thế nào, và khi nào?",
            options: [
              "Khen cánh cũ rất đẹp để khách vui lòng với lựa chọn của mình",
              "Ngay ở quầy: phòng cánh mới, gần thang máy, hợp hơn",
              "Không nói gì, vì đó là lựa chọn khách đã đặt từ trước",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "In all honesty, the new wing near the lift suits them better. Say it at the desk, before they go up."',
          },
        ],
      ),
      game: [
        game(
          "Could you put a chocolate cake in our room tonight? Just add it to the bill.",
          "With pleasure, madam. First, is anyone allergic to anything? Then I will quote you the total before I order the cake.",
          "With pleasure, madam. Is anyone allergic to anything? Then I will quoting the total before I order.",
          "With pleasure, madam. It will be there tonight, and you can see the price on your bill when you check out.",
          undefined,
          "Sau 'will' là động từ nguyên thể 'quote'. Câu hẹn xem giá trên hoá đơn lúc trả phòng nghe nhanh gọn nhưng bỏ hai việc bắt buộc: hỏi dị ứng và báo tổng tiền trước khi đặt.",
        ),
        game(
          "A guest at the desk is asking if anyone famous has stayed here. What can I tell her?",
          "Tell her the story of the building, but never who has stayed or is staying with us.",
          "Tell her the story of the building, but never who have stayed or is staying with us.",
          "Tell her a famous singer stayed in the heritage suite last year. Guests love that kind of story.",
          "colleague",
          "'who' làm chủ ngữ số ít đi với 'has stayed'. Câu kể một ca sĩ nổi tiếng từng ở đây đúng tiếng Anh nhưng phạm luật riêng tư: khách sạn không bao giờ nói ai đã ở hay đang ở.",
        ),
      ],
    }),

    L(40, 3, "Afternoon: Bookers and Business", "Buổi chiều: người đặt phòng doanh nghiệp", {
      vocabulary: [
        c("Like with like", "Compare like with like before you answer a price question."),
        c("Cut-off date", "Names that arrive after the cut-off date depend on what is still free."),
        c(
          "Day delegate rate",
          "The day delegate rate is quoted per person, before service charge and VAT.",
        ),
        c("Sales manager", "A discount on a meeting package is the Sales Manager's decision."),
        c("Read it back", "Read it back to the booker before you send it in writing."),
      ],
      grammar: [
        g(
          "Online is cheaper? Then book online.",
          "May we compare like with like, madam? The website rate is room only and non-refundable.",
          "Không cãi con số khách thấy. So sánh cùng điều kiện ('like with like'), nêu khác biệt cụ thể. 'rate' số ít đi với 'is'.",
          "May we compare like with like, madam? The website rate are room only and non-refundable.",
        ),
        g(
          "Your names are late. The rooms are gone.",
          "The cut-off date has passed, sir, so extra rooms now depend on availability.",
          "Hiện tại hoàn thành 'has passed': mốc đã qua và hệ quả còn tới bây giờ. Nói điều khoản, không trách khách.",
          "The cut-off date has pass, sir, so extra rooms now depend on availability.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "We need a meeting room for thirty people next month. What would you suggest?",
            "May I ask what the meeting is for first, sir? Then my proposal will fit what you need.",
            "Phần một của báo giá: hỏi nhu cầu trước, để bản đề xuất ('proposal') vừa với khách. Chưa nói phòng, chưa nói giá.",
          ),
          alsoAccept: [
            "May I ask what the meeting is for first, sir? Then I can propose the right room and layout.",
            "May I ask what the meeting is for first, sir? Then my proposal can fit what you need.",
          ],
        },
        sp(
          "Workshops, so lots of discussion in small teams.",
          "Then I would propose the Garden Room with U-shape seating, sir, and the breakout room for the small teams.",
          "Một phòng, một cách xếp ('U-shape'), và phòng phụ cho đúng nhu cầu làm việc nhóm.",
          undefined,
          undefined,
          "May I ask what the meeting is for first, sir? Then my proposal will fit what you need.",
        ),
        sp(
          "And the price per person?",
          "The day delegate rate covers the room, the projector, coffee breaks and lunch, per person, sir. I will quote the total, with service charge and VAT.",
          "Nói tên gói ('day delegate rate'), cái đã gồm và đơn vị tính ('per person'), rồi hứa báo tổng — giá gói chưa gồm phí phục vụ và VAT.",
          undefined,
          undefined,
          "Then I would propose the Garden Room with U-shape seating, sir, and the breakout room for the small teams.",
        ),
        {
          ...sp(
            "Your rooms are cheaper on a booking website than on your own site.",
            "I have checked, madam: that third-party rate is room only and non-refundable. May we compare like with like?",
            "Không cãi con số khách thấy: nói hai điều kiện khác biệt của giá bên thứ ba ('third-party', 'room only'), rồi mời so sánh cùng điều kiện ('like with like').",
          ),
          alsoAccept: [
            "I have checked, madam: that third-party rate is room only and non-refundable. Shall we compare like with like?",
            "I have checked, madam, and that rate is non-refundable. May we compare like with like before you decide?",
            "I have checked, madam, and that rate is non-refundable. Shall we compare like with like before you decide?",
          ],
        },
        {
          ...sp(
            "Our list is late. Can we still add three more people?",
            "The cut-off date has passed, madam, so unnamed rooms went back on sale. Extra rooms now depend on availability, at the published rate.",
            "Mốc đã qua ('cut-off date'): phòng chưa có tên đã được mở bán lại ('back on sale'), còn phòng thêm thì tuỳ phòng trống, theo giá công bố — nói như một sự việc, không trách khách.",
          ),
          alsoAccept: [
            "The cut-off date has passed, madam, so rooms without a name went back on sale. Extra rooms are now subject to availability, at the published rate.",
            "The cut-off date has passed, madam, so extra rooms depend on availability, at the published rate.",
            "The cut-off date has passed, madam, so extra rooms are subject to availability, at the published rate.",
          ],
        },
        {
          ...sp(
            "Have we agreed on everything, then?",
            "I believe so, madam. May I read back the agreed rate and terms before I send the quote in writing?",
            "Chốt thoả thuận: đọc lại mức giá đã thống nhất ('agreed rate') và các điều khoản trước, rồi mới gửi bằng văn bản.",
          ),
          alsoAccept: [
            "I believe so, madam. Shall I read back the agreed rate and terms before I send the quote in writing?",
            "I believe so, madam. May I read back the agreed rate and terms before I send them in writing?",
            "I believe so, madam. May I read it back to you before I send the quote in writing?",
            "I believe so, madam. May I read it back to you before I send it in writing?",
            "I think so, madam. May I read back the agreed rate and terms before I send the quote in writing?",
          ],
        },
        sp(
          "The booker wants the boardroom held for two weeks. Can I do that?",
          "Our tentative hold is seven days. Anything longer is an exception, so ask the Sales Manager before you promise.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Giữ chỗ tạm có hạn; dài hơn là một ngoại lệ ('exception') — việc của Sales Manager.",
          "colleague",
        ),
        sp(
          "Did the workshop booker get everything today?",
          "Yes. I read it back to them and sent the proposal in writing, so the next step is their signed contract.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: việc đã làm theo đúng thứ tự chốt một báo giá, rồi bước tiếp theo ('next step').",
          "manager",
        ),
        {
          ...sp(
            "Can you give us your weekday price for a Saturday meeting?",
            "We are firm on the rate, sir, because it is a peak weekend. What if we look at a midweek date?",
            "Nói không MỘT lần, kèm lý do thị trường ('firm on', 'peak weekend'), rồi mở một cánh cửa bằng 'What if we' với một ngày giữa tuần ('midweek').",
          ),
          alsoAccept: [
            "We are firm on the rate, sir, because it is a peak weekend. What if we look at a midweek date instead?",
            "We are firm on the rate at the weekend, sir. What if we look at a midweek date?",
          ],
        },
        {
          ...sp(
            "Your contract says a thirty per cent deposit. When is it due, and when do we pay the rest?",
            "Thirty per cent is due on signing, madam, and the balance is paid when the group checks out.",
            "Điều khoản tiền: bao nhiêu ('per cent'), khi nào ('on signing'), và phần còn lại ('balance') trả lúc nào.",
          ),
          alsoAccept: [
            "The thirty per cent deposit is due on signing, madam, and the balance is paid when the group checks out.",
            "It is due on signing, madam, and the balance is paid when the group checks out.",
            "Thirty per cent is due on signing, madam, and the balance when the group checks out.",
          ],
        },
      ],
      reading: read(
        `AFTERNOON CALLS — 14:00 TO 18:00
A booker wants a room for thirty people. Ask what the meeting is for before you propose anything.
Workshops in small teams: the Garden Room with U-shape seating, and the breakout room next door.
The day delegate rate covers the room, two coffee breaks and lunch, per person. Quote the total, with service charge and VAT.
If the booker wants to see the room, offer a site visit at a time that suits them.
A caller says a website is cheaper. Compare like with like: breakfast, cancellation, and the room they would get.
A group booker sends names after the cut-off date. Extra rooms are subject to availability, at the published rate.
Every discount, every longer hold and every later deadline goes to the Sales Manager.
Before a call ends, read it back. Then send it in writing the same afternoon.`,
        [
          {
            q: "Người đặt cần phòng cho hội thảo chia nhóm nhỏ. Đề xuất nào đúng?",
            options: [
              "Phòng Garden kiểu chữ U, kèm phòng họp nhóm nhỏ",
              "Phòng hội đồng, vì đó là phòng riêng tư nhất của khách sạn",
              "Phòng tiệc lớn nhất, để đoàn có thật nhiều chỗ đi lại",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi "Workshops in small teams: the Garden Room with U-shape seating, and the breakout room next door."',
          },
          {
            q: "Người đặt gửi tên sau ngày chốt. Phòng thêm tính thế nào?",
            options: [
              "Theo giá đoàn đã ký, vì vẫn là cùng một đoàn",
              "Tuỳ phòng trống, theo giá công bố",
              "Miễn phí, để giữ quan hệ tốt với người đặt",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Extra rooms are subject to availability, at the published rate."',
          },
          {
            q: "Người đặt xin dời hạn chót và giảm giá. Ai quyết?",
            options: [
              "Lễ tân đang nghe máy, nếu đoàn đủ lớn",
              "Trưởng ca lễ tân, qua điện thoại",
              "Sales Manager, người quyết mọi khoản giảm giá và hạn chót",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "Every discount, every longer hold and every later deadline goes to the Sales Manager."',
          },
        ],
      ),
      game: [
        game(
          "Can you hold the Garden Room for us for a month while we decide?",
          "I can hold it for seven days, sir. For longer, I will ask our Sales Manager today.",
          "I can hold it for seven days, sir. For longer, I will asking our Sales Manager today.",
          "Of course, sir. Take a month, or even two. We will keep it for you until you are ready to sign.",
          undefined,
          "Sau 'will' là động từ nguyên thể 'ask'. Câu giữ phòng một hai tháng nghe hào phóng nhưng vượt quyền: giữ chỗ tạm là bảy ngày, lâu hơn là quyết định của Sales Manager.",
        ),
        game(
          "Is the day delegate rate the full price, or is there more to pay?",
          "It is before service charge and VAT, madam, so let me quote the total for your group.",
          "That is everything, madam. There is nothing more to pay, and the price on the website are final.",
          "That is everything, madam. There is nothing more to pay, and the price on the website is final.",
          undefined,
          "Hai câu 'nothing more to pay' đều sai sự thật: giá gói hội nghị chưa gồm phí phục vụ và VAT — phải báo tổng. Câu 'the price… are final' còn sai: 'the price' số ít đi với 'is'.",
        ),
      ],
    }),

    L(40, 4, "Evening and Night: When Something Goes Wrong", "Buổi tối và ca đêm: khi có sự cố", {
      vocabulary: [
        c("Assembly point", "Every guest goes to the assembly point, and the guest list goes too."),
        c(
          "Not accounted for",
          "A room stays not accounted for until someone sees the guest outside.",
        ),
        c("Priority", "When three things happen at once, the person in danger is the priority."),
        c("By name", "At the end of a shift, every open task goes to a colleague by name."),
      ],
      grammar: [
        g(
          "It is probably a test. Stay in your room.",
          "The fire alarm has been triggered, sir. Please take the stairwell to the assembly point now.",
          "Không đoán nguyên nhân. Nói sự việc bằng bị động 'has been triggered', rồi MỘT việc khách làm ngay.",
          "The fire alarm has been trigger, sir. Please take the stairwell to the assembly point now.",
        ),
        g(
          "Leave it, the night shift will see it.",
          "I have written it in the log, and I am handing it to Huy by name.",
          "Cuối ca: hiện tại hoàn thành 'have written' cho việc đã ghi xong, rồi giao đích danh ('by name'). Không để việc cho 'ca sau' chung chung.",
          "I have write it in the log, and I am handing it to Huy by name.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "The alarm is going off. Should we wait in the room for news?",
            "No, madam. Please take the stairwell to the assembly point now.",
            "Câu phải đúng của tuần: chuông báo cháy thì rời phòng ngay bằng cầu thang ('stairwell') tới điểm tập kết ('assembly point') — không ở lại chờ tin.",
            undefined,
            ["stairwell", "assembly", "point"],
          ),
          alsoAccept: [
            "No, madam. Please use the stairwell to the assembly point now.",
            "No, madam. Please take the stairs to the assembly point now.",
            "No, madam. Please go to the assembly point now, by the stairwell.",
            "No, madam. Please leave now and take the stairwell to the assembly point.",
            "No, madam. Please take the stairwell to the assembly point now, and we will update you there.",
            "No, madam. Please take the stairwell, not the lift, to the assembly point now.",
          ],
        }),
        sp(
          "My husband uses a wheelchair. He cannot manage the stairs.",
          "Then please stay in the room with him, madam, and keep the door closed. I am giving the fire team your room number now.",
          "Khách sạn không có gian lánh nạn: người không đi cầu thang được thì ở lại phòng, đóng cửa, và quầy báo số phòng cho đội cứu hoả.",
          undefined,
          undefined,
          "No, madam. Please take the stairwell to the assembly point now.",
        ),
        sp(
          "How will the firefighters know where we are?",
          "The fire team has your room number, madam, and I will stay on the phone with you until they arrive.",
          "Không hứa giờ thay đội cứu hoả. Nói điều đã làm (số phòng đã báo), và việc mình giữ được: ở lại trên máy với khách.",
          undefined,
          undefined,
          "Then please stay in the room with him, madam, and keep the door closed. I am giving the fire team your room number now.",
        ),
        {
          ...sp(
            "The lights went out and the air-conditioning stopped. What is happening?",
            "A power cut, sir. The generator is starting now, and I will call you back in fifteen minutes with news.",
            "Nói điều đang xảy ra, việc đang làm, và MỘT mốc mình tự giữ được — không đoán khi nào có điện lại.",
          ),
          alsoAccept: [
            "There is a power cut, sir. The generator is starting now, and I will call you back in fifteen minutes with news.",
          ],
        },
        {
          ...sp(
            "The fire panel is beeping, a guest wants his bill, and the phone is ringing. What first?",
            "Someone in danger is the priority, so report the zone on the fire panel to Security now. Then the guest, then the phone.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Tủ báo cháy ('fire panel') reo nghĩa là có thể có người gặp nguy ('someone in danger') — đó là ưu tiên ('priority'), rồi khách trước mặt, rồi điện thoại.",
            "colleague",
          ),
          alsoAccept: [
            "The fire panel is the priority. Report the zone to Security now, and then the guest and the phone.",
          ],
        },
        sp(
          "One guest refused to leave and another did not answer. How do I report them?",
          "Both rooms are not accounted for. Give the fire officer both room numbers, and say that one guest refused to evacuate.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Không đoán khách nào đã ra ngoài: cả hai phòng là 'not accounted for'. Với đội cứu hoả thì nói SỐ PHÒNG ('room numbers'), không chỉ nói tầng.",
          "colleague",
        ),
        {
          ...sp(
            "I know it is late, but can you arrange a car to the airport for six?",
            "Certainly, sir. It is in the log now, and Huy on the night shift will confirm the car with you before eleven.",
            "Việc mới lúc cuối ca: ghi sổ, giao cho một người có tên, và nói cho khách TÊN người sẽ xác nhận và khi nào — không nói chung chung là một đồng nghiệp.",
          ),
          alsoAccept: [
            "Certainly, sir. It is in the log now, and my colleague Huy on the night shift will confirm the car with you before eleven.",
          ],
        },
        {
          ...sp(
            "Before you go, what is still open?",
            "One open item: an airport car, handed to Huy by name. It is in the log for the incoming shift.",
            "Báo cáo lên cấp trên, không gọi sir hay madam: việc còn dở ('open item'), đã giao cho ai ('by name'), và ghi ở đâu cho ca sau ('incoming shift').",
            "manager",
          ),
          alsoAccept: [
            "One open item: an airport car, handed to Huy by name and in the log for the incoming shift.",
          ],
        },
        {
          ...sp(
            "We are freezing out here. Can we go back to our room now?",
            "Not yet, sir. Only the fire officer gives the all-clear, and I will tell you the moment we have it.",
            "Ở điểm tập kết: chỉ cán bộ phòng cháy cho quay vào ('all-clear'). Không đoán thay; hứa việc của mình — báo khách ngay khi có tín hiệu.",
          ),
          alsoAccept: [
            "Not yet, sir. Only the fire officer can give the all-clear, and I will tell you as soon as we have it.",
          ],
        },
        {
          ...sp(
            "Is my colleague Mr Lee back in his room yet? I have a document for him.",
            "I am sorry, sir, I cannot tell you anything about another guest, but you are welcome to leave a message.",
            "Riêng tư, cả lúc đêm khuya: không xác nhận khách khác có ở đây hay đã về chưa ('another guest'), nhưng mời người hỏi để lại lời nhắn.",
          ),
          alsoAccept: [
            "I am sorry, sir, I cannot say who is staying with us, but you are welcome to leave a message.",
            "I am sorry, sir, I cannot tell you anything about another guest. May I take a message?",
          ],
        },
      ],
      reading: read(
        `THE LAST HOURS — 21:30 TO 02:00
At 21:50, a guest asks for an airport car. It is a new task in the last fifteen minutes.
So it goes in the log, and to Huy on the night shift, by name. The guest is told it is Huy who will call.
At 23:10, the fire alarm sounds on the sixth floor. The desk stays at the desk, reads the zone and confirms that 114 has been called.
Every caller hears the same words: take the stairwell, not the lift, and go to the assembly point.
A guest who uses a wheelchair stays in the room with the door closed. The fire team gets the room number.
One guest refuses to leave, and one does not answer the phone. Both rooms stay not accounted for until someone sees the guests outside.
At 23:40, the fire officer gives the all-clear. Nobody goes back in before that.
At 01:30, the power goes. The generator starts, and every caller is called back in fifteen minutes.
Through all of it, the order holds: someone in danger first, then the guest in front of you, then the phone.`,
        [
          {
            q: "Lúc 21:50 khách nhờ đặt xe ra sân bay. Vì sao lễ tân không tự đặt?",
            options: [
              "Vì xe ra sân bay chỉ được đặt trong giờ hành chính buổi sáng",
              "Vì là việc mới lúc cuối ca: ghi sổ, giao đích danh",
              "Vì khách phải tự gọi xe qua ứng dụng trên điện thoại",
            ],
            correct: 1,
            explanation:
              'Bài đọc ghi "It is a new task in the last fifteen minutes. So it goes in the log, and to Huy on the night shift, by name." — và khách được báo tên người sẽ gọi.',
          },
          {
            q: "Khi chuông báo cháy reo, lễ tân nói gì với mọi người gọi tới?",
            options: [
              "Có lẽ chỉ là diễn tập thôi, xin quý khách cứ ở yên trong phòng",
              "Đi thang máy xuống sảnh cho nhanh",
              "Đi cầu thang, không đi thang máy, tới điểm tập kết",
            ],
            correct: 2,
            explanation:
              'Bài đọc ghi "take the stairwell, not the lift, and go to the assembly point."',
          },
          {
            q: "Một khách từ chối rời phòng, một khách không nghe máy. Báo thế nào?",
            options: [
              "Ghi cả hai là đã sơ tán để danh sách cho gọn",
              "Chỉ báo khách từ chối, vì khách kia chắc đã ra ngoài",
              "Cả hai phòng là chưa xác định, tới khi có người thấy khách ở ngoài",
            ],
            correct: 2,
            explanation:
              'Bài đọc ghi "Both rooms stay not accounted for until someone sees the guests outside."',
          },
        ],
      ),
      game: [
        game(
          "Is this alarm real, or should we just go back to sleep?",
          "We do not know yet, sir, so please take the stairwell to the assembly point now.",
          "It is almost certainly a test at this time of night, sir, so you can staying in bed and I will call you if it is real.",
          "It is almost certainly a test at this time of night, sir, so you can stay in bed and I will call you if it is real.",
          undefined,
          "Hai câu 'almost certainly a test… stay in bed' đều đoán nguyên nhân và giữ khách trong toà nhà — đúng hai điều không bao giờ được làm. Câu 'you can staying' còn sai: sau 'can' là động từ nguyên thể 'stay'.",
        ),
        game(
          "It is five to ten. A guest wants to change his booking dates. Shall I start?",
          "No. Write it in the handover log and give it to a night-shift colleague by name, so the guest knows who will call.",
          "No. Write it in the log and gives it to a night colleague by name, so the guest knows who will call.",
          "Leave it for tomorrow. The guest can come back to the desk in the morning and ask whoever is on then.",
          "colleague",
          "Hai mệnh lệnh nối bằng 'and' đều ở dạng nguyên thể: 'Write… and give'. Câu để việc tới mai cho người trực lúc đó đúng tiếng Anh nhưng không giao cho ai cả — việc mới lúc cuối ca phải ghi sổ và giao đích danh.",
        ),
      ],
    }),
  ],
};
