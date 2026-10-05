// FO week 37 — group and corporate terms: conditions, ratios, deadlines
// (see ../kit.ts). The desk's terms are ONE hotel's, and every lesson below
// reads the same ones:
//
//  · Corporate rate: for guests of a company with a rate agreement, ten per
//    cent below the published rate on the day, breakfast and wifi
//    included, free cancellation until 18:00 on the day of arrival. Proof is a
//    business card or a company ID; with no proof the desk asks the Duty
//    Manager and never changes the rate itself. Friends are not eligible, and
//    one company's rate is never read to another.
//  · Group (ten rooms or more): an allotment held until the cut-off date,
//    twenty-one days before arrival; names no later than that date; unnamed
//    rooms go back on sale; extra rooms after it are subject to availability
//    at the published rate.
//  · Money: thirty per cent deposit on signing, the balance at check-out.
//    Whole group cancelled in writing more than thirty days out → deposit
//    refunded in full; thirty days or fewer → non-refundable, nothing more.
//    Attrition: up to ten per cent of rooms dropped free before the cut-off
//    date; after it, one night per cancelled room. A card refund: up to
//    thirty working days.
//  · One complimentary room for every twenty paid rooms.
//  · The desk explains, reads back and confirms in writing. A changed term —
//    a later cut-off date, a smaller deposit, a lower rate, an extra free
//    room — is the Sales Manager's decision. The desk gives a time for its
//    own call back, never for the Sales Manager's answer.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "Provided that your company signs a rate agreement, madam, your guests pay ten per cent below our published rate.";
const t1b =
  "Breakfast and wifi are included, madam, and cancellation is free until six in the evening on the day of arrival.";
const t1c = "No, madam. It moves with our published rate, but it is always ten per cent below it.";

const t2a = "Yes, madam. We can hold an allotment of twenty rooms for you until the cut-off date.";
const t2b =
  "It means we need the rooming list no later than that date, madam. Rooms without a name then go back on sale.";
const t2c =
  "After the cut-off date, extra rooms are subject to availability, madam, at the published rate.";

export const week: AuthoredWeek = {
  title: { en: "Group and Corporate Terms", vi: "Điều khoản khách đoàn và doanh nghiệp" },
  canDo:
    "Nói được: giải thích điều khoản khách đoàn và doanh nghiệp bằng câu điều kiện ('provided that', 'no later than', 'up to … per cent') — giá doanh nghiệp, khối phòng, ngày chốt, đặt cọc, huỷ — đọc lại và gửi bằng văn bản, và chuyển mọi yêu cầu đổi điều khoản cho Sales Manager.",
  lessons: [
    L(37, 1, "The Corporate Rate: Who Can Use It", "Giá doanh nghiệp: ai được dùng", {
      vocabulary: [
        c("Corporate rate", "The corporate rate is for guests of companies with an agreement.", [
          "/ˈkɔːpərət reɪt/",
          "Giá doanh nghiệp",
          "🏢",
        ]),
        c("Eligible", "Only guests travelling for the company are eligible for that rate.", [
          "/ˈelɪdʒəbl/",
          "Đủ điều kiện",
          "☑️",
        ]),
        c(
          "Published rate",
          "The published rate is the price we show for that day, and it can change daily.",
          ["/ˈpʌblɪʃt reɪt/", "Giá công bố trong ngày", "🏷️"],
        ),
        c("Per cent", "The corporate rate is ten per cent below our published price.", [
          "/pə ˈsent/",
          "Phần trăm",
          "💯",
        ]),
        c(
          "Provided that",
          "The rate applies, provided that the booking is made under the agreement.",
          ["/prəˈvaɪdɪd ðæt/", "Với điều kiện là", "🔗"],
        ),
      ],
      grammar: [
        g(
          "You get the cheap price if you work there.",
          "The corporate rate applies, sir, provided that you are travelling for the company.",
          "'provided that' + một mệnh đề nêu ĐIỀU KIỆN. Gọi đúng tên giá ('corporate rate'), không nói 'cheap price'. 'The rate' số ít nên 'applies' có -s.",
          "The corporate rate apply, sir, provided that you are travelling for the company.",
        ),
        g(
          "Your price is ten per cent less, more or less.",
          "Your corporate rate is ten per cent below our published rate, madam.",
          "Tỷ lệ phải có mốc so sánh: 'ten per cent below' + mốc. Tiếng Anh–Anh viết 'per cent' thành hai chữ. Không thêm 'than' sau 'below'.",
          "Your corporate rate is ten per cent below than our published rate, madam.",
        ),
      ],
      speaking: [
        sp(
          "Your sales email mentions ten per cent off. How does your corporate rate work?",
          t1a,
          "Điều kiện đứng trước ('Provided that'), quyền lợi đứng sau. Tỷ lệ luôn đi kèm mốc so sánh: 'published rate'.",
        ),
        sp(
          "And what is included in that rate?",
          t1b,
          "Kể đúng hai thứ đã gồm trong giá, rồi một điều kiện huỷ với mốc giờ cụ thể — đúng chính sách huỷ của khách sạn.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Is that rate the same all year round?",
          t1c,
          "Giá doanh nghiệp đi theo giá công bố trong ngày, nên trả lời là không, rồi nói tỷ lệ thì không đổi. Hai ý nối bằng 'but'.",
          undefined,
          undefined,
          t1b,
        ),
        risk({
          ...sp(
            "My friend is not with the company, but can he have your corporate rate too?",
            "I am sorry, sir, the corporate rate is only for guests of your company.",
            "Câu phải đúng của tuần: giá doanh nghiệp chỉ dành cho khách của công ty đã ký. Cho người khác dùng là cho đi tiền của khách sạn.",
            undefined,
            ["only", "guests", "company"],
          ),
          alsoAccept: [
            "I am sorry, sir, the corporate rate is only for guests from your company.",
            "I am afraid the corporate rate is only for guests of your company, sir.",
            "I am sorry, sir, our corporate rate is only for guests of your company.",
          ],
        }),
        {
          ...sp(
            "I booked under your corporate rate. Do you need anything from me?",
            "Only a business card or a company ID, sir, so we can confirm that you are eligible.",
            "Xin MỘT bằng chứng nhẹ nhàng (danh thiếp hoặc thẻ nhân viên) và nói vì sao: để xác nhận khách 'eligible'. Không bao giờ hỏi lương hay giấy tờ khác.",
          ),
          alsoAccept: [
            "Only a business card or a company ID, sir, so we can confirm you are eligible.",
            "Just a business card or a company ID, sir, so we can confirm that you are eligible.",
          ],
        },
        {
          ...sp(
            "Is your corporate rate really cheaper than the booking websites?",
            "Usually, madam, but may we compare like with like? The corporate rate includes breakfast and free cancellation.",
            "Không hứa là luôn rẻ hơn. Mời so sánh cùng điều kiện ('like with like'), rồi nêu hai điều giá doanh nghiệp có.",
            undefined,
            ["like"],
          ),
          alsoAccept: [
            "Usually, madam, but shall we compare like with like? The corporate rate includes breakfast and free cancellation.",
          ],
        },
        sp(
          "A guest booked the corporate rate but has no company ID. What do I charge him?",
          "Ask him for any proof from the company first. If he has none, ask our Duty Manager before you change the rate.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Hai bước theo thứ tự: xin bằng chứng, rồi hỏi Duty Manager — quầy không tự đổi giá.",
          "colleague",
        ),
      ],
      reading: read(
        `CORPORATE RATES — FRONT OFFICE GUIDE
The terms below are one hotel's. Ask your Sales team which agreements your hotel holds.
A company that signs a rate agreement gets the corporate rate for its guests.
The corporate rate is ten per cent below our published rate on the day, so it moves when that rate moves.
It includes breakfast and wifi. Cancellation is free until 18:00 on the day of arrival.
A guest is eligible provided that the booking is made under the agreement and the stay is for the company.
At check-in, ask for a business card or a company ID. Never ask for a salary slip or a letter.
Friends and family are not eligible, unless the agreement says so in writing.
If a guest cannot show any proof, do not change the rate yourself. Ask the Duty Manager.
The corporate rate is not combined with other offers.
Never read one company's rate to another company. Every agreement is private.`,
        [
          {
            q: "Theo tài liệu, giá doanh nghiệp được tính thế nào?",
            options: [
              "Một mức cố định cho cả năm, không đổi theo mùa hay theo ngày",
              "Thấp hơn mười phần trăm so với giá công bố trong ngày",
              "Bằng giá trên các trang đặt phòng trung gian vào cùng ngày đó",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi giá này "below our published rate on the day, so it moves when that rate moves" — luôn thấp hơn mười phần trăm.',
          },
          {
            q: "Bạn của khách doanh nghiệp, không làm cho công ty đó, có được giá doanh nghiệp không?",
            options: [
              "Có, nếu đi cùng chuyến và ở cùng ngày với khách của công ty",
              "Có, nếu lễ tân thấy đó là người quen của khách sạn",
              "Không, trừ khi thoả thuận ghi rõ bằng văn bản",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "Friends and family are not eligible, unless the agreement says so in writing."',
          },
          {
            q: "Khách đặt giá doanh nghiệp nhưng không có giấy tờ gì của công ty. Lễ tân làm gì?",
            options: [
              "Tự đổi sang giá công bố trong ngày ngay tại quầy",
              "Hỏi Duty Manager, không tự đổi giá",
              "Yêu cầu khách đưa phiếu lương hoặc thư của công ty",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "If a guest cannot show any proof, do not change the rate yourself. Ask the Duty Manager." — và không bao giờ đòi phiếu lương.',
          },
        ],
      ),
      game: [
        game(
          "So what exactly do my staff get with your corporate rate?",
          "Ten per cent below our published rate, madam, with breakfast and wifi included.",
          "Ten per cent below than our published rate, madam, with breakfast and wifi included.",
          "A very good price, madam, much cheaper than anything online, and our sales team can probably do even better for you.",
          undefined,
          "'below than' sai: 'below' đứng một mình trước mốc so sánh. Câu 'much cheaper than anything online… probably do even better' nghe hấp dẫn nhưng không nói điều khoản nào, lại hứa thay bộ phận Kinh doanh.",
        ),
        game(
          "Another company told me they get a bigger discount. What is their rate exactly?",
          "I am sorry, sir, every agreement is private. I can only talk about your own company's rate.",
          "I am sorry, sir, every agreement is private. I can only talking about your own company's rate.",
          "They do get a little more, sir, but they book many more rooms with us every year than your company does.",
          undefined,
          "Sau 'can' là động từ nguyên thể 'talk'. Câu xác nhận công ty kia được giảm nhiều hơn đúng tiếng Anh nhưng làm lộ một thoả thuận riêng — mỗi thoả thuận là chuyện riêng của từng công ty.",
        ),
      ],
    }),

    L(37, 2, "Holding a Block of Rooms", "Giữ một khối phòng cho đoàn", {
      vocabulary: [
        c("Allotment", "We hold an allotment of twenty rooms for the conference group.", [
          "/əˈlɒtmənt/",
          "Khối phòng được giữ cho đoàn",
          "🧱",
        ]),
        c("Cut-off date", "Names must reach us by the cut-off date.", [
          "/ˈkʌt ɒf deɪt/",
          "Ngày chốt (hạn chót của khối phòng)",
          "📅",
        ]),
        c("No later than", "Please send the rooming list no later than the cut-off date.", [
          "/nəʊ ˈleɪtə ðæn/",
          "Chậm nhất là, không muộn hơn",
          "⏰",
        ]),
        c("Back on sale", "After the cut-off date, rooms without a name go back on sale.", [
          "/bæk ɒn seɪl/",
          "Được mở bán lại",
          "🔓",
        ]),
        c("Booker", "The booker is the person who makes the group booking for everyone.", [
          "/ˈbʊkə/",
          "Người đặt phòng (thay mặt đoàn hay công ty)",
          "☎️",
        ]),
      ],
      grammar: [
        g(
          "Send names before. If not, we cancel.",
          "Please send the rooming list no later than the cut-off date, madam, so we can hold every room.",
          "'no later than' + mốc = chậm nhất là. Nói lợi ích cho khách ('so we can hold every room') thay vì doạ huỷ. Sau 'can' là động từ nguyên thể.",
          "Please send the rooming list no later than the cut-off date, madam, so we can holding every room.",
        ),
        g(
          "After the date, your rooms are gone.",
          "After the cut-off date, any room without a name goes back on sale, sir.",
          "'After' + mốc, rồi hiện tại đơn cho một điều khoản cố định. 'any room' số ít nên 'goes' có -es. Nói điều gì xảy ra với phòng, không doạ khách.",
          "After the cut-off date, any room without a name go back on sale, sir.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "We need twenty rooms for our sales conference in May. Can you hold them for us?",
            t2a,
            "Nhận lời bằng đúng tên điều khoản ('allotment') và mốc của nó ('cut-off date'). Con số do khách nói — nhắc lại cho khớp.",
          ),
          alsoAccept: [
            "Of course, madam. We can hold an allotment of twenty rooms for you until the cut-off date.",
            "Yes, madam. We can hold an allotment of twenty rooms until the cut-off date.",
          ],
        },
        sp(
          "Your email says the cut-off is twenty-one days before arrival. What does that mean for us?",
          t2b,
          "Giải thích điều khoản bằng việc khách phải làm ('no later than'), rồi điều xảy ra nếu không làm — nói như một sự việc, không doạ.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "And if more people join after that?",
          t2c,
          "Điều kiện thời gian đứng đầu câu, rồi hai điều kiện của phòng thêm: tuỳ phòng trống, và theo giá công bố.",
          undefined,
          undefined,
          t2b,
        ),
        risk({
          ...sp(
            "Our list will be late. Can you just extend the cut-off date by a week?",
            "I cannot change the cut-off date, madam, but I will ask our Sales Manager today.",
            "Câu phải đúng của tuần: ngày chốt nằm trong hợp đồng, và đổi nó là quyết định của Sales Manager. Nói điều mình không làm, rồi việc mình làm ngay hôm nay.",
            undefined,
            ["cut", "date", "sales", "manager"],
          ),
          alsoAccept: [
            "I am not able to change the cut-off date, madam, but I will ask our Sales Manager today.",
            "I cannot move the cut-off date, madam, but I will ask our Sales Manager today.",
            "I cannot change the cut-off date myself, madam, but I will ask our Sales Manager today.",
          ],
        }),
        sp(
          "The Lotus group sent names for only some of their rooms. Is it too late?",
          "Check the cut-off date first. If it has passed, the rooms without names go back on sale.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Kiểm tra mốc trước, rồi áp đúng điều khoản — không tự giữ phòng thêm.",
          "colleague",
        ),
        {
          ...sp(
            "I am with the Lotus group, but my name is not on your list.",
            "I am sorry, madam. Let me check with your tour leader, and if a room is still in the allotment, it is yours.",
            "Khách đứng ở quầy thì không bị đuổi đi vì một danh sách. Hỏi trưởng đoàn trước, rồi giao phòng nếu khối còn phòng.",
          ),
          alsoAccept: [
            "I am sorry, madam. Let me check with your tour leader, and if there is still a room in the allotment, it is yours.",
          ],
        },
        sp(
          "Only sixteen of the twenty rooms have names, and the cut-off is Friday. What have you done?",
          "I have reminded the booker in writing, and I will chase up the missing names before Friday.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: việc đã làm ('in writing') và việc sẽ làm ('chase up'), kèm mốc do chính cấp trên vừa nêu.",
          "manager",
          ["writing", "chase"],
        ),
      ],
      reading: read(
        `GROUP ALLOTMENTS — HOW THE BLOCK WORKS
A group is ten rooms or more. The terms below are one hotel's, so check your own contract.
An allotment is a block of rooms we hold for a group at the group rate.
We hold it until the cut-off date, twenty-one days before arrival.
The rooming list, with every guest's name, must reach us no later than the cut-off date.
On the cut-off date, any room without a name goes back on sale.
After that date, extra rooms are subject to availability, at the published rate.
Remind the booker in writing one week before the cut-off date, and again two days before.
Keep a copy of every reminder on the booking.
A guest who arrives with the group but is not on the list is never turned away at the desk.
Check with the tour leader first. If a room is still in the allotment, it goes to that guest.
Never move the cut-off date yourself. A later date is the Sales Manager's decision.`,
        [
          {
            q: "Đến ngày chốt, phòng chưa có tên khách thì sao?",
            options: [
              "Vẫn giữ cho đoàn tới ngày khách đến, theo giá đoàn đã ký",
              "Tự động chuyển sang giá doanh nghiệp cho người đặt",
              "Được mở bán lại cho khách khác",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "On the cut-off date, any room without a name goes back on sale."',
          },
          {
            q: "Người đặt xin dời ngày chốt thêm một tuần. Ai quyết?",
            options: [
              "Lễ tân đang nghe điện thoại, nếu đoàn đủ lớn",
              "Sales Manager",
              "Trưởng đoàn, vì đoàn đã ký hợp đồng",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Never move the cut-off date yourself. A later date is the Sales Manager\'s decision."',
          },
          {
            q: "Khách đi cùng đoàn nhưng không có tên trong danh sách. Lễ tân làm gì?",
            options: [
              "Từ chối nhận phòng vì danh sách đã chốt từ trước",
              "Hỏi trưởng đoàn; còn phòng trong khối thì giao cho khách",
              "Bán cho khách một phòng theo giá công bố ngay tại quầy, không cần hỏi ai",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Check with the tour leader first. If a room is still in the allotment, it goes to that guest."',
          },
        ],
      ),
      game: [
        game(
          "When do you need the names for our group?",
          "No later than the cut-off date, madam, which is twenty-one days before arrival.",
          "No later the cut-off date, madam, which is twenty-one days before arrival.",
          "Whenever is easy for you, madam. Just bring the list with you when the group arrives, and we will sort it out at the desk.",
          undefined,
          "'no later than' cần đủ chữ 'than'. Câu 'whenever is easy… sort it out at the desk' nghe dễ chịu nhưng sai điều khoản: không có tên trước ngày chốt, phòng sẽ được mở bán lại.",
        ),
        game(
          "The booker wants three more rooms, but the cut-off date was yesterday. Same group rate?",
          "Not automatically. After the cut-off date, extra rooms are subject to availability, at the published rate.",
          "Not automatically. After the cut-off date, extra rooms is subject to availability, at the published rate.",
          "Yes, of course. They are the same group, so just add the rooms to the block at the group rate and tell them it is done.",
          "colleague",
          "'rooms' số nhiều đi với 'are'. Câu cho luôn giá đoàn đúng tiếng Anh nhưng sai điều khoản và vượt quyền: sau ngày chốt, phòng thêm tuỳ phòng trống và theo giá công bố.",
        ),
      ],
    }),

    L(37, 3, "Deposit, Cancellation and Attrition", "Đặt cọc, huỷ và cắt giảm số phòng", {
      vocabulary: [
        c("On signing", "A deposit of thirty per cent is due on signing.", [
          "/ɒn ˈsaɪnɪŋ/",
          "Ngay khi ký hợp đồng",
          "✍️",
        ]),
        c("Balance", "The balance is paid when the group checks out.", [
          "/ˈbæləns/",
          "Số tiền còn lại",
          "⚖️",
        ]),
        c("In full", "The deposit is refunded in full if the group cancels in good time.", [
          "/ɪn fʊl/",
          "Toàn bộ, đầy đủ",
          "💯",
        ]),
        c(
          "Attrition",
          "The attrition clause says how many rooms a group can drop without a charge.",
          ["/əˈtrɪʃn/", "Điều khoản cắt giảm số phòng", "📉"],
        ),
      ],
      grammar: [
        g(
          "You pay thirty per cent now.",
          "A deposit of thirty per cent is due on signing, madam, and the balance on departure.",
          "Điều khoản tiền nói bằng 'is due' + mốc: khoản nào, bao nhiêu, khi nào. Chủ ngữ là 'a deposit' (số ít) nên đi với 'is', dù có 'thirty per cent' chen giữa.",
          "A deposit of thirty per cent are due on signing, madam, and the balance on departure.",
        ),
        g(
          "Cancel late, you lose everything.",
          "Provided that you cancel more than thirty days before arrival, sir, the deposit is refunded in full.",
          "'Provided that' + hiện tại đơn nêu điều kiện; vế chính dùng bị động 'is refunded'. Nói điều khách ĐƯỢC trước, rồi mới tới giới hạn.",
          "Provided that you cancel more than thirty days before arrival, sir, the deposit is refund in full.",
        ),
      ],
      speaking: [
        {
          ...sp(
            "Your contract mentions a deposit of thirty per cent. When is it due?",
            "It is due on signing, madam, and the balance is paid when the group checks out.",
            "Một khoản, một mốc: cọc trả 'on signing'. Vế sau nói phần còn lại ('balance') và lúc trả.",
          ),
          alsoAccept: [
            "It is due on signing, madam, and the balance is paid when your group checks out.",
            "It is due on signing, madam. The balance is paid when the group checks out.",
          ],
        },
        sp(
          "And if we cancel the whole trip more than thirty days before?",
          "Then the deposit is refunded in full, madam, provided that we have your cancellation in writing.",
          "Nhắc lại điều khách được ('refunded in full'), rồi điều kiện duy nhất bằng 'provided that'.",
          undefined,
          ["refunded"],
          "It is due on signing, madam, and the balance is paid when the group checks out.",
        ),
        sp(
          "And if it is thirty days or fewer?",
          "Then the deposit is non-refundable, madam, but nothing more is charged for the cancelled rooms.",
          "Nói phần khách mất trước, rồi phần khách không phải trả thêm — để khách nghe đủ cả hai, không chỉ tin xấu.",
          undefined,
          undefined,
          "Then the deposit is refunded in full, madam, provided that we have your cancellation in writing.",
        ),
        {
          ...sp(
            "Your attrition clause says ten per cent. What does that mean for us?",
            "You can drop up to ten per cent of the rooms without a charge, sir, until the cut-off date.",
            "Nói điều khách ĐƯỢC làm trước, kèm đúng tỷ lệ khách vừa nêu, rồi mốc giới hạn — ngày chốt.",
          ),
          alsoAccept: [
            "You can drop up to ten per cent of the rooms free of charge, sir, until the cut-off date.",
            "You can cancel up to ten per cent of the rooms without a charge, sir, until the cut-off date.",
          ],
        },
        {
          ...sp(
            "We cancelled in good time. When will the deposit be back on our card?",
            "The refund can take up to thirty working days, madam, depending on your bank, and I will follow up with you.",
            "Hoàn tiền vào thẻ: nói mốc CHẬM NHẤT, như chính sách hoàn tiền đã dạy, rồi tự mình theo dõi tiếp ('follow up').",
            undefined,
            ["follow"],
          ),
          alsoAccept: [
            "The refund can take up to thirty working days, madam, because it depends on your bank, and I will follow up with you.",
          ],
        },
        sp(
          "The booker cancelled three rooms after the cut-off date. What do we charge?",
          "One night for each room, as the contract says. Send the booker the charge in writing before we post it.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Áp đúng điều khoản sau ngày chốt, và báo khách bằng văn bản TRƯỚC khi tính tiền.",
          "colleague",
        ),
        sp(
          "Can the Lotus group still drop rooms without a charge?",
          "Not now. The attrition clause only allows that before the cut-off date, and that date has passed.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: câu trả lời trước, rồi điều khoản và mốc làm căn cứ.",
          "manager",
        ),
      ],
      reading: read(
        `GROUP CONTRACT — THE MONEY TERMS
The figures below are one hotel's. Check every figure against the signed contract.
DEPOSIT: thirty per cent of the room total is due on signing. The balance is paid when the group checks out.
CANCELLING THE WHOLE GROUP: provided that the cancellation reaches us in writing more than thirty days before arrival, the deposit is refunded in full.
Thirty days or fewer before arrival, the deposit is non-refundable. Nothing more is charged.
ATTRITION: before the cut-off date, the group may drop up to ten per cent of its rooms without a charge.
After the cut-off date, each cancelled room is charged one night.
Say what the group CAN do first, then where it stops. "You can drop up to ten per cent" is heard as help.
A card refund can take up to thirty working days, because it depends on the bank. Never quote the fastest case.
The desk explains these terms and never changes them. A waived deposit or a smaller charge is the Sales Manager's decision.`,
        [
          {
            q: "Đoàn huỷ toàn bộ, báo bằng văn bản bốn mươi ngày trước ngày đến. Tiền cọc thì sao?",
            options: [
              "Bị giữ lại toàn bộ, vì hợp đồng đã được ký từ trước",
              "Được hoàn lại đầy đủ",
              "Được hoàn một nửa, phần còn lại tính là phí huỷ",
            ],
            correct: 1,
            explanation:
              'Bốn mươi ngày là hơn ba mươi ngày, và khi đó tài liệu ghi "the deposit is refunded in full".',
          },
          {
            q: "Trước ngày chốt, đoàn muốn bớt một số phòng. Điều khoản nào áp dụng?",
            options: [
              "Bớt tối đa mười phần trăm số phòng mà không mất phí",
              "Mỗi phòng bớt đi đều tính phí một đêm theo giá đoàn đã ký trong hợp đồng",
              "Không được bớt phòng nào, vì khối phòng đã được giữ riêng cho đoàn",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi trước ngày chốt, đoàn "may drop up to ten per cent of its rooms without a charge"; phí một đêm chỉ áp dụng SAU ngày chốt.',
          },
          {
            q: "Người đặt xin miễn tiền cọc. Lễ tân trả lời theo hướng nào?",
            options: [
              "Đồng ý ngay nếu đó là khách quen lâu năm của khách sạn",
              "Giải thích điều khoản, rồi hỏi Sales Manager",
              "Từ chối thẳng, vì hợp đồng không bao giờ thay đổi được",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "The desk explains these terms and never changes them. A waived deposit or a smaller charge is the Sales Manager\'s decision."',
          },
        ],
      ),
      game: [
        game(
          "If only eighteen of our twenty people come, do we pay for the empty rooms?",
          "Not if you tell us before the cut-off date, madam. You can drop up to ten per cent without a charge.",
          "Not if you tell us before the cut-off date, madam. You can drops up to ten per cent without a charge.",
          "Yes, madam, every room in the block is charged in full, whatever happens, because the contract has already been signed.",
          undefined,
          "Sau 'can' là động từ nguyên thể 'drop'. Câu 'every room is charged in full, whatever happens' đúng tiếng Anh nhưng sai điều khoản: trước ngày chốt, đoàn được bớt tới mười phần trăm mà không mất phí.",
        ),
        game(
          "The booker cancelled twenty days before arrival and wants the deposit back. Can I say yes?",
          "No. Within thirty days of arrival the deposit is non-refundable. If the booker disagrees, ask our Sales Manager.",
          "No. Within thirty days of arrival the deposit is non-refund. If the booker disagrees, ask our Sales Manager.",
          "Yes. Twenty days is still a long time before arrival, so refund the full deposit to the card today and close the file.",
          "colleague",
          "'non-refundable' là tính từ đầy đủ, không cắt thành 'non-refund'. Câu hoàn cọc ngay đúng tiếng Anh nhưng sai điều khoản và vượt quyền: còn ba mươi ngày hoặc ít hơn thì cọc không hoàn, và mọi ngoại lệ là việc của Sales Manager.",
        ),
      ],
    }),

    L(
      37,
      4,
      "Reading the Terms Back, and Requests That Are Not Ours",
      "Đọc lại điều khoản, và những yêu cầu không thuộc quyền quầy",
      {
        vocabulary: [
          c(
            "Group contract",
            "Every term is in the group contract, so read it before you answer.",
            ["/ɡruːp ˈkɒntrækt/", "Hợp đồng đoàn", "📑"],
          ),
          c("Valid until", "This quote is valid until the end of the month.", [
            "/ˈvælɪd ənˈtɪl/",
            "Có hiệu lực đến",
            "⏳",
          ]),
          c(
            "Complimentary room",
            "The group gets one complimentary room for every twenty paid rooms.",
            ["/ˌkɒmplɪˈmentri ruːm/", "Phòng miễn phí theo điều khoản", "🎁"],
          ),
          c("Sales manager", "Any change to a contract goes to the Sales Manager.", [
            "/seɪlz ˈmænɪdʒə/",
            "Trưởng phòng Kinh doanh",
            "💼",
          ]),
        ],
        grammar: [
          g(
            "Okay, everything is fine. Bye.",
            "May I read the main terms back to you, madam, before I send them in writing?",
            "Đọc lại điều khoản trước khi chốt, rồi gửi bằng văn bản. Sau 'May I' là động từ nguyên thể; sau 'before' dùng hiện tại đơn, không dùng 'will'.",
            "May I read the main terms back to you, madam, before I will send them in writing?",
          ),
          g(
            "Nineteen rooms? No free room for you.",
            "The complimentary room starts at twenty paid rooms, sir, so I will ask our Sales Manager about yours.",
            "Nói điều khoản bằng một mốc rõ ràng, rồi chuyển phần ngoại lệ cho đúng người. 'The complimentary room' số ít nên 'starts' có -s.",
            "The complimentary room start at twenty paid rooms, sir, so I will ask our Sales Manager about yours.",
          ),
        ],
        speaking: [
          sp(
            "Can you confirm our group terms in writing?",
            "Of course, madam. I will read it back to you now, and send it in writing within the hour.",
            "Hai bước chốt mọi điều khoản: đọc lại ('read it back') rồi gửi bằng văn bản, kèm một mốc mình tự giữ.",
            undefined,
            ["read", "back"],
          ),
          sp(
            "Your contract says one free room for every twenty. Who usually takes it?",
            "It is usually for the tour leader, madam, but the group can choose who uses the complimentary room.",
            "Gọi đúng tên điều khoản ('complimentary room') thay cho chữ 'free room' của khách, và để đoàn tự chọn người dùng.",
            undefined,
            undefined,
            "Of course, madam. I will read it back to you now, and send it in writing within the hour.",
          ),
          sp(
            "We will only have nineteen paid rooms. Do we still get it?",
            "The complimentary room starts at twenty paid rooms, madam, so I will ask our Sales Manager about yours.",
            "Nói điều khoản bằng một mốc rõ ràng, rồi chuyển phần ngoại lệ cho đúng người — Sales Manager.",
            undefined,
            undefined,
            "It is usually for the tour leader, madam, but the group can choose who uses the complimentary room.",
          ),
          {
            ...sp(
              "Can you promise your Sales Manager will say yes?",
              "I cannot promise that, sir. I will ask today and call you back by five, whatever the answer.",
              "Không hứa thay cấp trên. Hứa việc của chính mình — gọi lại — kèm một mốc, và gọi lại cả khi câu trả lời là không.",
            ),
            alsoAccept: [
              "I am not able to promise that, sir. I will ask today and call you back by five, whatever the answer.",
              "I cannot promise that, sir. I will ask today and call you back by five, whatever the answer is.",
            ],
          },
          {
            ...sp(
              "Your quote says it is valid until the thirtieth. What if we sign later?",
              "Then I will check the rate again before you sign, madam, because the quote is valid until the thirtieth.",
              "Hết hạn báo giá thì kiểm tra lại giá trước khi ký — nói việc mình sẽ làm trước, lý do sau.",
            ),
            alsoAccept: [
              "Then I will check the rate again before you sign, madam, as the quote is valid until the thirtieth.",
            ],
          },
          sp(
            "The booker says our Sales Manager promised her an extra free room. Do I add it?",
            "Not until it is in the group contract. Ask for the promise in writing, and I will check with the Sales Manager today.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Lời hứa chưa có trong hợp đồng thì chưa là điều khoản — xin bằng văn bản rồi kiểm tra.",
            "colleague",
          ),
          sp(
            "What did the pharma booker ask for on the phone today?",
            "A later cut-off date and a smaller deposit. I said both are your decision, and I will call back by five.",
            "Báo cáo cho Sales Manager, không gọi sir hay madam: khách xin gì, mình đã nói gì, và mốc gọi lại của chính mình.",
            "manager",
          ),
        ],
        reading: read(
          `CLOSING A GROUP OR CORPORATE ENQUIRY — DESK NOTE
Before the call ends, read the main terms back, one by one. Then send them in writing the same day.
Five lines cover almost every group: rooms and rate, deposit, cut-off date, cancellation, and any complimentary room.
Our group contract gives one complimentary room for every twenty paid rooms. Nineteen paid rooms earn none.
A quote is valid until the date printed on it. After that date, check the rate again before anyone signs.
Bookers often ask for something the contract does not say: a later cut-off date, a smaller deposit, an extra free room.
These are never the desk's to give. Say: "I will ask our Sales Manager today."
Give a time for YOUR call back, never for the Sales Manager's answer.
If a booker says someone promised a change, ask for it in writing. A promise that is not in the contract is not a term.
Never say "I am sure they will agree." The answer may be no, and the booker will remember who said yes.`,
          [
            {
              q: "Đoàn có mười chín phòng trả tiền. Theo hợp đồng mẫu, đoàn được mấy phòng miễn phí?",
              options: [
                "Một phòng, vì mười chín phòng cũng gần đủ hai mươi",
                "Hai phòng, một cho trưởng đoàn và một cho tài xế",
                "Không phòng nào",
              ],
              correct: 2,
              explanation:
                'Phòng miễn phí tính theo mỗi hai mươi phòng trả tiền, và tài liệu ghi rõ "Nineteen paid rooms earn none."',
            },
            {
              q: "Người đặt nói Sales Manager đã hứa thêm một phòng miễn phí. Lễ tân làm gì?",
              options: [
                "Thêm ngay một phòng miễn phí vào hợp đồng để giữ quan hệ tốt với khách",
                "Xin lời hứa đó bằng văn bản, rồi hỏi Sales Manager",
                "Nói thẳng là Sales Manager không bao giờ hứa những điều như vậy",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "If a booker says someone promised a change, ask for it in writing. A promise that is not in the contract is not a term."',
            },
            {
              q: "Khi hứa gọi lại cho người đặt, lễ tân hứa mốc giờ của ai?",
              options: [
                "Mốc giờ Sales Manager sẽ trả lời và quyết định cho khách",
                "Mốc giờ cuộc gọi lại của chính mình",
                "Mốc giờ hợp đồng mới được ký",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "Give a time for YOUR call back, never for the Sales Manager\'s answer."',
            },
          ],
        ),
        game: [
          game(
            "Can you just add a second free room? We are your best customer.",
            "I am sorry, madam, that is not mine to give. I will ask our Sales Manager today and call you back by five.",
            "I am sorry, madam, that is not mine to give. I will asking our Sales Manager today and call you back by five.",
            "Of course, madam. You are a very important customer, so I will add the second room to your contract myself right now.",
            undefined,
            "Sau 'will' là động từ nguyên thể 'ask'. Câu tự thêm phòng miễn phí vào hợp đồng nghe chiều khách nhưng vượt quyền — mọi thay đổi hợp đồng là quyết định của Sales Manager.",
          ),
          game(
            "Your quote ran out yesterday. Is the price still the same?",
            "The quote was valid until yesterday, sir, so let me check the rate again before you sign.",
            "The quote was valid until yesterday, sir, so let me checking the rate again before you sign.",
            "Yes, sir, a day or two late makes no difference at all, so the same price is fine and you can sign today.",
            undefined,
            "Sau 'let me' là động từ nguyên thể 'check'. Câu 'a day or two late makes no difference' nghe dễ chịu nhưng sai điều khoản: báo giá hết hạn thì kiểm tra lại giá trước khi ký.",
          ),
        ],
      },
    ),
  ],
};
