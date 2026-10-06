// GR week 35 — light negotiation, with colleagues and with guests.
//
// Rewritten after the first blind round of the reopened Phase 4 (7ed3254).
// The matrix asks for negotiation inside the house as well as with guests,
// and the old week had only the second. Lesson 1 is now the give-and-take a
// Guest Relations officer does every day at the service door — housekeeping,
// the kitchen, the concierge desk — where what you trade must be your own
// (your time, your desk, your call to the guest) and never a guest's room, a
// discount or a dinner. Lessons 2-4 keep what the Guest Relations Manager on
// the panel praised: the range is set by the manager before you sit down and
// is never said out loud; what was never the manager's (the room, tier and
// points, money off the bill) stays outside it; "however" puts the half that
// moves first; the last-minute request goes back to the manager with an hour
// that is yours; and the case is closed by the guest, not by a signature.
// The old week's "What if we look at the dates instead? That part I can do"
// promised a date change, which is the front office's — it is gone.
import type { GameRound, SpeakingItem } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("GR");
const L = lessonsFor("GR");

/** A turn with the other wordings the course accepts for it. */
const also = (s: SpeakingItem, ...alsoAccept: string[]): SpeakingItem => ({ ...s, alsoAccept });

type Kind = "answer" | "form" | "register";
/** One arcade round, options in the order written: `form` is broken English,
 *  `register` is correct English that is wrong for the job. */
const round = (
  prompt: string,
  options: [string, Kind][],
  explanation: string,
  speakerRole?: GameRound["speakerRole"],
): GameRound => ({
  prompt,
  ...(speakerRole ? { speakerRole } : {}),
  options: options.map(([text, kind]) => ({ text, correct: kind === "answer", kind })),
  explanation,
});

// ── Lesson 1 — give and take with colleagues ───────────────────────────────
const t1a = "What if we make his room the priority, and swap it with the next one on your list?";
const t1b =
  "In exchange for that, I will look after the next guest in the lounge until the room is ready.";
const t1c = "Can we meet halfway at one o'clock? I will tell the guest the timing myself.";

// ── Lesson 2 — the range comes first ───────────────────────────────────────
const t2a =
  "Before we sit down with him, I must have the range. Money off a bill is my Duty Manager's to set.";
const t2b = "What I may offer, what I may not offer, and who signs it.";
const t2c = "Thank you. I will write it all down now, and the range stays with me.";

// ── Lesson 3 — however: the part that does not move ────────────────────────
const t3a = "I can put the suite to my manager; however, the rate is the part I cannot move, sir.";
const t3b = "Although the transfer is not my decision, I can ask my Duty Manager about it today.";
const t3c =
  "Your tier is not mine to trade, sir. The loyalty office decides, and I will write to them today.";

// ── Lesson 4 — closing it, in writing ──────────────────────────────────────
const t4a =
  "Shall we agree on those two, sir? You will have them in writing before you leave the desk.";
const t4b = "That goes back to my manager, sir, and I will come back to you within the hour.";
const t4c = "Not until you tell me it is right, sir. Once you agree, I will close the case.";

const lessons = [
  L(35, 1, "Give and Take with Colleagues", "Đàm phán nhẹ với đồng nghiệp", {
    vocabulary: [
      c("What if we", "What if we serve the cake with dessert instead?", [
        "/wɒt ɪf wiː/",
        "hay là chúng ta…",
        "💡",
      ]),
      c("In exchange for", "In exchange for the car, I will take your next airport call.", [
        "/ɪn ɪksˈtʃeɪndʒ fɔː/",
        "để đổi lại",
        "🔄",
      ]),
      c("Swap", "Could we swap the order of these two rooms?", [
        "/swɒp/",
        "đổi chỗ, đổi cho nhau",
        "↔️",
      ]),
      c("Meet halfway", "Can we meet halfway at one o'clock?", [
        "/miːt ˌhɑːfˈweɪ/",
        "mỗi bên nhường một nửa",
        "🤝",
      ]),
      c("Priority", "Could his room be the priority this morning?", [
        "/praɪˈɒrəti/",
        "việc được ưu tiên làm trước",
        "⭐",
      ]),
    ],
    grammar: [
      g(
        "Do my VIP room first.",
        "What if we do the VIP room first, and I look after the next guest in exchange?",
        "'What if we + động từ nguyên mẫu?' mở một đề xuất hai bên cùng có lợi — không ra lệnh cho đồng nghiệp. 'What if we DO', không phải 'What if we doing'.",
        "What if we doing the VIP room first, and I look after the next guest in exchange?",
      ),
      g(
        "You must help me with the car.",
        "In exchange for the car at ten, I will take your lounge hour tonight.",
        "'In exchange for + danh từ' gắn thứ bạn xin với thứ bạn đưa lại. Giới từ là 'for', không phải 'of'.",
        "In exchange of the car at ten, I will take your lounge hour tonight.",
      ),
    ],
    speaking: [
      sp(
        "Housekeeping. Your VIP's room is fourth on my list, and he lands at noon.",
        t1a,
        "ĐỒNG NGHIỆP hỏi. Đừng ra lệnh — đề xuất bằng 'What if we', và chỉ xin đổi thứ tự: 'the priority', 'swap'.",
        "colleague",
      ),
      sp(
        "Then the next guest waits longer. What do I get?",
        t1b,
        "ĐỒNG NGHIỆP hỏi. Một yêu cầu không có gì đổi lại là một ân huệ, mà ân huệ thì có hạn. Đưa lại một việc của CHÍNH BẠN: 'In exchange for that'.",
        "colleague",
        undefined,
        t1a,
      ),
      sp(
        "Fine, but noon is impossible. Two o'clock, as normal.",
        t1c,
        "ĐỒNG NGHIỆP hỏi. Không ai được trọn ý mình thì 'meet halfway'. Và báo giờ mới — 'the timing' — cho khách là việc của bạn: bạn tự nói, sau khi tổ đã nhận.",
        "colleague",
        undefined,
        t1b,
      ),
      also(
        sp(
          "Kitchen. You want the birthday cake at seven, but we are fully booked until nine.",
          "What if we bring it out at nine, with dessert? I will ask the guest first, and then update the run sheet.",
          "ĐỒNG NGHIỆP hỏi. Đề xuất một giờ khác bằng 'What if we', nhưng giờ của bữa tiệc là của KHÁCH — hỏi khách trước khi nhận, rồi mới sửa giờ trên 'the run sheet'.",
          "colleague",
        ),
        "What if we bring it out at nine, with the dessert? I will ask the guest first.",
        "What if we bring it out at nine, with dessert? I will ask the guest first, of course.",
      ),
      sp(
        "Concierge. Two guests want the hotel car at ten, and we only have one.",
        "What if we ask the second guest whether a later time would suit her? I will speak to her myself.",
        "ĐỒNG NGHIỆP hỏi. Thứ bạn được đổi là thời gian và cuộc gọi của chính bạn — không phải một chuyến xe miễn phí hay một món quà.",
        "colleague",
      ),
      also(
        sp(
          "Can you take my lounge hour at six? I will do your arrivals in the morning.",
          "Happy to swap, in exchange for my morning arrivals. One more thing: let us tell the manager first.",
          "ĐỒNG NGHIỆP hỏi. Đổi việc giữa hai người thì được — 'swap' — nhưng 'one more thing': phải báo quản lý TRƯỚC khi đổi, không phải sau.",
          "colleague",
          ["one", "more", "thing"],
        ),
        "Happy to swap, in exchange for my morning arrivals. Let us ask the manager first.",
        "Happy to swap, in exchange for my morning arrivals. Let us tell the manager first.",
      ),
    ],
    reading: read(
      `GIVE AND TAKE AT THE SERVICE DOOR
Most of your negotiating is not with guests. It is with housekeeping, the kitchen and the concierge desk, and every one of them has a list that was full before you arrived.
So do not order; propose. "What if we make his room the priority?" invites a colleague to solve it with you. "Do my VIP first" invites a no.
Then offer something back. A request with nothing in exchange is a favour, and favours run out. "In exchange for that, I will look after the next guest in the lounge" gives the supervisor a reason to say yes.
If you cannot both have what you want, meet halfway: one o'clock instead of noon or two.
A swap between colleagues, such as a lounge hour for the morning arrivals, is fine. But it goes to the manager before it happens, not after.
And what you trade must be yours: your time, your desk, your phone call to the guest. Never trade a guest's room, a discount or a free dinner. Those were never yours to give.`,
      [
        {
          q: "Vì sao nên nói 'What if we…?' với đồng nghiệp?",
          options: [
            "Vì nó mời đồng nghiệp cùng giải quyết thay vì nhận lệnh",
            "Vì đó là câu duy nhất được phép dùng giữa các bộ phận khách sạn",
            "Vì câu ngắn hơn nên tiết kiệm thời gian",
          ],
          correct: 0,
          explanation: `Bài đọc: "So do not order; propose."`,
        },
        {
          q: "Bạn được phép đem thứ gì ra đổi với đồng nghiệp?",
          options: [
            "Một bữa tối miễn phí cho khách của bộ phận kia",
            "Một mức giảm giá nhỏ",
            "Thời gian, quầy của bạn, hay cuộc gọi của chính bạn cho khách",
          ],
          correct: 2,
          explanation: `Bài đọc: "And what you trade must be yours: your time, your desk, your phone call to the guest."`,
        },
        {
          q: "Hai đồng nghiệp đổi giờ trực lounge cho nhau. Cần làm gì?",
          options: [
            "Không cần báo ai nếu hai người đồng ý",
            "Báo quản lý trước khi đổi, không phải sau khi đã đổi xong",
            "Báo quản lý vào cuối tuần",
          ],
          correct: 1,
          explanation: `Bài đọc: "But it goes to the manager before it happens, not after."`,
        },
      ],
    ),
    game: [
      round(
        "Housekeeping. I cannot do your VIP room first — my list is full.",
        [
          ["Then just do it anyway. The guest is a VIP, so he comes first.", "register"],
          [
            "What if we swap it with the next room on your list? I will look after that guest.",
            "answer",
          ],
          ["Then just do it anyway. The guest is VIP, so he comes first.", "form"],
        ],
        "Câu này ra lệnh cho đồng nghiệp — mệnh lệnh thì nhận về một lời từ chối. Câu sai ngữ pháp cũng ra lệnh y như thế, lại thiếu mạo từ: phải là 'is a VIP', không phải 'is VIP'. Đáp án đề xuất và đưa lại một việc của chính mình.",
        "colleague",
      ),
      round(
        "Concierge. If I give your guest the hotel car, what do I get?",
        [
          ["In exchange, I will ask the front office to give your guest a free night.", "register"],
          ["In exchange, I will take your next airport call.", "answer"],
          ["In exchange, I will ask the front office give your guest a free night.", "form"],
        ],
        "Câu này đem một đêm miễn phí ra trao đổi — thứ đó chưa bao giờ là của bạn. Câu sai ngữ pháp cũng đem đêm miễn phí ra đổi y như thế, lại thiếu 'to': 'ask the front office TO give'. Đáp án đổi bằng công việc của chính bạn.",
        "colleague",
      ),
    ],
  }),

  L(35, 2, "The Range Comes First", "Xin khung trước khi ngồi vào bàn", {
    vocabulary: [
      c("The range", "The range is set by my manager before I sit down, sir.", [
        "/ðə reɪndʒ/",
        "khung (mức được phép đề nghị) do quản lý đặt",
        "📏",
      ]),
      c("Before we sit down", "Before we sit down with him, may I know the range?", [
        "/bɪˈfɔː wiː sɪt daʊn/",
        "trước khi chúng ta ngồi vào bàn",
        "🪑",
      ]),
      c("What I may offer", "My manager told me what I may offer, and I wrote it down.", [
        "/wɒt aɪ meɪ ˈɒfə/",
        "những gì tôi được phép đề nghị",
        "📝",
      ]),
      c("Outside what I was given", "I am afraid that is outside what I was given, madam.", [
        "/ˌaʊtˈsaɪd wɒt aɪ wɒz ˈɡɪvn/",
        "nằm ngoài phần tôi được giao",
        "🚧",
      ]),
    ],
    grammar: [
      g(
        "I will see how much I can give you.",
        "Before we sit down, may I check with my manager what I may offer?",
        "Xin khung TRƯỚC, không xin giữa chừng. Sau 'before' (mệnh đề thời gian) dùng thì hiện tại: 'before we sit down', không phải 'before we will sit down'.",
        "Before we will sit down, may I check with my manager what I may offer?",
      ),
      g(
        "No, that is too much.",
        "That is outside what I was given, madam, so I will put it to my manager.",
        "Ngoài khung thì nói thẳng là ngoài khung, rồi nói ai quyết và hẹn quay lại. Bị động quá khứ: 'what I was given' (was + V3), không phải 'was give'.",
        "That is outside what I was give, madam, so I will put it to my manager.",
      ),
    ],
    speaking: [
      sp(
        "Mr Pham wants to talk about his bill at four. Just go and see him.",
        t2a,
        "ĐỒNG NGHIỆP đẩy bạn vào bàn tay không. Bạn vẫn gặp khách — nhưng 'before we sit down' phải có 'the range', và tiền trên hoá đơn là của Duty Manager.",
        "colleague",
        ["duty", "manager's"],
      ),
      sp(
        "Fine. What exactly do you need to know?",
        t2b,
        "ĐỒNG NGHIỆP hỏi. Ba câu hỏi, đúng thứ tự: 'What I may offer', điều không được đề nghị, và ai ký.",
        "colleague",
        undefined,
        t2a,
      ),
      sp(
        "The manager says a late check-out and a dinner, but nothing off the room rate.",
        t2c,
        "ĐỒNG NGHIỆP hỏi. Khung nhớ trong đầu lúc bốn giờ thì bốn rưỡi đã nới ra — ghi lại ngay. Và 'the range' không bao giờ nói ra với khách.",
        "colleague",
        undefined,
        t2b,
      ),
      risk(
        also(
          sp(
            "What is the most you can take off my bill?",
            "That is not a figure I can give you, sir. What I can do is put your request to my Duty Manager today.",
            "Khung là để làm việc bên trong, không bao giờ để đọc ra. Đừng nói một con số, kể cả số thấp. Nói điều bạn LÀM ĐƯỢC, và khi nào.",
            undefined,
            ["request", "duty", "manager", "today"],
          ),
          "I am not able to give you a figure, sir. What I can do is put your request to my Duty Manager today.",
          "That is not a figure I can give, sir, but I can put your request to my Duty Manager today.",
          "I cannot promise a figure, sir. I can put your request to my Duty Manager today.",
        ),
      ),
      risk(
        also(
          sp(
            "And if I want a suite upgrade as well?",
            "That is outside what I was given, sir, and I will put it to my manager this afternoon.",
            "Nâng hạng không nằm trong khung: nói thẳng 'outside what I was given', rồi nói ai quyết và mốc giờ của bạn. Đừng gật cho êm rồi về xin sau.",
            undefined,
            ["manager", "afternoon"],
          ),
          "That is outside what I was given, sir. I will put it to my manager this afternoon.",
          "I am afraid that is outside what I was given, sir, but I will put it to my manager this afternoon.",
          "That is outside what I was given, sir. I will ask my manager this afternoon.",
          "An upgrade is outside what I was given, sir, and I will put it to my manager this afternoon.",
        ),
      ),
      also(
        sp(
          "So what can you actually offer me? My flight is not until midnight.",
          "Since you mentioned your flight, sir, a later check-out is something I may offer. Would that suit you?",
          "Mở bằng lời khách ('Since you mentioned'), rồi đưa MỘT thứ nằm trong khung — 'something I may offer' — và trả quyền quyết định lại cho khách.",
        ),
        "Since you mentioned your flight, sir, I may offer you a later check-out. Would that suit you?",
      ),
    ],
    reading: read(
      `THE RANGE COMES FIRST
A negotiation with a guest is not a conversation you win. It is a conversation you were sent into with something to give.
What you were given is called the range. It has a top and a bottom, and your manager sets both before you sit down. Getting it is your job: go to your manager with the four things from the complaint, and ask three questions. What may I offer? What may I not offer? Who signs it?
Write the answers down. A range you carry in your head at four o'clock is a range you will stretch by half past.
The range is yours to work inside, and it is never yours to say out loud. A guest may ask, "What is the most you can do?" The answer is "That is not a figure I can give you, sir," followed by what you can do.
Some things stay outside the range whatever your manager says. The room the guest moves into is the front office's. Tier and points are the loyalty office's. Money off the bill is the Duty Manager's. When a guest asks for one, say "That is outside what I was given," and say who decides and when you will be back.`,
      [
        {
          q: "Khung (the range) do ai đặt, và đặt lúc nào?",
          options: [
            "Bạn tự đặt trong lúc nói chuyện với khách",
            "Quản lý đặt, trước khi bạn ngồi vào bàn",
            "Khách và bạn cùng thoả thuận ra",
          ],
          correct: 1,
          explanation: `Bài đọc: "It has a top and a bottom, and your manager sets both before you sit down."`,
        },
        {
          q: "Khách hỏi 'Anh/chị giảm tối đa được bao nhiêu?'. Bạn trả lời thế nào?",
          options: [
            "Nói con số trần mà quản lý vừa cho",
            "Không nêu số — rồi nói điều bạn làm được",
            "Nói một mức thấp hơn trần một chút để còn đường lùi",
          ],
          correct: 1,
          explanation: `Bài đọc: "The range is yours to work inside, and it is never yours to say out loud."`,
        },
        {
          q: "Khách đòi đổi sang phòng khác trong lúc thương lượng. Ai quyết phòng nào?",
          options: [
            "Front office — phòng khách chuyển sang là việc của họ",
            "Bạn, nếu nằm trong khung",
            "Loyalty office",
          ],
          correct: 0,
          explanation: `Bài đọc: "The room the guest moves into is the front office's."`,
        },
      ],
    ),
    game: [
      round(
        "Come on, what is the most you can take off?",
        [
          ["My manager allows me up to twenty percent, sir, so let us start there.", "register"],
          ["That is not a figure I can give you, sir. Let me tell you what I can do.", "answer"],
          ["That is not a figure I can giving you, sir. Let me tell you what I can do.", "form"],
        ],
        "Câu này đọc to khung của quản lý — khung là để làm việc bên trong, không bao giờ để nói ra. Câu sai ngữ pháp dùng 'I can giving'; sau 'can' là động từ nguyên mẫu. Đáp án không nêu số, rồi chuyển sang điều làm được.",
      ),
      round(
        "Mr Pham is waiting in the lounge. Just go in — we can sort out the range later.",
        [
          [
            "Not without the range. Money off a bill is the Duty Manager's to set, not mine.",
            "answer",
          ],
          ["Fine — I will see what he asks for and decide as we go.", "register"],
          ["Fine — I will see what he ask for and decide as we go.", "form"],
        ],
        "Câu này vào bàn tay không rồi tự quyết giữa chừng — khung nhớ trong đầu sẽ bị nới ra. Câu sai ngữ pháp cũng vào bàn tay không y như thế, lại thiếu -s: 'he' đi với 'asks'. Đáp án xin khung trước khi ngồi xuống.",
        "colleague",
      ),
    ],
  }),
  L(35, 3, "However: the Part That Does Not Move", "'However' — phần không dời được", {
    vocabulary: [
      c("However", "I can ask about the room; however, the rate cannot change.", [
        "/haʊˈevə/",
        "tuy nhiên",
        "⚖️",
      ]),
      c("Although", "Although the dates are tight, I can put it to my manager.", [
        "/ɔːlˈðəʊ/",
        "mặc dù",
        "🔀",
      ]),
      c("The part I cannot move", "The rate is the part I cannot move, madam.", [
        "/ðə pɑːt aɪ ˈkænɒt muːv/",
        "phần tôi không thể thay đổi",
        "🧱",
      ]),
      c("Not mine to trade", "Your tier is not mine to trade, sir.", [
        "/nɒt maɪn tuː treɪd/",
        "không phải thứ tôi được đem ra đổi",
        "🚫",
      ]),
    ],
    grammar: [
      g(
        "The rate is fixed, but I will see about the check-out.",
        "I can ask about the late check-out; however, the rate cannot change, sir.",
        "'However' nối hai vế ngược nhau, trang trọng hơn 'but', và buộc bạn nói vế LÀM ĐƯỢC trước. Sau 'however' đặt dấu phẩy. Sau 'cannot' là động từ nguyên mẫu, không có 'to'.",
        "I can ask about the late check-out; however, the rate cannot to change, sir.",
      ),
      g(
        "Although the dates are difficult, but we will try our best.",
        "Although the dates are tight, madam, I can put the suite to my manager.",
        "'Although…' đặt cái khó lên trước, cái làm được ở sau. Tiếng Việt cho phép 'tuy… nhưng…'; tiếng Anh chỉ được MỘT từ nối — đừng thêm 'but' sau 'although'.",
        "Although the dates are tight, madam, but I can put the suite to my manager.",
      ),
    ],
    speaking: [
      also(
        sp(
          "So you can do the suite, the transfer and the lower rate?",
          t3a,
          "Khách gộp ba thứ để lấy một chữ đồng ý. Tách ra: vế LÀM ĐƯỢC trước, rồi 'however', rồi đúng MỘT vế không dời: 'the part I cannot move'. Chữ however /haʊˈevə/ — trọng âm ở giữa.",
          undefined,
          ["suite"],
        ),
        "The suite I can put to my manager; however, the rate is the part I cannot move, sir.",
      ),
      sp(
        "And the transfer?",
        t3b,
        "Mệnh đề 'Although' đặt cái khó lên trước, cái làm được ở sau. Xe đưa đón khách sạn trả tiền cho bên thứ ba là chuyện tiền — việc của Duty Manager.",
        undefined,
        ["transfer", "duty", "manager", "today"],
        t3a,
      ),
      sp(
        "And my tier? I want it restored as part of this.",
        t3c,
        "Hạng thẻ không bao giờ nằm trong một cuộc đàm phán: 'not mine to trade'. Nói ai giữ nó — 'the loyalty office decides' — và việc bạn làm hôm nay.",
        undefined,
        ["tier", "today", "loyalty"],
        t3b,
      ),
      sp(
        "Just tell him: although the rate is fixed, but we will try our best.",
        "Not both. 'Although' already carries the 'but', so say one or the other.",
        "ĐỒNG NGHIỆP hỏi. Lỗi 'tuy… nhưng…' của người Việt: tiếng Anh chỉ cho một từ nối. Chọn 'although' HOẶC 'but'.",
        "colleague",
      ),
      also(
        sp(
          "Can you waive the cancellation fee if we stay one more night?",
          "Although the fee is not my decision, I can put it to my Duty Manager once you confirm the extra night.",
          "'Although' cho vế khó, rồi việc bạn làm được, gắn với điều kiện khách đưa ra. Phí huỷ là tiền — Duty Manager quyết.",
          undefined,
          ["fee", "duty", "manager"],
        ),
        "Although the fee is not mine to waive, I can put it to my Duty Manager once you confirm the extra night.",
        "Although the fee is not mine to waive, I can put it to my Duty Manager if you confirm the extra night.",
      ),
      risk(
        also(
          sp(
            "If you will not lower the rate, I will cancel the whole booking.",
            "I understand, madam. However, the rate is the part I cannot move, and I will ask my manager about the rest.",
            "Lời doạ huỷ không làm khung rộng ra. Ghi nhận khách ('I understand'), rồi 'however' và đúng phần không dời. Đừng tự hạ giá để giữ booking.",
            undefined,
            ["manager"],
          ),
          "I understand, madam; however, the rate is the part I cannot move. I will ask my manager about the rest.",
          "I understand, madam. The rate is the part I cannot move; however, I will ask my manager about the rest.",
          "I understand, madam. However, the rate is the part I cannot move, and I will put the rest to my manager.",
        ),
      ),
    ],
    reading: read(
      `THE HALF THAT MOVES, AND THE HALF THAT DOES NOT
A guest in a negotiation will gather everything into one question and ask for one word back: "So you can do all of that?" There is no honest yes.
Answer in two halves, and put the half that moves first. "I can put the suite to my manager; however, the rate is the part I cannot move." A guest who hears the refusal first stops listening, and the part you could give is lost.
"However" is the hinge. It is more formal than "but", and it belongs in this kind of conversation.
"Although" does the same work from the front: "Although the dates are tight, I can put the suite to my manager." Vietnamese lets you say tuy and nhưng in one sentence; English does not. "Although the rate is fixed, but…" is one word too many.
Some things are not fixed by your manager at all, because they were never hers. "Your tier is not mine to trade, madam" tells the guest who owns it, without pretending the door is shut.
Say one refusal at a time. Three refusals in one breath sound like a policy; one sounds like a person.`,
      [
        {
          q: "Khách gộp mọi yêu cầu vào một câu hỏi có/không. Trả lời thế nào?",
          options: [
            "Một chữ 'yes', rồi nêu điều kiện sau",
            "Hai vế: vế làm được trước, rồi 'however', rồi vế không dời",
            "Nói hết các phần không làm được trước, cho khách khỏi hy vọng",
          ],
          correct: 1,
          explanation: `Bài đọc: "Answer in two halves, and put the half that moves first"`,
        },
        {
          q: "Lỗi người Việt hay mắc nhất với 'although' là gì?",
          options: [
            "Đặt 'although' ở cuối câu thay vì đầu câu như tiếng Việt",
            "Dùng 'although' và 'but' trong cùng một câu",
            "Quên dấu phẩy sau mệnh đề 'although' ở đầu câu",
          ],
          correct: 1,
          explanation: `Bài đọc: "Vietnamese lets you say tuy and nhưng in one sentence; English does not."`,
        },
        {
          q: "Vì sao chỉ nói MỘT lời từ chối một lúc?",
          options: [
            "Vì khách chỉ nhớ được một điều mỗi lần",
            "Vì quản lý yêu cầu ghi từng lời từ chối vào sổ riêng",
            "Vì ba lời từ chối liền nghe như một chính sách",
          ],
          correct: 2,
          explanation: `Bài đọc: "Three refusals in one breath sound like a policy; one sounds like a person."`,
        },
      ],
    ),
    game: [
      round(
        "Everything we asked for, then? Yes or no.",
        [
          ["I am afraid the answer to all of that has to be no, madam.", "register"],
          [
            "The suite I can put to my manager; however, the rate is the part I cannot move.",
            "answer",
          ],
          [
            "The suite I can put to my manager; however, but the rate is the part I cannot move.",
            "form",
          ],
        ],
        "Câu này gom mọi thứ thành một lời từ chối — phần cho được cũng mất theo. Câu sai ngữ pháp dùng 'however, but'; chỉ được một từ nối. Đáp án nói vế làm được trước, rồi 'however', rồi đúng một vế không dời.",
      ),
      round(
        "Can I just say 'although the rate is fixed, but we will try our best'?",
        [
          ["Not both. 'Although' already carries the 'but', so use one.", "answer"],
          ["Yes — it sounds kind, and he will hear that we are trying.", "register"],
          ["Not both. 'Although' is already carry the 'but', so use one.", "form"],
        ],
        "Câu này giữ lỗi 'tuy… nhưng…' của tiếng Việt — tiếng Anh chỉ cho một từ nối. Câu sai ngữ pháp dùng 'is already carry'; phải là 'already carries'. Đáp án: chọn một trong hai.",
        "colleague",
      ),
    ],
  }),

  L(35, 4, "Closing It, in Writing", "Chốt thoả thuận, và ghi lại ngay", {
    vocabulary: [
      c("Shall we agree", "Shall we agree on those two, madam?", [
        "/ʃæl wiː əˈɡriː/",
        "chúng ta thống nhất nhé",
        "✅",
      ]),
      c("Once you agree", "Once you agree, I will put it to my manager, sir.", [
        "/wʌns juː əˈɡriː/",
        "một khi quý khách đồng ý",
        "🔓",
      ]),
      c("Back to my manager", "Anything above the range goes back to my manager, madam.", [
        "/bæk tuː maɪ ˈmænɪdʒə/",
        "chuyển lại cho quản lý quyết",
        "↩️",
      ]),
      c("One more thing", "One more thing, madam? That goes back to my manager.", [
        "/wʌn mɔː θɪŋ/",
        "thêm một điều nữa (yêu cầu phút chót)",
        "☝️",
      ]),
    ],
    grammar: [
      g(
        "Right, everything is agreed then.",
        "Shall we agree on those two, sir? Then I will write them down now.",
        "'Shall we…?' mời khách chốt CÙNG PHÍA với bạn. Chỉ chốt đúng phần đã thoả thuận. Thống nhất VỀ một điều khoản là 'agree ON', không phải 'agree with'.",
        "Shall we agree with those two, sir? Then I will write them down now.",
      ),
      g(
        "Say yes now and I will get my manager to approve it later.",
        "Once you agree, madam, I will put it to my manager before six.",
        "'Once you agree' nói rõ điều gì kích hoạt việc của bạn, và luôn kèm một mốc. Sau 'once' (mệnh đề thời gian) dùng hiện tại, không dùng 'will'.",
        "Once you will agree, madam, I will put it to my manager before six.",
      ),
    ],
    speaking: [
      also(
        sp(
          "All right. I think we can work with that.",
          t4a,
          "Chốt thành tiếng, cùng phía với khách: 'Shall we agree on those two'. Rồi viết ngay — 'in writing' — trước khi khách đứng dậy.",
        ),
        "Shall we agree on those two, sir? I will put them in writing before you leave the desk.",
      ),
      risk(
        also(
          sp(
            "One more thing — I want the spa included too.",
            t4b,
            "Yêu cầu phút chót luôn đến lúc bạn muốn xong việc. Đừng nới khung để được về sớm: 'back to my manager', rồi mốc giờ của CHÍNH BẠN.",
            undefined,
            ["within", "hour"],
            t4a,
          ),
          "That one goes back to my manager, sir. I will come back to you within the hour.",
          "The spa goes back to my manager, sir, and I will come back to you within the hour.",
          "The spa is my manager's to give, sir, and I will come back to you within the hour.",
          "That goes back to my manager, sir. I will come back within the hour.",
        ),
      ),
      sp(
        "Fine. So is the case closed now?",
        t4c,
        "Hồ sơ đóng khi KHÁCH nói đã ổn — không phải khi ký, cũng không phải khi quản lý trả lời. 'Once you agree' + việc của bạn.",
        undefined,
        undefined,
        t4b,
      ),
      sp(
        "He signed the agreement. Shall I close the recovery case?",
        "Not yet. He has not told us it is right, and the spa is still open.",
        "ĐỒNG NGHIỆP hỏi. Chữ ký chưa phải là lời khách nói 'đã ổn', và còn một phần đang treo ở quản lý.",
        "colleague",
      ),
      risk(
        also(
          sp(
            "Write down that dinner is free too, and I will sign now.",
            "I cannot write that, madam. Once my manager agrees, it goes on the paper, and not before.",
            "Trên tờ thoả thuận chỉ có điều bộ phận chủ quản đã đồng ý. Đừng viết trước để khách ký cho nhanh — 'once my manager agrees'.",
            undefined,
            ["manager", "agrees"],
          ),
          "I am not able to write that, madam. Once my manager agrees, it goes on the paper, and not before.",
          "I cannot write that yet, madam. It goes on the paper once my manager agrees.",
          "I cannot write that, madam. It goes on the paper once my manager agrees, and not before.",
        ),
      ),
      sp(
        "Can you just email me the agreement tonight instead?",
        "I would rather give you a copy now, madam, so you have it in writing before you go up.",
        "Thoả thuận để tới tối là thoả thuận sống bằng miệng. Đưa bản sao ngay tại bàn: 'in writing'.",
      ),
    ],
    reading: read(
      `CLOSING WITHOUT LOSING IT
A negotiation that ends in the air ends twice: once at the desk, and again on the telephone tomorrow, from the beginning.
So close it out loud. "Shall we agree on those two, sir?" invites the guest to finish it with you, on the same side of the desk. Close only what is actually agreed, and say out loud what is still open.
Then write it before the guest stands up: what was agreed, who agreed it, and when it happens. The guest keeps a copy. No price goes on that paper; a price goes on a line the Duty Manager signs.
Expect the last request. It arrives after the handshake, when you want to be finished, and it is always small: "One more thing — the spa as well?" This is the moment ranges get stretched. Do not stretch it to get home. "That goes back to my manager, and I will come back to you within the hour" costs nothing and keeps the paper true.
The case stays open until the guest says it is right. Not when they sign. Not when the manager answers. When the guest says so.`,
      [
        {
          q: "'Shall we agree on those two?' khác 'Do you accept?' ở chỗ nào?",
          options: [
            "Câu đầu trang trọng hơn nên hợp khách VIP",
            "Câu đầu đặt hai người cùng một phía",
            "Câu đầu chỉ dùng khi quản lý đã duyệt",
          ],
          correct: 1,
          explanation: `Bài đọc: "invites the guest to finish it with you, on the same side of the desk."`,
        },
        {
          q: "Khách xin thêm một thứ sau khi đã bắt tay. Xử lý ra sao?",
          options: [
            "Nói phần đó quay về quản lý, và hẹn quay lại trong vòng một tiếng",
            "Đồng ý luôn cho nhanh, vì phần đó nhỏ và khách đang vui",
            "Nói đã chốt xong, không nhận thêm",
          ],
          correct: 0,
          explanation: `Bài đọc: "This is the moment ranges get stretched. Do not stretch it to get home." Câu cần nói: "That goes back to my manager, and I will come back to you within the hour."`,
        },
        {
          q: "Hồ sơ đóng lại khi nào?",
          options: [
            "Khi khách ký vào bản thoả thuận",
            "Khi quản lý trả lời xong",
            "Khi chính khách nói rằng đã ổn",
          ],
          correct: 2,
          explanation: `Bài đọc: "The case stays open until the guest says it is right."`,
        },
      ],
    ),
    game: [
      round(
        "Yes, that works for me.",
        [
          ["Wonderful, sir. I will email you everything we discussed later tonight.", "register"],
          ["Shall we agree on those two, sir? I will write them down now.", "answer"],
          ["Wonderful, sir. I will email you everything we discuss later tonight.", "form"],
        ],
        "Câu này để thoả thuận sống bằng miệng tới tối — khách đã bị lỡ hẹn một lần thì không nhận lời hứa miệng lần hai. Câu sai ngữ pháp cũng hẹn gửi email y như thế, lại sai thì: việc vừa bàn xong phải là 'we discussed', không phải 'we discuss'. Đáp án chốt rõ hai điều và viết ngay.",
      ),
      round(
        "The guest has gone up happy. Shall I write 'agreed' for the spa as well?",
        [
          ["Yes — he looked happy, so my manager will surely agree to it.", "register"],
          ["No. The spa went back to my manager, so write it as still opening.", "form"],
          [
            "No. The spa went back to my manager, so write it as still open until we hear back.",
            "answer",
          ],
        ],
        "Câu này ghi 'đã đồng ý' cho một thứ quản lý chưa trả lời — hứa thay người khác. Câu sai ngữ pháp dùng 'still opening'; 'open' ở đây là tính từ (còn để ngỏ). Đáp án ghi đúng tình trạng: còn treo.",
        "colleague",
      ),
    ],
  }),
];

export const week: AuthoredWeek = {
  title: { en: "Light Negotiation", vi: "Đàm phán nhẹ — nội bộ và với khách" },
  canDo:
    "Nói được: đề xuất đổi việc với đồng nghiệp ('What if we…?', 'In exchange for…') bằng thứ của chính mình; xin khung trước khi ngồi với khách và không bao giờ nói khung ra; nói vế làm được trước rồi 'however' vế không dời; và chốt thoả thuận bằng giấy, đẩy yêu cầu phút chót về quản lý kèm một mốc giờ.",
  lessons,
};
