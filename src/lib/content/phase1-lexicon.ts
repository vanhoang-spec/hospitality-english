// ============================================================
// PHASE 1 word banks — the 70% of A1 content that is genuinely
// department-specific (docs/curriculum-level-matrix.md).
//
// Phase 0 could share ~90% of its language because numbers, clock
// times and the alphabet are universal. At A1 that stops being true:
// a housekeeper and a sales coordinator ask for different things, work
// in different rooms and break different equipment. So Phase 1 keeps
// the SENTENCE FRAMES shared (one grammar ladder for all six teams)
// and swaps the WORD BANK per department.
//
// One bank per week 7-13 (8 words each) + a 4-word `closing` bank for
// the week-14 checkpoint = 60 department-specific headwords each.
//
// Authoring constraints enforced by scripts/verify-content.mjs:
//  · No word here may repeat a Phase 0 headword for the same team.
//  · No word here may pre-teach vocabulary reserved for that team's
//    A2-B1 weeks in week-content.ts (e.g. HK must not meet "Amenities"
//    or "Policy" at A1 — those are HK-15/HK-33 material).
//  · Across departments, at most ONE shared headword per week.
// ============================================================

export type P1Word = {
  word: string;
  phonetic: string;
  definition: string;
  icon: string;
  /** What the indefinite frames put in front of this headword. Omit and the
   *  frame supplies "a"/"an" by sound; set "some" for mass nouns and plurals
   *  ("some ice", "some slippers"), or "" for a headword that needs nothing.
   *
   *  Week 9 teaches the request formula, and it shipped as "Can I have the
   *  fork?" — grammatical, but wrong for a first mention, and wrong in the
   *  one place it matters most: Vietnamese has no articles, so this frame is
   *  where the article system is first drilled into a reflex. Same mechanism
   *  and same reason as `art` in phase2-lexicon.ts. */
  art?: string;
  /** Comparative form, for the ONE frame that compares two things
   *  ("This one is {cmp}."). English picks -er or "more" by syllable count,
   *  and the week-10 frame hardcoded "more", so a one-syllable bank word
   *  shipped as "This one is more empty." / "more bright." across four
   *  departments. There is no syllable table anywhere in the repo and a
   *  reliable one is not worth writing for six words, so the form is
   *  declared here — same shape, same reason as `art` above. */
  cmp?: string;
  /** Grammatical gender, for role headwords that carry it in English.
   *  Week 7 introduces a colleague as "He is our {role}", which produced
   *  "He is our waitress." for F&B. Only the roles bank needs this, and
   *  only where the English word is itself marked; an unmarked role reads
   *  as "she" so the course does not narrate every colleague as a man. */
  gender?: "m" | "f";
  /** Direct object, for the `routines` bank only. Week 11's frames are
   *  intransitive shells — "I {v} every day.", "We {v} at {hour}.", "I
   *  usually {v} first." — and half the routines banks hold transitive
   *  verbs. Guest Relations shipped "We arrange at seven." as the vocabulary
   *  context, the grammar model, the speaking target, a line of the passage
   *  AND the correct game answer: six exposures to a non-sentence in one
   *  lesson. F&B shipped "We sometimes refill twice a day.", Spa "I usually
   *  fold first.", Front Office "We print at two."
   *
   *  Kept on the word rather than baked into the headword so `third()` can
   *  still inflect the head verb: "He prints the key card every day.", not
   *  "He print the key cards." Omit for verbs that are genuinely
   *  intransitive (Rest, Follow up, Check in). Same shape and same reason as
   *  `art` and `cmp` above. */
  obj?: string;
};

export type P1Bank = {
  /** W7 — people and job titles inside this department. */
  roles: P1Word[];
  /** W8 — places a guest may be directed to in this department's area. */
  places: P1Word[];
  /** W9 — small items guests routinely ask this department for. */
  requests: P1Word[];
  /** W10 — adjectives that describe this department's own objects. */
  states: P1Word[];
  /** W11 — the verbs of this department's daily shift routine. */
  routines: P1Word[];
  /** W12 — vocabulary specific to this department's phone calls. */
  phone: P1Word[];
  /** W13 — the simple faults this department actually meets. */
  problems: P1Word[];
  /** W14 — closing/wrap-up words for the checkpoint week. Seven, so the
   *  checkpoint still clears the 70% department-specific floor. */
  closing: P1Word[];
};

// ------------------------------------------------------------
// FRONT OFFICE — the desk, the keys, the arrivals and departures.
// ------------------------------------------------------------
const FO_BANK: P1Bank = {
  roles: [
    {
      word: "Receptionist",
      phonetic: "/rɪˈsepʃənɪst/",
      definition: "Nhân viên lễ tân",
      icon: "🧑‍💼",
    },
    {
      word: "Bellman",
      phonetic: "/ˈbelmæn/",
      definition: "Nhân viên hành lý",
      icon: "🛎️",
      gender: "m",
    },
    {
      word: "Concierge",
      phonetic: "/ˌkɒnsiˈeəʒ/",
      definition: "Nhân viên hỗ trợ khách",
      icon: "🎩",
    },
    { word: "Cashier", phonetic: "/kæˈʃɪə/", definition: "Thu ngân", icon: "💰" },
    { word: "Doorman", phonetic: "/ˈdɔːmən/", definition: "Nhân viên đứng cửa", icon: "🚪" },
    { word: "Supervisor", phonetic: "/ˈsuːpəvaɪzə/", definition: "Giám sát", icon: "📋" },
    {
      word: "Duty manager",
      phonetic: "/ˈdjuːti ˈmænɪdʒə/",
      definition: "Quản lý trực ca",
      icon: "🗝️",
    },
    { word: "Night shift", phonetic: "/ˈnaɪt ʃɪft/", definition: "Ca đêm", icon: "🌙" },
  ],
  places: [
    { word: "Lobby", phonetic: "/ˈlɒbi/", definition: "Sảnh khách sạn", icon: "🏨" },
    // The phone bank answers with `Reception`, so the place card names the
    // area rather than the counter — two cards, two glosses, one referent.
    {
      word: "Reception area",
      phonetic: "/rɪˈsepʃn ˈeəriə/",
      definition: "Khu vực lễ tân",
      icon: "🛎️",
    },
    { word: "Car park", phonetic: "/ˈkɑː pɑːk/", definition: "Bãi đỗ xe", icon: "🅿️" },
    {
      word: "Luggage room",
      phonetic: "/ˈlʌɡɪdʒ ruːm/",
      definition: "Phòng giữ hành lý",
      icon: "🧳",
    },
    {
      word: "Swimming pool",
      phonetic: "/ˈswɪmɪŋ puːl/",
      definition: "Hồ bơi",
      icon: "🏊",
    },
    { word: "Rest room", phonetic: "/ˈrest ruːm/", definition: "Nhà vệ sinh", icon: "🚻" },
    { word: "Restaurant", phonetic: "/ˈrestrɒnt/", definition: "Nhà hàng", icon: "🍽️" },
    { word: "Main door", phonetic: "/ˈmeɪn dɔː/", definition: "Cửa chính", icon: "🚪" },
  ],
  requests: [
    { word: "Newspaper", phonetic: "/ˈnjuːzpeɪpə/", definition: "Báo giấy", icon: "📰" },
    { word: "Receipt", phonetic: "/rɪˈsiːt/", definition: "Biên lai", icon: "🧾" },
    { word: "Extra key", phonetic: "/ˈekstrə kiː/", definition: "Chìa khóa dự phòng", icon: "🔑" },
    {
      word: "Wake-up call",
      phonetic: "/ˈweɪk ʌp kɔːl/",
      definition: "Cuộc gọi báo thức",
      icon: "⏰",
    },
    {
      word: "Taxi",
      phonetic: "/ˈtæksi/",
      definition: "Xe chở khách theo chuyến, tính tiền theo đồng hồ",
      icon: "🚕",
    },
    { word: "Umbrella", phonetic: "/ʌmˈbrelə/", definition: "Ô, dù", icon: "☂️" },
    { word: "City map", phonetic: "/ˈsɪti mæp/", definition: "Bản đồ thành phố", icon: "🗺️" },
    {
      word: "Directions",
      phonetic: "/dɪˈrekʃnz/",
      definition: "Chỉ dẫn đường đi",
      icon: "🧭",
      art: "some",
    },
  ],
  states: [
    { word: "Quiet", phonetic: "/ˈkwaɪət/", definition: "Yên tĩnh", icon: "🤫" },
    // Slot 4 sits in "It is a little {w}." — a frame that softens a mild
    // COMPLAINT, so a positive word inverts it. "Safe" gave "It is a little
    // safe.", which is not a thing anyone says.
    { word: "Crowded", phonetic: "/ˈkraʊdɪd/", definition: "Đông người", icon: "👥" },
    { word: "Empty", phonetic: "/ˈempti/", definition: "Trống, rỗng", icon: "⬜" },
    { word: "Noisy", phonetic: "/ˈnɔɪzi/", definition: "Ồn ào", icon: "🔊" },
    { word: "Late", phonetic: "/leɪt/", definition: "Muộn, trễ", icon: "🕐" },
    // Khe 5 chạy qua cmpOf(): "Which one is emptier?" so sánh một tính từ
    // tuyệt đối. "Busy" so sánh được và vẫn là chữ của quầy lễ tân.
    { word: "Busy", phonetic: "/ˈbɪzi/", definition: "Bận, đông khách", icon: "🏃", cmp: "busier" },
    { word: "Full", phonetic: "/fʊl/", definition: "Kín phòng, đầy", icon: "🈵" },
    // Slot 8 feeds "Careful, the floor is ___" — a floor cannot be
    // "crowded"; a marble lobby floor after rain genuinely is slippery.
    { word: "Slippery", phonetic: "/ˈslɪpəri/", definition: "Trơn trượt", icon: "⚠️" },
  ],
  routines: [
    // Both need their object. Without it the week-11 routine frames put the
    // STAFF through check-in — "I check in every morning." — and, worse,
    // answered a guest asking when check-out is with "We check out after
    // breakfast.", against Phase 0's "Check-out is at twelve, madam."
    {
      word: "Check in",
      phonetic: "/tʃek ˈɪn/",
      definition: "Làm thủ tục nhận phòng",
      icon: "📥",
      obj: "the guests",
    },
    {
      word: "Check out",
      phonetic: "/tʃek ˈaʊt/",
      definition: "Làm thủ tục trả phòng",
      icon: "📤",
      obj: "the guests",
    },
    { word: "Print", phonetic: "/prɪnt/", definition: "In ra", icon: "🖨️", obj: "the bill" },
    { word: "Sign", phonetic: "/saɪn/", definition: "Ký tên", icon: "✍️", obj: "the form" },
    { word: "Greet", phonetic: "/ɡriːt/", definition: "Chào đón", icon: "🙋", obj: "the guest" },
    {
      word: "Register",
      phonetic: "/ˈredʒɪstə/",
      definition: "Đăng ký",
      icon: "📖",
      // "We sometimes register A GUEST twice a day." is a duplicate PMS
      // record, which is the one thing a receptionist must never do. The
      // routine frames are about the shift, so the object is the plural.
      obj: "the guests",
    },
    {
      word: "Deliver",
      phonetic: "/dɪˈlɪvə/",
      definition: "Giao, chuyển đến",
      icon: "📦",
      obj: "the luggage",
    },
    { word: "Update", phonetic: "/ʌpˈdeɪt/", definition: "Cập nhật", icon: "🔄", obj: "the file" },
  ],
  phone: [
    // Was `Extension`, which made the answering line "Hello, extension."
    { word: "Reception", phonetic: "/rɪˈsepʃn/", definition: "Lễ tân (khi bắt máy)", icon: "🛎️" },
    { word: "Message", phonetic: "/ˈmesɪdʒ/", definition: "Lời nhắn", icon: "📝" },
    { word: "In a moment", phonetic: "/ɪn ə ˈməʊmənt/", definition: "Trong chốc lát", icon: "🔜" },
    {
      word: "Transfer the call",
      phonetic: "/trænsˈfɜː ðə kɔːl/",
      definition: "Chuyển cuộc gọi",
      icon: "🔀",
    },
    { word: "Airport car", phonetic: "/ˈeəpɔːt kɑː/", definition: "Xe đón sân bay", icon: "🚗" },
    { word: "Dial", phonetic: "/ˈdaɪəl/", definition: "Quay số, bấm số", icon: "🔢" },
    {
      word: "Call you back",
      phonetic: "/kɔːl juː ˈbæk/",
      definition: "Gọi lại cho quý khách",
      icon: "📲",
    },
    { word: "Call us", phonetic: "/ˈkɔːl ʌs/", definition: "Gọi cho chúng tôi", icon: "📞" },
  ],
  problems: [
    { word: "Broken", phonetic: "/ˈbrəʊkən/", definition: "Bị hỏng", icon: "🔧" },
    { word: "Lost", phonetic: "/lɒst/", definition: "Bị mất", icon: "🔍" },
    { word: "Wrong", phonetic: "/rɒŋ/", definition: "Sai, nhầm", icon: "❌" },
    { word: "Stuck", phonetic: "/stʌk/", definition: "Bị kẹt", icon: "🚧" },
    { word: "Faulty", phonetic: "/ˈfɔːlti/", definition: "Bị lỗi kỹ thuật", icon: "⚠️" },
    { word: "Missing", phonetic: "/ˈmɪsɪŋ/", definition: "Thiếu, không thấy", icon: "🕳️" },
    // Slot 6 is the fault a replacement fixes — the frame keys "The item is
    // ___." to "I am sorry. I will bring a new one." Nobody brings a new one
    // for a locked door.
    { word: "Scratched", phonetic: "/skrætʃt/", definition: "Bị trầy xước", icon: "🔍" },
    { word: "Delayed", phonetic: "/dɪˈleɪd/", definition: "Bị chậm trễ", icon: "⏳" },
  ],
  closing: [
    {
      word: "Boarding pass",
      phonetic: "/ˈbɔːdɪŋ pɑːs/",
      definition: "Thẻ lên máy bay",
      icon: "🎫",
    },
    { word: "Suitcase", phonetic: "/ˈsuːtkeɪs/", definition: "Va li", icon: "🧳" },
    { word: "Correct", phonetic: "/kəˈrekt/", definition: "Chính xác, đúng", icon: "✅" },
    { word: "Trip", phonetic: "/trɪp/", definition: "Chuyến đi", icon: "🚗" },
    // Was `Farewell`, which rendered "Please take the farewell."
    { word: "Taxi voucher", phonetic: "/ˈtæksi ˈvaʊtʃə/", definition: "Phiếu đi taxi", icon: "🎟️" },
    { word: "Lobby seat", phonetic: "/ˈlɒbi siːt/", definition: "Ghế chờ ở sảnh", icon: "💺" },
    { word: "Signature", phonetic: "/ˈsɪɡnətʃə/", definition: "Chữ ký", icon: "🖋️" },
  ],
};

// ------------------------------------------------------------
// FOOD & BEVERAGE — the floor, the table, the plate.
// ------------------------------------------------------------
const FB_BANK: P1Bank = {
  roles: [
    // Slot 0 is the persona's OWN role and slot 1 the colleague's, so the
    // female-marked word has to come first here: F&B's persona is Linh.
    // Ordered the other way, week 7 introduced her as "our waiter" and the
    // colleague as "He is our waitress."
    {
      word: "Waitress",
      phonetic: "/ˈweɪtrəs/",
      definition: "Nhân viên phục vụ (nữ)",
      icon: "👩‍🍳",
      gender: "f",
    },
    {
      word: "Waiter",
      phonetic: "/ˈweɪtə/",
      definition: "Nhân viên phục vụ (nam)",
      icon: "🧑‍🍳",
      gender: "m",
    },
    { word: "Chef", phonetic: "/ʃef/", definition: "Bếp trưởng", icon: "👨‍🍳" },
    {
      word: "Barista",
      phonetic: "/bəˈriːstə/",
      definition: "Nhân viên pha chế cà phê",
      icon: "☕",
    },
    {
      word: "Bartender",
      phonetic: "/ˈbɑːtendə/",
      definition: "Nhân viên pha chế quầy bar",
      icon: "🍸",
    },
    { word: "Host", phonetic: "/həʊst/", definition: "Nhân viên đón khách nhà hàng", icon: "🤵" },
    { word: "Kitchen staff", phonetic: "/ˈkɪtʃɪn stɑːf/", definition: "Nhân viên bếp", icon: "🍳" },
    {
      word: "Head waiter",
      phonetic: "/hed ˈweɪtə/",
      definition: "Trưởng nhóm phục vụ",
      icon: "📋",
    },
  ],
  places: [
    { word: "Dining room", phonetic: "/ˈdaɪnɪŋ ruːm/", definition: "Phòng ăn", icon: "🍽️" },
    {
      word: "Bar",
      phonetic: "/bɑː/",
      definition: "Quầy đồ uống",
      icon: "🍹",
    },
    { word: "Kitchen", phonetic: "/ˈkɪtʃɪn/", definition: "Nhà bếp", icon: "🍳" },
    { word: "Buffet line", phonetic: "/ˈbʊfeɪ laɪn/", definition: "Dãy quầy buffet", icon: "🥗" },
    { word: "Terrace", phonetic: "/ˈterəs/", definition: "Sân hiên ngoài trời", icon: "🌤️" },
    { word: "Counter", phonetic: "/ˈkaʊntə/", definition: "Quầy", icon: "🧱" },
    { word: "Coffee corner", phonetic: "/ˈkɒfi ˈkɔːnə/", definition: "Góc cà phê", icon: "☕" },
    // Was "Pantry". This slot is read by "Let me show you the ___" and the
    // reading passage ends "They walk together." — a guest walked into the dry
    // store, which is a food-safety breach before it is an English mistake.
    { word: "Pool bar", phonetic: "/ˈpuːl bɑː/", definition: "Quầy bar hồ bơi", icon: "🍹" },
  ],
  requests: [
    { word: "Fork", phonetic: "/fɔːk/", definition: "Nĩa", icon: "🍴" },
    { word: "Knife", phonetic: "/naɪf/", definition: "Dao ăn", icon: "🔪" },
    { word: "Glass", phonetic: "/ɡlɑːs/", definition: "Ly, cốc", icon: "🥛" },
    { word: "High chair", phonetic: "/ˈhaɪ tʃeə/", definition: "Ghế ăn cho trẻ em", icon: "🪑" },
    { word: "Plate", phonetic: "/pleɪt/", definition: "Đĩa", icon: "🍽️" },
    { word: "Bread", phonetic: "/bred/", definition: "Bánh mì", icon: "🍞", art: "some" },
    { word: "Ice", phonetic: "/aɪs/", definition: "Đá lạnh", icon: "🧊", art: "some" },
    { word: "Straw", phonetic: "/strɔː/", definition: "Ống hút", icon: "🥤" },
  ],
  states: [
    { word: "Hot", phonetic: "/hɒt/", definition: "Nóng", icon: "🔥" },
    { word: "Cold", phonetic: "/kəʊld/", definition: "Lạnh", icon: "❄️" },
    { word: "Fresh", phonetic: "/freʃ/", definition: "Tươi mới", icon: "🥬" },
    { word: "Sweet", phonetic: "/swiːt/", definition: "Ngọt", icon: "🍬" },
    { word: "Salty", phonetic: "/ˈsɔːlti/", definition: "Mặn", icon: "🧂" },
    { word: "Sour", phonetic: "/ˈsaʊə/", definition: "Chua", icon: "🍋", cmp: "sourer" },
    { word: "Delicious", phonetic: "/dɪˈlɪʃəs/", definition: "Ngon", icon: "😋" },
    // Slot 8 feeds "Careful, the floor is ___" — a floor isn't "sharp";
    // a dining/kitchen floor with spilled food genuinely is greasy.
    { word: "Greasy", phonetic: "/ˈɡriːsi/", definition: "Trơn dầu mỡ", icon: "⚠️" },
  ],
  routines: [
    { word: "Serve", phonetic: "/sɜːv/", definition: "Phục vụ", icon: "🍽️", obj: "the guests" },
    { word: "Pour", phonetic: "/pɔː/", definition: "Rót", icon: "🫗", obj: "the water" },
    { word: "Cook", phonetic: "/kʊk/", definition: "Nấu", icon: "🍳", obj: "breakfast" },
    {
      word: "Take an order",
      phonetic: "/teɪk ən ˈɔːdə/",
      definition: "Ghi món khách gọi",
      icon: "📝",
    },
    { word: "Set the table", phonetic: "/set ðə ˈteɪbl/", definition: "Bày bàn ăn", icon: "🍴" },
    {
      word: "Refill",
      phonetic: "/ˌriːˈfɪl/",
      definition: "Rót thêm, châm đầy",
      icon: "🔁",
      obj: "the water",
    },
    {
      word: "Prepare",
      phonetic: "/prɪˈpeə/",
      definition: "Chuẩn bị",
      icon: "⚙️",
      obj: "the tables",
    },
    { word: "Wash", phonetic: "/wɒʃ/", definition: "Rửa", icon: "🧽", obj: "the plates" },
  ],
  phone: [
    // Was `Booking`, which made the answering line "Hello, booking."
    {
      word: "Restaurant desk",
      phonetic: "/ˈrestrɒnt desk/",
      definition: "Quầy nhà hàng",
      icon: "🍽️",
    },
    { word: "Reservation", phonetic: "/ˌrezəˈveɪʃn/", definition: "Đơn đặt bàn", icon: "✅" },
    { word: "Before noon", phonetic: "/bɪˈfɔː nuːn/", definition: "Trước buổi trưa", icon: "🕛" },
    { word: "Cancel", phonetic: "/ˈkænsl/", definition: "Hủy", icon: "🚫" },
    {
      word: "Corner table",
      phonetic: "/ˈkɔːnə ˈteɪbl/",
      definition: "Bàn ở góc phòng",
      icon: "🍽️",
    },
    { word: "Write it down", phonetic: "/raɪt ɪt ˈdaʊn/", definition: "Ghi lại", icon: "✍️" },
    {
      word: "Confirm the table",
      phonetic: "/kənˈfɜːm ðə ˈteɪbl/",
      definition: "Xác nhận bàn đặt",
      icon: "🪑",
    },
    {
      word: "Call room service",
      phonetic: "/kɔːl ruːm ˈsɜːvɪs/",
      definition: "Gọi phục vụ tại phòng",
      icon: "🛎️",
    },
  ],
  problems: [
    { word: "Stained", phonetic: "/steɪnd/", definition: "Bị dây bẩn", icon: "💦" },
    { word: "Dirty", phonetic: "/ˈdɜːti/", definition: "Bẩn", icon: "🧻" },
    { word: "Overcooked", phonetic: "/ˌəʊvəˈkʊkt/", definition: "Nấu quá chín", icon: "🍖" },
    { word: "Undercooked", phonetic: "/ˌʌndəˈkʊkt/", definition: "Chưa chín tới", icon: "🥩" },
    // Every problems frame describes a THING ("It is {w}."), so a
    // person-adjective here shipped as "The machine is unhappy."
    { word: "Burnt", phonetic: "/bɜːnt/", definition: "Bị cháy khét", icon: "🔥" },
    { word: "Sold out", phonetic: "/səʊld ˈaʊt/", definition: "Đã hết món", icon: "🚷" },
    { word: "Cracked", phonetic: "/krækt/", definition: "Bị nứt, mẻ", icon: "💔" },
    { word: "Slow", phonetic: "/sləʊ/", definition: "Chậm", icon: "🐢" },
  ],
  closing: [
    { word: "Dessert", phonetic: "/dɪˈzɜːt/", definition: "Món tráng miệng", icon: "🍰" },
    // Was `Tip`. Its only model sentence was "Please leave the tip here." — a
    // waiter telling a guest where to put money, in a resort that already adds
    // a 5% service charge. Every slot in this bank renders a staff line, so
    // moving it could not save it.
    { word: "Tray", phonetic: "/treɪ/", definition: "Khay phục vụ", icon: "🍽️" },
    { word: "Clean", phonetic: "/kliːn/", definition: "Sạch sẽ", icon: "🧼" },
    { word: "Evening", phonetic: "/ˈiːvnɪŋ/", definition: "Buổi tối", icon: "🌆" },
    { word: "Toothpick", phonetic: "/ˈtuːθpɪk/", definition: "Tăm xỉa răng", icon: "🦷" },
    { word: "Bill folder", phonetic: "/bɪl ˈfəʊldə/", definition: "Bìa đựng hóa đơn", icon: "📁" },
    { word: "Recipe", phonetic: "/ˈresəpi/", definition: "Công thức nấu ăn", icon: "📜" },
  ],
};

// ------------------------------------------------------------
// HOUSEKEEPING — the room, the linen, the trolley.
// (Reserved for HK-15/HK-33 and avoided here: Amenities, Knock,
//  Occupied, Razor, Iron, Stain, Policy, Apologize, Compensation.)
// ------------------------------------------------------------
const HK_BANK: P1Bank = {
  roles: [
    {
      word: "Room attendant",
      phonetic: "/ruːm əˈtendənt/",
      definition: "Nhân viên dọn phòng",
      icon: "🧹",
    },
    {
      word: "Floor supervisor",
      phonetic: "/flɔː ˈsuːpəvaɪzə/",
      definition: "Giám sát tầng",
      icon: "📋",
    },
    // "Linen staff" and "Public area staff" are collective nouns, and the
    // week-7 frames put them where one person goes: "Our linen staff checks
    // it", "She is our public area staff". Housekeeping is the only bank that
    // named a team where the other five name a person.
    {
      word: "Linen attendant",
      phonetic: "/ˈlɪnɪn əˈtendənt/",
      definition: "Nhân viên đồ vải",
      icon: "🧺",
    },
    { word: "Cleaner", phonetic: "/ˈkliːnə/", definition: "Nhân viên vệ sinh", icon: "🧽" },
    { word: "Gardener", phonetic: "/ˈɡɑːdnə/", definition: "Nhân viên làm vườn", icon: "🌿" },
    {
      word: "Public area attendant",
      phonetic: "/ˈpʌblɪk ˈeəriə əˈtendənt/",
      definition: "Nhân viên khu vực công cộng",
      icon: "🏛️",
    },
    {
      word: "Housekeeping manager",
      phonetic: "/ˈhaʊskiːpɪŋ ˈmænɪdʒə/",
      definition: "Quản lý buồng phòng",
      icon: "👔",
    },
    { word: "Morning shift", phonetic: "/ˈmɔːnɪŋ ʃɪft/", definition: "Ca sáng", icon: "🌅" },
  ],
  places: [
    // Slot order follows the week-8 frames: slots 1-2 sit in the
    // left/right in-room orientation, 3-4 in the "near the lift"
    // service-floor talk, 7-8 in the "lost guest" escort — which must
    // end at somewhere a guest is actually taken (their room, the
    // balcony), never at the wardrobe or a housekeeping trolley.
    { word: "Wardrobe", phonetic: "/ˈwɔːdrəʊb/", definition: "Tủ quần áo", icon: "🚪" },
    { word: "Bathroom", phonetic: "/ˈbɑːθruːm/", definition: "Phòng tắm", icon: "🚿" },
    { word: "Linen room", phonetic: "/ˈlɪnɪn ruːm/", definition: "Kho đồ vải", icon: "🧺" },
    { word: "Trolley", phonetic: "/ˈtrɒli/", definition: "Xe đẩy dọn phòng", icon: "🛒" },
    { word: "Store room", phonetic: "/ˈstɔː ruːm/", definition: "Kho chứa đồ", icon: "📦" },
    { word: "Staircase", phonetic: "/ˈsteəkeɪs/", definition: "Cầu thang bộ", icon: "🪜" },
    { word: "Guest room", phonetic: "/ˈɡest ruːm/", definition: "Phòng khách nghỉ", icon: "🛏️" },
    { word: "Balcony", phonetic: "/ˈbælkəni/", definition: "Ban công", icon: "🌇" },
  ],
  requests: [
    { word: "Toothbrush", phonetic: "/ˈtuːθbrʌʃ/", definition: "Bàn chải đánh răng", icon: "🪥" },
    { word: "Hairdryer", phonetic: "/ˈheədraɪə/", definition: "Máy sấy tóc", icon: "💨" },
    {
      word: "Slippers",
      phonetic: "/ˈslɪpəz/",
      definition: "Dép đi trong phòng",
      icon: "🩴",
      art: "some",
    },
    { word: "Extra bed", phonetic: "/ˈekstrə bed/", definition: "Giường phụ", icon: "🛏️" },
    { word: "Water bottle", phonetic: "/ˈwɔːtə ˈbɒtl/", definition: "Chai nước", icon: "💧" },
    { word: "Bed sheet", phonetic: "/ˈbed ʃiːt/", definition: "Ga trải giường", icon: "🛏️" },
    { word: "Shampoo", phonetic: "/ʃæmˈpuː/", definition: "Dầu gội", icon: "🧴", art: "some" },
    // Slots 6 and 7 are a SUBSTITUTE PAIR: the week-9 frame runs "We have no
    // ___ today. Would you like ___?" City map/directions and balloon/ribbon
    // are substitutes; shampoo and a tissue are not, so Housekeeping shipped
    // "Do you have some shampoo?" → "I am sorry. Would you like a tissue?"
    {
      word: "Shower gel",
      phonetic: "/ˈʃaʊə dʒel/",
      definition: "Sữa tắm",
      icon: "🧴",
      art: "some",
    },
  ],
  states: [
    { word: "Clean", phonetic: "/kliːn/", definition: "Sạch", icon: "✨" },
    { word: "Tidy", phonetic: "/ˈtaɪdi/", definition: "Gọn gàng", icon: "📐" },
    // Was "Uneven", chosen for the week-10 "Careful, the floor is ___" frame.
    // An uneven floor is a building fault; a WET floor is the hazard this
    // department creates itself, several times a shift, and week 11 has the
    // learner say "We mop the floor at eight." `Wet` moves into the warning
    // slot and `Humid` takes the slot it left, where the frame is small talk
    // about the room.
    { word: "Humid", phonetic: "/ˈhjuːmɪd/", definition: "Ẩm, oi", icon: "💧" },
    { word: "Dry", phonetic: "/draɪ/", definition: "Khô", icon: "☀️" },
    { word: "Dusty", phonetic: "/ˈdʌsti/", definition: "Bụi bặm", icon: "🌫️" },
    { word: "Bright", phonetic: "/braɪt/", definition: "Sáng sủa", icon: "🍃", cmp: "brighter" },
    { word: "Soft", phonetic: "/sɒft/", definition: "Mềm", icon: "☁️" },
    { word: "Wet", phonetic: "/wet/", definition: "Ướt", icon: "💧" },
  ],
  routines: [
    { word: "Make the bed", phonetic: "/meɪk ðə ˈbed/", definition: "Dọn giường", icon: "🛏️" },
    {
      word: "Vacuum",
      phonetic: "/ˈvækjuːm/",
      definition: "Hút bụi",
      icon: "🧹",
      obj: "the carpet",
    },
    { word: "Mop", phonetic: "/mɒp/", definition: "Lau sàn", icon: "🧽", obj: "the floor" },
    { word: "Dust", phonetic: "/dʌst/", definition: "Lau bụi", icon: "🪶", obj: "the desk" },
    // "Change the linen", not bare "Change" — week 4 already teaches
    // "Change" meaning money given back, and one headword must not carry
    // two unrelated meanings for the same learner.
    {
      word: "Change the linen",
      phonetic: "/tʃeɪndʒ ðə ˈlɪnɪn/",
      definition: "Thay đồ vải",
      icon: "🔄",
    },
    {
      word: "Refill",
      phonetic: "/ˌriːˈfɪl/",
      definition: "Bổ sung đầy lại",
      icon: "🧴",
      obj: "the soap",
    },
    {
      word: "Collect",
      phonetic: "/kəˈlekt/",
      definition: "Thu gom",
      icon: "🗑️",
      obj: "the towels",
    },
    {
      word: "Check the room",
      phonetic: "/tʃek ðə ˈruːm/",
      definition: "Kiểm tra phòng",
      icon: "🔍",
    },
  ],
  phone: [
    {
      word: "Housekeeping desk",
      phonetic: "/ˈhaʊskiːpɪŋ desk/",
      definition: "Bàn trực buồng phòng",
      icon: "☎️",
    },
    { word: "Request", phonetic: "/rɪˈkwest/", definition: "Yêu cầu", icon: "🙋" },
    {
      word: "In five minutes",
      phonetic: "/ɪn faɪv ˈmɪnɪts/",
      definition: "Trong năm phút nữa",
      icon: "🕔",
    },
    // "Send up" is separable and needs its object: the week-12 frame is
    // "Let me {w} for you.", which turned it into "Let me send up for you."
    { word: "Send it up", phonetic: "/send ɪt ˈʌp/", definition: "Gửi lên phòng", icon: "⬆️" },
    { word: "Fresh linen", phonetic: "/freʃ ˈlɪnɪn/", definition: "Đồ vải sạch", icon: "🛏️" },
    // Was "Note down", a separable phrasal verb that cannot stand without its
    // object: "Can you note down for me?" is not a sentence. The pronoun form
    // is what the frame needs, and it is what `Send it up` three slots above
    // already does.
    { word: "Write it down", phonetic: "/raɪt ɪt ˈdaʊn/", definition: "Ghi lại", icon: "📝" },
    { word: "Report", phonetic: "/rɪˈpɔːt/", definition: "Báo cáo", icon: "📢" },
    {
      word: "Call housekeeping",
      phonetic: "/kɔːl ˈhaʊskiːpɪŋ/",
      definition: "Gọi bộ phận buồng phòng",
      icon: "📞",
    },
  ],
  problems: [
    { word: "Torn", phonetic: "/tɔːn/", definition: "Bị rách", icon: "📄" },
    // Was "Leaking". This slot is read by `The {items[0]} is {problems[1]}.`
    // and Housekeeping's items[0] is Towel, so the one sentence the learner
    // says to a supervisor was "The towel is leaking."
    { word: "Stained", phonetic: "/steɪnd/", definition: "Bị dây bẩn", icon: "🧺" },
    { word: "Blocked", phonetic: "/blɒkt/", definition: "Bị tắc", icon: "🚱" },
    { word: "Smelly", phonetic: "/ˈsmeli/", definition: "Có mùi hôi", icon: "👃" },
    { word: "Not working", phonetic: "/nɒt ˈwɜːkɪŋ/", definition: "Không hoạt động", icon: "⚠️" },
    { word: "Damaged", phonetic: "/ˈdæmɪdʒd/", definition: "Bị hư hại", icon: "🔨" },
    { word: "Chipped", phonetic: "/tʃɪpt/", definition: "Bị sứt mẻ", icon: "🍵" },
    {
      // Slot 7 is the SERVICE attribute — the frame is "The service is ___",
      // and the other five banks hold delayed / slow / double-booked /
      // cancelled / unanswered. "The service is out of order." is not English,
      // and it shipped on a card, in a colleague turn, in a guest line and in
      // the checkpoint audio. The word also collided with HK-37.
      word: "Delayed",
      phonetic: "/dɪˈleɪd/",
      definition: "Bị chậm trễ",
      icon: "⏳",
    },
  ],
  closing: [
    { word: "Checklist", phonetic: "/ˈtʃeklɪst/", definition: "Bảng kiểm tra", icon: "☑️" },
    { word: "Bin bag", phonetic: "/ˈbɪn bæɡ/", definition: "Túi rác", icon: "🗑️" },
    { word: "Spotless", phonetic: "/ˈspɒtləs/", definition: "Sạch bong không vết", icon: "✨" },
    { word: "Rest", phonetic: "/rest/", definition: "Giấc nghỉ ngơi", icon: "😴" },
    { word: "Fresh flowers", phonetic: "/freʃ ˈflaʊəz/", definition: "Hoa tươi", icon: "💐" },
    { word: "Welcome note", phonetic: "/ˈwelkəm nəʊt/", definition: "Thiệp chào mừng", icon: "💌" },
    { word: "Curtain", phonetic: "/ˈkɜːtn/", definition: "Rèm cửa", icon: "🪟" },
  ],
};

// ------------------------------------------------------------
// SPA & WELLNESS — the treatment room, the water, the calm.
// (Reserved for SW-19/SW-23 and avoided here: Cabana, Lifeguard,
//  Swimwear, Consultation, Allergy, Pressure, Package, Feedback.)
// ------------------------------------------------------------
const SW_BANK: P1Bank = {
  roles: [
    {
      word: "Therapist",
      phonetic: "/ˈθerəpɪst/",
      definition: "Kỹ thuật viên trị liệu",
      icon: "💆",
    },
    {
      word: "Massage therapist",
      phonetic: "/ˈmæsɑːʒ ˈθerəpɪst/",
      definition: "Kỹ thuật viên massage",
      icon: "🤲",
    },
    {
      word: "Spa receptionist",
      phonetic: "/spɑː rɪˈsepʃənɪst/",
      definition: "Lễ tân spa",
      icon: "🧾",
    },
    { word: "Trainer", phonetic: "/ˈtreɪnə/", definition: "Huấn luyện viên", icon: "🏋️" },
    {
      word: "Pool attendant",
      phonetic: "/ˈpuːl əˌtendənt/",
      definition: "Nhân viên hồ bơi",
      icon: "🏊",
    },
    { word: "Beautician", phonetic: "/bjuːˈtɪʃn/", definition: "Chuyên viên làm đẹp", icon: "💅" },
    { word: "Spa manager", phonetic: "/spɑː ˈmænɪdʒə/", definition: "Quản lý spa", icon: "📋" },
    { word: "Afternoon shift", phonetic: "/ˌɑːftəˈnuːn ʃɪft/", definition: "Ca chiều", icon: "🌇" },
  ],
  places: [
    {
      word: "Treatment room",
      phonetic: "/ˈtriːtmənt ruːm/",
      definition: "Phòng trị liệu",
      icon: "🛋️",
    },
    { word: "Sauna", phonetic: "/ˈsɔːnə/", definition: "Phòng xông hơi khô", icon: "🔥" },
    { word: "Steam room", phonetic: "/ˈstiːm ruːm/", definition: "Phòng xông hơi ướt", icon: "💨" },
    {
      word: "Changing room",
      phonetic: "/ˈtʃeɪndʒɪŋ ruːm/",
      definition: "Phòng thay đồ",
      icon: "🚪",
    },
    { word: "Swimming pool", phonetic: "/ˈswɪmɪŋ puːl/", definition: "Hồ bơi", icon: "🏊" },
    { word: "Gym", phonetic: "/dʒɪm/", definition: "Phòng tập", icon: "🏋️" },
    { word: "Shower", phonetic: "/ˈʃaʊə/", definition: "Vòi sen", icon: "🚿" },
    {
      word: "Relaxing area",
      phonetic: "/rɪˈlæksɪŋ ˈeəriə/",
      definition: "Khu thư giãn",
      icon: "🍵",
    },
  ],
  requests: [
    { word: "Bath towel", phonetic: "/ˈbɑːθ ˌtaʊəl/", definition: "Khăn tắm lớn", icon: "🧺" },
    { word: "Hair cap", phonetic: "/ˈheə kæp/", definition: "Mũ trùm tóc", icon: "🧢" },
    { word: "Blanket", phonetic: "/ˈblæŋkɪt/", definition: "Chăn đắp", icon: "🛌" },
    { word: "Sun lounger", phonetic: "/ˈsʌn ˌlaʊndʒə/", definition: "Ghế tắm nắng", icon: "🏖️" },
    { word: "Water glass", phonetic: "/ˈwɔːtə ɡlɑːs/", definition: "Ly nước", icon: "🥛" },
    {
      word: "Herbal tea",
      phonetic: "/ˈhɜːbl tiː/",
      definition: "Trà thảo mộc",
      icon: "🍵",
      art: "some",
    },
    { word: "Appointment", phonetic: "/əˈpɔɪntmənt/", definition: "Lịch hẹn", icon: "📅" },
    { word: "Music", phonetic: "/ˈmjuːzɪk/", definition: "Nhạc", icon: "🎵", art: "some" },
  ],
  states: [
    { word: "Relaxing", phonetic: "/rɪˈlæksɪŋ/", definition: "Thư giãn", icon: "😌" },
    { word: "Gentle", phonetic: "/ˈdʒentl/", definition: "Nhẹ nhàng", icon: "🕊️" },
    // Slot 4 = a mild complaint ("It is a little {w}."), slot 5 = a thing
    // being compared ("This one is {cmp}."). "Calm" made the complaint frame
    // praise the room, and "Tired" made the comparison describe a towel as
    // tired. Cool/Warm is the temperature pair a spa actually argues about.
    { word: "Cool", phonetic: "/kuːl/", definition: "Hơi lạnh", icon: "🌬️" },
    // Slot 4 feeds "It is too ___ now" / "The room is too ___ for me" —
    // a room can be too stuffy, never "too painful" (pain describes the
    // massage pressure, not the space). "Stuffy" is the real spa
    // complaint word for a warm treatment/sauna room.
    { word: "Stuffy", phonetic: "/ˈstʌfi/", definition: "Ngột ngạt, bí hơi", icon: "😖" },
    { word: "Strong", phonetic: "/strɒŋ/", definition: "Mạnh", icon: "💪" },
    { word: "Warm", phonetic: "/wɔːm/", definition: "Ấm", icon: "🔆", cmp: "warmer" },
    { word: "Deep", phonetic: "/diːp/", definition: "Sâu", icon: "🌊" },
    { word: "Slippery", phonetic: "/ˈslɪpəri/", definition: "Trơn trượt", icon: "⚠️" },
  ],
  routines: [
    {
      word: "Massage",
      phonetic: "/ˈmæsɑːʒ/",
      definition: "Xoa bóp",
      icon: "🤲",
      obj: "the shoulders",
    },
    { word: "Book", phonetic: "/bʊk/", definition: "Đặt lịch", icon: "📔", obj: "the room" },
    {
      word: "Welcome the guest",
      phonetic: "/ˈwelkəm ðə ɡest/",
      definition: "Đón khách",
      icon: "🙏",
    },
    { word: "Warm the oil", phonetic: "/wɔːm ði ˈɔɪl/", definition: "Làm ấm tinh dầu", icon: "🫗" },
    { word: "Fold", phonetic: "/fəʊld/", definition: "Gấp", icon: "🧻", obj: "the towels" },
    { word: "Light a candle", phonetic: "/laɪt ə ˈkændl/", definition: "Thắp nến", icon: "🕯️" },
    { word: "Rest", phonetic: "/rest/", definition: "Nghỉ ngơi", icon: "🛋️" },
    {
      word: "Clean the pool",
      phonetic: "/kliːn ðə ˈpuːl/",
      definition: "Vệ sinh hồ bơi",
      icon: "🏊",
    },
  ],
  phone: [
    { word: "Spa line", phonetic: "/ˈspɑː laɪn/", definition: "Đường dây spa", icon: "☎️" },
    {
      word: "Preferred time",
      phonetic: "/prɪˈfɜːd taɪm/",
      definition: "Giờ khách muốn",
      icon: "🕒",
    },
    {
      word: "In the morning",
      phonetic: "/ɪn ðə ˈmɔːnɪŋ/",
      definition: "Vào buổi sáng",
      icon: "🌅",
    },
    {
      word: "Change the time",
      phonetic: "/tʃeɪndʒ ðə ˈtaɪm/",
      definition: "Đổi giờ hẹn",
      icon: "🔄",
    },
    { word: "Massage bed", phonetic: "/ˈmæsɑːʒ bed/", definition: "Giường massage", icon: "🛋️" },
    { word: "Speak slowly", phonetic: "/spiːk ˈsləʊli/", definition: "Nói chậm lại", icon: "🗣️" },
    {
      word: "Email you",
      phonetic: "/ˈiːmeɪl juː/",
      definition: "Gửi email cho quý khách",
      icon: "📧",
    },
    // Was "Confirm". This slot is the way a guest reaches you again — the
    // other five banks hold `call us`, `call room service`, `call housekeeping`,
    // `call back` — and the frame is "Please ___ any time", which turned it
    // into "Please confirm any time, sir."
    { word: "Call the spa", phonetic: "/kɔːl ðə ˈspɑː/", definition: "Gọi cho spa", icon: "📞" },
  ],
  problems: [
    { word: "Too hot", phonetic: "/tuː ˈhɒt/", definition: "Quá nóng", icon: "🥵" },
    { word: "Too cold", phonetic: "/tuː ˈkəʊld/", definition: "Quá lạnh", icon: "🥶" },
    { word: "Noisy", phonetic: "/ˈnɔɪzi/", definition: "Ồn ào", icon: "🔊" },
    { word: "Cloudy", phonetic: "/ˈklaʊdi/", definition: "Đục (nước)", icon: "🌫️" },
    // Three slots that produced sentences the learner is LOCKED to say:
    // "It is unheated.", "Is it still overdue?", "The service is
    // double-booked." Slot 4 is a thing's fault, slot 5 a thing's fault,
    // slot 7 a service attribute — the other five banks hold plain words in
    // all three, and Spa held three administrative ones.
    { word: "Lukewarm", phonetic: "/ˌluːkˈwɔːm/", definition: "Âm ấm, không đủ nóng", icon: "🚿" },
    { word: "Late", phonetic: "/leɪt/", definition: "Trễ giờ hẹn", icon: "⏰" },
    { word: "Uncomfortable", phonetic: "/ʌnˈkʌmftəbl/", definition: "Không thoải mái", icon: "😖" },
    { word: "Interrupted", phonetic: "/ˌɪntəˈrʌptɪd/", definition: "Bị gián đoạn", icon: "⚠️" },
  ],
  closing: [
    {
      word: "Wellness card",
      phonetic: "/ˈwelnəs kɑːd/",
      definition: "Thẻ chăm sóc sức khoẻ",
      icon: "💳",
    },
    // Was `Next visit`, which rendered "Please leave the next visit here."
    { word: "Locker key", phonetic: "/ˈlɒkə kiː/", definition: "Chìa khoá tủ đồ", icon: "🔑" },
    { word: "Tidy", phonetic: "/ˈtaɪdi/", definition: "Gọn gàng", icon: "🧹" },
    { word: "Evening", phonetic: "/ˈiːvnɪŋ/", definition: "Buổi tối", icon: "🌙" },
    // Was `Warm shower`, which rendered "Please take the warm shower."
    { word: "Foot towel", phonetic: "/ˈfʊt ˌtaʊəl/", definition: "Khăn lau chân", icon: "🧻" },
    // Slot 5 is a THING the guest is handed at the end — checklist, welcome
    // note, guest book. "Quiet time" is not one, so the frame rendered "Yes,
    // madam. Your quiet time is here." and the card read "Your quiet time,
    // sir." — a fragment.
    { word: "Spa bag", phonetic: "/ˈspɑː bæɡ/", definition: "Túi đồ spa", icon: "👜" },
    // Was `Wellness tip`, which rendered "I will check the wellness tip."
    { word: "Spa menu", phonetic: "/ˈspɑː ˌmenjuː/", definition: "Bảng dịch vụ spa", icon: "📋" },
  ],
};

// ------------------------------------------------------------
// GUEST RELATIONS — the lounge, the VIP, the small kindness.
// (Reserved for GR-27/GR-34 and avoided here: Privilege, Canapés,
//  Anniversary, Occasion, Milestone, Amenity, Apologize, Resolve.)
// ------------------------------------------------------------
const GR_BANK: P1Bank = {
  roles: [
    {
      word: "Guest relations officer",
      phonetic: "/ɡest rɪˈleɪʃnz ˈɒfɪsə/",
      definition: "Nhân viên quan hệ khách hàng",
      icon: "🎀",
    },
    {
      word: "Lounge attendant",
      phonetic: "/laʊndʒ əˈtendənt/",
      definition: "Nhân viên phòng chờ",
      icon: "🛋️",
    },
    { word: "Butler", phonetic: "/ˈbʌtlə/", definition: "Quản gia riêng", icon: "🤵" },
    { word: "Driver", phonetic: "/ˈdraɪvə/", definition: "Tài xế", icon: "🚗" },
    { word: "Tour guide", phonetic: "/ˈtʊə ɡaɪd/", definition: "Hướng dẫn viên", icon: "🗺️" },
    { word: "Translator", phonetic: "/trænzˈleɪtə/", definition: "Phiên dịch viên", icon: "🗣️" },
    // Slot 6 is the person with authority — the frame sends a colleague who
    // has lost a key here ("Please ask our ___"), and the other five banks
    // hold duty manager / kitchen staff / laundry staff / spa manager /
    // general manager.
    {
      word: "Lounge manager",
      phonetic: "/ˈlaʊndʒ ˈmænɪdʒə/",
      definition: "Quản lý sảnh chờ",
      icon: "👔",
    },
    { word: "Evening shift", phonetic: "/ˈiːvnɪŋ ʃɪft/", definition: "Ca tối", icon: "🌃" },
  ],
  places: [
    { word: "Lounge", phonetic: "/laʊndʒ/", definition: "Phòng chờ hạng sang", icon: "🛋️" },
    { word: "Meeting room", phonetic: "/ˈmiːtɪŋ ruːm/", definition: "Phòng họp", icon: "🪑" },
    { word: "Garden", phonetic: "/ˈɡɑːdn/", definition: "Khu vườn", icon: "🌳" },
    { word: "Kids club", phonetic: "/ˈkɪdz klʌb/", definition: "Khu vui chơi trẻ em", icon: "🧸" },
    { word: "Library", phonetic: "/ˈlaɪbrəri/", definition: "Thư viện", icon: "📚" },
    { word: "Gift shop", phonetic: "/ˈɡɪft ʃɒp/", definition: "Cửa hàng lưu niệm", icon: "🎁" },
    { word: "Beach", phonetic: "/biːtʃ/", definition: "Bãi biển", icon: "🏖️" },
    { word: "Roof top", phonetic: "/ˈruːf tɒp/", definition: "Sân thượng", icon: "🌆" },
  ],
  requests: [
    { word: "Postcard", phonetic: "/ˈpəʊstkɑːd/", definition: "Bưu thiếp", icon: "📮" },
    // Slot 1 is what the frame BRINGS UNASKED ("brings a receipt and a
    // newspaper without being asked"); slot 4 is a thing handed over on
    // request. A wheelchair pushed at a guest who never asked for one says
    // you have decided they cannot walk. Swapped with the fruit basket.
    { word: "Fruit basket", phonetic: "/ˈfruːt ˌbɑːskɪt/", definition: "Giỏ trái cây", icon: "🧺" },
    { word: "Candle", phonetic: "/ˈkændl/", definition: "Nến", icon: "🕯️" },
    { word: "Baby cot", phonetic: "/ˈbeɪbi kɒt/", definition: "Nôi em bé", icon: "🍼" },
    { word: "Wheelchair", phonetic: "/ˈwiːltʃeə/", definition: "Xe lăn", icon: "♿" },
    {
      word: "Birthday cake",
      phonetic: "/ˈbɜːθdeɪ keɪk/",
      definition: "Bánh sinh nhật",
      icon: "🎂",
    },
    { word: "Balloon", phonetic: "/bəˈluːn/", definition: "Bóng bay", icon: "🎈" },
    // Was "Champagne", sitting in the slot the frame uses to OFFER something
    // when the first choice is out — five turns offering and promising
    // alcohol, none of them mentioning that it is charged.
    { word: "Ribbon", phonetic: "/ˈrɪbən/", definition: "Dây ruy băng", icon: "🎀" },
  ],
  states: [
    { word: "Elegant", phonetic: "/ˈelɪɡənt/", definition: "Trang nhã", icon: "🌸" },
    { word: "Special", phonetic: "/ˈspeʃl/", definition: "Đặc biệt", icon: "⭐" },
    { word: "Beautiful", phonetic: "/ˈbjuːtɪfl/", definition: "Đẹp", icon: "🌺" },
    // "Surprised" doesn't work in the week-10 "It is too ___" frame (an
    // emotion can't describe "it"); "Formal" is a real GR ambiance word
    // that still fits the same slot.
    { word: "Formal", phonetic: "/ˈfɔːml/", definition: "Trang trọng", icon: "🎩" },
    // "Upset" describes a person, and slot 4's frame is "It is a little {w}."
    // about a thing — "It is a little upset." belonged to no one.
    { word: "Plain", phonetic: "/pleɪn/", definition: "Đơn điệu, không nổi bật", icon: "▫️" },
    { word: "Important", phonetic: "/ɪmˈpɔːtnt/", definition: "Quan trọng", icon: "❗" },
    { word: "Lovely", phonetic: "/ˈlʌvli/", definition: "Đáng yêu, dễ chịu", icon: "💐" },
    { word: "Dark", phonetic: "/dɑːk/", definition: "Tối", icon: "⚠️" },
  ],
  routines: [
    {
      word: "Meet the guest",
      phonetic: "/miːt ðə ˈɡest/",
      definition: "Gặp đón khách",
      icon: "🤝",
    },
    { word: "Write a card", phonetic: "/raɪt ə ˈkɑːd/", definition: "Viết thiệp", icon: "✉️" },
    {
      word: "Arrange",
      phonetic: "/əˈreɪndʒ/",
      definition: "Sắp xếp",
      icon: "🗂️",
      obj: "the flowers",
    },
    {
      word: "Show around",
      phonetic: "/ʃəʊ əˈraʊnd/",
      definition: "Dẫn đi tham quan",
      icon: "🚶",
      obj: "our guests",
    },
    {
      word: "Remember",
      phonetic: "/rɪˈmembə/",
      definition: "Ghi nhớ",
      icon: "🧠",
      obj: "the names",
    },
    { word: "Invite", phonetic: "/ɪnˈvaɪt/", definition: "Mời", icon: "💌", obj: "guests" },
    {
      word: "Decorate",
      phonetic: "/ˈdekəreɪt/",
      definition: "Trang trí",
      icon: "🎊",
      obj: "the table",
    },
    { word: "Follow up", phonetic: "/ˌfɒləʊ ˈʌp/", definition: "Theo dõi tiếp", icon: "🔍" },
  ],
  phone: [
    { word: "Lounge desk", phonetic: "/ˈlaʊndʒ desk/", definition: "Quầy phòng chờ", icon: "☎️" },
    {
      word: "Special request",
      phonetic: "/ˈspeʃl rɪˈkwest/",
      definition: "Yêu cầu đặc biệt",
      icon: "🌟",
    },
    { word: "Before dinner", phonetic: "/bɪˈfɔː ˈdɪnə/", definition: "Trước bữa tối", icon: "🕕" },
    {
      word: "Ask the manager",
      phonetic: "/ɑːsk ðə ˈmænɪdʒə/",
      definition: "Hỏi quản lý",
      icon: "💬",
    },
    { word: "Car", phonetic: "/kɑː/", definition: "Xe ô tô đưa đón", icon: "🚗" },
    { word: "Arrange a car", phonetic: "/əˈreɪndʒ ə kɑː/", definition: "Bố trí xe", icon: "🚙" },
    { word: "Take a note", phonetic: "/teɪk ə ˈnəʊt/", definition: "Ghi chú lại", icon: "📝" },
    { word: "Call back", phonetic: "/kɔːl ˈbæk/", definition: "Gọi lại", icon: "📲" },
  ],
  problems: [
    { word: "Forgotten", phonetic: "/fəˈɡɒtn/", definition: "Bị quên", icon: "🤦" },
    { word: "Misspelled", phonetic: "/ˌmɪsˈspeld/", definition: "Bị viết sai tên", icon: "✏️" },
    { word: "Not ready", phonetic: "/nɒt ˈredi/", definition: "Chưa sẵn sàng", icon: "⏳" },
    // Same reason as F&B's "Unhappy": the frame is "It is a little {w}."
    // about a thing, and "Disappointed" describes a person.
    { word: "Wilted", phonetic: "/ˈwɪltɪd/", definition: "Bị héo (hoa)", icon: "🥀" },
    { word: "Melted", phonetic: "/ˈmeltɪd/", definition: "Bị chảy (bánh, kem)", icon: "🫠" },
    // `Rainy` moved here from index 6, where the frame is "The item is …".
    // GR-38 (storms) reviews it, so it stays a headword; `Mistimed` gave up
    // the slot because "It is mistimed today." is not a sentence anyone says.
    { word: "Rainy", phonetic: "/ˈreɪni/", definition: "Có mưa", icon: "🌧️" },
    // Was `Rainy`, the only word in six banks that made "The item is rainy."
    { word: "Crushed", phonetic: "/krʌʃt/", definition: "Bị bẹp, bị dập", icon: "📦" },
    { word: "Cancelled", phonetic: "/ˈkænsld/", definition: "Bị hủy", icon: "🚫" },
  ],
  closing: [
    { word: "Photo", phonetic: "/ˈfəʊtəʊ/", definition: "Ảnh chụp", icon: "📸" },
    // Was `Memory`, which rendered "Please leave the memory here."
    { word: "Name card", phonetic: "/ˈneɪm kɑːd/", definition: "Danh thiếp", icon: "💳" },
    { word: "Wonderful", phonetic: "/ˈwʌndəfl/", definition: "Tuyệt vời", icon: "🤩" },
    { word: "Stay", phonetic: "/steɪ/", definition: "Kỳ nghỉ", icon: "🏨" },
    {
      word: "Thank-you note",
      phonetic: "/ˈθæŋk juː nəʊt/",
      definition: "Thiệp cảm ơn",
      icon: "💌",
    },
    { word: "Guest book", phonetic: "/ˈɡest bʊk/", definition: "Sổ lưu bút", icon: "📖" },
    { word: "Souvenir", phonetic: "/ˌsuːvəˈnɪə/", definition: "Quà lưu niệm", icon: "🎎" },
  ],
};

// ------------------------------------------------------------
// BACK OFFICE — the desk, the file, the supplier.
// (Reserved for BO-37/BO-38 and avoided here: Corporate rate,
//  Allotment, Confirm, Blackout dates, Budget, Capacity, Deposit.)
// ------------------------------------------------------------
const BO_BANK: P1Bank = {
  roles: [
    { word: "Accountant", phonetic: "/əˈkaʊntənt/", definition: "Kế toán", icon: "🧮" },
    {
      // "Staff" is collective, so the week-7 frame "{Pronoun} is our {role}."
      // made it "She is our sales staff." A countable job title is what the
      // frame needs.
      word: "Sales executive",
      phonetic: "/seɪlz ɪɡˈzekjʊtɪv/",
      definition: "Nhân viên kinh doanh",
      icon: "📈",
    },
    { word: "Assistant", phonetic: "/əˈsɪstənt/", definition: "Trợ lý", icon: "🧑‍💼" },
    {
      word: "HR officer",
      phonetic: "/eɪtʃ ɑː ˈɒfɪsə/",
      definition: "Nhân viên nhân sự",
      icon: "👥",
    },
    { word: "IT staff", phonetic: "/ˌaɪ ˈtiː stɑːf/", definition: "Nhân viên tin học", icon: "💻" },
    { word: "Purchaser", phonetic: "/ˈpɜːtʃəsə/", definition: "Nhân viên thu mua", icon: "🛒" },
    {
      word: "General manager",
      phonetic: "/ˈdʒenrəl ˈmænɪdʒə/",
      definition: "Tổng giám đốc",
      icon: "🏅",
    },
    { word: "Late shift", phonetic: "/ˈleɪt ʃɪft/", definition: "Ca muộn", icon: "🕘" },
  ],
  places: [
    { word: "Office", phonetic: "/ˈɒfɪs/", definition: "Văn phòng", icon: "🏢" },
    { word: "Meeting room", phonetic: "/ˈmiːtɪŋ ruːm/", definition: "Phòng họp", icon: "🪑" },
    { word: "Store", phonetic: "/stɔː/", definition: "Kho hàng", icon: "📦" },
    {
      word: "Staff canteen",
      phonetic: "/stɑːf kænˈtiːn/",
      definition: "Căng tin nhân viên",
      icon: "🍱",
    },
    {
      word: "Locker room",
      phonetic: "/ˈlɒkə ruːm/",
      definition: "Phòng tủ đồ nhân viên",
      icon: "🔐",
    },
    { word: "Loading area", phonetic: "/ˈləʊdɪŋ ˈeəriə/", definition: "Khu nhận hàng", icon: "🚚" },
    // Week 8's "lost guest" scenario escorts someone to slots 7-8 — a
    // restricted server room / staff-only entrance is not somewhere
    // any staff member would ever lead a visitor. A sales/BO coordinator
    // showing a client around uses guest-accessible spaces instead.
    {
      word: "Business centre",
      phonetic: "/ˈbɪznəs ˈsentə/",
      definition: "Trung tâm thương vụ",
      icon: "💼",
    },
    { word: "Elevator", phonetic: "/ˈelɪveɪtə/", definition: "Thang máy", icon: "🛗" },
  ],
  requests: [
    // Slot 1 is the week-9 "guest asks for it" frame — a resort guest
    // plausibly asks Back Office for an envelope, never for a stapler
    // (which stays in slot 4, the staff-to-staff "Do you need…?" frame).
    { word: "Envelope", phonetic: "/ˈenvələʊp/", definition: "Phong bì", icon: "✉️" },
    { word: "Notebook", phonetic: "/ˈnəʊtbʊk/", definition: "Sổ tay", icon: "📓" },
    { word: "Paper", phonetic: "/ˈpeɪpə/", definition: "Giấy", icon: "📄", art: "some" },
    // Slot 3 is the thing the hotel SETS UP or SCHEDULES — wake-up call,
    // extra bed, baby cot, sun bed — answered with "I will do that now."
    // Nobody arranges a stapler.
    { word: "Extra chair", phonetic: "/ˈekstrə tʃeə/", definition: "Ghế phụ", icon: "🪑" },
    { word: "Calculator", phonetic: "/ˈkælkjuleɪtə/", definition: "Máy tính bỏ túi", icon: "🧮" },
    { word: "Charger", phonetic: "/ˈtʃɑːdʒə/", definition: "Bộ sạc", icon: "🔌" },
    { word: "Paper clip", phonetic: "/ˈpeɪpə klɪp/", definition: "Kẹp giấy", icon: "🖇️" },
    // "a uniform", not "an" — /juː/ is a consonant sound, and the by-spelling
    // default would get this one wrong.
    { word: "Stapler", phonetic: "/ˈsteɪplə/", definition: "Dập ghim", icon: "📎" },
  ],
  states: [
    { word: "Detailed", phonetic: "/ˈdiːteɪld/", definition: "Chi tiết", icon: "✔️" },
    { word: "Urgent", phonetic: "/ˈɜːdʒənt/", definition: "Gấp", icon: "🚨" },
    // "Ready" is already taught in the week-6 checkpoint for every team.
    // "Finalised" doesn't fit the week-10 weather frame ("It is very
    // ___ today") — "Cloudy" does. "Unpaid" doesn't fit "It is too ___
    // now" (an office document can't be "too unpaid"); "Complicated"
    // does and stays on-theme for back office. "Fragile" doesn't fit
    // "Careful, the floor is ___"; "Sticky" is a real office-floor
    // warning (spilled coffee in the pantry).
    { word: "Cloudy", phonetic: "/ˈklaʊdi/", definition: "Nhiều mây", icon: "☁️" },
    { word: "Complicated", phonetic: "/ˈkɒmplɪkeɪtɪd/", definition: "Phức tạp", icon: "🧩" },
    // "It is a little cheap." reads as an insult to the product, not a mild
    // reservation. Back office softens objections about DOCUMENTS.
    { word: "Unclear", phonetic: "/ʌnˈklɪə/", definition: "Chưa rõ ràng", icon: "❓" },
    { word: "Expensive", phonetic: "/ɪkˈspensɪv/", definition: "Đắt", icon: "💎" },
    { word: "Confidential", phonetic: "/ˌkɒnfɪˈdenʃl/", definition: "Bảo mật", icon: "🔐" },
    { word: "Sticky", phonetic: "/ˈstɪki/", definition: "Dính", icon: "⚠️" },
  ],
  routines: [
    {
      word: "Send an email",
      phonetic: "/send ən ˈiːmeɪl/",
      definition: "Gửi thư điện tử",
      icon: "📧",
    },
    { word: "File", phonetic: "/faɪl/", definition: "Lưu hồ sơ", icon: "🗄️", obj: "the invoice" },
    {
      word: "Count",
      phonetic: "/kaʊnt/",
      definition: "Đếm, kiểm đếm",
      icon: "🔢",
      obj: "the cash",
    },
    {
      word: "Order supplies",
      phonetic: "/ˈɔːdə səˈplaɪz/",
      definition: "Đặt mua vật tư",
      icon: "📝",
    },
    { word: "Attend a meeting", phonetic: "/əˈtend ə ˈmiːtɪŋ/", definition: "Dự họp", icon: "👥" },
    { word: "Pay", phonetic: "/peɪ/", definition: "Thanh toán", icon: "💳", obj: "the bills" },
    {
      word: "Confirm the order",
      phonetic: "/kənˈfɜːm ði ˈɔːdə/",
      definition: "Xác nhận đơn hàng",
      icon: "☑️",
    },
    { word: "Save", phonetic: "/seɪv/", definition: "Lưu lại", icon: "💾", obj: "the file" },
  ],
  phone: [
    { word: "Supplier", phonetic: "/səˈplaɪə/", definition: "Nhà cung cấp", icon: "🏭" },
    { word: "Company name", phonetic: "/ˈkʌmpəni neɪm/", definition: "Tên công ty", icon: "🏢" },
    {
      word: "In two days",
      phonetic: "/ɪn tuː ˈdeɪz/",
      definition: "Trong hai ngày nữa",
      icon: "📆",
    },
    {
      word: "Check the order",
      phonetic: "/tʃek ði ˈɔːdə/",
      definition: "Kiểm tra đơn hàng",
      icon: "📋",
    },
    { word: "Price list", phonetic: "/ˈpraɪs lɪst/", definition: "Bảng giá", icon: "📊" },
    {
      word: "Send the details",
      phonetic: "/send ðə ˈdiːteɪlz/",
      definition: "Gửi thông tin chi tiết",
      icon: "📤",
    },
    {
      word: "Reply by email",
      phonetic: "/rɪˈplaɪ baɪ ˈiːmeɪl/",
      definition: "Trả lời bằng email",
      icon: "📧",
    },
    {
      word: "Write to us",
      phonetic: "/ˈraɪt tə ʌs/",
      definition: "Viết thư cho chúng tôi",
      icon: "📮",
    },
  ],
  problems: [
    { word: "Overdue", phonetic: "/ˌəʊvəˈdjuː/", definition: "Quá hạn giao", icon: "⏰" },
    { word: "Incorrect", phonetic: "/ˌɪnkəˈrekt/", definition: "Không chính xác", icon: "🔢" },
    { word: "Unavailable", phonetic: "/ˌʌnəˈveɪləbl/", definition: "Không còn hàng", icon: "📭" },
    { word: "Offline", phonetic: "/ˌɒfˈlaɪn/", definition: "Mất kết nối", icon: "📵" },
    { word: "Frozen", phonetic: "/ˈfrəʊzn/", definition: "Bị treo (máy tính)", icon: "🐌" },
    { word: "Deleted", phonetic: "/dɪˈliːtɪd/", definition: "Bị xóa mất", icon: "🗃️" },
    { word: "Damaged", phonetic: "/ˈdæmɪdʒd/", definition: "Bị hư hỏng", icon: "⚠️" },
    { word: "Suspended", phonetic: "/səˈspendɪd/", definition: "Bị tạm ngưng", icon: "🔕" },
  ],
  closing: [
    { word: "Printout", phonetic: "/ˈprɪntaʊt/", definition: "Bản in", icon: "📄" },
    { word: "Name badge", phonetic: "/ˈneɪm bædʒ/", definition: "Thẻ tên", icon: "🪪" },
    { word: "Finalised", phonetic: "/ˈfaɪnəlaɪzd/", definition: "Đã hoàn tất", icon: "🏁" },
    { word: "Week", phonetic: "/wiːk/", definition: "Tuần", icon: "📅" },
    { word: "Summary", phonetic: "/ˈsʌməri/", definition: "Bản tóm tắt", icon: "📄" },
    { word: "Desk diary", phonetic: "/ˈdesk ˌdaɪəri/", definition: "Sổ tay để bàn", icon: "📔" },
    { word: "Handover", phonetic: "/ˈhændəʊvə/", definition: "Bàn giao ca", icon: "🔄" },
  ],
};

export const P1_BANKS: Record<string, P1Bank> = {
  FO: FO_BANK,
  FB: FB_BANK,
  HK: HK_BANK,
  SW: SW_BANK,
  GR: GR_BANK,
  BO: BO_BANK,
};
