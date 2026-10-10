// FO week 35 — light negotiation, with guests and inside the hotel (see ../kit.ts).
//
//  · The desk never moves a rate, matches a price or holds a rate for a
//    future stay: it compares like with like, and asks — "Let me check with
//    my supervisor", "I will ask my Duty Manager". Never "I will hold this
//    rate".
//  · It offers what is its own to give, at no extra charge: a higher floor
//    in the same category, the quieter side, a welcome drink, luggage
//    storage. "However, I can…". Breakfast, an upgrade, a waived fee are not
//    the desk's.
//  · It asks for something back, and lets the Duty Manager decide: "In
//    exchange for a longer stay, my Duty Manager may look at the rate."
//  · It says no once, with a reason from the market, and opens a door on
//    different terms ("What if we look at a midweek date?"). A guest who
//    raises their voice gets the Duty Manager, not a discount.
//  · Inside the hotel it opens with "What if we…?", meets halfway, and reads
//    every agreement back and puts it on the booking.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "I have checked, sir. That rate is non-refundable and room only. May we compare like with like?";
const t1b =
  "Breakfast and free cancellation, sir, and I can quote the total now, with tax and service included.";
const t1c =
  "Of course, sir, it is your choice. If your plans change, we are always happy to help you book direct.";

const t2a =
  "I cannot change the rate, sir. However, I can offer you a higher floor at no extra charge.";
const t2b =
  "That is true, sir. In exchange for a longer stay, my Duty Manager may look at the rate. Shall I ask?";
const t2c =
  "Thank you, sir. I will ask my Duty Manager now and chase it up myself before you go up.";

const t3a = "Not this weekend, madam. We are firm on the rate, because it is a peak weekend.";
const t3b =
  "What if we look at a midweek date, madam? Our midweek rate is lower than the weekend rate.";
const t3c = "I cannot hold the rate, madam, but I will ask my Duty Manager now.";

const t4a =
  "What if we give her a clean room in the same category? Is there one free at short notice?";
const t4b = "Then I will ask her first. If she agrees, please release that room to the desk now.";
const t4c =
  "Not today, so please clean it as normal. In exchange, I will update the room status myself.";

export const week: AuthoredWeek = {
  canDo:
    "Nói được: thương lượng mà không hạ giá — so sánh cùng điều kiện, đưa thứ quầy tự cho được ('However, I can…'), xin lại một điều ('In exchange for…') và để cấp trên quyết giá; với đồng nghiệp thì mở lời bằng 'What if we' và đọc lại thoả thuận.",
  lessons: [
    L(35, 1, "Like with Like", "So sánh cùng điều kiện", {
      vocabulary: [
        c("Third party", "That price comes from a third party, sir, not from the hotel.", [
          "/θɜːd ˈpɑːti/",
          "Bên thứ ba (trang đặt phòng trung gian)",
          "🌐",
        ]),
        c("Non-refundable", "The cheaper rate is non-refundable and paid in advance.", [
          "/ˌnɒn rɪˈfʌndəbl/",
          "Không được hoàn tiền",
          "🚫",
        ]),
        c("Like with like", "May we compare like with like, madam?", [
          "/laɪk wɪð laɪk/",
          "So sánh cùng điều kiện",
          "🟰",
        ]),
        c("Book direct", "Guests who book direct can ask for a floor and a side.", [
          "/bʊk dəˈrekt/",
          "Đặt phòng trực tiếp với khách sạn",
          "📞",
        ]),
        c("Room only", "The cheaper rate is room only, without breakfast.", [
          "/ruːm ˈəʊnli/",
          "Chỉ có phòng, không kèm bữa sáng",
          "🛏️",
        ]),
      ],
      grammar: [
        g(
          "That website price is wrong.",
          "I have checked that site, madam, and the cheaper rate is non-refundable and room only.",
          "Hiện tại hoàn thành 'I have checked': đã xem rồi, kết quả còn đúng lúc này. Không nói trang kia sai — giá thường có thật, chỉ là sản phẩm khác.",
          "I have check that site, madam, and the cheaper rate is non-refundable and room only.",
        ),
        g(
          "You want cheap or you want good?",
          "May we compare like with like, sir? Our rate includes breakfast and free cancellation.",
          "'May we…?' kéo khách về cùng phía bàn: so sánh là việc HAI người cùng làm. 'Our rate' số ít nên 'includes' có -s.",
          "May we compare like with like, sir? Our rate include breakfast and free cancellation.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "A booking website shows your room forty dollars cheaper than your price.",
            t1a,
            "Không cãi con số khách thấy. 'I have checked' rồi nêu hai điều kiện khác, và mời so sánh 'like with like'.",
          ),
          alsoAccept: [
            "I have checked, sir. That rate is non-refundable and room only. Shall we compare like with like?",
            "I have checked, sir. That rate is room only and non-refundable. May we compare like with like?",
          ],
        },
        sp(
          "Fine. What does your rate include?",
          t1b,
          "Nói đúng hai điều giá của mình có mà giá kia không có, rồi đề nghị báo tổng ('quote the total') — tiền phòng đã gồm thuế và phí.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Hmm. I still prefer the cheaper one.",
          t1c,
          "Khách chọn giá kia thì vui vẻ nhận. Không thuyết phục thêm; để ngỏ cửa 'book direct' cho lần sau.",
          undefined,
          undefined,
          t1b,
        ),
        risk({
          ...sp(
            "Just match the website price and I will book now.",
            "I cannot change the price, sir, but I can check with my supervisor now.",
            "Câu phải đúng của tuần: quầy không khớp giá. Nói điều mình không làm được, rồi hỏi cấp trên ngay — không hứa.",
            undefined,
            ["price", "supervisor"],
          ),
          alsoAccept: [
            "I am not able to change the price, sir, but I can check with my supervisor now.",
            "I cannot change the price, sir. Let me check with my supervisor now.",
            "I cannot match that price, sir, but I can check with my supervisor now.",
            "I cannot match the website price, sir, but I will check with my supervisor now.",
            "I am not able to match that price myself, sir, but let me check with my supervisor now.",
          ],
        }),
        sp(
          "The guest says the website is cheaper. Should I tell him the site is wrong?",
          "No. A third-party price is usually real. Compare like with like: breakfast, cancellation and the room he gets.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Giá của bên thứ ba ('third-party') thường có thật — so sánh từng điều kiện, không cãi.",
          "colleague",
        ),
        {
          ...sp(
            "Is the price on your own website the same as here?",
            "It should be the same, madam. If it is not, I will look into it now and come back to you.",
            "Không hứa khớp giá. Nói điều nên đúng, rồi hứa tìm hiểu ngay và quay lại với khách.",
          ),
          alsoAccept: [
            "It should be the same, madam. If not, I will look into it now and come back to you.",
          ],
        },
      ],
      reading: read(
        `RATE OBJECTIONS AT THE DESK — WHAT A THIRD-PARTY PRICE USUALLY HIDES
Non-refundable and paid in advance: the guest pays now and loses everything on a change. Our direct rate cancels free up to 18:00 on the day of arrival.
Room only: breakfast is 380,000 VND per person if bought separately.
Any room in the category: the site sells a category, and we choose the room. A guest who books direct can ask for a floor and a side.
NEVER say the site is wrong, or that the guest misread it. The price is usually real; it is the product that is different.
Compare like with like, out loud, item by item.
The desk does not match a price. If the guest asks, check with your supervisor.
If the guest still prefers the other price, accept it graciously. Record the EVENT, never a label: "Quoted direct rate; guest chose the prepaid third-party rate."`,
        [
          {
            q: "Theo tài liệu, giá trên trang trung gian thường là gì?",
            options: [
              "Sai, do trang web hiển thị nhầm",
              "Có thật, nhưng là một sản phẩm khác",
              "Chỉ dành riêng cho khách nước ngoài đặt sớm",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "The price is usually real; it is the product that is different."',
          },
          {
            q: "Khách đòi khớp giá trang trung gian thì lễ tân làm gì?",
            options: [
              "Khớp giá ngay để giữ khách",
              "Hỏi ý kiến cấp trên, vì quầy không tự khớp giá",
              "Nói khách sạn không bao giờ khớp giá",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "The desk does not match a price. If the guest asks, check with your supervisor."',
          },
        ],
      ),
      game: [
        game(
          "Your own website is cheaper than the price you just gave me.",
          "May I look at the screen with you, madam? If the conditions are the same, I will check with my supervisor.",
          "The desk rate and the online rate are set by different team, madam, so they can be quite different from each other.",
          "The desk rate and the online rate are set by different teams, madam, so they can be quite different from each other.",
          undefined,
          "Hai câu 'set by different teams' đều gạt khách đi — trước hết phải cùng khách xem điều kiện có giống nhau không. Câu 'different team' còn thiếu -s số nhiều: 'different teams'.",
        ),
        game(
          "So your price is just higher. Why should I pay it?",
          "May we compare like with like, sir? Ours includes breakfast, and the other rate is room only.",
          "May we compare like with like, sir? Ours include breakfast, and the other rate is room only.",
          "Because we are a five-star hotel, sir, and our guests expect to pay for quality.",
          undefined,
          "'Ours' ở đây là một mức giá (số ít), nên 'includes'. Câu 'we are a five-star hotel' đúng ngữ pháp nhưng ra vẻ bề trên — khách cần so sánh từng điều kiện.",
        ),
      ],
    }),

    L(35, 2, "What We Can Offer Instead of a Discount", "Đưa thứ khác thay vì giảm giá", {
      vocabulary: [
        c("At no extra charge", "I can give you a higher floor at no extra charge.", [
          "/ət nəʊ ˈekstrə tʃɑːdʒ/",
          "Không tính thêm phí",
          "🆓",
        ]),
        c("However", "I cannot change the rate. However, I can offer you a quiet room.", [
          "/haʊˈevə/",
          "Tuy nhiên",
          "🔀",
        ]),
        c("In exchange for", "In exchange for a longer stay, my manager may look at the rate.", [
          "/ɪn ɪksˈtʃeɪndʒ fɔː/",
          "Để đổi lấy",
          "🔄",
        ]),
        c("Same category", "A higher floor in the same category costs nothing extra.", [
          "/seɪm ˈkætəɡəri/",
          "Cùng hạng phòng",
          "🏷️",
        ]),
      ],
      grammar: [
        g(
          "No discount. Take it or leave it.",
          "I cannot change the rate, madam. However, I can offer you a higher floor at no extra charge.",
          "'However' mở câu thứ hai, có dấu phẩy sau nó: giữ nguyên giá mà vẫn mở một cánh cửa. Sau 'can' là động từ nguyên thể.",
          "I cannot change the rate, madam. However, I can offering you a higher floor at no extra charge.",
        ),
        g(
          "If you pay more, I give you late check-out.",
          "In exchange for a longer stay, sir, my Duty Manager may look at the rate.",
          "'In exchange for + danh từ': nói điều mình xin lại. Đổi giá là việc của cấp trên, nên dùng 'may' — không hứa. Sau 'may' là động từ nguyên thể.",
          "In exchange for a longer stay, sir, my Duty Manager may looks at the rate.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "Come on, give me ten percent off. I stay here four times a year.",
            t2a,
            "Câu phải đúng của tuần: không giảm giá. 'However, I can' đưa thứ quầy tự cho được — tầng cao hơn cùng hạng, không tính thêm.",
            undefined,
            ["rate", "however", "offer", "higher", "floor", "extra", "charge"],
          ),
          alsoAccept: [
            "I am not able to change the rate, sir. However, I can offer you a higher floor at no extra charge.",
            "I cannot change the rate, sir. However, I could offer you a higher floor at no extra charge.",
            "I cannot change the rate, sir. However, I can give you a higher floor at no extra charge.",
            "I cannot change the rate, sir, but I can still offer you a higher floor at no extra charge.",
            "I cannot give you a discount, sir. However, I can offer you a higher floor at no extra charge.",
            "I cannot change the rate, sir. However, I can offer you a higher floor in the same category at no extra charge.",
          ],
        }),
        sp(
          "That is nice, but it is not a discount.",
          t2b,
          "Đồng ý với khách, rồi xin lại một điều bằng 'in exchange for'. Giá là của Duty Manager: 'may', và hỏi khách có muốn mình hỏi không.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Yes, ask. I could stay until Sunday.",
          t2c,
          "Hứa việc của chính mình: hỏi ngay và tự đôn đốc ('chase it up'), không hứa kết quả.",
          undefined,
          undefined,
          t2b,
        ),
        {
          ...sp(
            "Every other hotel gives me something. What can you do?",
            "Quite a lot, madam: a higher floor in the same category and a welcome drink, at no extra charge.",
            "Đưa những thứ quầy tự cho được TRƯỚC: tầng cao cùng hạng, đồ uống chào mừng — và nói rõ không tính thêm.",
          ),
          alsoAccept: [
            "Quite a lot, madam: a higher floor in the same category, and a welcome drink at no extra charge.",
          ],
        },
        sp(
          "The guest in the lobby wants breakfast for free. Can I just say yes?",
          "No. Breakfast is not ours to give. However, we can offer a higher floor and ask the Duty Manager.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Phân biệt rõ thứ của quầy và thứ phải hỏi Duty Manager.",
          "colleague",
        ),
        {
          ...sp(
            "What do I get if I book three nights instead of two?",
            "In exchange for a third night, madam, my Duty Manager may offer a better rate. Shall I ask now?",
            "'In exchange for' + điều khách cho thêm, rồi 'may' cho quyết định của cấp trên. Hỏi khách trước khi đi hỏi.",
          ),
          alsoAccept: [
            "In exchange for a third night, madam, my Duty Manager may offer you a better rate. Shall I ask now?",
          ],
        },
      ],
      reading: read(
        `WHAT THE DESK CAN OFFER INSTEAD OF A DISCOUNT
The desk does not move a rate. It can offer things that are the desk's to give, at no extra charge.
A higher floor in the same category. The quieter side. A welcome drink, which is part of our arrival service. Luggage storage.
Offer these FIRST. A guest who accepts a higher floor often stops asking about the rate.
Anything with a price is not the desk's to give away: breakfast, a category upgrade, an airport transfer, spa credit, or a waived fee.
Ask for something back, and let the Duty Manager decide. "In exchange for a longer stay, my Duty Manager may look at the rate."
Never say "I will hold this rate". Say "I will ask".
A promise you then have to take back costs more than the discount would have.`,
        [
          {
            q: "Món nào quầy tự đưa được mà không cần hỏi ai?",
            options: [
              "Bữa sáng miễn phí cho hai người",
              "Phòng tầng cao hơn trong cùng hạng",
              "Nâng lên hạng phòng cao hơn vào cuối tuần",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "A higher floor in the same category" trong danh sách quầy tự cho được; bữa sáng và nâng hạng thì "not the desk\'s to give away".',
          },
          {
            q: "Vì sao không được nói 'I will hold this rate'?",
            options: [
              "Vì đó là việc của Duty Manager; quầy chỉ nói 'I will ask'",
              "Vì khách sẽ nghĩ mức giá này quá rẻ",
              "Vì hệ thống đặt phòng không cho giữ giá",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi "let the Duty Manager decide", "Say \'I will ask\'" và "A promise you then have to take back costs more than the discount would have."',
          },
        ],
      ),
      game: [
        game(
          "I stay here every month. Surely you can do something on the price?",
          "I am afraid the rate stays as it is, sir, but I can put you on the quieter side, with a welcome drink.",
          "Of course, sir. As a regular guest, you can having ten percent off the rate tonight.",
          "Of course, sir. As a regular guest, you can have ten percent off the rate tonight.",
          undefined,
          "Hai câu cho khách quen giảm mười phần trăm đều vượt quyền: quầy không đổi giá, chỉ đưa thứ của quầy — phía yên tĩnh, đồ uống chào mừng. Câu 'you can having' còn sai: sau 'can' là động từ nguyên thể 'have'.",
        ),
        game(
          "If I stay an extra night, will you give me a better rate?",
          "In exchange for an extra night, madam, my Duty Manager may look at the rate. Shall I ask for you now?",
          "In exchange for an extra night, madam, my Duty Manager may looks at the rate. Shall I ask?",
          "Yes, madam. If you stay an extra night, I will give you twenty percent off the whole stay.",
          undefined,
          "Sau 'may' là động từ nguyên thể 'look'. Câu hứa giảm hai mươi phần trăm nghe hào phóng nhưng vượt quyền — giá là quyết định của Duty Manager.",
        ),
      ],
    }),

    L(35, 3, "Holding the Line, Opening a Door", "Giữ giá mà vẫn mở một cánh cửa", {
      vocabulary: [
        c("Hold the rate", "Only the Duty Manager can hold the rate for a future stay.", [
          "/həʊld ðə reɪt/",
          "Giữ mức giá",
          "🔒",
        ]),
        c("Firm on", "We are firm on the rate this weekend.", [
          "/fɜːm ɒn/",
          "Giữ nguyên, không đổi",
          "🪨",
        ]),
        c("Peak weekend", "This is a peak weekend, so the rate will not move.", [
          "/piːk ˌwiːkˈend/",
          "Cuối tuần cao điểm",
          "📈",
        ]),
        c("Midweek", "Our midweek rate is lower than the weekend rate.", [
          "/ˌmɪdˈwiːk/",
          "Giữa tuần",
          "🗓️",
        ]),
      ],
      grammar: [
        g(
          "No. The price is the price.",
          "We are firm on the rate this weekend, madam, because it is a peak weekend.",
          "Mệnh đề 'because' biến lời từ chối thành một sự thật thị trường. Không có 'because', câu chỉ còn là ý muốn của bạn. 'We' đi với 'are'.",
          "We is firm on the rate this weekend, madam, because it is a peak weekend.",
        ),
        g(
          "Maybe I can do something, I am not sure.",
          "What if we look at a midweek date, sir? The rate is lower from Monday to Thursday.",
          "'What if we + động từ nguyên thể…?' mời khách cùng tìm phương án. Đừng nói 'maybe' khi câu trả lời là không: khách sẽ hỏi lại.",
          "What if we looking at a midweek date, sir? The rate is lower from Monday to Thursday.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "So there is really nothing you can do on the price this weekend?",
            t3a,
            "Nói không MỘT lần, rõ ràng, kèm lý do thị trường ('because it is a peak weekend') — không lấy 'chính sách' làm lý do.",
          ),
          alsoAccept: [
            "Not this weekend, madam. We are firm on the rate because it is a peak weekend.",
            "I am sorry, madam, not this weekend. We are firm on the rate, because it is a peak weekend.",
          ],
        },
        sp(
          "That is a shame. We wanted to come back soon.",
          t3b,
          "Lời từ chối luôn đi kèm một cánh cửa: 'What if we' với giá giữa tuần đã niêm yết — không phải giảm giá.",
          undefined,
          undefined,
          t3a,
        ),
        risk({
          ...sp(
            "Midweek could work. Can you keep today's price for us?",
            t3c,
            "Câu phải đúng của tuần: giữ giá cho một lần ở sau là quyết định của Duty Manager. Quầy hỏi, không hứa.",
            undefined,
            ["hold", "rate", "duty", "manager"],
            t3b,
          ),
          alsoAccept: [
            "I am not able to hold the rate, madam, but I will ask my Duty Manager now.",
            "I cannot hold the rate, madam. May I ask my Duty Manager now?",
            "I cannot hold the rate myself, madam, but I will ask the manager on duty now.",
            "I cannot hold the rate, madam. That is my Duty Manager's decision, so I will ask now.",
            "I cannot keep today's price, madam, but I will ask my Duty Manager now.",
          ],
        }),
        {
          ...sp(
            "I will just book somewhere else, then.",
            "I understand, sir. If you change your mind, I am happy to look at a midweek date with you.",
            "Không níu kéo, không phật ý. Để ngỏ đúng cánh cửa đã mở: một ngày giữa tuần.",
          ),
          alsoAccept: [
            "I understand, sir. If you change your mind, I would be happy to look at a midweek date with you.",
          ],
        },
        sp(
          "This is ridiculous! I want to speak to someone who can decide!",
          "Of course, sir. I am calling my Duty Manager now, and I will stay here with you.",
          "Khách to tiếng thì ngừng mặc cả, gọi Duty Manager ngay, và ở lại với khách — không giảm giá để dập lửa.",
        ),
        sp(
          "A guest wants this weekend's rate held for March. What did you tell him?",
          "That I cannot hold the rate, and that I would ask you. In exchange for the rate, he would stay longer.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: mình đã nói gì với khách, và khách đề nghị đổi lại điều gì.",
          "manager",
        ),
      ],
      reading: read(
        `HOLDING A RATE — DESK GUIDANCE
Say no ONCE, clearly, with a reason from the market, not from policy. "It is a peak weekend" works. "That is our policy" invites a second try.
Never say "maybe" or "let me see what I can do" when the answer is no. A guest who hears maybe will ask again at check-out.
Always pair a firm no with an open door on different terms. "What if we look at a midweek date?" is the desk's door, because the published midweek rate is lower.
Holding a rate for a future stay is the Duty Manager's decision. The desk asks; it never promises.
If the guest becomes personal or raises their voice, stop negotiating and call the Duty Manager. A rate is never worth a scene in the lobby.
Record every request in the profile, with the date and the name of whoever decided it.`,
        [
          {
            q: "Vì sao không được nói 'maybe' khi câu trả lời là không?",
            options: [
              "Vì khách sẽ hỏi lại lúc trả phòng",
              "Vì quản lý cấm mọi từ mơ hồ khi báo giá cho khách",
              "Vì khách sẽ nghĩ nhân viên không thuộc bảng giá",
            ],
            correct: 0,
            explanation: 'Tài liệu ghi "A guest who hears maybe will ask again at check-out."',
          },
          {
            q: "Khách to tiếng khi mặc cả thì làm gì?",
            options: [
              "Giảm một chút để hạ nhiệt",
              "Ngừng mặc cả và gọi Duty Manager",
              "Giải thích lại cho tới khi khách hiểu rõ",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "stop negotiating and call the Duty Manager. A rate is never worth a scene in the lobby."',
          },
          {
            q: "Giữ giá cho một lần ở sau là quyết định của ai?",
            options: [
              "Lễ tân đang trực",
              "Duty Manager — quầy chỉ hỏi, không bao giờ hứa",
              "Bộ phận kế toán",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Holding a rate for a future stay is the Duty Manager\'s decision. The desk asks; it never promises."',
          },
        ],
      ),
      game: [
        game(
          "Forget it. We will stay with my sister in town instead.",
          "Of course, madam. If a weekday suits you better, our midweek rate is lower, and I am happy to check dates.",
          "Of course, madam. If a weekday will suit you better, our midweek rate is lower, and I am happy to check dates.",
          "That is your choice, madam. Enjoy your stay with your sister.",
          undefined,
          "Sau 'If' (điều kiện loại 1) dùng hiện tại đơn 'suits', không dùng 'will suit'. Câu 'That is your choice' đúng ngữ pháp nhưng đóng sập cửa — tài liệu dặn luôn để ngỏ một phương án khác, như một ngày giữa tuần.",
        ),
        game(
          "Can you promise me this price for my next visit?",
          "I cannot promise that, sir, but I will ask my Duty Manager to hold the rate.",
          "Of course, sir. I will holding this rate for you, whenever you decide to come back to us.",
          "Of course, sir. I will hold this rate for you, whenever you decide to come back to us.",
          undefined,
          "Hai câu 'I will hold this rate for you' đều nghe chiều khách nhưng vượt quyền — đúng câu tài liệu cấm; giữ giá cho lần sau là việc Duty Manager quyết. Câu 'I will holding' còn sai: sau 'will' là động từ nguyên thể 'hold'.",
        ),
      ],
    }),

    L(35, 4, "Negotiating Inside the Hotel", "Thương lượng trong nội bộ", {
      vocabulary: [
        c("What if we", "What if we move the guest to a room that is already clean?", [
          "/wɒt ɪf wiː/",
          "Nếu chúng ta… thì sao?",
          "💡",
        ]),
        c("Meet halfway", "Can we meet halfway: I take your calls, and you take mine later?", [
          "/miːt ˌhɑːfˈweɪ/",
          "Mỗi bên nhường một nửa",
          "🤲",
        ]),
        c("Read it back", "May I read it back to you before I confirm?", [
          "/riːd ɪt bæk/",
          "Đọc lại để xác nhận",
          "🔁",
        ]),
        c("Agreed rate", "The agreed rate is on your confirmation.", [
          "/əˈɡriːd reɪt/",
          "Mức giá đã thống nhất",
          "🧾",
        ]),
      ],
      grammar: [
        g(
          "You must give me a clean room now.",
          "What if we give the guest a clean room in the same category?",
          "Mở bằng câu hỏi 'What if we', không bằng mệnh lệnh: bên kia đồng ý được mà không mất mặt. Sau 'What if we' là động từ nguyên thể.",
          "What if we gives the guest a clean room in the same category?",
        ),
        g(
          "Okay, done. See you at check-in.",
          "May I read it back to you, madam? A higher floor and a welcome drink, at the agreed rate.",
          "Đọc lại từng mục trước khi chốt: hai bên nhớ khác nhau là nguồn gốc của mọi cuộc cãi lúc thanh toán. Sau 'May I' là động từ nguyên thể.",
          "May I reading it back to you, madam? A higher floor and a welcome drink, at the agreed rate.",
        ),
      ],
      speaking: [
        sp(
          "Room 512 will not be ready for two hours. The guest will have to wait.",
          t4a,
          "Nói với giám sát buồng phòng, không gọi sir hay madam. Đề nghị bằng 'What if we' và hỏi một câu cụ thể.",
          "colleague",
        ),
        sp(
          "There is one on the third floor, but it faces the street.",
          t4b,
          "Không tự quyết thay khách: hỏi khách trước, rồi nói rõ việc mình cần bên kia làm.",
          "colleague",
          undefined,
          t4a,
        ),
        sp(
          "Fine. And 512 — do you still need it today?",
          t4c,
          "Thương lượng là hai chiều: nhận một điều, cho lại một điều ('In exchange') — mình tự cập nhật trạng thái phòng.",
          "colleague",
          undefined,
          t4b,
        ),
        sp(
          "Can you cover the desk now? I need my break early.",
          "Yes, if you take the phones after lunch. Can we meet halfway like that?",
          "Nói với đồng nghiệp, không gọi sir hay madam. Nói rõ mỗi bên làm gì, rồi hỏi 'meet halfway'.",
          "colleague",
        ),
        sp(
          "A guest wants late check-out until four, but we are full tonight. Any ideas?",
          "What if we offer two o'clock, with the usual fee, and store her bags until four? It is your decision.",
          "Đề xuất với cấp trên bằng 'What if we', không gọi sir hay madam, và trả quyết định về đúng người: 'It is your decision'.",
          "manager",
        ),
        {
          ...sp(
            "So what exactly have we agreed?",
            "May I read it back, sir? A higher floor and a welcome drink at no extra charge, at the agreed rate.",
            "Đọc lại bằng danh sách cụ thể, và nhắc 'the agreed rate' — không thêm điều gì chưa thống nhất.",
          ),
          alsoAccept: [
            "May I read it back to you, sir? A higher floor and a welcome drink at no extra charge, at the agreed rate.",
          ],
        },
        {
          ...sp(
            "Will the next receptionist know about this?",
            "Yes, madam. Everything we agreed is on your booking, so any colleague can see it.",
            "Không có gì bằng miệng: mọi điều đã thống nhất nằm trên booking, đồng nghiệp nào cũng thấy.",
          ),
          alsoAccept: [
            "Yes, madam. Everything we agreed is on the booking, so any colleague can see it.",
          ],
        },
      ],
      reading: read(
        `TWO KINDS OF NEGOTIATION — FRONT DESK
Inside the hotel, the desk negotiates every day: a clean room from housekeeping, a break with a colleague, a table from the restaurant.
Open with a question, not a demand: "What if we…?" A question lets the other team say yes without losing face.
Offer something back. "If you take my calls after lunch, I will cover your break" is a fair trade. Meet halfway, and say exactly what each side does.
With guests, the desk trades only what is its own: a floor, a side, a welcome drink, luggage storage. Prices and rates go to the Duty Manager.
Close every agreement the same way. Read it back, item by item, and put it on the booking the same shift.
Nothing verbal. A deal nobody wrote down was never agreed.`,
        [
          {
            q: "Vì sao nên mở đầu bằng câu hỏi 'What if we'",
            options: [
              "Vì câu hỏi cho bên kia đồng ý mà không mất mặt",
              "Vì đó là câu bắt buộc trong quy trình của bộ phận",
              "Vì nghe lịch sự hơn khi nói với cấp trên trong ca",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi "A question lets the other team say yes without losing face."',
          },
          {
            q: "Chốt một thoả thuận với khách thế nào?",
            options: [
              "Đọc lại từng mục, ghi vào booking ngay trong ca",
              "Nhắc đồng nghiệp ca sau nhớ giùm khi khách đến lần tới",
              "Gửi email cho khách vào cuối tuần",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi "Read it back, item by item, and put it on the booking the same shift."',
          },
        ],
      ),
      game: [
        game(
          "Housekeeping says your guest's room needs another two hours.",
          "What if we move her to a clean room in the same category? I can ask her now.",
          "Then the guest just have to wait in the lobby for another two hours. That is not my problem.",
          "Then the guest just has to wait in the lobby for another two hours. That is not my problem.",
          "colleague",
          "Hai câu 'the guest… has to wait… That is not my problem' đều đóng cuộc thương lượng — đề nghị một phương án bằng câu hỏi thì bên kia mới đồng ý được. Câu 'the guest just have' còn sai: 'the guest' số ít đi với 'has'.",
        ),
        game(
          "Can you just remember what we agreed? I trust you.",
          "Thank you, madam, but may I read it back and put it on your booking, so everyone knows?",
          "Thank you, madam, but may I read it back and putting it on your booking, so everyone knows?",
          "Of course, madam. I have a very good memory, so you do not need to worry about it.",
          undefined,
          "Sau 'may I' hai động từ nối bằng 'and' đều ở dạng nguyên thể: 'read… and put'. Câu 'I have a very good memory' lịch sự nhưng là thoả thuận bằng miệng — tài liệu ghi 'Nothing verbal'.",
        ),
      ],
    }),
  ],
};
