// FO week 38 — presenting a quote for bedrooms and a meeting room to a
// corporate booker, as a three-part pitch (see ../kit.ts).
//
//  · Part one is THEIR needs, in their words: headcount, dates, what the
//    meeting is for, bedrooms — summed up in one sentence and confirmed
//    before any price. A headcount that is not final is planned at its
//    highest, with a date for the final figure.
//  · Part two is ONE room and ONE reason taken from what the booker said.
//    The Garden Room: forty in classroom style, thirty in U-shape seating. The
//    boardroom: twelve round one table. The breakout room next door, extra.
//    Never the biggest room because it is free; offer to show the room.
//  · Part three is the price and what is in it. The day delegate rate is per
//    person, per day: room, projector, two coffee breaks and lunch; the
//    half-day package runs until lunch with one coffee break. Meeting prices
//    are before service charge and VAT, so the desk quotes the total, and
//    says what is included before what is extra. Bedrooms go on the corporate
//    rate where there is an agreement, the group rate otherwise.
//  · The close: "In short", the date the quote is valid until, a tentative
//    hold of seven days (the first booker is called before the room is
//    released), and the next step — a signed contract and the deposit.
//    A discount, a longer hold or a later deposit is the Sales Manager's.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a = "Thank you, madam. Before I propose anything, may I ask what the meeting is for?";
const t1b =
  "Then you need a room for talks and space for group work. May I also ask about bedrooms?";
const t1c =
  "To sum up, madam: forty delegates, talks and group work, and twenty rooms for two nights. Is that right?";

const t2a =
  "We propose the Garden Room in classroom style, madam, because every delegate can see the screen.";
const t2b =
  "Then the breakout room next door is the best choice, madam, and it is available in the afternoon.";
const t2c = "Of course, madam. May I show you both this week, so you can see for yourself?";

export const week: AuthoredWeek = {
  title: { en: "Presenting a Corporate Quote", vi: "Trình bày báo giá cho doanh nghiệp" },
  canDo:
    "Nói được: trình bày báo giá phòng ngủ và phòng họp theo ba phần — nhắc lại nhu cầu của khách, đề xuất MỘT phòng với MỘT lý do, báo giá nói rõ cái gì đã gồm và cái gì tính thêm — rồi chốt bằng hiệu lực báo giá, giữ chỗ tạm và bước tiếp theo.",
  lessons: [
    L(38, 1, "Part One: What You Need", "Phần một: nhắc lại điều khách cần", {
      vocabulary: [
        c("Proposal", "I will send you a written proposal this afternoon.", [
          "/prəˈpəʊzl/",
          "Bản đề xuất",
          "📝",
        ]),
        c("Delegate", "Each delegate gets a name card and a notepad.", [
          "/ˈdelɪɡət/",
          "Người dự hội nghị, đại biểu",
          "👥",
        ]),
        c("Headcount", "Please confirm the final headcount two days before the meeting.", [
          "/ˈhedkaʊnt/",
          "Số người tham dự",
          "🔢",
        ]),
        c("To sum up", "To sum up, you need a room for forty people for two days.", [
          "/tə sʌm ʌp/",
          "Tóm lại",
          "🧾",
        ]),
      ],
      grammar: [
        g(
          "So, what do you want?",
          "You mentioned forty delegates for two days, madam. Is that still the headcount?",
          "Phần một của bài trình bày: nhắc lại điều khách đã nói ('You mentioned…'), rồi xác nhận. 'mentioned' là quá khứ — khách đã nói rồi.",
          "You mention forty delegates for two days, madam. Is that still the headcount?",
        ),
        g(
          "Okay, you need many things.",
          "To sum up, sir, you need a meeting room, lunch and twenty rooms for two nights.",
          "'To sum up' gom mọi yêu cầu vào MỘT câu để khách sửa trước khi mình báo giá. 'you' đi với 'need', không thêm -s. Danh sách nối bằng dấu phẩy, 'and' ở mục cuối.",
          "To sum up, sir, you needs a meeting room, lunch and twenty rooms for two nights.",
        ),
      ],
      speaking: [
        sp(
          "We are forty people, for two days in May. What can you offer us?",
          t1a,
          "Chưa báo giá, chưa đề xuất. Cảm ơn, rồi hỏi một câu về mục đích cuộc họp — câu trả lời sẽ quyết định phòng và cách xếp.",
        ),
        sp(
          "Mostly talks, then group work in the afternoon.",
          t1b,
          "Nói lại nhu cầu bằng lời của mình cho khách nghe là mình đã hiểu, rồi hỏi tiếp phần còn thiếu: phòng ngủ.",
          undefined,
          undefined,
          t1a,
        ),
        {
          ...sp(
            "Yes, twenty rooms for two nights, most of them single.",
            t1c,
            "Gom tất cả vào MỘT câu bắt đầu bằng 'To sum up', dùng đúng các con số khách đã nói, rồi hỏi lại cho chắc.",
            undefined,
            undefined,
            t1b,
          ),
          alsoAccept: [
            "To sum up, madam: forty delegates, talks and group work, and twenty rooms for two nights. Is that correct?",
          ],
        },
        {
          ...sp(
            "Can you just send me your price list?",
            "Of course, sir, but may I ask about your meeting first? Then my proposal will fit what you need.",
            "Không từ chối, nhưng xin hỏi trước: một báo giá dựa trên nhu cầu thật ('proposal') đáng tin hơn một bảng giá.",
          ),
          alsoAccept: [
            "Of course, sir, but may I ask about your meeting first? Then my proposal can fit what you need.",
          ],
        },
        {
          ...sp(
            "We are not sure yet how many people will come.",
            "That is fine, madam. Please give me your highest number now, and confirm the final headcount closer to the date.",
            "Chưa chắc số người thì lập kế hoạch theo con số cao nhất, và hẹn khách chốt số người cuối cùng ('headcount').",
          ),
          alsoAccept: [
            "That is fine, madam. Please give me your highest number now, and confirm the final headcount nearer the date.",
          ],
        },
        {
          ...sp(
            "Why are you asking me so many questions?",
            "So that my proposal fits, madam. Based on what you told me, I can offer the right room, not just the biggest one.",
            "Giải thích ngắn vì sao hỏi, rồi nối với lợi ích cho khách bằng 'Based on' cộng chính lời khách đã nói.",
            undefined,
            ["based"],
          ),
          alsoAccept: [
            "So that my proposal fits, madam. Based on what you told me, I can propose the right room, not just the biggest one.",
          ],
        },
        sp(
          "The pharma booker wants a quote today. Where do I start?",
          "Start with what the booker needs, not with our prices. Write down the headcount, the dates and the purpose.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Phần một của mọi báo giá là nhu cầu của khách, ghi bằng lời của khách.",
          "colleague",
        ),
      ],
      reading: read(
        `PRESENTING A QUOTE — PART ONE: THEIR NEEDS, IN THEIR WORDS
A short pitch has three parts: what you need, what we propose, and what it costs.
Most quotes fail in part one, because the desk starts with prices.
Before you propose anything, ask four things: how many people, which dates, what the meeting is for, and how many bedrooms.
Write the booker's words down. "Talks in the morning, group work after lunch" already tells you the layout.
Then sum it up in one sentence, and ask if it is right.
A booker who hears their own needs read back trusts the price that follows.
If the headcount is not final, plan for the highest number and agree a date for the final figure.
Never guess a budget, and never open with "How much do you want to spend?"
A price list sent before these questions is a price list that gets compared, not a proposal that gets signed.`,
        [
          {
            q: "Theo tài liệu, phần lớn các báo giá hỏng ở đâu?",
            options: [
              "Ở phần giá, vì giá cao hơn khách mong đợi",
              "Ở phần một, vì quầy nói giá trước khi hỏi khách cần gì",
              "Ở phần cuối, vì quầy quên hẹn bước tiếp theo",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Most quotes fail in part one, because the desk starts with prices."',
          },
          {
            q: "Khách chưa chắc số người tham dự. Lễ tân làm gì?",
            options: [
              "Chờ tới khi khách chắc chắn số người rồi mới gửi báo giá",
              "Tự đoán một con số trung bình để báo giá cho nhanh",
              "Tính theo số cao nhất, hẹn ngày chốt số cuối",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "plan for the highest number and agree a date for the final figure."',
          },
          {
            q: "Vì sao phải tóm tắt nhu cầu của khách trước khi báo giá?",
            options: [
              "Vì quy định yêu cầu ghi âm phần tóm tắt",
              "Vì khách nghe lại nhu cầu của mình sẽ tin mức giá theo sau",
              "Để kéo dài cuộc gọi, cho khách thấy mình được quan tâm nhiều hơn bình thường",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "A booker who hears their own needs read back trusts the price that follows."',
          },
        ],
      ),
      game: [
        game(
          "Just tell me your cheapest meeting room price.",
          "Of course, sir. May I first ask how many delegates you expect, so the price fits your meeting?",
          "Our cheapest room is the boardroom, sir, and it is very good price, so I can book it for you right now if you like.",
          "Our cheapest room is the boardroom, sir, and it is a very good price, so I can book it for you right now if you like.",
          undefined,
          "Hai câu đọc ngay giá phòng rẻ nhất đều bỏ qua phần một: chưa biết bao nhiêu người, phòng rẻ nhất có thể không vừa. Câu 'it is very good price' còn thiếu mạo từ: 'a very good price'.",
        ),
        game(
          "The booker said forty people, then thirty-five. Which number do I quote for?",
          "The highest one. Then agree a date with the booker for the final headcount.",
          "Quote for thirty-five. It keep the price low.",
          "Quote for thirty-five. It keeps the price low.",
          "colleague",
          "Hai câu báo giá theo số thấp cho rẻ đều sai cách làm: lập kế hoạch theo con số cao nhất, rồi hẹn ngày chốt số người. Câu 'It keep' còn thiếu -s: 'it' đi với 'keeps'.",
        ),
      ],
    }),

    L(38, 2, "Part Two: What We Propose", "Phần hai: đề xuất phòng và cách xếp", {
      vocabulary: [
        c("Boardroom", "The boardroom seats twelve around one long table.", [
          "/ˈbɔːdruːm/",
          "Phòng họp hội đồng (một bàn dài)",
          "🪑",
        ]),
        c("Classroom style", "In classroom style, every delegate faces the screen.", [
          "/ˈklɑːsruːm staɪl/",
          "Kiểu lớp học",
          "🏫",
        ]),
        c("U-shape", "U-shape seating works well for people who need to discuss.", [
          "/ˈjuː ʃeɪp/",
          "Kiểu chữ U",
          "🔤",
        ]),
        c("Breakout room", "The breakout room next door is for small group work.", [
          "/ˈbreɪkaʊt ruːm/",
          "Phòng họp nhóm nhỏ",
          "🚪",
        ]),
        c("Brief", "Propose the room that fits the brief, in the booker's own words.", [
          "/briːf/",
          "Yêu cầu của khách (đề bài cho báo giá)",
          "🗒️",
        ]),
      ],
      grammar: [
        g(
          "This room is big. You will like it.",
          "We propose the Garden Room in classroom style, madam, because it seats forty and has daylight.",
          "Phần hai: đề xuất MỘT phương án ('We propose…') và MỘT lý do gắn với nhu cầu khách ('because…'). 'it' số ít nên 'seats', 'has'.",
          "We propose the Garden Room in classroom style, madam, because it seat forty and has daylight.",
        ),
        g(
          "You can use the small room also.",
          "For the group work, the breakout room next door is available in the afternoon, sir.",
          "Thêm một phương án phụ cho đúng MỘT nhu cầu khách đã nêu. 'available' là còn trống, không có nghĩa là miễn phí. Chủ ngữ số ít đi với 'is'.",
          "For the group work, the breakout room next door are available in the afternoon, sir.",
        ),
      ],
      speaking: [
        sp(
          "We need talks in the morning and group work after lunch. Which room would you propose?",
          t2a,
          "Một phòng, một cách xếp ('classroom style'), một lý do lấy từ nhu cầu khách vừa nói — ai cũng nhìn thấy màn hình.",
        ),
        sp(
          "And the group work? We do not want to move tables.",
          t2b,
          "Thêm đúng một phòng phụ cho đúng một nhu cầu ('breakout room'), và nói phòng còn trống vào lúc khách cần — chưa nói giá ở phần này.",
          undefined,
          undefined,
          t2a,
        ),
        sp(
          "Can we see both rooms before we decide?",
          t2c,
          "Khách muốn xem tận nơi là tín hiệu tốt. Mời khách tự xem ('see for yourself') và đưa một mốc: tuần này.",
          undefined,
          ["see", "yourself"],
          t2b,
        ),
        {
          ...sp(
            "We are only twelve directors. Do we need that big room?",
            "No, sir. For twelve people, I would propose the boardroom, where everyone sits around one table.",
            "Không bán phòng to hơn nhu cầu. Đề xuất phòng vừa ('boardroom') và một chi tiết khách hình dung được.",
          ),
          alsoAccept: [
            "No, sir. For twelve people, I would suggest the boardroom, where everyone sits around one table.",
            "No, sir. For twelve, I would propose the boardroom, where everyone sits around one table.",
          ],
        },
        {
          ...sp(
            "We want to discuss a lot, not just listen. Is classroom style right for us?",
            "In that case, madam, U-shape seating is better, because everyone can see and talk to each other.",
            "Đổi đề xuất theo điều khách vừa nói: thảo luận thì kiểu chữ U ('U-shape'), không phải kiểu lớp học.",
          ),
          alsoAccept: [
            "In that case, madam, U-shape seating works better, because everyone can see and talk to each other.",
          ],
        },
        sp(
          "The booker asked for the biggest room we have. Should I offer the ballroom?",
          "Only if the headcount needs it. Propose the room that fits the brief, not the biggest one.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Phòng to hơn nhu cầu làm sự kiện trông vắng — đề xuất phòng vừa với số người.",
          "colleague",
        ),
        sp(
          "Why did you propose the boardroom and not the Garden Room?",
          "Because the booker asked for a private room for the directors, and the boardroom fits that brief.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: lý do đến từ lời của khách, không từ việc phòng nào đang trống.",
          "manager",
        ),
      ],
      reading: read(
        `PRESENTING A QUOTE — PART TWO: ONE ROOM, ONE REASON
The facts below are one hotel's. Learn your own rooms the same way.
THE GARDEN ROOM: forty people in classroom style, or thirty in U-shape seating. It has daylight and its own coffee area.
THE BOARDROOM: twelve people around one long table. It is quiet, private, and best for directors.
THE BREAKOUT ROOM: next to the Garden Room, for small group work in the afternoon.
Propose ONE room, and give ONE reason that comes from the booker's own words.
"Because every delegate can see the screen" is a reason. "Because it is our best room" is not.
Match the layout to the meeting. Talks and slides: classroom style. Discussion: U-shape seating. A board meeting: the boardroom.
Never propose the biggest room just because it is free. A half-empty room makes an event look like a failure.
Offer to show the room. A booker who has stood in it signs faster than one who has only read about it.`,
        [
          {
            q: "Cuộc họp chủ yếu là thảo luận. Tài liệu gợi ý cách xếp nào?",
            options: [
              "Kiểu lớp học, để ai cũng nhìn thấy màn hình chiếu phía trước",
              "Kiểu chữ U",
              "Phòng lớn nhất còn trống trong ngày, để khách thấy thoải mái",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Discussion: U-shape seating." — kiểu lớp học dành cho bài nói và trình chiếu.',
          },
          {
            q: "Lý do nào đúng kiểu tài liệu dạy?",
            options: [
              "Vì đây là phòng đẹp nhất",
              "Vì phòng này đang trống",
              "Vì đại biểu nào cũng nhìn thấy màn hình",
            ],
            correct: 2,
            explanation:
              'Lý do phải đến từ nhu cầu khách: tài liệu coi "Because every delegate can see the screen" là lý do, còn "Because it is our best room" thì không.',
          },
          {
            q: "Vì sao không nên đề xuất phòng lớn nhất chỉ vì nó còn trống?",
            options: [
              "Vì phòng trống một nửa làm sự kiện trông như thất bại",
              "Vì phòng lớn nhất luôn phải giữ cho khách tiệc cưới",
              "Vì giá phòng lớn cao hơn mức khách sạn cho phép báo qua điện thoại",
            ],
            correct: 0,
            explanation: 'Tài liệu ghi "A half-empty room makes an event look like a failure."',
          },
        ],
      ),
      game: [
        game(
          "We are twelve directors. Which room would you suggest?",
          "The boardroom, sir. Everyone sits around one table, and it is quiet and private.",
          "The boardroom, sir. Everyone sit around one table, and it is quiet and private.",
          "Our ballroom, sir, because it is the biggest and most impressive room we have, and it happens to be free that day.",
          undefined,
          "'Everyone' đi với động từ số ít: 'sits'. Câu đề xuất phòng tiệc lớn nhất đúng tiếng Anh nhưng lý do là của khách sạn (phòng to, đang trống), không phải nhu cầu riêng tư của khách.",
        ),
        game(
          "Is classroom style best for a team discussion?",
          "Not really, madam. For discussion, U-shape seating works better, because everyone can see each other.",
          "Not really, madam. For discussion, U-shape seating work better, because everyone can see each other.",
          "Yes, madam, classroom style is our standard layout, and it is what most of our corporate guests choose anyway.",
          undefined,
          "'U-shape seating' số ít nên 'works' có -s. Câu 'our standard layout… most guests choose' đúng tiếng Anh nhưng không trả lời nhu cầu thảo luận của khách.",
        ),
      ],
    }),

    L(38, 3, "Part Three: What It Costs", "Phần ba: chi phí, và cái gì đã gồm", {
      vocabulary: [
        c(
          "Day delegate rate",
          "The day delegate rate covers the room, two coffee breaks and lunch.",
          ["/deɪ ˈdelɪɡət reɪt/", "Giá trọn gói hội nghị (mỗi người, mỗi ngày)", "🧮"],
        ),
        c("Coffee break", "We serve the morning coffee break at half past ten.", [
          "/ˈkɒfi breɪk/",
          "Giờ giải lao (trà, cà phê)",
          "☕",
        ]),
        c("Half-day", "The half-day package ends with lunch.", ["/ˌhɑːf ˈdeɪ/", "Nửa ngày", "🌓"]),
        c("Per person", "The meeting package is priced per person, per day.", [
          "/pə ˈpɜːsn/",
          "Mỗi người",
          "🧍",
        ]),
        c("Projector", "Every meeting room has a projector and a screen.", [
          "/prəˈdʒektə/",
          "Máy chiếu",
          "📽️",
        ]),
      ],
      grammar: [
        g(
          "It is one million two per person, plus some taxes.",
          "The day delegate rate is one million two hundred thousand per person, madam, before service charge and VAT.",
          "Báo giá đủ ba phần: tên gói, số tiền, đơn vị ('per person'), rồi nói rõ giá chưa gồm phí phục vụ và VAT. 'rate' số ít nên đi với 'is'.",
          "The day delegate rate are one million two hundred thousand per person, madam, before service charge and VAT.",
        ),
        g(
          "Lunch is included. Everything is included.",
          "The rate includes the room, two coffee breaks and lunch, sir, but the breakout room is extra.",
          "Nói rõ cái gì ĐÃ GỒM trong giá và cái gì TÍNH THÊM ('but… is extra'), để hoá đơn không làm khách bất ngờ. 'The rate' số ít nên 'includes' có -s.",
          "The rate include the room, two coffee breaks and lunch, sir, but the breakout room is extra.",
        ),
      ],
      speaking: [
        sp(
          "Your website shows a day delegate rate. What does it include?",
          "It includes the meeting room, the projector, two coffee breaks and lunch, madam, charged per person.",
          "Kể đủ những gì đã gồm trong gói, rồi đơn vị tính ('per person') — khách cần biết giá này nhân với bao nhiêu người.",
        ),
        sp(
          "And the price on the website, is that the total?",
          "Not quite, madam. That price is before service charge and VAT, so let me quote the total for your group.",
          "Giá gói hội nghị chưa gồm phí phục vụ và VAT — nói ngay, rồi đề nghị báo tổng ('quote the total') cho cả đoàn.",
          undefined,
          ["quote", "total"],
          "It includes the meeting room, the projector, two coffee breaks and lunch, madam, charged per person.",
        ),
        sp(
          "And the breakout room in the afternoon?",
          "That is extra, madam, charged per day, and I will show it on its own line in the quote.",
          "Cái gì tính thêm thì nói thẳng là 'extra', và hứa ghi riêng một dòng trong báo giá — không giấu khoản nào.",
          undefined,
          ["extra"],
          "Not quite, madam. That price is before service charge and VAT, so let me quote the total for your group.",
        ),
        {
          ...sp(
            "We only need the morning. Is there anything cheaper?",
            "Yes, sir. Our half-day package runs until lunch, with one coffee break, and it costs less per person.",
            "Đưa gói nhỏ hơn cho đúng nhu cầu ('half-day'), kể cái gì có trong gói, rồi so sánh giá theo đầu người.",
          ),
          alsoAccept: [
            "Yes, sir. Our half-day package runs until lunch, with one coffee break, and costs less per person.",
          ],
        },
        risk({
          ...sp(
            "Take fifteen per cent off the whole quote and we will sign today.",
            "I cannot change the price, sir, but I will ask our Sales Manager today.",
            "Câu phải đúng của tuần: giảm giá gói hội nghị là quyết định của Sales Manager. Quầy không mặc cả, chỉ hỏi — và hỏi ngay hôm nay.",
            undefined,
            ["price", "sales", "manager"],
          ),
          alsoAccept: [
            "I am not able to change the price, sir, but I will ask our Sales Manager today.",
            "I cannot change the price myself, sir, but I will ask our Sales Manager today.",
            "I cannot change the price, sir. I will ask our Sales Manager today.",
          ],
        }),
        sp(
          "The booker asked if the coffee breaks are included. Are they?",
          "Yes, two coffee breaks and lunch are in the day delegate rate, and only the breakout room is extra.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Trả lời có, kể đúng cái đã gồm, và nêu khoản duy nhất tính thêm.",
          "colleague",
        ),
        sp(
          "The bank wants the meeting and twenty rooms. Which rate did you quote for the rooms?",
          "Their corporate rate, because they have a rate agreement. The meeting is on the day delegate rate.",
          "Báo cáo lên cấp trên, không gọi sir hay madam: giá phòng ngủ theo thoả thuận doanh nghiệp, giá họp theo gói — hai giá, hai lý do.",
          "manager",
        ),
      ],
      reading: read(
        `PRESENTING A QUOTE — PART THREE: THE PRICE, AND WHAT IS IN IT
The figures below are one hotel's.
DAY DELEGATE RATE: 1,200,000 VND per person, per day. It includes the meeting room, a projector and screen, two coffee breaks and lunch.
HALF-DAY: 900,000 VND per person, until lunch, with one coffee break.
BREAKOUT ROOM: 2,000,000 VND per day, extra.
All meeting prices are before service charge and VAT. Always quote the total the booker will see.
Bedrooms: the corporate rate if the company has an agreement, or the group rate for ten rooms or more.
Say what is included first, then what is extra. A booker who finds a surprise on the bill remembers the hotel, not the meeting.
Put every extra on its own line, so nothing is hidden.
The desk quotes the published package. A discount on it is the Sales Manager's decision, never the desk's.`,
        [
          {
            q: "Giá trọn gói mỗi người mỗi ngày gồm những gì?",
            options: [
              "Chỉ có phòng họp; đồ ăn và máy chiếu tính riêng từng món",
              "Phòng họp, phòng họp nhóm nhỏ và toàn bộ phòng ngủ của đoàn",
              "Phòng họp, máy chiếu, hai lần giải lao và bữa trưa",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi gói này "includes the meeting room, a projector and screen, two coffee breaks and lunch" — phòng họp nhóm nhỏ thì tính thêm.',
          },
          {
            q: "Giá phòng họp trong báo giá là giá thế nào?",
            options: [
              "Đã gồm mọi khoản phí phục vụ và thuế VAT",
              "Chưa gồm phí phục vụ và VAT, nên phải báo tổng",
              "Giá ưu đãi riêng dành cho khách có thoả thuận doanh nghiệp",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "All meeting prices are before service charge and VAT. Always quote the total the booker will see."',
          },
          {
            q: "Người đặt xin giảm giá gói hội nghị. Ai quyết?",
            options: [
              "Lễ tân đang trình bày báo giá",
              "Bộ phận bếp, vì gói có bữa trưa",
              "Sales Manager; quầy chỉ báo giá gói đã công bố",
            ],
            correct: 2,
            explanation:
              "Tài liệu ghi \"The desk quotes the published package. A discount on it is the Sales Manager's decision, never the desk's.\"",
          },
        ],
      ),
      game: [
        game(
          "Is lunch included in your meeting price?",
          "Yes, sir. The day delegate rate includes lunch and two coffee breaks, per person.",
          "Yes, sir. The day delegate rate include lunch and two coffee breaks, per person.",
          "Yes, sir, everything is included, so you will not see anything extra on the bill at all, I can promise you that.",
          undefined,
          "'rate' số ít nên 'includes' có -s. Câu 'everything is included… nothing extra' nghe dễ chịu nhưng sai: phòng họp nhóm nhỏ tính thêm, và giá còn chưa gồm phí phục vụ và VAT.",
        ),
        game(
          "The booker wants our price for forty people. Do I just send the per person figure?",
          "No. Quote the total, with service charge and VAT, so there are no surprises on the bill.",
          "Yes, send the figure per person. It look much cheaper that way.",
          "Yes, send the figure per person. It looks much cheaper that way.",
          "colleague",
          "Hai câu gửi giá một người cho trông rẻ hơn đều giấu tổng tiền — tài liệu dặn báo tổng số khách sẽ thấy trên hoá đơn. Câu 'It look' còn thiếu -s: 'it' đi với 'looks'.",
        ),
      ],
    }),

    L(
      38,
      4,
      "The Close: Validity, a Hold and the Next Step",
      "Kết bài: hiệu lực báo giá, giữ chỗ và bước tiếp theo",
      {
        vocabulary: [
          c("Tentative hold", "We can put a tentative hold on the Garden Room for seven days.", [
            "/ˈtentətɪv həʊld/",
            "Giữ chỗ tạm (chưa xác nhận)",
            "📌",
          ]),
          c("Site visit", "A site visit lets the booker see the room before signing.", [
            "/saɪt ˈvɪzɪt/",
            "Buổi xem trực tiếp địa điểm",
            "🚶",
          ]),
          c("Next step", "The next step is a signed contract and the deposit.", [
            "/nekst step/",
            "Bước tiếp theo",
            "➡️",
          ]),
          c("In short", "In short, the Garden Room, lunch and twenty rooms, all in one quote.", [
            "/ɪn ʃɔːt/",
            "Tóm gọn lại",
            "🎯",
          ]),
        ],
        grammar: [
          g(
            "Book now or lose it.",
            "May I put a tentative hold on the room for you, madam, while you decide?",
            "Kết bài bằng một đề nghị nhẹ, không ép: giữ chỗ tạm cho khách thời gian quyết định. Sau 'May I' là động từ nguyên thể.",
            "May I putting a tentative hold on the room for you, madam, while you decide?",
          ),
          g(
            "So that is it, bye.",
            "In short, sir: the Garden Room, lunch for forty and twenty rooms. The next step is the signed contract.",
            "Phần kết: 'In short' gom cả đề xuất vào một câu, rồi nói rõ bước tiếp theo ('The next step is…'). 'step' số ít nên đi với 'is'.",
            "In short, sir: the Garden Room, lunch for forty and twenty rooms. The next step are the signed contract.",
          ),
        ],
        speaking: [
          sp(
            "That all sounds good. What happens now?",
            "In short, madam: the Garden Room, lunch and the breakout room. The next step is a signed contract and the deposit.",
            "Kết bài: 'In short' gom cả đề xuất vào một câu, rồi nói rõ bước tiếp theo ('next step').",
          ),
          sp(
            "We need a week to get approval. Can you keep the room for us?",
            "Yes, madam. I can put a tentative hold on it for seven days, and I will send the quote in writing today.",
            "Giữ chỗ tạm ('tentative hold') có mốc rõ ràng — bảy ngày — và một việc mình làm ngay: gửi báo giá bằng văn bản.",
            undefined,
            undefined,
            "In short, madam: the Garden Room, lunch and the breakout room. The next step is a signed contract and the deposit.",
          ),
          sp(
            "And if another company wants the same date?",
            "Then I will call you first, madam, before we release the room to anyone else.",
            "Đang giữ chỗ tạm thì người đặt đầu tiên được gọi TRƯỚC khi nhả phòng — hứa đúng việc đó, không hứa hơn.",
            undefined,
            undefined,
            "Yes, madam. I can put a tentative hold on it for seven days, and I will send the quote in writing today.",
          ),
          risk({
            ...sp(
              "Can you hold the room for a month, just in case?",
              "I cannot hold it that long, sir, but I will ask our Sales Manager today.",
              "Câu phải đúng của tuần: giữ chỗ lâu hơn mức chuẩn là quyết định của Sales Manager. Nói điều mình không làm, rồi việc làm ngay hôm nay.",
              undefined,
              ["hold", "long", "sales", "manager"],
            ),
            alsoAccept: [
              "I am not able to hold it that long, sir, but I will ask our Sales Manager today.",
              "I cannot hold it for that long, sir, but I will ask our Sales Manager today.",
              "I cannot hold it that long, sir. I will ask our Sales Manager today.",
            ],
          }),
          {
            ...sp(
              "I would like to see the rooms before I decide.",
              "Of course, sir. May I book a site visit for you this week, at a time that suits you?",
              "Mời xem tận nơi ('site visit') và để khách chọn giờ — người đã đứng trong phòng thường quyết nhanh hơn.",
            ),
            alsoAccept: [
              "Of course, sir. Shall I book a site visit for you this week, at a time that suits you?",
            ],
          },
          {
            ...sp(
              "How long is this price good for?",
              "The quote is valid until the date printed on it, madam, and I will remind you before it runs out.",
              "Mọi báo giá đều có hạn ('valid until'), và quầy tự nhắc khách trước khi hết hạn — không chờ khách hỏi.",
              undefined,
              ["valid", "until"],
            ),
            alsoAccept: [
              "The quote is valid until the date printed on it, madam, and I will remind you before it expires.",
            ],
          },
          sp(
            "Another group wants the Garden Room on the same date. Can I give it to them?",
            "Not yet. The first booker has a tentative hold, so call them first before you release it.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Giữ chỗ tạm là một lời hứa: gọi người đặt đầu tiên trước.",
            "colleague",
          ),
          sp(
            "Where are we with the bank's meeting?",
            "The proposal went out today with a tentative hold, and the next step is their signed contract.",
            "Báo cáo lên cấp trên, không gọi sir hay madam: việc đã làm hôm nay, và bước tiếp theo.",
            "manager",
          ),
        ],
        reading: read(
          `PRESENTING A QUOTE — THE CLOSE: VALIDITY, HOLD AND THE NEXT STEP
End every pitch with three things: a summary, a date, and the next step.
Start the summary with "In short", and keep it to one sentence.
Every quote is valid until a date printed on it. Fourteen days is our standard.
A tentative hold keeps the room for the booker while they decide. We hold it for seven days.
If another client asks for the same date during the hold, call the first booker before you release the room.
The hold becomes definite only with a signed contract and the deposit.
A longer hold, a lower price or a later deposit is the Sales Manager's decision.
Offer a site visit, and let the booker choose the time.
Close with the next step and a time of your own: "I will send the quote in writing today, and call you on Thursday."`,
          [
            {
              q: "Theo tài liệu, giữ chỗ tạm kéo dài bao lâu?",
              options: [
                "Mười bốn ngày, bằng thời hạn hiệu lực của báo giá",
                "Bảy ngày",
                "Một tháng, nếu khách là công ty có thoả thuận giá",
              ],
              correct: 1,
              explanation:
                'Về giữ chỗ tạm, tài liệu ghi "We hold it for seven days." — mười bốn ngày là thời hạn của báo giá, không phải của giữ chỗ.',
            },
            {
              q: "Đang giữ chỗ tạm thì một khách khác hỏi cùng ngày. Lễ tân làm gì?",
              options: [
                "Gọi cho người đặt đầu tiên trước khi nhả phòng cho khách mới",
                "Bán ngay cho khách mới đã sẵn sàng ký",
                "Giữ cho cả hai, rồi chọn bên đặt cọc trước",
              ],
              correct: 0,
              explanation: 'Tài liệu ghi "call the first booker before you release the room."',
            },
            {
              q: "Giữ chỗ tạm trở thành chính thức khi nào?",
              options: [
                "Khi người đặt nói đồng ý qua điện thoại với lễ tân",
                "Khi có hợp đồng đã ký và tiền cọc",
                "Khi người đặt đã tới xem phòng họp tận nơi",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "The hold becomes definite only with a signed contract and the deposit."',
            },
          ],
        ),
        game: [
          game(
            "Can you keep the Garden Room for us while we get approval?",
            "Yes, madam. I can put a tentative hold on it for seven days, and I will call you first if anyone else asks.",
            "Yes, madam. I can put a tentative hold on it for seven days, and I will call you first if anyone else ask.",
            "Of course, madam. I will keep it for you for as long as you need, so please take all the time you want before you decide.",
            undefined,
            "'anyone else' đi với động từ số ít: 'asks'. Câu giữ phòng 'for as long as you need' nghe hào phóng nhưng vượt quyền — giữ chỗ lâu hơn bảy ngày là quyết định của Sales Manager.",
          ),
          game(
            "The booker said yes on the phone. Can I mark the meeting as definite?",
            "Not yet. It becomes definite with the signed contract and the deposit, so keep it as a tentative hold.",
            "Not yet. It become definite with the signed contract and the deposit, so keep it as a tentative hold.",
            "Yes. A yes on the phone is enough, so mark it as definite now and send the contract whenever you have time.",
            "colleague",
            "'It' đi với 'becomes'. Câu coi lời đồng ý qua điện thoại là đủ đúng tiếng Anh nhưng sai quy trình: chỉ hợp đồng đã ký và tiền cọc mới biến giữ chỗ tạm thành chính thức.",
          ),
        ],
      },
    ),
  ],
};
