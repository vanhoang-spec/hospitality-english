// HK week 34 — Special Occasions (see ../kit.ts).
//
// The floor's part in a surprise is the room, and only the room. The front
// desk or Guest Relations takes the order and the price, F&B makes the cake,
// the florist needs a day, and the set-up slip carries all of it to the
// floor; the attendant works from the slip, keeps the floor's own lead times,
// and reports back to whoever sent it. The house rules hold on an occasion
// as on any other day: nothing that burns or floats goes into a room, the
// door stays open while the attendant is inside (a guest who asks to close it
// hears the rule and an offer to come back), a guest's ring is signed for by
// the supervisor, and a mark the morning after is photographed, not priced.
// A formal wish is one sentence, and only for an occasion the guest named.
import type { GameRound } from "../../week-content";
import { g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("HK");
const L = lessonsFor("HK");

/** One arcade round: the right answer at `at`, one broken-English option
 *  (`form`) and one well-formed option that is wrong for the job
 *  (`register`), with the reason each wrong one is wrong. */
const round = (
  at: 0 | 1 | 2,
  prompt: string,
  answer: string,
  form: string,
  register: string,
  explanation: string,
  role?: GameRound["speakerRole"],
): GameRound => {
  const options: GameRound["options"] = [
    { text: form, correct: false, kind: "form" },
    { text: register, correct: false, kind: "register" },
  ];
  options.splice(at, 0, { text: answer, correct: true, kind: "answer" });
  return { ...(role ? { speakerRole: role } : {}), prompt, options, explanation };
};

// ── Lesson 1 — the set-up slip reaches the floor ──────────────────────────
const t1a =
  "How lovely, sir, she will be thrilled. I will tell the front desk about the occasion, and they will take the details.";
const t1b = "Only one thing, sir: what time will you both be out of the room this evening?";
const t1c =
  "Thank you, sir. The front desk will confirm everything with you, and I will report back to them once the room is ready.";

// ── Lesson 2 — what may go into a room ───────────────────────────────────
const t2a =
  "What a lovely idea, madam. Real flames are not allowed, but an LED candle looks just the same in photographs.";
const t2b =
  "Yes, madam. Rose petals go on the bed and along the bath, but never on the floor, so nobody slips.";
const t2c =
  "A latex balloon needs a check first, madam, because some children are allergic. May I ask the desk to call you?";

const lesson1 = L(34, 1, "The Set-Up Slip Reaches the Floor", "Phiếu dựng phòng về tới tầng", {
  vocabulary: [
    c(
      "Set-up slip",
      "Every set-up slip names the room, the occasion and the hour the room is empty.",
      ["/ˈset ʌp ˌslɪp/", "Phiếu yêu cầu dựng phòng gửi xuống tầng", "🧾"],
    ),
    c(
      "Lead time",
      "Flowers need a lead time of a full day, so the florist hears about them early.",
      ["/ˈliːd ˌtaɪm/", "Thời gian cần chuẩn bị trước", "⏳"],
    ),
    c("Occasion", "The desk asks about the occasion, because a memorial is not a birthday.", [
      "/əˈkeɪʒn/",
      "Dịp đặc biệt — sinh nhật, kỷ niệm, hay một ngày giỗ",
      "🎉",
    ]),
    c("Report back", "I report back to whoever sent the slip, the moment the room is ready.", [
      "/rɪˌpɔːt ˈbæk/",
      "Báo lại cho bộ phận đã gửi yêu cầu",
      "📣",
    ]),
  ],
  grammar: [
    g(
      "Desk said petals. I do what I can.",
      "It is in hand, sir, and I will report back to the desk when it is done.",
      "Sau 'when' nói về tương lai, động từ ở HIỆN TẠI ĐƠN: when it is done — không phải when it will be done. 'It is in hand' xác nhận phiếu đã tới tay mình mà không đọc lại nội dung phiếu.",
      "It is in hand, sir, and I will report back to the desk when it will be done.",
    ),
    g(
      "Flowers in one hour? Impossible, nobody told me.",
      "Flowers need a full day's lead time, sir. May I ask the desk what we can do tonight?",
      "Chủ ngữ số nhiều 'flowers' đi với 'need' (không thêm -s). Nêu lead time THẬT rồi mở một lối đi tiếp — hứa cái không kịp làm còn tệ hơn nói không kịp ngay từ đầu.",
      "Flowers needs a full day's lead time, sir. May I ask the desk what we can do tonight?",
    ),
  ],
  speaking: [
    sp(
      "It is my wife's birthday tonight. Could the room look special when we come back?",
      t1a,
      "Đơn đặt và giá là việc của quầy lễ tân, không phải của tầng. Đón lời bằng một câu ấm, rồi chuyển đúng người.",
    ),
    {
      ...sp(
        "Thank you. Is there anything you need from me?",
        t1b,
        "Tầng chỉ cần MỘT thông tin: giờ phòng trống, vì dựng phòng chỉ bắt đầu khi phòng không có ai. Dị ứng và giá là câu hỏi của quầy.",
        undefined,
        undefined,
        t1a,
      ),
      alsoAccept: ["Just one thing, sir: what time will you both be out of the room this evening?"],
    },
    sp(
      "We leave for dinner at seven.",
      t1c,
      "Không đọc lại giờ quầy đã hứa với khách. Nói việc của bạn: 'report back' cho quầy khi phòng xong. 'Report back' — nhấn ở 'back'.",
      undefined,
      undefined,
      t1b,
    ),
    sp(
      "Guest Relations here. 906 wants petals and balloons for tonight. Can the floor take it?",
      "Petals and towel art are fine by six. Balloons need a full day's lead time, so could you offer them for tomorrow?",
      "Đồng nghiệp hỏi: dùng đúng từ nghề ('lead time'), không kính ngữ. Ra tới hành lang thì bỏ từ nghề — khách chỉ nghe một lý do bình thường.",
      "colleague",
    ),
    {
      ...sp(
        "Can you order a cake for us and put it on the room bill?",
        "I am sorry, madam, I cannot take a paid order. I will ask the front desk to call you about the cake.",
        "Tầng không nhận đơn có tính tiền. Nói thật một câu, rồi chuyển cho quầy — bánh là việc của quầy và bếp.",
      ),
      alsoAccept: [
        "I am sorry, madam, I am not able to take a paid order. I will ask the front desk to call you about the cake.",
      ],
    },
    sp(
      "The slip for 1102 has no time on it. Can you start the room now?",
      "No, the set-up slip has no time on it, so I cannot start. Let me check with the desk when the guests will be out.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Phiếu thiếu giờ phòng trống thì chưa làm được — hỏi lại người gửi phiếu.",
      "colleague",
    ),
  ],
  reading: read(
    `THE SET-UP SLIP — SIX THINGS IT MUST CARRY
A surprise is several departments working as one. The front desk or Guest Relations takes the order and the price, the kitchen makes the cake, and the florist needs a day. The floor sets the room, and the set-up slip carries all of it to you.
A slip that is missing any of these six is not ready to work from:
1. The room number and the occasion.
2. GUESTS OUT: the hour the room will be empty, not the hour of the dinner.
3. What the desk has promised the guest, word for word.
4. Who sent it, and who already knows. You report back to whoever sent the slip.
5. Allergies, and anything with a scent or latex in it. The desk checks the guest profile first.
6. Who pays. A cake, wine, flowers or balloons go on the room bill, and the desk gives the price before anything is ordered.
Lead times are real. Petals and towel art take fifteen minutes once the room is empty, fruit and a card an hour, and flowers or balloons a full day.
Say the floor's own lead time plainly, but never repeat a delivery hour the desk promised. Never start while the guests are in the room, and never enter a room showing Do Not Disturb.`,
    [
      {
        q: "Giờ ghi trên phiếu dựng phòng phải là giờ nào?",
        options: [
          "Giờ khách bắt đầu ăn tối ở nhà hàng của khách sạn",
          "Giờ phòng trống, vì phải không có ai mới dựng được",
          "Giờ nhân viên buồng phòng kết thúc ca làm việc hôm đó",
        ],
        correct: 1,
        explanation:
          "'GUESTS OUT: the hour the room will be empty, not the hour of the dinner' — dựng phòng chỉ bắt đầu trong một căn phòng trống.",
      },
      {
        q: "Khách muốn đặt bánh tính vào tiền phòng thì ai báo giá?",
        options: [
          "Quầy lễ tân, trước khi đặt bất cứ thứ gì, vì bánh sẽ tính vào hoá đơn phòng",
          "Nhân viên buồng phòng, ngay lúc khách hỏi trong phòng",
          "Nhà bếp, khi bánh đã được mang lên tới phòng",
        ],
        correct: 0,
        explanation:
          "'the desk gives the price before anything is ordered' — tầng không nhận đơn có tính tiền và không đoán giá.",
      },
      {
        q: "Phòng đang treo Do Not Disturb mà có phiếu dựng phòng thì sao?",
        options: [
          "Vào thật nhanh trong năm phút vì đây là bất ngờ cho khách",
          "Gõ cửa nhẹ và giải thích rằng đây là yêu cầu đặc biệt",
          "Không vào phòng; báo lại cho người đã gửi phiếu",
        ],
        correct: 2,
        explanation:
          "'never enter a room showing Do Not Disturb' — và người gửi phiếu là người quyết bước tiếp theo.",
      },
    ],
  ),
  game: [
    round(
      1,
      "Can you have the room ready with fruit and a card by seven? We are going out now.",
      "Fruit and a card take about an hour, madam, so I will ask the desk to confirm the time with you.",
      "Fruit and a card takes about an hour, madam, so I will ask the desk to confirm the time with you.",
      "Of course, madam — I will have flowers, petals and a card waiting for you at seven tonight.",
      "Phương án 'flowers… at seven tonight' hứa hoa trong vài giờ, trong khi hoa cần cả ngày, và hứa giờ thay quầy. Phương án 'Fruit and a card takes' sai: hai chủ ngữ nối bằng 'and' là số nhiều, cần 'take'. Câu đúng nói lead time thật và để quầy xác nhận giờ.",
    ),
    round(
      0,
      "Guest Relations here. Did the slip for 1102 reach you? The guest is asking.",
      "It is in hand. I will report back to you as soon as the room is ready.",
      "Not yet, but please tells the guest it will be perfect by six — I promise.",
      "Not yet, but please tell the guest it will be perfect by six — I promise.",
      "Phương án 'please tell the guest… I promise' hứa giờ khi phiếu còn chưa tới tay, và để đồng nghiệp chuyển lời hứa đó cho khách. Phương án 'please tells the guest' hứa y như vậy, lại sai: câu đề nghị sau 'please' dùng động từ nguyên mẫu, không thêm -s (please tell). Câu đúng xác nhận và hẹn báo lại.",
      "colleague",
    ),
  ],
});

const lesson2 = L(34, 2, "What May Go Into a Room", "Thứ gì được phép vào phòng", {
  vocabulary: [
    c("Rose petals", "Rose petals go on the bed and along the bath, never on a floor.", [
      "/ˈrəʊz ˌpetlz/",
      "Cánh hoa hồng rắc trang trí",
      "🌹",
    ]),
    c("Towel art", "Towel art takes fifteen minutes, and children love it.", [
      "/ˈtaʊəl ˌɑːt/",
      "Khăn gấp tạo hình con vật",
      "🦢",
    ]),
    c("LED candle", "We use an LED candle in every set-up, because real flames are not allowed.", [
      "/ˌel iː ˈdiː ˈkændl/",
      "Nến điện tử, không có lửa",
      "🕯️",
    ]),
    c(
      "Latex balloon",
      "The slip must say if a child is allergic before a latex balloon enters the room.",
      ["/ˈleɪteks bəˈluːn/", "Bóng bay cao su — có người dị ứng với cao su", "🎈"],
    ),
    c("Incense", "Incense is usually for a memorial, and it is never lit in a room.", [
      "/ˈɪnsens/",
      "Nhang, hương thắp",
      "🪔",
    ]),
  ],
  grammar: [
    g(
      "No candles. Fire rule. That is all.",
      "Real flames are not allowed in the rooms, madam, but our LED candles look the same.",
      "Bị động 'are not allowed' đặt lệnh cấm vào quy định, không vào bạn. Giữ đuôi -ed: allowed. Rồi 'but' + phương án tương đương ngay sau.",
      "Real flames are not allow in the rooms, madam, but our LED candles look the same.",
    ),
    g(
      "Petals everywhere. Very romantic, I put a lot.",
      "I put the petals on the bed and by the bath, sir, so the floor stays clear.",
      "Mô tả chính xác nơi đặt, kèm một lý do an toàn ngắn sau 'so'. Chủ ngữ số ít 'the floor' cần 'stays'.",
      "I put the petals on the bed and by the bath, sir, so the floor stay clear.",
    ),
  ],
  speaking: [
    sp(
      "It is our anniversary. Can you make the bathroom romantic, with candles?",
      t2a,
      "Khen ý tưởng trước, rồi luật ('not allowed'), rồi 'but' + phương án thay thế. 'LED candle' — đọc từng chữ cái L-E-D.",
    ),
    {
      ...sp(
        "And rose petals in the bath?",
        t2b,
        "Nói chính xác nơi đặt và nơi KHÔNG đặt, kèm lý do an toàn sau 'so'. Cánh hoa ướt trên sàn là cú ngã thường gặp nhất.",
        undefined,
        undefined,
        t2a,
      ),
      alsoAccept: [
        "Yes, madam. Rose petals go on the bed and along the bath, but never on the floor, so that nobody slips.",
      ],
    },
    sp(
      "Perfect. And some balloons for the children?",
      t2c,
      "Bóng bay cao su phải được kiểm dị ứng trước; quầy hỏi chuyện đó, không phải bạn. 'Latex' /ˈleɪteks/ — nhấn âm tiết đầu.",
      undefined,
      undefined,
      t2b,
    ),
    risk({
      ...sp(
        "We would like to light some incense in the room tonight, for my late father.",
        "I am so sorry, madam, we cannot have incense in the rooms. May I ask my supervisor to speak with you?",
        "Ở Việt Nam, xin thắp hương gần như luôn là việc lễ — đừng đáp bằng một cây nến điện. Từ chối bằng quy định, rồi mời giám sát lên ngay: có thể khách sạn có một chỗ phù hợp.",
      ),
      alsoAccept: [
        "I am so sorry, madam, incense is not allowed in the rooms. May I ask my supervisor to speak with you?",
        "I am so sorry, madam, we cannot have incense in the rooms. May I ask my supervisor to come and speak with you?",
      ],
    }),
    sp(
      "Could you make one of those towel animals for our son?",
      "I would be delighted, sir. Towel art takes me fifteen minutes, and I will leave it on his bed this afternoon.",
      "Một tính từ cảm xúc ('delighted'), rồi một mốc bạn tự giữ. 'Towel art' — /ˈtaʊəl/ hai âm tiết.",
    ),
    sp(
      "906 asked for helium balloons. Shall I bring them up?",
      "No helium in the rooms: a floating balloon can reach the smoke detector. Air-filled ones are fine.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Một luật + một lý do + phương án được phép.",
      "colleague",
    ),
  ],
  reading: read(
    `WHAT MAY GO INTO A ROOM — AND WHAT MAY NOT
YES: rose petals, towel art, an LED candle, a card, fruit, chocolates, a bath salt set, and air-filled balloons. Balloons still need a full day.
NO, in every room and for every occasion: real flames, incense, sparklers, glitter that blocks a drain, and helium. A floating balloon reaches the smoke detector and the sprinkler head.
CHECK THE SLIP FIRST. It must state allergies before petals, fruit, chocolate or any scent, pillow spray included, and latex before a latex balloon. If it does not say, send it back to the desk.
A child in the room changes the list: no latex where a young child sleeps, no scent, and no bath run in advance.
A drawn bath is not ours to run alone. Hot water standing in an empty room means burns and floods, so your supervisor arranges it with the desk, or it does not happen.
Petals never go on a floor, and nothing loose goes on a bathroom floor.
If a guest asks for incense, it is usually a memorial, not decoration. Do not answer with a candle. Say it is not allowed, then ask your supervisor to come up; the Duty Manager may find a proper place for it.`,
    [
      {
        q: "Vì sao không dùng bóng bay bơm khí heli?",
        options: [
          "Vì bóng bay lên chạm đầu báo khói và đầu phun nước",
          "Vì bóng heli đắt hơn nhiều so với bóng bơm khí thường",
          "Vì trẻ em hay làm vỡ bóng heli và bị giật mình",
        ],
        correct: 0,
        explanation:
          "'A floating balloon reaches the smoke detector and the sprinkler head' — luật an toàn, không phải chuyện giá.",
      },
      {
        q: "Khách xin thắp nhang trong phòng thì làm gì?",
        options: [
          "Đưa khách một cây nến điện tử để thay thế cho nhang",
          "Nói thật là không được phép, rồi mời giám sát lên",
          "Cho phép nếu khách hứa mở cửa sổ khi thắp nhang",
        ],
        correct: 1,
        explanation:
          "'Do not answer with a candle. Say it is not allowed, then ask your supervisor to come up' — đây thường là việc lễ, cần người có quyền tìm cách phù hợp.",
      },
    ],
  ),
  game: [
    round(
      2,
      "It is our tenth anniversary. Could you light a few candles by the bath for us?",
      "Our LED candles look just like real ones, sir, because real flames are not allowed in the rooms.",
      "Our LED candles look just like real ones, sir, because real flames are not allow in the rooms.",
      "Certainly, sir — I will light a few small candles by the bath just before you come back up.",
      "Phương án 'I will light a few small candles' đặt lửa thật vào phòng — điều không dịp nào được phép. Phương án 'are not allow' thiếu đuôi bị động: are not allowed. Câu đúng giữ luật và vẫn đưa khách một thứ đẹp tương đương.",
    ),
    round(
      1,
      "My son wants the room full of balloons tomorrow. Can you manage that?",
      "The desk will check latex for your son first, sir, and balloons need a full day. May I ask them to call you?",
      "Of course, sir — I will fill the room with balloon and have it all ready well before four.",
      "Of course, sir — I will fill the room with balloons and have it all ready well before four.",
      "Phương án 'fill the room with balloons… well before four' tự nhận một đơn có tính tiền và hứa giờ, bỏ qua bước kiểm dị ứng cao su. Phương án 'with balloon' nhận đơn và hứa giờ y như vậy, lại thiếu số nhiều: cả phòng bóng bay là 'balloons'. Câu đúng chuyển cho quầy và nói lead time thật.",
    ),
  ],
});

// ── Lesson 3 — setting a room without being seen ─────────────────────────
const t3a =
  "I am sorry, sir, I cannot take your valuables. May I ask my supervisor to come and sign for it?";
const t3b =
  "Of course, sir. I will keep it low-key, and the front desk will tell me when you have both gone out.";
const t3c = "Then I will say I am just finishing the room, sir, and ask for ten more minutes.";

// ── Lesson 4 — the morning after ──────────────────────────────────────────
const t4a = "Please do not think of it, madam. That is what the room was dressed for.";
const t4b = "On behalf of the housekeeping team, congratulations on your anniversary, madam.";
const t4c =
  "I cannot decide that, madam. I will photograph it now, and my supervisor will see it today.";

const lesson3 = L(34, 3, "Setting a Room Without Being Seen", "Dựng phòng mà không bị bắt gặp", {
  vocabulary: [
    c("Cue", "The desk gives the cue when the guests leave the lobby.", [
      "/kjuː/",
      "Tín hiệu bắt đầu, hẹn trước với quầy lễ tân",
      "🚦",
    ]),
    c("Sign for", "My supervisor must sign for a guest's ring before anyone carries it.", [
      "/ˈsaɪn fə/",
      "Ký nhận trách nhiệm về một món đồ",
      "✒️",
    ]),
    c("Unattended", "A set-up room is never left unattended with the door open.", [
      "/ˌʌnəˈtendɪd/",
      "Không có người trông",
      "🚪",
    ]),
    c("Low-key", "Keep the answer low-key if the guests come back early.", [
      "/ˌləʊ ˈkiː/",
      "Kín đáo, nhẹ nhàng, không phô trương",
      "🤐",
    ]),
  ],
  grammar: [
    g(
      "You came back too early! Your husband asked me for a surprise!",
      "I am just finishing your room, madam. May I have ten more minutes?",
      "Câu cứu điều bất ngờ: MỘT việc bình thường + xin thêm thời gian. Hiện tại tiếp diễn 'am + động từ -ing': am finishing. Không nhắc người đặt, dịp, hay chữ 'surprise'.",
      "I am just finish your room, madam. May I have ten more minutes?",
    ),
    g(
      "Sorry, no time now. Maybe later, maybe tomorrow.",
      "Shall I come back after your dinner, sir, and finish everything then?",
      "Đề nghị dời giờ bằng câu hỏi có mốc cụ thể. Sau 'shall I' là động từ nguyên mẫu: shall I come. 'Maybe' làm hỏng buổi tối của người đang lên kế hoạch.",
      "Shall I coming back after your dinner, sir, and finish everything then?",
    ),
  ],
  speaking: [
    risk({
      ...sp(
        "Could you put this ring on her pillow for me? Here, take it.",
        t3a,
        "Không bao giờ một mình cầm đồ giá trị của khách — kể cả cho một bất ngờ. Từ chối bằng quy trình, rồi mời giám sát lên 'sign for' nó. 'Sign' /saɪn/ — chữ g câm.",
      ),
      alsoAccept: [
        "I am sorry, sir, I am not able to take your valuables. May I ask my supervisor to come and sign for it?",
        "I am afraid I cannot take your valuables, sir. May I ask my supervisor to come and sign for it?",
      ],
    }),
    sp(
      "Fine. And you will keep this secret from my wife, yes?",
      t3b,
      "'Low-key' /ˌləʊ ˈkiː/ — nhấn ở 'key'. Nói với khách bằng lời thường, không nói 'cue' — từ nghề đó chỉ dùng với quầy.",
      undefined,
      undefined,
      t3a,
    ),
    sp(
      "And if she comes back early?",
      t3c,
      "Một việc bình thường + xin thêm thời gian. Chệch hướng thì được, nói dối thì không.",
      undefined,
      undefined,
      t3b,
    ),
    {
      ...sp(
        "Is my husband up to something? You are being very mysterious.",
        "I could not say, madam. I am only finishing your room. May I have ten more minutes?",
        "'I could not say' chệch hướng mà không phủ nhận — một câu phủ nhận bị phiếu dựng phòng lật lại sẽ đắt hơn nhiều. Báo quầy là việc làm SAU KHI ra khỏi phòng.",
      ),
      alsoAccept: [
        "I could not say, madam. I am just finishing your room. Could I have ten more minutes?",
      ],
    },
    {
      ...sp(
        "Just pull the door to while you finish. I do not want her seeing it from the corridor.",
        "I am sorry, sir, the door stays open while I work. May I finish once she has gone down?",
        "Luật cửa mở không đổi vì một bất ngờ. Khách HỎI khép cửa: nêu luật một câu, rồi đề nghị quay lại sau. Khách ép hoặc vượt ranh giới: bước ra ngoài và gọi giám sát.",
      ),
      alsoAccept: [
        "I am sorry, sir, I keep the door open while I work. May I finish once she has gone down?",
      ],
    },
    sp(
      "906 is ready, but the guests are still at dinner. Can I leave the door open and come back?",
      "No, never leave a set-up room unattended. Lock it, and tell the desk it is ready.",
      "Đồng nghiệp hỏi: trả lời thẳng, không kính ngữ. Phòng đang dựng mà mở cửa không người trông thì quà có thể mất — và người bị hỏi là bạn.",
      "colleague",
    ),
    sp(
      "Front desk here. When do you want us to call you for 906?",
      "Give me the cue when they leave the lobby, and I will need thirty minutes in the room.",
      "Đồng nghiệp ở quầy: dùng từ nghề 'cue', không kính ngữ, và nói lead time của tầng bằng con số.",
      "colleague",
    ),
  ],
  reading: read(
    `A SET-UP THE GUESTS MUST NOT SEE
Work in an order you can stop at any moment. Do the ordinary parts first — a tidy room, fresh water, folded towels — and the parts that give it away last.
Agree the cue with the desk, never with the guest who ordered it, and never send a guest a text.
If a guest is inside while you work, the door stays open and the trolley stays across it. A set-up changes nothing about that rule.
If the guest asks you to close the door, say the rule kindly and offer to come back later. If a guest presses you, or crosses the line with words or hands, step outside and call your supervisor.
A set-up room is never left unattended with the door open. If you must step away, close and lock it.
A guest's own ring or envelope never travels on a trolley. Your supervisor signs for it, two people place it, and it goes on your room report.
If the guests walk in early, name an ordinary task and ask for ten more minutes. Keep it low-key, and never say birthday, anniversary or surprise.
Steering away is allowed; a false denial is not. "I could not say, madam" survives being checked, and a denial does not.`,
    [
      {
        q: "Khách đang ở trong phòng nhờ khép cửa lại thì làm gì?",
        options: [
          "Khép hờ cửa lại rồi làm thật nhanh cho xong việc",
          "Nêu luật cửa luôn mở một cách nhẹ nhàng, rồi đề nghị quay lại sau",
          "Bước ra ngoài ngay và gọi giám sát lên phòng",
        ],
        correct: 1,
        explanation:
          "'say the rule kindly and offer to come back later' — chỉ khi khách ép hoặc vượt ranh giới thì mới 'step outside and call your supervisor'.",
      },
      {
        q: "Ai mang chiếc nhẫn của khách đặt lên gối?",
        options: [
          "Nhân viên dựng phòng, để trên xe đẩy cho tiện mang theo",
          "Chính vị khách, sau khi nhân viên đã dựng phòng xong xuôi",
          "Hai người, sau khi giám sát đã ký nhận chiếc nhẫn",
        ],
        correct: 2,
        explanation:
          "'Your supervisor signs for it, and two people place it' — đồ giá trị không bao giờ qua tay một người, cũng không nằm trên xe đẩy.",
      },
    ],
  ),
  game: [
    round(
      0,
      "You have been in there twenty minutes. Is something wrong with our room?",
      "Nothing at all, sir. I am just finishing your room, and I will be out in five minutes.",
      "Nothing at all, sir. I am just finish your room, and I will be out in five minutes.",
      "There is something being prepared for you, sir, but I really cannot say what it is just yet.",
      "Phương án 'something being prepared for you' tự làm lộ điều bất ngờ. Phương án 'I am just finish' thiếu đuôi -ing của hiện tại tiếp diễn. Câu đúng nói một việc bình thường và một mốc ngắn.",
    ),
    round(
      2,
      "My wife is coming up in five minutes. Is it all ready?",
      "It is in hand, sir, and the front desk will confirm the moment it is ready.",
      "Almost, sir — I will finish the last few thing while she is unpacking her bags in the room.",
      "Almost, sir — I will finish the last few things while she is unpacking her bags in the room.",
      "Phương án 'while she is unpacking' làm tiếp ngay trước mặt người không được biết — bất ngờ hỏng, và bạn làm việc trong phòng có khách. Phương án 'the last few thing' cũng làm tiếp trước mặt bà ấy, lại thiếu số nhiều: sau 'few' danh từ phải thêm -s (few things). Câu đúng giữ thời điểm cho quầy.",
    ),
  ],
});

const lesson4 = L(34, 4, "The Morning After", "Buổi sáng sau bữa tiệc", {
  vocabulary: [
    c("Reset", "A celebration adds forty minutes to the reset of the room.", [
      "/ˈriːset/",
      "Lượt dọn trả phòng về đúng tiêu chuẩn ban đầu",
      "🔄",
    ]),
    c("On behalf of", "On behalf of the housekeeping team, congratulations, madam.", [
      "/ɒn bɪˈhɑːf əv/",
      "Thay mặt cho",
      "🤝",
    ]),
    c(
      "Congratulations",
      "Congratulations is one sentence, and only for an occasion the guest named.",
      ["/kənˌɡrætʃuˈleɪʃnz/", "Lời chúc mừng", "🥂"],
    ),
    c("Chargeable", "Only the Duty Manager decides what is chargeable.", [
      "/ˈtʃɑːdʒəbl/",
      "Thuộc diện có thể bị tính phí",
      "🏷️",
    ]),
  ],
  grammar: [
    g(
      "Congrats! How many years? You do not look old enough.",
      "On behalf of the housekeeping team, congratulations on your anniversary, madam.",
      "Lời chúc trang trọng chỉ MỘT câu: 'On behalf of + bộ phận, congratulations on + dịp'. 'Congratulations' luôn có -s. Chỉ nêu dịp khi khách đã tự nói ra.",
      "On behalf of the housekeeping team, congratulation on your anniversary, madam.",
    ),
    g(
      "You made this mess, madam. Somebody must pay for it.",
      "Please do not think of it, madam. That is what the room was dressed for.",
      "Phân biệt hậu quả của dịch vụ (không tính phí) với hư hỏng thật (quản lý quyết). Bị động quá khứ: was dressed — giữ đuôi -ed.",
      "Please do not think of it, madam. That is what the room was dress for.",
    ),
  ],
  speaking: [
    sp(
      "Sorry about the state of the room. We had a bit of a celebration.",
      t4a,
      "Xoá cảm giác áy náy của khách rồi thôi. Không nói 'reset' với khách — đó là từ của tầng. 'Dressed' /drest/ — một âm tiết.",
    ),
    {
      ...sp(
        "It was our fiftieth anniversary, you know.",
        t4b,
        "Khách đã tự nói ra dịp gì, nên lúc này mới chúc trọn câu. 'Congratulations' /kənˌɡrætʃuˈleɪʃnz/ — năm âm tiết, nhấn ở 'la'.",
        undefined,
        undefined,
        t4a,
      ),
      alsoAccept: [
        "Congratulations on your anniversary, madam, on behalf of the housekeeping team.",
      ],
    },
    risk({
      ...sp(
        "Thank you. There is some red wine on the carpet from last night. Will we be charged?",
        t4c,
        "Không hứa miễn phí, không dọa tính phí — tiền là việc của quản lý. Nói hai việc bạn làm được: chụp ảnh ngay, và giám sát xem trong ngày.",
        undefined,
        undefined,
        t4b,
      ),
      alsoAccept: [
        "I am not able to decide that, madam. I will photograph it now, and my supervisor will see it today.",
        "That is not my decision, madam. I will photograph it now, and my supervisor will see it today.",
      ],
    }),
    {
      ...sp(
        "We had family here last night, for my father's memorial.",
        "Good morning, madam. I will put the room back quietly. Please tell me what should stay.",
        "Một dịp đặc biệt cũng có thể là ngày giỗ. Khách chưa nói là tiệc mừng thì chỉ chào buổi sáng, làm lặng lẽ, và hỏi món nào cần giữ.",
      ),
      alsoAccept: [
        "Good morning, madam. I will put the room back quietly. Could you tell me what should stay?",
      ],
    },
    sp(
      "How long do you need for 1204? They had a party last night.",
      "Give me forty extra minutes. A dressed room takes longer to reset, and I will do a final check before I call it ready.",
      "Đồng nghiệp hỏi: dùng từ nghề 'reset', không kính ngữ. Thời gian dọn thêm phải báo SỚM, bằng con số.",
      "colleague",
    ),
    sp(
      "Can we keep the cards and ribbons from last night?",
      "Of course, madam. I will leave them on the desk for you, and our own decorations are never chargeable.",
      "Giữ lại cho khách những thứ khách có thể muốn giữ. 'Chargeable' /ˈtʃɑːdʒəbl/ — nhấn âm tiết đầu.",
    ),
  ],
  reading: read(
    `THE ROOM AFTER A CELEBRATION — RESET, NOT BLAME
Before anything else, look for glass. Put on cut-resistant gloves, sweep the pieces into a rigid box, and label it GLASS. A bin bag does not stop glass, and the next hands on that bag are a colleague's.
Then strip the decoration: petals, paper hearts and balloons. Put aside anything the guests may want to keep, such as cards and ribbons, and leave it on the desk.
A dressed room takes longer to reset to standard, so tell your supervisor early, with a number of minutes. Do a final check before you call it ready.
NEVER CHARGEABLE: petals and paper hearts from our own set-up, extra linen, and an untidy room.
POSSIBLY CHARGEABLE, and only by the Duty Manager: a burn, a wax mark, a broken item, or a stain that survives professional cleaning.
Three steps are yours: notice it, photograph it on the department device, and report it. You never quote a figure, and you never promise there will be no charge.
Congratulate a guest only on an occasion they have named. If they mention a memorial, say good morning, work quietly, and ask what should stay.`,
    [
      {
        q: "Việc đầu tiên khi dọn phòng sau bữa tiệc là gì?",
        options: [
          "Gỡ trang trí trước, để riêng thứ khách có thể muốn giữ lại",
          "Tìm mảnh thuỷ tinh vỡ, đeo găng chống cắt và gom vào hộp cứng ghi chữ GLASS",
          "Hút bụi thảm thật kỹ để lấy hết giấy vụn còn sót lại",
        ],
        correct: 1,
        explanation:
          "'Before anything else, look for glass' — và thuỷ tinh không bao giờ bỏ vào túi rác, vì người cầm túi tiếp theo là đồng nghiệp.",
      },
      {
        q: "Khoản nào KHÔNG bao giờ bị tính phí?",
        options: [
          "Cánh hoa và tim giấy từ phần dựng phòng của khách sạn",
          "Vết bẩn không tẩy được dù đã giặt là chuyên nghiệp",
          "Vết sáp nến và vết cháy để lại trên mặt bàn làm việc của phòng",
        ],
        correct: 0,
        explanation:
          "'NEVER CHARGEABLE: petals and paper hearts from our own set-up' — hậu quả của chính dịch vụ mình bày ra không phải là hư hỏng.",
      },
    ],
  ),
  game: [
    round(
      1,
      "We spilled a whole bottle of wine on the carpet. Are we in trouble?",
      "Thank you for telling me, madam. I will photograph it and report it, and only the Duty Manager decides what is chargeable.",
      "Thank you for telling me, madam. I will photograph it and report it, and only the Duty Manager decide what is chargeable.",
      "I am afraid so, madam — a stain like that is always charged to the room when you check out.",
      "Phương án 'always charged to the room' tự quyết một khoản phí thay quản lý. Phương án 'the Duty Manager decide' sai chia động từ: chủ ngữ số ít cần 'decides'. Câu đúng cảm ơn khách, làm hai việc của mình, và nói ai quyết.",
    ),
    round(
      2,
      "The flowers and photos on the desk are from my grandfather's memorial last night.",
      "I will work quietly around the desk, sir. Would you like the flowers and photos to stay?",
      "How lovely, sir — I will throw the old flowers away and gives the whole room a fresh start this morning.",
      "How lovely, sir — I will throw the old flowers away and give the whole room a fresh start this morning.",
      "Phương án 'How lovely… throw the old flowers away' vui vẻ trước một buổi tưởng niệm và tự bỏ đi thứ khách có thể muốn giữ. Phương án 'and gives the whole room' cũng vậy, lại sai: sau 'will' cả hai động từ đều ở dạng nguyên mẫu (will throw… and give). Câu đúng làm lặng lẽ và hỏi khách món nào cần giữ.",
    ),
  ],
});

export const week: AuthoredWeek = {
  lessons: [lesson1, lesson2, lesson3, lesson4],
  canDo:
    "Nói được: phối hợp một lần dựng phòng dịp đặc biệt với quầy lễ tân và Guest Relations — hỏi đúng giờ phòng trống, nói lead time thật, báo lại người gửi phiếu; từ chối lửa thật và nhang mà vẫn đưa phương án; giữ luật cửa mở và đồ giá trị; và chúc mừng trang trọng bằng một câu 'On behalf of… congratulations' khi khách đã nói ra dịp.",
};
