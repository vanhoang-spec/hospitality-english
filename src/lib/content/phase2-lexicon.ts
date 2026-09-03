// ============================================================
// PHASE 2 word banks — A2.1 (weeks 15-22).
//
// Phase 1 ran at ~70% department-specific. Phase 2 pushes further:
// from here the *topics* separate completely and only the language
// FUNCTION stays shared (a service sequence, an offer, a rule, a past
// report). So the banks carry ~10 of each week's ~13 headwords.
//
// One bank per week 15-21 (10 words each) + an 8-word `wrapUp` bank for
// the week-22 checkpoint = 78 department-specific headwords each.
//
// Enforced by scripts/verify-content.ts:
//  · No word may repeat another headword the same department already
//    met in Phase 0 or Phase 1 (intra-department duplication gate).
//  · >=75% of each week's headwords must be department-specific.
//  · Sentences built from these words stay within the 12-word A2.1 cap.
// ============================================================

export type P2Word = {
  word: string;
  phonetic: string;
  definition: string;
  icon: string;
  /** Determiner this headword needs when a frame drops it into a countable
   *  noun slot. Omit for ordinary singular countables (the frame computes
   *  "a"/"an"); set "" for mass and plural nouns and for headwords that
   *  already begin with a determiner ("today's special").
   *
   *  This field exists because Vietnamese has no article system, so article
   *  omission is the canonical L1 error — and week 16 was drilling it as the
   *  CORRECT form ("Would you like upgrade, sir?") across all six banks. */
  art?: string;
};

export type P2Bank = {
  /** W15 — the named steps of this department's core service sequence.
   *  SLOT CONTRACT: every entry is a BARE VERB PHRASE ("Confirm the
   *  details", "Say goodbye warmly"), because the frames drop it straight
   *  after a subject — "First I {1}, then I {2}." and "We always {8}."
   *  The week-15 frame used to read "We always work {8}", which generated
   *  "We always work confirm the details." for four departments: a frame
   *  that supplies its own verb cannot also take one from this slot. */
  steps: P2Word[];
  /** W16 — what this department offers guests. SLOT CONTRACT:
   *   1-7  countable noun phrase; the frames supply "a"/"an" via `wa()`,
   *        so set `art: ""` on mass/plural headwords and on any headword
   *        that already starts with a determiner.
   *   8    countable noun — reads as "The {8} is free for our guests."
   *   9    ADJECTIVE — reads as "That part is {9}."
   *   10   mass or plural noun — reads as "The price includes {10}."
   *  Slots 8-10 used to hold whatever each department fancied, which is why
   *  week 16 shipped "It is bath robe for our guests.", "That part is
   *  provide." and "The price we can provides breakfast." */
  offers: P2Word[];
  /** W17 — guest details this department asks for and confirms. */
  details: P2Word[];
  /** W18 — paperwork and payment items it handles. */
  paperwork: P2Word[];
  /** W19 — house rules and safety items it must state. */
  rules: P2Word[];
  /** W20 — the options it presents when a guest must choose. */
  choices: P2Word[];
  /** W21 — vocabulary for reporting completed work in the past tense. */
  reports: P2Word[];
  /** W22 — checkpoint wrap-up words. */
  wrapUp: P2Word[];
};

const FO_BANK: P2Bank = {
  steps: [
    {
      word: "Greet the guest",
      phonetic: "/ɡriːt ðə ɡest/",
      definition: "Chào đón khách",
      icon: "🛬",
    },
    {
      word: "Check the profile",
      phonetic: "/tʃek ðə ˈprəʊfaɪl/",
      definition: "Kiểm tra hồ sơ khách",
      icon: "📇",
    },
    {
      word: "Allocate the room",
      phonetic: "/ˈæləkeɪt ðə ruːm/",
      definition: "Phân phòng",
      icon: "🗂️",
    },
    {
      word: "Offer a welcome drink",
      phonetic: "/ˈɒfə ə ˈwelkəm drɪŋk/",
      definition: "Mời nước chào mừng",
      icon: "🥤",
    },
    {
      word: "Escort the guest",
      phonetic: "/ɪˈskɔːt ðə ɡest/",
      definition: "Dẫn khách lên phòng",
      icon: "🚶",
    },
    {
      word: "Show the room",
      phonetic: "/ʃəʊ ðə ruːm/",
      definition: "Giới thiệu phòng",
      icon: "🔎",
    },
    {
      word: "Follow the steps",
      phonetic: "/ˈfɒləʊ ðə steps/",
      definition: "Làm theo các bước",
      icon: "🪜",
    },
    {
      word: "Confirm the details",
      phonetic: "/kənˈfɜːm ðə ˈdiːteɪlz/",
      definition: "Xác nhận thông tin",
      icon: "🔢",
    },
    { word: "Handover", phonetic: "/ˈhændəʊvə/", definition: "Bàn giao", icon: "🤝" },
    {
      word: "Checklist item",
      phonetic: "/ˈtʃeklɪst ˈaɪtəm/",
      definition: "Mục trong bảng kiểm",
      icon: "☑️",
    },
  ],
  offers: [
    { word: "Upgrade", phonetic: "/ˈʌpɡreɪd/", definition: "Nâng hạng phòng", icon: "⬆️" },
    { word: "Higher floor", phonetic: "/ˈhaɪə flɔː/", definition: "Tầng cao hơn", icon: "🏢" },
    { word: "Sea view", phonetic: "/siː vjuː/", definition: "Hướng nhìn ra biển", icon: "🌊" },
    {
      word: "Connecting room",
      phonetic: "/kəˈnektɪŋ ruːm/",
      definition: "Phòng thông nhau",
      icon: "🚪",
    },
    {
      word: "Airport pick-up",
      phonetic: "/ˈeəpɔːt ˈpɪk ʌp/",
      definition: "Đón sân bay",
      icon: "🚐",
    },
    {
      word: "Baggage storage",
      phonetic: "/ˈbæɡɪdʒ ˈstɔːrɪdʒ/",
      definition: "Gửi hành lý",
      icon: "🧳",
      art: "",
    },
    {
      word: "Newspaper delivery",
      phonetic: "/ˈnjuːzpeɪpə dɪˈlɪvəri/",
      definition: "Giao báo tận phòng",
      icon: "📰",
      art: "",
    },
    // 8 = countable noun ("The welcome drink is free for our guests.")
    {
      word: "Welcome drink",
      phonetic: "/ˈwelkəm drɪŋk/",
      definition: "Nước chào mừng",
      icon: "🥤",
    },
    // 9 = adjective ("That part is optional.")
    { word: "Optional", phonetic: "/ˈɒpʃənl/", definition: "Tùy chọn, không bắt buộc", icon: "🔘" },
    // 10 = mass/plural noun ("The price includes all taxes.")
    { word: "All taxes", phonetic: "/ɔːl ˈtæksɪz/", definition: "Toàn bộ thuế phí", icon: "🧾" },
  ],
  details: [
    { word: "Full name", phonetic: "/fʊl neɪm/", definition: "Họ tên đầy đủ", icon: "🪪" },
    { word: "Nationality", phonetic: "/ˌnæʃəˈnæləti/", definition: "Quốc tịch", icon: "🌏" },
    { word: "Date of birth", phonetic: "/deɪt əv bɜːθ/", definition: "Ngày sinh", icon: "🎂" },
    {
      word: "Contact number",
      phonetic: "/ˈkɒntækt ˈnʌmbə/",
      definition: "Số liên lạc",
      icon: "📱",
    },
    {
      word: "Length of stay",
      phonetic: "/leŋθ əv steɪ/",
      definition: "Số đêm lưu trú",
      icon: "🌙",
    },
    { word: "Spelling", phonetic: "/ˈspelɪŋ/", definition: "Cách viết chính tả", icon: "🔤" },
    { word: "Home address", phonetic: "/həʊm əˈdres/", definition: "Địa chỉ nhà", icon: "✏️" },
    {
      word: "Passport number",
      phonetic: "/ˈpɑːspɔːt ˈnʌmbə/",
      definition: "Số hộ chiếu",
      icon: "🔍",
    },
    { word: "Arrival time", phonetic: "/əˈraɪvl taɪm/", definition: "Giờ đến", icon: "🎯" },
    { word: "Detail", phonetic: "/ˈdiːteɪl/", definition: "Chi tiết thông tin", icon: "📋" },
  ],
  paperwork: [
    {
      word: "Registration card",
      phonetic: "/ˌredʒɪˈstreɪʃn kɑːd/",
      definition: "Phiếu đăng ký lưu trú",
      icon: "📝",
    },
    {
      word: "Invoice address",
      phonetic: "/ˈɪnvɔɪs əˈdres/",
      definition: "Địa chỉ xuất hóa đơn",
      icon: "🏠",
    },
    { word: "Company name", phonetic: "/ˈkʌmpəni neɪm/", definition: "Tên công ty", icon: "🏢" },
    { word: "Tax code", phonetic: "/tæks kəʊd/", definition: "Mã số thuế", icon: "🔢" },
    { word: "Service charge", phonetic: "/ˈsɜːvɪs tʃɑːdʒ/", definition: "Phí phục vụ", icon: "💼" },
    { word: "Currency", phonetic: "/ˈkʌrənsi/", definition: "Loại tiền tệ", icon: "💱" },
    { word: "Exchange rate", phonetic: "/ɪksˈtʃeɪndʒ reɪt/", definition: "Tỷ giá", icon: "📈" },
    {
      word: "Settle the bill",
      phonetic: "/ˈsetl ðə bɪl/",
      definition: "Thanh toán hóa đơn",
      icon: "✅",
    },
    { word: "In order", phonetic: "/ɪn ˈɔːdə/", definition: "Đúng thủ tục, hợp lệ", icon: "👌" },
    {
      word: "Copy the form",
      phonetic: "/ˈkɒpi ðə fɔːm/",
      definition: "Sao lại tờ khai",
      icon: "🖨️",
    },
  ],
  rules: [
    {
      word: "Quiet hours",
      phonetic: "/ˈkwaɪət ˈaʊəz/",
      definition: "Giờ giữ yên tĩnh",
      icon: "🤫",
    },
    {
      word: "Visitor policy",
      phonetic: "/ˈvɪzɪtə ˈpɒləsi/",
      definition: "Quy định khách thăm",
      icon: "👥",
    },
    {
      word: "Smoking area",
      phonetic: "/ˈsməʊkɪŋ ˈeəriə/",
      definition: "Khu vực hút thuốc",
      icon: "🚬",
    },
    {
      word: "Emergency exit",
      phonetic: "/ɪˈmɜːdʒənsi ˈeksɪt/",
      definition: "Lối thoát hiểm",
      icon: "🚨",
    },
    { word: "Fire alarm", phonetic: "/ˈfaɪə əˈlɑːm/", definition: "Chuông báo cháy", icon: "🔔" },
    { word: "Valuables", phonetic: "/ˈvæljuəblz/", definition: "Đồ có giá trị", icon: "💎" },
    { word: "Safety box", phonetic: "/ˈseɪfti bɒks/", definition: "Két an toàn", icon: "🔐" },
    { word: "Not allowed", phonetic: "/nɒt əˈlaʊd/", definition: "Không được phép", icon: "🚫" },
    {
      word: "Registration rule",
      phonetic: "/ˌredʒɪˈstreɪʃn ruːl/",
      definition: "Quy định khai báo lưu trú",
      icon: "📋",
    },
    { word: "Regulation", phonetic: "/ˌreɡjuˈleɪʃn/", definition: "Quy định", icon: "📜" },
  ],
  choices: [
    { word: "Twin bed", phonetic: "/twɪn bed/", definition: "Hai giường đơn", icon: "🛏️" },
    { word: "Double bed", phonetic: "/ˈdʌbl bed/", definition: "Giường đôi", icon: "🛌" },
    { word: "City view", phonetic: "/ˈsɪti vjuː/", definition: "Hướng nhìn thành phố", icon: "🌆" },
    {
      word: "Non-smoking room",
      phonetic: "/nɒn ˈsməʊkɪŋ ruːm/",
      definition: "Phòng không hút thuốc",
      icon: "🚭",
    },
    { word: "Corner room", phonetic: "/ˈkɔːnə ruːm/", definition: "Phòng góc", icon: "❤️" },
    { word: "Quiet room", phonetic: "/ˈkwaɪət ruːm/", definition: "Phòng yên tĩnh", icon: "🔄" },
    { word: "Either one", phonetic: "/ˈaɪðə wʌn/", definition: "Cái nào cũng được", icon: "🤷" },
    { word: "Best option", phonetic: "/best ˈɒpʃn/", definition: "Phương án tốt nhất", icon: "👍" },
    { word: "Ground floor", phonetic: "/ɡraʊnd flɔː/", definition: "Tầng trệt", icon: "🔇" },
    // Slot 9 is what the staff member actually recommends ("I would suggest
    // the {w}, because it is popular."), so a word meaning "a choice" made
    // the recommendation circular: "I would suggest the option."
    { word: "High floor", phonetic: "/haɪ flɔː/", definition: "Tầng cao", icon: "🏙️" },
  ],
  reports: [
    { word: "Confirmed", phonetic: "/kənˈfɜːmd/", definition: "Đã xác nhận", icon: "✅" },
    { word: "Checked in", phonetic: "/tʃekt ɪn/", definition: "Đã nhận phòng", icon: "📥" },
    { word: "Called", phonetic: "/kɔːld/", definition: "Đã gọi", icon: "📞" },
    { word: "Informed", phonetic: "/ɪnˈfɔːmd/", definition: "Đã báo cho biết", icon: "📢" },
    { word: "The front desk", phonetic: "/ðə frʌnt desk/", definition: "Quầy lễ tân", icon: "🛎️" },
    { word: "Arrivals", phonetic: "/əˈraɪvlz/", definition: "Lượt khách đến", icon: "🛬" },
    {
      word: "Started later",
      phonetic: "/ˈstɑːtɪd ˈleɪtə/",
      definition: "Bắt đầu muộn hơn",
      icon: "⏰",
    },
    { word: "Changed", phonetic: "/tʃeɪndʒd/", definition: "Đã đổi cái khác", icon: "🔧" },
    { word: "Calm", phonetic: "/kɑːm/", definition: "Yên ắng, không sự cố", icon: "😌" },
    { word: "Noted", phonetic: "/ˈnəʊtɪd/", definition: "Đã ghi nhận", icon: "🗒️" },
  ],
  wrapUp: [
    { word: "Smooth", phonetic: "/smuːð/", definition: "Trôi chảy, suôn sẻ", icon: "🌊" },
    { word: "On time", phonetic: "/ɒn taɪm/", definition: "Đúng giờ", icon: "⏰" },
    {
      word: "Service level",
      phonetic: "/ˈsɜːvɪs ˈlevl/",
      definition: "Mức độ phục vụ",
      icon: "📏",
    },
    { word: "Do better", phonetic: "/duː ˈbetə/", definition: "Làm tốt hơn", icon: "📈" },
    {
      word: "Guest comment",
      phonetic: "/ɡest ˈkɒment/",
      definition: "Nhận xét của khách",
      icon: "💬",
    },
    { word: "Well handled", phonetic: "/wel ˈhændld/", definition: "Xử lý tốt", icon: "👏" },
    { word: "Next shift", phonetic: "/nekst ʃɪft/", definition: "Ca kế tiếp", icon: "🔁" },
    { word: "Review", phonetic: "/rɪˈvjuː/", definition: "Điểm lại, xem lại", icon: "📋" },
    { word: "Log book", phonetic: "/lɒɡ bʊk/", definition: "Sổ nhật ký ca", icon: "📓" },
    {
      word: "Guest satisfied",
      phonetic: "/ɡest ˈsætɪsfaɪd/",
      definition: "Khách hài lòng",
      icon: "😊",
    },
  ],
};

const FB_BANK: P2Bank = {
  steps: [
    {
      word: "Seat the guest",
      phonetic: "/siːt ðə ɡest/",
      definition: "Xếp chỗ cho khách",
      icon: "🪑",
    },
    {
      word: "Present the menu",
      phonetic: "/prɪˈzent ðə ˈmenjuː/",
      definition: "Đưa thực đơn",
      icon: "📖",
    },
    { word: "Take the order", phonetic: "/teɪk ði ˈɔːdə/", definition: "Ghi món", icon: "📝" },
    {
      word: "Repeat the order",
      phonetic: "/rɪˈpiːt ði ˈɔːdə/",
      definition: "Nhắc lại món đã gọi",
      icon: "🔁",
    },
    {
      word: "Send to kitchen",
      phonetic: "/send tə ˈkɪtʃɪn/",
      definition: "Chuyển bếp",
      icon: "🍳",
    },
    {
      word: "Serve the starter",
      phonetic: "/sɜːv ðə ˈstɑːtə/",
      definition: "Phục vụ món khai vị",
      icon: "🥗",
    },
    { word: "Clear the plates", phonetic: "/klɪə ðə pleɪts/", definition: "Dọn đĩa", icon: "🍽️" },
    {
      word: "Offer dessert",
      phonetic: "/ˈɒfə dɪˈzɜːt/",
      definition: "Mời món tráng miệng",
      icon: "🍰",
    },
    { word: "Sequence", phonetic: "/ˈsiːkwəns/", definition: "Trình tự", icon: "🔢" },
    { word: "Course", phonetic: "/kɔːs/", definition: "Món trong bữa", icon: "🍲" },
  ],
  offers: [
    { word: "Starter", phonetic: "/ˈstɑːtə/", definition: "Món khai vị", icon: "🥗" },
    { word: "Main course", phonetic: "/meɪn kɔːs/", definition: "Món chính", icon: "🍛" },
    { word: "Side dish", phonetic: "/saɪd dɪʃ/", definition: "Món ăn kèm", icon: "🥔" },
    { word: "Soft drink", phonetic: "/sɒft drɪŋk/", definition: "Nước ngọt", icon: "🥤" },
    { word: "Fresh juice", phonetic: "/freʃ dʒuːs/", definition: "Nước ép tươi", icon: "🍊" },
    { word: "Set lunch", phonetic: "/set lʌntʃ/", definition: "Suất trưa cố định", icon: "🍱" },
    // already carries its own determiner ("today's")
    {
      word: "Today's special",
      phonetic: "/təˈdeɪz ˈspeʃl/",
      definition: "Món đặc biệt hôm nay",
      icon: "⭐",
      art: "",
    },
    // 8 = countable noun
    {
      word: "Second helping",
      phonetic: "/ˈsekənd ˈhelpɪŋ/",
      definition: "Phần thứ hai",
      icon: "➕",
    },
    // 9 = adjective
    { word: "Unlimited", phonetic: "/ʌnˈlɪmɪtɪd/", definition: "Không giới hạn", icon: "♾️" },
    // 10 = mass/plural noun
    {
      word: "Table service",
      phonetic: "/ˈteɪbl ˈsɜːvɪs/",
      definition: "Phục vụ tại bàn",
      icon: "🍴",
    },
  ],
  details: [
    { word: "Table number", phonetic: "/ˈteɪbl ˈnʌmbə/", definition: "Số bàn", icon: "🔢" },
    {
      word: "Number of guests",
      phonetic: "/ˈnʌmbə əv ɡests/",
      definition: "Số lượng khách",
      icon: "👥",
    },
    {
      word: "Dietary need",
      phonetic: "/ˈdaɪətəri niːd/",
      definition: "Nhu cầu ăn kiêng",
      icon: "🥦",
    },
    {
      word: "Meat preference",
      phonetic: "/miːt ˈprefrəns/",
      definition: "Loại thịt ưa dùng",
      icon: "🚫",
    },
    { word: "Nut allergy", phonetic: "/nʌt ˈælədʒi/", definition: "Dị ứng hạt", icon: "🥜" },
    { word: "Sugar level", phonetic: "/ˈʃʊɡə ˈlevl/", definition: "Mức đường", icon: "🍬" },
    { word: "Cooking level", phonetic: "/ˈkʊkɪŋ ˈlevl/", definition: "Mức độ chín", icon: "🥩" },
    {
      word: "Order detail",
      phonetic: "/ˈɔːdə ˈdiːteɪl/",
      definition: "Chi tiết món gọi",
      icon: "✅",
    },
    { word: "Drink choice", phonetic: "/drɪŋk tʃɔɪs/", definition: "Lựa chọn đồ uống", icon: "🥂" },
    {
      word: "Final order",
      phonetic: "/ˈfaɪnl ˈɔːdə/",
      definition: "Đơn gọi cuối cùng",
      icon: "🏁",
    },
  ],
  paperwork: [
    { word: "Order slip", phonetic: "/ˈɔːdə slɪp/", definition: "Phiếu gọi món", icon: "🧾" },
    { word: "Signature", phonetic: "/ˈsɪɡnətʃə/", definition: "Chữ ký", icon: "✒️" },
    {
      word: "Charge to room",
      phonetic: "/tʃɑːdʒ tə ruːm/",
      definition: "Tính vào phòng",
      icon: "🏨",
    },
    { word: "Sign here", phonetic: "/saɪn hɪə/", definition: "Ký vào đây", icon: "✍️" },
    { word: "VAT", phonetic: "/ˌviː eɪ ˈtiː/", definition: "Thuế giá trị gia tăng", icon: "🧮" },
    { word: "Discount", phonetic: "/ˈdɪskaʊnt/", definition: "Giảm giá", icon: "🏷️" },
    { word: "Member card", phonetic: "/ˈmembə kɑːd/", definition: "Thẻ thành viên", icon: "💳" },
    {
      word: "Pay by card",
      phonetic: "/peɪ baɪ kɑːd/",
      definition: "Thanh toán bằng thẻ",
      icon: "🏧",
    },
    { word: "On hold", phonetic: "/ɒn həʊld/", definition: "Đang tạm giữ, chờ xử lý", icon: "⏸️" },
    { word: "Print the bill", phonetic: "/prɪnt ðə bɪl/", definition: "In hóa đơn", icon: "🖨️" },
  ],
  rules: [
    { word: "Dress code", phonetic: "/dres kəʊd/", definition: "Quy định trang phục", icon: "👔" },
    { word: "Hot plate", phonetic: "/hɒt pleɪt/", definition: "Đĩa nóng", icon: "🔥" },
    { word: "Wet floor", phonetic: "/wet flɔː/", definition: "Sàn ướt", icon: "⚠️" },
    { word: "Raw food", phonetic: "/rɔː fuːd/", definition: "Thức ăn sống", icon: "🍣" },
    {
      word: "Food safety",
      phonetic: "/fuːd ˈseɪfti/",
      definition: "An toàn thực phẩm",
      icon: "🛡️",
    },
    { word: "Handbag", phonetic: "/ˈhændbæɡ/", definition: "Túi xách của khách", icon: "👜" },
    { word: "Buffet rule", phonetic: "/ˈbʊfeɪ ruːl/", definition: "Nội quy buffet", icon: "📜" },
    {
      word: "Take away food",
      phonetic: "/teɪk əˈweɪ fuːd/",
      definition: "Mang thức ăn ra ngoài",
      icon: "🥡",
    },
    {
      word: "Last order time",
      phonetic: "/lɑːst ˈɔːdə taɪm/",
      definition: "Giờ nhận gọi món cuối",
      icon: "🕙",
    },
    {
      word: "Hygiene rule",
      phonetic: "/ˈhaɪdʒiːn ruːl/",
      definition: "Quy định vệ sinh",
      icon: "📏",
    },
  ],
  choices: [
    { word: "Chicken or beef", phonetic: "/ˈtʃɪkɪn ɔː biːf/", definition: "Gà hay bò", icon: "🍗" },
    {
      word: "Rice or noodles",
      phonetic: "/raɪs ɔː ˈnuːdlz/",
      definition: "Cơm hay mì",
      icon: "🍜",
    },
    {
      word: "Still or sparkling",
      phonetic: "/stɪl ɔː ˈspɑːklɪŋ/",
      definition: "Nước thường hay có ga",
      icon: "💧",
    },
    {
      word: "Indoor or outdoor",
      phonetic: "/ˈɪndɔː ɔː ˈaʊtdɔː/",
      definition: "Trong nhà hay ngoài trời",
      icon: "🌤️",
    },
    { word: "Mild flavour", phonetic: "/maɪld ˈfleɪvə/", definition: "Vị nhẹ", icon: "🌱" },
    {
      word: "Popular dish",
      phonetic: "/ˈpɒpjələ dɪʃ/",
      definition: "Món được ưa chuộng",
      icon: "🌟",
    },
    { word: "Light meal", phonetic: "/laɪt miːl/", definition: "Bữa nhẹ", icon: "🥗" },
    {
      word: "Sharing plate",
      phonetic: "/ˈʃeərɪŋ pleɪt/",
      definition: "Món dùng chung",
      icon: "🍲",
    },
    {
      word: "Chef suggestion",
      phonetic: "/ʃef səˈdʒestʃən/",
      definition: "Gợi ý của bếp trưởng",
      icon: "💡",
    },
    { word: "Favourite", phonetic: "/ˈfeɪvərɪt/", definition: "Món ưa thích", icon: "❤️" },
  ],
  reports: [
    { word: "Served", phonetic: "/sɜːvd/", definition: "Đã phục vụ", icon: "🍽️" },
    { word: "Ordered", phonetic: "/ˈɔːdəd/", definition: "Đã gọi món", icon: "📝" },
    { word: "Prepared", phonetic: "/prɪˈpeəd/", definition: "Đã chuẩn bị", icon: "⚙️" },
    { word: "Told", phonetic: "/təʊld/", definition: "Đã báo cho biết", icon: "🗣️" },
    { word: "The restaurant", phonetic: "/ðə ˈrestrɒnt/", definition: "Nhà hàng", icon: "🍽️" },
    { word: "Covers", phonetic: "/ˈkʌvəz/", definition: "Lượt khách phục vụ", icon: "🔢" },
    {
      word: "Finished later",
      phonetic: "/ˈfɪnɪʃt ˈleɪtə/",
      definition: "Kết thúc muộn hơn",
      icon: "⏰",
    },
    { word: "Returned", phonetic: "/rɪˈtɜːnd/", definition: "Đã trả lại", icon: "↩️" },
    { word: "Correct", phonetic: "/kəˈrekt/", definition: "Chính xác, đúng", icon: "✔️" },
    { word: "Wrote", phonetic: "/rəʊt/", definition: "Đã ghi chép lại", icon: "✍️" },
  ],
  wrapUp: [
    { word: "Excellent", phonetic: "/ˈeksələnt/", definition: "Xuất sắc", icon: "🌟" },
    {
      word: "Without delay",
      phonetic: "/wɪˈðaʊt dɪˈleɪ/",
      definition: "Không chậm trễ",
      icon: "🤝",
    },
    { word: "Praise", phonetic: "/preɪz/", definition: "Lời khen ngợi", icon: "👏" },
    {
      word: "Serve faster",
      phonetic: "/sɜːv ˈfɑːstə/",
      definition: "Phục vụ nhanh hơn",
      icon: "⚡",
    },
    { word: "Stock", phonetic: "/stɒk/", definition: "Hàng tồn", icon: "📦" },
    {
      word: "Well managed",
      phonetic: "/wel ˈmænɪdʒd/",
      definition: "Được điều phối tốt",
      icon: "🔄",
    },
    {
      word: "Menu update",
      phonetic: "/ˈmenjuː ʌpˈdeɪt/",
      definition: "Cập nhật thực đơn",
      icon: "📋",
    },
    { word: "Review", phonetic: "/rɪˈvjuː/", definition: "Rà soát lại", icon: "🔢" },
    {
      word: "Clean station",
      phonetic: "/kliːn ˈsteɪʃn/",
      definition: "Quầy đã dọn sạch",
      icon: "✨",
    },
    { word: "Shift end", phonetic: "/ʃɪft end/", definition: "Kết thúc ca", icon: "🏁" },
  ],
};

const HK_BANK: P2Bank = {
  steps: [
    { word: "Enter the room", phonetic: "/ˈentə ðə ruːm/", definition: "Vào phòng", icon: "🚪" },
    {
      word: "Open the curtains",
      phonetic: "/ˈəʊpən ðə ˈkɜːtnz/",
      definition: "Mở rèm",
      icon: "🪟",
    },
    { word: "Strip the bed", phonetic: "/strɪp ðə bed/", definition: "Tháo ga giường", icon: "🛏️" },
    {
      word: "Wipe the surfaces",
      phonetic: "/waɪp ðə ˈsɜːfɪsɪz/",
      definition: "Lau bề mặt",
      icon: "🧽",
    },
    { word: "Restock", phonetic: "/ˌriːˈstɒk/", definition: "Bổ sung vật dụng", icon: "🧴" },
    {
      word: "Check everything",
      phonetic: "/tʃek ˈevriθɪŋ/",
      definition: "Kiểm tra toàn bộ",
      icon: "🔍",
    },
    { word: "Close the door", phonetic: "/kləʊz ðə dɔː/", definition: "Đóng cửa", icon: "🚪" },
    {
      word: "Update the status",
      phonetic: "/ʌpˈdeɪt ðə ˈsteɪtəs/",
      definition: "Cập nhật trạng thái phòng",
      icon: "🚦",
    },
    {
      word: "Room routine",
      phonetic: "/ruːm ruːˈtiːn/",
      definition: "Quy trình phòng",
      icon: "🪜",
    },
    { word: "Priority", phonetic: "/praɪˈɒrəti/", definition: "Ưu tiên", icon: "❗" },
  ],
  offers: [
    {
      word: "Turndown service",
      phonetic: "/ˈtɜːndaʊn ˈsɜːvɪs/",
      definition: "Dịch vụ chỉnh giường buổi tối",
      icon: "🌙",
      art: "",
    },
    { word: "Baby cot", phonetic: "/ˈbeɪbi kɒt/", definition: "Nôi em bé", icon: "🍼" },
    { word: "Extra hanger", phonetic: "/ˈekstrə ˈhæŋə/", definition: "Móc treo thêm", icon: "🧥" },
    {
      word: "Shoe polish",
      phonetic: "/ʃuː ˈpɒlɪʃ/",
      definition: "Xi đánh giày",
      icon: "👞",
      art: "",
    },
    { word: "Sewing kit", phonetic: "/ˈsəʊɪŋ kɪt/", definition: "Bộ kim chỉ", icon: "🧵" },
    { word: "Pillow menu", phonetic: "/ˈpɪləʊ ˈmenjuː/", definition: "Danh mục gối", icon: "🛌" },
    { word: "Air freshener", phonetic: "/eə ˈfreʃnə/", definition: "Xịt thơm phòng", icon: "🌸" },
    // 8 = countable noun
    { word: "Bath robe", phonetic: "/bɑːθ rəʊb/", definition: "Áo choàng tắm", icon: "🥼" },
    // 9 = adjective
    {
      word: "On request",
      phonetic: "/ɒn rɪˈkwest/",
      definition: "Có khi khách yêu cầu",
      icon: "🔔",
    },
    // 10 = mass/plural noun
    {
      word: "Daily housekeeping",
      phonetic: "/ˈdeɪli ˈhaʊskiːpɪŋ/",
      definition: "Dọn phòng hằng ngày",
      icon: "🧹",
    },
  ],
  details: [
    { word: "Cleaning time", phonetic: "/ˈkliːnɪŋ taɪm/", definition: "Giờ dọn phòng", icon: "🕐" },
    {
      word: "Preferred time",
      phonetic: "/prɪˈfɜːd taɪm/",
      definition: "Giờ khách muốn",
      icon: "⏰",
    },
    {
      word: "Number of nights",
      phonetic: "/ˈnʌmbə əv naɪts/",
      definition: "Số đêm lưu trú",
      icon: "🌙",
    },
    { word: "Dust allergy", phonetic: "/dʌst ˈælədʒi/", definition: "Dị ứng bụi", icon: "🤧" },
    {
      word: "Pillow firmness",
      phonetic: "/ˈpɪləʊ ˈfɜːmnəs/",
      definition: "Độ cứng của gối",
      icon: "🛏️",
    },
    { word: "Room note", phonetic: "/ruːm nəʊt/", definition: "Ghi chú phòng", icon: "🗒️" },
    { word: "Service note", phonetic: "/ˈsɜːvɪs nəʊt/", definition: "Ghi chú dịch vụ", icon: "✅" },
    { word: "Special note", phonetic: "/ˈspeʃl nəʊt/", definition: "Ghi chú đặc biệt", icon: "🗒️" },
    {
      word: "Guest instruction",
      phonetic: "/ɡest ɪnˈstrʌkʃn/",
      definition: "Dặn dò của khách",
      icon: "💡",
    },
    {
      word: "Cleaning note",
      phonetic: "/ˈkliːnɪŋ nəʊt/",
      definition: "Ghi chú dọn phòng",
      icon: "✏️",
    },
  ],
  paperwork: [
    { word: "Room list", phonetic: "/ruːm lɪst/", definition: "Danh sách phòng", icon: "📋" },
    {
      word: "Cleaning record",
      phonetic: "/ˈkliːnɪŋ ˈrekɔːd/",
      definition: "Sổ ghi dọn phòng",
      icon: "📒",
    },
    {
      word: "Minibar list",
      phonetic: "/ˈmɪnibɑː lɪst/",
      definition: "Bảng kê minibar",
      icon: "🍫",
    },
    { word: "Consumed", phonetic: "/kənˈsjuːmd/", definition: "Đã sử dụng", icon: "🍹" },
    {
      word: "Cleaning charge",
      phonetic: "/ˈkliːnɪŋ tʃɑːdʒ/",
      definition: "Phí vệ sinh",
      icon: "💸",
    },
    {
      word: "Maintenance form",
      phonetic: "/ˈmeɪntənəns fɔːm/",
      definition: "Phiếu báo sửa chữa",
      icon: "🔧",
    },
    {
      word: "Lost property",
      phonetic: "/lɒst ˈprɒpəti/",
      definition: "Đồ khách bỏ quên",
      icon: "🎒",
    },
    {
      word: "Hand in the key",
      phonetic: "/hænd ɪn ðə kiː/",
      definition: "Nộp lại chìa khoá",
      icon: "🤲",
    },
    { word: "In progress", phonetic: "/ɪn ˈprəʊɡres/", definition: "Đang xử lý", icon: "🕓" },
    { word: "Sign the sheet", phonetic: "/saɪn ðə ʃiːt/", definition: "Ký vào bảng", icon: "✍️" },
  ],
  rules: [
    { word: "Chemical", phonetic: "/ˈkemɪkl/", definition: "Hóa chất tẩy rửa", icon: "🧪" },
    {
      word: "Glove policy",
      phonetic: "/ɡlʌv ˈpɒləsi/",
      definition: "Quy định dùng găng tay",
      icon: "🧤",
    },
    {
      word: "Wet floor sign",
      phonetic: "/wet flɔː saɪn/",
      definition: "Biển báo sàn ướt",
      icon: "⚠️",
    },
    {
      word: "Do not mix",
      phonetic: "/duː nɒt mɪks/",
      definition: "Không được pha trộn",
      icon: "🚫",
    },
    { word: "Heavy item", phonetic: "/ˈhevi ˈaɪtəm/", definition: "Vật nặng", icon: "🏋️" },
    { word: "Jewellery", phonetic: "/ˈdʒuːəlri/", definition: "Đồ trang sức", icon: "💍" },
    {
      word: "Guest privacy",
      phonetic: "/ɡest ˈprɪvəsi/",
      definition: "Riêng tư của khách",
      icon: "🔐",
    },
    {
      word: "Never touch",
      phonetic: "/ˈnevə tʌtʃ/",
      definition: "Tuyệt đối không chạm",
      icon: "✋",
    },
    {
      word: "Reporting rule",
      phonetic: "/rɪˈpɔːtɪŋ ruːl/",
      definition: "Quy định báo cáo sự cố",
      icon: "📢",
    },
    { word: "Requirement", phonetic: "/rɪˈkwaɪəmənt/", definition: "Yêu cầu bắt buộc", icon: "❗" },
  ],
  choices: [
    {
      word: "Cleaning time slot",
      phonetic: "/ˈkliːnɪŋ taɪm slɒt/",
      definition: "Khung giờ dọn phòng",
      icon: "🕐",
    },
    { word: "Fresh sheets", phonetic: "/freʃ ʃiːts/", definition: "Ga giường mới", icon: "🛏️" },
    {
      word: "Reused towels",
      phonetic: "/riːˈjuːzd ˈtaʊəlz/",
      definition: "Khăn dùng lại",
      icon: "♻️",
    },
    { word: "Feather pillow", phonetic: "/ˈfeðə ˈpɪləʊ/", definition: "Gối lông vũ", icon: "🪶" },
    { word: "Foam pillow", phonetic: "/fəʊm ˈpɪləʊ/", definition: "Gối cao su non", icon: "🛌" },
    {
      word: "Extra blankets",
      phonetic: "/ˈekstrə ˈblæŋkɪts/",
      definition: "Chăn bổ sung",
      icon: "🧣",
    },
    {
      word: "Guest preference",
      phonetic: "/ɡest ˈprefrəns/",
      definition: "Sở thích của khách",
      icon: "💚",
    },
    // Slot 7 is "The {w} is a good match." — a recommendable option, the way
    // the other five departments hold "Best option" / "Sharing plate" /
    // "Popular choice". "Environment" is a topic, not something to recommend.
    {
      word: "Eco option",
      phonetic: "/ˈiːkəʊ ˈɒpʃn/",
      definition: "Lựa chọn thân thiện môi trường",
      icon: "🌍",
    },
    {
      word: "Water saving",
      phonetic: "/ˈwɔːtə ˈseɪvɪŋ/",
      definition: "Việc tiết kiệm nước",
      icon: "💧",
    },
    {
      // Slot 9 fills "I would suggest the {w}, because it is popular." and
      // "Most guests choose the {w}." — it has to BE a choice, not the act of
      // choosing: "I would suggest the guest decision" recommended nothing.
      word: "Morning cleaning",
      phonetic: "/ˈmɔːnɪŋ ˈkliːnɪŋ/",
      definition: "Dọn phòng buổi sáng",
      icon: "🌅",
    },
  ],
  reports: [
    { word: "Cleaned", phonetic: "/kliːnd/", definition: "Đã dọn", icon: "✨" },
    { word: "Finished", phonetic: "/ˈfɪnɪʃt/", definition: "Đã hoàn thành", icon: "🏁" },
    { word: "Found", phonetic: "/faʊnd/", definition: "Đã tìm thấy", icon: "🔍" },
    { word: "Updated", phonetic: "/ʌpˈdeɪtɪd/", definition: "Đã cập nhật cho", icon: "🔄" },
    { word: "This morning", phonetic: "/ðɪs ˈmɔːnɪŋ/", definition: "Sáng nay", icon: "🌅" },
    { word: "Rooms done", phonetic: "/ruːmz dʌn/", definition: "Số phòng đã xong", icon: "🔢" },
    {
      word: "Took longer",
      phonetic: "/tʊk ˈlɒŋɡə/",
      definition: "Mất nhiều thời gian hơn",
      icon: "⏳",
    },
    { word: "Replaced", phonetic: "/rɪˈpleɪst/", definition: "Đã thay mới", icon: "🔄" },
    { word: "Settled", phonetic: "/ˈsetld/", definition: "Đã xong xuôi", icon: "📤" },
    { word: "Noted", phonetic: "/ˈnəʊtɪd/", definition: "Đã ghi lại", icon: "🎒" },
  ],
  wrapUp: [
    { word: "Thorough", phonetic: "/ˈθʌrə/", definition: "Kỹ lưỡng", icon: "🔍" },
    { word: "Before six", phonetic: "/bɪˈfɔː sɪks/", definition: "Trước sáu giờ", icon: "🔎" },
    { word: "Supplies", phonetic: "/səˈplaɪz/", definition: "Vật tư tiêu hao", icon: "📦" },
    { word: "Restock", phonetic: "/ˌriːˈstɒk/", definition: "Bổ sung vật tư", icon: "🧴" },
    { word: "Room check", phonetic: "/ruːm tʃek/", definition: "Lượt kiểm tra phòng", icon: "🔑" },
    { word: "Well done", phonetic: "/wel dʌn/", definition: "Làm tốt", icon: "👍" },
    { word: "Trolley clean", phonetic: "/ˈtrɒli kliːn/", definition: "Xe đẩy đã sạch", icon: "🛒" },
    { word: "Wrap up", phonetic: "/ræp ʌp/", definition: "Khép lại công việc", icon: "✅" },
    { word: "Room count", phonetic: "/ruːm kaʊnt/", definition: "Số phòng đã làm", icon: "🔢" },
    {
      word: "Final check",
      phonetic: "/ˈfaɪnl tʃek/",
      definition: "Lượt kiểm tra cuối",
      icon: "📋",
    },
  ],
};

const SW_BANK: P2Bank = {
  steps: [
    {
      word: "Greet at the door",
      phonetic: "/ɡriːt ət ðə dɔː/",
      definition: "Đón tại cửa",
      icon: "🙏",
    },
    {
      word: "Check the health form",
      phonetic: "/tʃek ðə helθ fɔːm/",
      definition: "Xem phiếu khai sức khỏe",
      icon: "📋",
    },
    { word: "Show the locker", phonetic: "/ʃəʊ ðə ˈlɒkə/", definition: "Chỉ tủ đồ", icon: "🔒" },
    {
      word: "Prepare the foot bath",
      phonetic: "/prɪˈpeə ðə fʊt bɑːθ/",
      definition: "Chuẩn bị ngâm chân",
      icon: "🦶",
    },
    {
      word: "Start the treatment",
      phonetic: "/stɑːt ðə ˈtriːtmənt/",
      definition: "Bắt đầu liệu trình",
      icon: "▶️",
    },
    {
      word: "Check the comfort",
      phonetic: "/tʃek ðə ˈkʌmfət/",
      definition: "Hỏi thăm độ dễ chịu",
      icon: "❓",
    },
    {
      word: "Serve tea after",
      phonetic: "/sɜːv tiː ˈɑːftə/",
      definition: "Mời trà sau liệu trình",
      icon: "🍵",
    },
    {
      word: "Walk the guest out",
      phonetic: "/wɔːk ðə ɡest aʊt/",
      definition: "Tiễn khách ra",
      icon: "🚶",
    },
    { word: "Routine", phonetic: "/ruːˈtiːn/", definition: "Quy trình quen thuộc", icon: "🔁" },
    { word: "Preparation", phonetic: "/ˌprepəˈreɪʃn/", definition: "Sự chuẩn bị", icon: "⏰" },
  ],
  offers: [
    { word: "Body scrub", phonetic: "/ˈbɒdi skrʌb/", definition: "Tẩy tế bào chết", icon: "🧴" },
    { word: "Facial", phonetic: "/ˈfeɪʃl/", definition: "Chăm sóc da mặt", icon: "💆" },
    { word: "Hot towel", phonetic: "/hɒt ˈtaʊəl/", definition: "Khăn nóng", icon: "♨️" },
    {
      word: "Aroma oil",
      phonetic: "/əˈrəʊmə ɔɪl/",
      definition: "Tinh dầu thơm",
      icon: "🫗",
      art: "",
    },
    {
      word: "Extra thirty minutes",
      phonetic: "/ˈekstrə ˈθɜːti ˈmɪnɪts/",
      definition: "Thêm ba mươi phút",
      icon: "⏱️",
      art: "",
    },
    { word: "Couple room", phonetic: "/ˈkʌpl ruːm/", definition: "Phòng đôi", icon: "💑" },
    { word: "Day pass", phonetic: "/deɪ pɑːs/", definition: "Vé sử dụng trong ngày", icon: "🎫" },
    // 8 = countable noun
    {
      word: "Fitness class",
      phonetic: "/ˈfɪtnəs klɑːs/",
      definition: "Lớp tập thể dục",
      icon: "🏋️",
    },
    // 9 = adjective
    { word: "Included", phonetic: "/ɪnˈkluːdɪd/", definition: "Đã bao gồm sẵn", icon: "✅" },
    // 10 = mass/plural noun
    {
      word: "Locker access",
      phonetic: "/ˈlɒkə ˈækses/",
      definition: "Quyền dùng tủ đồ",
      icon: "🔐",
    },
  ],
  details: [
    {
      word: "Health condition",
      phonetic: "/helθ kənˈdɪʃn/",
      definition: "Tình trạng sức khỏe",
      icon: "❤️",
    },
    { word: "Pregnancy", phonetic: "/ˈpreɡnənsi/", definition: "Thai kỳ", icon: "🤰" },
    { word: "Injury", phonetic: "/ˈɪndʒəri/", definition: "Chấn thương", icon: "🩹" },
    { word: "Back pain", phonetic: "/bæk peɪn/", definition: "Đau lưng", icon: "😣" },
    { word: "Sensitive skin", phonetic: "/ˈsensətɪv skɪn/", definition: "Da nhạy cảm", icon: "🌸" },
    {
      word: "Medicine list",
      phonetic: "/ˈmedsn lɪst/",
      definition: "Danh sách thuốc đang dùng",
      icon: "💊",
    },
    {
      word: "Focus area",
      phonetic: "/ˈfəʊkəs ˈeəriə/",
      definition: "Vùng cần tập trung",
      icon: "🎯",
    },
    {
      word: "Comfortable level",
      phonetic: "/ˈkʌmftəbl ˈlevl/",
      definition: "Mức độ dễ chịu",
      icon: "📊",
    },
    {
      word: "Treatment note",
      phonetic: "/ˈtriːtmənt nəʊt/",
      definition: "Ghi chú liệu trình",
      icon: "🔁",
    },
    {
      word: "Therapist choice",
      phonetic: "/ˈθerəpɪst tʃɔɪs/",
      definition: "Lựa chọn kỹ thuật viên",
      icon: "✅",
    },
  ],
  paperwork: [
    { word: "Consent form", phonetic: "/kənˈsent fɔːm/", definition: "Phiếu đồng ý", icon: "📝" },
    {
      word: "Treatment record",
      phonetic: "/ˈtriːtmənt ˈrekɔːd/",
      definition: "Hồ sơ liệu trình",
      icon: "📒",
    },
    { word: "Booking sheet", phonetic: "/ˈbʊkɪŋ ʃiːt/", definition: "Bảng lịch hẹn", icon: "🗓️" },
    {
      word: "Therapist name",
      phonetic: "/ˈθerəpɪst neɪm/",
      definition: "Tên kỹ thuật viên",
      icon: "🧑",
    },
    // Slot 4 fills "A ten percent {w} is added." — it must name a CHARGE.
    // The old fillers made the surcharge lesson teach "A ten percent duration
    // is added." / "…membership number…" / "…thirty days…", and the Vietnamese
    // answer key inherited the wrong noun straight from `definition`.
    {
      word: "Treatment fee",
      phonetic: "/ˈtriːtmənt fiː/",
      definition: "Phí liệu trình",
      icon: "💆",
    },
    { word: "Total price", phonetic: "/ˈtəʊtl praɪs/", definition: "Tổng giá", icon: "💰" },
    { word: "Room charge", phonetic: "/ruːm tʃɑːdʒ/", definition: "Tính vào phòng", icon: "🏨" },
    {
      word: "Book online",
      phonetic: "/bʊk ˌɒnˈlaɪn/",
      definition: "Đặt lịch trực tuyến",
      icon: "💻",
    },
    { word: "Confirmed", phonetic: "/kənˈfɜːmd/", definition: "Đã xác nhận", icon: "🕑" },
    {
      word: "Fill in the form",
      phonetic: "/fɪl ɪn ðə fɔːm/",
      definition: "Điền vào tờ khai",
      icon: "✏️",
    },
  ],
  rules: [
    {
      word: "Shower first",
      phonetic: "/ˈʃaʊə fɜːst/",
      definition: "Tắm trước khi vào",
      icon: "🚿",
    },
    {
      word: "No glass",
      phonetic: "/nəʊ ɡlɑːs/",
      definition: "Không mang đồ thủy tinh",
      icon: "🚫",
    },
    { word: "No diving", phonetic: "/nəʊ ˈdaɪvɪŋ/", definition: "Không nhảy cắm đầu", icon: "🏊" },
    {
      word: "Silence please",
      phonetic: "/ˈsaɪləns pliːz/",
      definition: "Xin giữ im lặng",
      icon: "🤫",
    },
    {
      word: "Mobile phone off",
      phonetic: "/ˈməʊbaɪl fəʊn ɒf/",
      definition: "Tắt điện thoại",
      icon: "📵",
    },
    { word: "Watch", phonetic: "/wɒtʃ/", definition: "Đồng hồ đeo tay", icon: "⌚" },
    { word: "Hot surface", phonetic: "/hɒt ˈsɜːfɪs/", definition: "Bề mặt nóng", icon: "♨️" },
    { word: "Time limit", phonetic: "/taɪm ˈlɪmɪt/", definition: "Giới hạn thời gian", icon: "⏲️" },
    { word: "Safety rule", phonetic: "/ˈseɪfti ruːl/", definition: "Quy định an toàn", icon: "🛡️" },
    { word: "Policy", phonetic: "/ˈpɒləsi/", definition: "Chính sách", icon: "📜" },
  ],
  choices: [
    {
      word: "Light or strong",
      phonetic: "/laɪt ɔː strɒŋ/",
      definition: "Nhẹ hay mạnh",
      icon: "💪",
    },
    {
      word: "Sixty or ninety",
      phonetic: "/ˈsɪksti ɔː ˈnaɪnti/",
      definition: "Sáu mươi hay chín mươi phút",
      icon: "⏱️",
    },
    { word: "Lavender", phonetic: "/ˈlævəndə/", definition: "Hương oải hương", icon: "💜" },
    { word: "Lemongrass", phonetic: "/ˈlemənɡrɑːs/", definition: "Hương sả", icon: "🌿" },
    {
      word: "Morning or evening",
      phonetic: "/ˈmɔːnɪŋ ɔː ˈiːvnɪŋ/",
      definition: "Buổi sáng hay buổi tối",
      icon: "🌅",
    },
    { word: "Indoor pool", phonetic: "/ˈɪndɔː puːl/", definition: "Hồ bơi trong nhà", icon: "🏊" },
    { word: "First time", phonetic: "/fɜːst taɪm/", definition: "Lần đầu", icon: "🆕" },
    {
      word: "Popular choice",
      phonetic: "/ˈpɒpjələ tʃɔɪs/",
      definition: "Lựa chọn phổ biến",
      icon: "📊",
    },
    { word: "Skin type", phonetic: "/skɪn taɪp/", definition: "Loại da", icon: "⚖️" },
    {
      word: "Therapist advice",
      phonetic: "/ˈθerəpɪst ədˈvaɪs/",
      definition: "Lời khuyên kỹ thuật viên",
      icon: "💡",
    },
  ],
  reports: [
    { word: "Completed", phonetic: "/kəmˈpliːtɪd/", definition: "Đã hoàn thành", icon: "✅" },
    { word: "Booked", phonetic: "/bʊkt/", definition: "Đã đặt lịch", icon: "📔" },
    { word: "Cancelled", phonetic: "/ˈkænsld/", definition: "Đã hủy", icon: "🚫" },
    { word: "Notified", phonetic: "/ˈnəʊtɪfaɪd/", definition: "Đã báo cho", icon: "📢" },
    { word: "Last week", phonetic: "/lɑːst wiːk/", definition: "Tuần trước", icon: "📅" },
    { word: "Treatments", phonetic: "/ˈtriːtmənts/", definition: "Các liệu trình", icon: "🔢" },
    { word: "Felt better", phonetic: "/felt ˈbetə/", definition: "Cảm thấy khá hơn", icon: "😌" },
    {
      word: "Checked",
      phonetic: "/tʃekt/",
      definition: "Đã kiểm tra",
      icon: "🔍",
    },
    { word: "Peaceful", phonetic: "/ˈpiːsfl/", definition: "Yên ả", icon: "💧" },
    { word: "Listed", phonetic: "/ˈlɪstɪd/", definition: "Đã liệt kê", icon: "👍" },
  ],
  wrapUp: [
    { word: "Unhurried", phonetic: "/ʌnˈhʌrid/", definition: "Thong thả, không vội", icon: "🧘" },
    {
      word: "Ahead of time",
      phonetic: "/əˈhed əv taɪm/",
      definition: "Sớm hơn dự kiến",
      icon: "🔁",
    },
    { word: "Linen washed", phonetic: "/ˈlɪnɪn wɒʃt/", definition: "Đồ vải đã giặt", icon: "🧺" },
    {
      word: "Relax the guest",
      phonetic: "/rɪˈlæks ðə ɡest/",
      definition: "Giúp khách thư giãn",
      icon: "🕯️",
    },
    { word: "Calm shift", phonetic: "/kɑːm ʃɪft/", definition: "Ca làm êm ả", icon: "🧘" },
    {
      word: "Well received",
      phonetic: "/wel rɪˈsiːvd/",
      definition: "Được đón nhận tốt",
      icon: "🙏",
    },
    {
      word: "Prepared for tomorrow",
      phonetic: "/prɪˈpeəd fə təˈmɒrəʊ/",
      definition: "Đã chuẩn bị cho mai",
      icon: "📅",
    },
    { word: "End", phonetic: "/end/", definition: "Kết thúc", icon: "🌙" },
    { word: "Peaceful day", phonetic: "/ˈpiːsfl deɪ/", definition: "Ngày yên bình", icon: "🕊️" },
    { word: "Soft music", phonetic: "/sɒft ˈmjuːzɪk/", definition: "Nhạc nhẹ", icon: "🎵" },
  ],
};

const GR_BANK: P2Bank = {
  steps: [
    {
      word: "Check the arrival list",
      phonetic: "/tʃek ði əˈraɪvl lɪst/",
      definition: "Kiểm tra danh sách khách đến",
      icon: "📋",
    },
    {
      word: "Meet at the lobby",
      phonetic: "/miːt ət ðə ˈlɒbi/",
      definition: "Đón ở sảnh",
      icon: "🏨",
    },
    {
      word: "Introduce the club",
      phonetic: "/ˌɪntrəˈdjuːs ðə klʌb/",
      definition: "Giới thiệu phòng chờ",
      icon: "🛋️",
    },
    {
      word: "Escort upstairs",
      phonetic: "/ɪˈskɔːt ˌʌpˈsteəz/",
      definition: "Dẫn lên tầng trên",
      icon: "🛗",
    },
    {
      word: "Serve refreshment",
      phonetic: "/sɜːv rɪˈfreʃmənt/",
      definition: "Mời nước",
      icon: "🥤",
    },
    {
      word: "Note the preference",
      phonetic: "/nəʊt ðə ˈprefrəns/",
      definition: "Ghi lại sở thích",
      icon: "🗒️",
    },
    {
      word: "Check again later",
      phonetic: "/tʃek əˈɡen ˈleɪtə/",
      definition: "Quay lại hỏi thăm sau",
      icon: "🔁",
    },
    {
      word: "Say goodbye warmly",
      phonetic: "/seɪ ˌɡʊdˈbaɪ ˈwɔːmli/",
      definition: "Chào tạm biệt ấm áp",
      icon: "👋",
    },
    {
      word: "Personal touch",
      phonetic: "/ˈpɜːsənl tʌtʃ/",
      definition: "Dấu ấn cá nhân",
      icon: "✨",
    },
    {
      word: "Service stage",
      phonetic: "/ˈsɜːvɪs steɪdʒ/",
      definition: "Giai đoạn phục vụ",
      icon: "🪜",
    },
  ],
  offers: [
    {
      word: "Late check-out",
      phonetic: "/leɪt ˈtʃekaʊt/",
      definition: "Trả phòng muộn",
      icon: "🕐",
    },
    {
      word: "Afternoon tea",
      phonetic: "/ˌɑːftəˈnuːn tiː/",
      definition: "Trà chiều",
      icon: "🍰",
      art: "",
    },
    {
      word: "Happy hour",
      phonetic: "/ˈhæpi ˈaʊə/",
      definition: "Giờ vàng đồ uống",
      icon: "🍹",
      art: "",
    },
    {
      word: "City tour",
      phonetic: "/ˈsɪti tʊə/",
      definition: "Tour tham quan thành phố",
      icon: "🚌",
    },
    {
      word: "Table reservation",
      phonetic: "/ˈteɪbl ˌrezəˈveɪʃn/",
      definition: "Đặt bàn giúp khách",
      icon: "🍽️",
    },
    {
      word: "Airport lounge",
      phonetic: "/ˈeəpɔːt laʊndʒ/",
      definition: "Phòng chờ sân bay",
      icon: "✈️",
    },
    {
      word: "Room decoration",
      phonetic: "/ruːm ˌdekəˈreɪʃn/",
      definition: "Trang trí phòng",
      icon: "🎊",
      art: "",
    },
    // 8 = countable noun
    {
      word: "Welcome fruit basket",
      phonetic: "/ˈwelkəm fruːt ˈbɑːskɪt/",
      definition: "Giỏ trái cây chào đón",
      icon: "🍇",
    },
    // 9 = adjective
    {
      word: "Complimentary",
      phonetic: "/ˌkɒmplɪˈmentri/",
      definition: "Miễn phí, tặng kèm",
      icon: "🎁",
    },
    // 10 = mass/plural noun
    {
      word: "Priority booking",
      phonetic: "/praɪˈɒrəti ˈbʊkɪŋ/",
      definition: "Ưu tiên đặt chỗ",
      icon: "⭐",
    },
  ],
  details: [
    {
      word: "Coffee preference",
      phonetic: "/ˈkɒfi ˈprefrəns/",
      definition: "Sở thích cà phê",
      icon: "☕",
    },
    { word: "Pillow type", phonetic: "/ˈpɪləʊ taɪp/", definition: "Loại gối ưa dùng", icon: "🛌" },
    {
      word: "Newspaper choice",
      phonetic: "/ˈnjuːzpeɪpə tʃɔɪs/",
      definition: "Loại báo ưa đọc",
      icon: "📰",
    },
    {
      word: "Travel purpose",
      phonetic: "/ˈtrævl ˈpɜːpəs/",
      definition: "Mục đích chuyến đi",
      icon: "🎯",
    },
    {
      word: "Returning guest",
      phonetic: "/rɪˈtɜːnɪŋ ɡest/",
      definition: "Khách quay lại",
      icon: "🔁",
    },
    { word: "Children age", phonetic: "/ˈtʃɪldrən eɪdʒ/", definition: "Tuổi các bé", icon: "🧒" },
    { word: "Wake-up time", phonetic: "/ˈweɪk ʌp taɪm/", definition: "Giờ báo thức", icon: "⏰" },
    { word: "Guest note", phonetic: "/ɡest nəʊt/", definition: "Ghi chú về khách", icon: "✅" },
    {
      word: "Special detail",
      phonetic: "/ˈspeʃl ˈdiːteɪl/",
      definition: "Chi tiết đặc biệt",
      icon: "💭",
    },
    { word: "Guest file", phonetic: "/ɡest faɪl/", definition: "Hồ sơ khách", icon: "🗂️" },
  ],
  paperwork: [
    {
      word: "Guest history",
      phonetic: "/ɡest ˈhɪstri/",
      definition: "Lịch sử lưu trú",
      icon: "📚",
    },
    {
      word: "Preference sheet",
      phonetic: "/ˈprefrəns ʃiːt/",
      definition: "Phiếu ghi sở thích",
      icon: "📄",
    },
    { word: "Feedback form", phonetic: "/ˈfiːdbæk fɔːm/", definition: "Phiếu góp ý", icon: "📝" },
    {
      word: "Club benefit",
      phonetic: "/klʌb ˈbenɪfɪt/",
      definition: "Quyền lợi hội viên",
      icon: "🎁",
    },
    // Slot 4 fills "A ten percent {w} is added." — it must name a CHARGE.
    // The old fillers made the surcharge lesson teach "A ten percent duration
    // is added." / "…membership number…" / "…thirty days…", and the Vietnamese
    // answer key inherited the wrong noun straight from `definition`.
    {
      word: "Arrangement fee",
      phonetic: "/əˈreɪndʒmənt fiː/",
      definition: "Phí sắp xếp dịch vụ",
      icon: "🎀",
    },
    { word: "Points", phonetic: "/pɔɪnts/", definition: "Điểm tích lũy", icon: "⭐" },
    {
      word: "Add to the account",
      phonetic: "/æd tə ði əˈkaʊnt/",
      definition: "Cộng vào tài khoản",
      icon: "➕",
    },
    {
      word: "Check the details",
      phonetic: "/tʃek ðə ˈdiːteɪlz/",
      definition: "Kiểm tra thông tin",
      icon: "🎫",
    },
    {
      word: "With the team",
      phonetic: "/wɪð ðə tiːm/",
      definition: "Đang ở chỗ bộ phận phụ trách",
      icon: "➡️",
    },
    {
      word: "Update the record",
      phonetic: "/ʌpˈdeɪt ðə ˈrekɔːd/",
      definition: "Cập nhật hồ sơ",
      icon: "🔄",
    },
  ],
  rules: [
    {
      word: "Lounge access",
      phonetic: "/laʊndʒ ˈækses/",
      definition: "Quyền vào phòng chờ",
      icon: "🔑",
    },
    {
      word: "Two guests only",
      phonetic: "/tuː ɡests ˈəʊnli/",
      definition: "Chỉ hai khách",
      icon: "👥",
    },
    {
      word: "Children policy",
      phonetic: "/ˈtʃɪldrən ˈpɒləsi/",
      definition: "Quy định trẻ em",
      icon: "🧒",
    },
    {
      word: "Photo permission",
      phonetic: "/ˈfəʊtəʊ pəˈmɪʃn/",
      definition: "Xin phép chụp ảnh",
      icon: "📷",
    },
    {
      word: "Private information",
      phonetic: "/ˈpraɪvət ˌɪnfəˈmeɪʃn/",
      definition: "Thông tin riêng tư",
      icon: "🔐",
    },
    {
      word: "Travel documents",
      phonetic: "/ˈtrævl ˈdɒkjumənts/",
      definition: "Giấy tờ đi lại",
      icon: "📄",
    },
    { word: "Dress smart", phonetic: "/dres smɑːt/", definition: "Trang phục lịch sự", icon: "👔" },
    { word: "Closing time", phonetic: "/ˈkləʊzɪŋ taɪm/", definition: "Giờ đóng cửa", icon: "🕙" },
    {
      word: "Lounge rule",
      phonetic: "/laʊndʒ ruːl/",
      definition: "Quy định phòng chờ",
      icon: "🛋️",
    },
    { word: "House rule", phonetic: "/haʊs ruːl/", definition: "Nội quy khách sạn", icon: "📜" },
  ],
  choices: [
    {
      word: "Lounge or room",
      phonetic: "/laʊndʒ ɔː ruːm/",
      definition: "Ở phòng chờ hay tại phòng",
      icon: "🛋️",
    },
    { word: "Early or late", phonetic: "/ˈɜːli ɔː leɪt/", definition: "Sớm hay muộn", icon: "🕐" },
    { word: "Private car", phonetic: "/ˈpraɪvət kɑː/", definition: "Xe riêng", icon: "🚗" },
    { word: "Group tour", phonetic: "/ɡruːp tʊə/", definition: "Tour đoàn", icon: "🚌" },
    { word: "Quiet table", phonetic: "/ˈkwaɪət ˈteɪbl/", definition: "Bàn yên tĩnh", icon: "🤫" },
    {
      word: "Window table",
      phonetic: "/ˈwɪndəʊ ˈteɪbl/",
      definition: "Bàn cạnh cửa sổ",
      icon: "🪟",
    },
    {
      word: "Something local",
      phonetic: "/ˈsʌmθɪŋ ˈləʊkl/",
      definition: "Món/nơi đặc trưng địa phương",
      icon: "🏮",
    },
    {
      word: "Relaxing option",
      phonetic: "/rɪˈlæksɪŋ ˈɒpʃn/",
      definition: "Phương án thư giãn hơn",
      icon: "😌",
    },
    { word: "Better plan", phonetic: "/ˈbetə plæn/", definition: "Phương án hợp hơn", icon: "🗺️" },
    {
      word: "Perfect match",
      phonetic: "/ˈpɜːfɪkt mætʃ/",
      definition: "Lựa chọn hoàn hảo",
      icon: "🎯",
    },
  ],
  reports: [
    { word: "Welcomed", phonetic: "/ˈwelkəmd/", definition: "Đã đón tiếp", icon: "🙏" },
    { word: "Arrived", phonetic: "/əˈraɪvd/", definition: "Đã tới", icon: "🚶" },
    { word: "Delivered", phonetic: "/dɪˈlɪvəd/", definition: "Đã chuyển tới", icon: "📦" },
    { word: "Briefed", phonetic: "/briːft/", definition: "Đã trao đổi nhanh với", icon: "🗣️" },
    { word: "This week", phonetic: "/ðɪs wiːk/", definition: "Tuần này", icon: "📅" },
    {
      word: "VIP arrivals",
      phonetic: "/ˌviː aɪ ˈpiː əˈraɪvlz/",
      definition: "Số khách VIP đến",
      icon: "🌟",
    },
    { word: "Went better", phonetic: "/went ˈbetə/", definition: "Diễn ra tốt hơn", icon: "👍" },
    { word: "Remembered", phonetic: "/rɪˈmembəd/", definition: "Đã nhớ được", icon: "🧠" },
    { word: "Very smooth", phonetic: "/ˈveri smuːð/", definition: "Rất suôn sẻ", icon: "🌊" },
    { word: "Jotted", phonetic: "/ˈdʒɒtɪd/", definition: "Đã ghi nhanh", icon: "✍️" },
  ],
  wrapUp: [
    { word: "Warm", phonetic: "/wɔːm/", definition: "Ân cần, nồng hậu", icon: "🤗" },
    { word: "On time", phonetic: "/ɒn taɪm/", definition: "Đúng giờ", icon: "⭐" },
    {
      word: "Special moment",
      phonetic: "/ˈspeʃl ˈməʊmənt/",
      definition: "Khoảnh khắc đặc biệt",
      icon: "✨",
    },
    { word: "Do more", phonetic: "/duː mɔː/", definition: "Làm nhiều hơn nữa", icon: "✨" },
    {
      word: "Guest comment",
      phonetic: "/ɡest ˈkɒment/",
      definition: "Nhận xét của khách",
      icon: "💬",
    },
    { word: "Thoughtful", phonetic: "/ˈθɔːtfl/", definition: "Chu đáo", icon: "💭" },
    {
      word: "Next arrival",
      phonetic: "/nekst əˈraɪvl/",
      definition: "Lượt khách kế tiếp",
      icon: "🔜",
    },
    { word: "Summarise", phonetic: "/ˈsʌməraɪz/", definition: "Tóm tắt lại", icon: "🗣️" },
    {
      word: "Warm welcome",
      phonetic: "/wɔːm ˈwelkəm/",
      definition: "Sự đón tiếp nồng hậu",
      icon: "🤗",
    },
    {
      word: "Guest delighted",
      phonetic: "/ɡest dɪˈlaɪtɪd/",
      definition: "Khách rất vui",
      icon: "😍",
    },
  ],
};

const BO_BANK: P2Bank = {
  steps: [
    {
      word: "Receive the request",
      phonetic: "/rɪˈsiːv ðə rɪˈkwest/",
      definition: "Nhận yêu cầu",
      icon: "📥",
    },
    {
      word: "Check the stock",
      phonetic: "/tʃek ðə stɒk/",
      definition: "Kiểm tra tồn kho",
      icon: "📦",
    },
    {
      word: "Prepare the quote",
      phonetic: "/prɪˈpeə ðə kwəʊt/",
      definition: "Lập báo giá",
      icon: "📊",
    },
    { word: "Get approval", phonetic: "/ɡet əˈpruːvl/", definition: "Xin phê duyệt", icon: "✅" },
    { word: "Place the order", phonetic: "/pleɪs ði ˈɔːdə/", definition: "Đặt hàng", icon: "🛒" },
    {
      word: "Track the delivery",
      phonetic: "/træk ðə dɪˈlɪvəri/",
      definition: "Theo dõi giao hàng",
      icon: "🚚",
    },
    {
      word: "Check the invoice",
      phonetic: "/tʃek ði ˈɪnvɔɪs/",
      definition: "Đối chiếu hóa đơn",
      icon: "🧾",
    },
    {
      word: "File the document",
      phonetic: "/faɪl ðə ˈdɒkjumənt/",
      definition: "Lưu chứng từ",
      icon: "🗄️",
    },
    { word: "Procedure", phonetic: "/prəˈsiːdʒə/", definition: "Quy trình", icon: "📋" },
    { word: "Work stage", phonetic: "/wɜːk steɪdʒ/", definition: "Khâu công việc", icon: "🪜" },
  ],
  offers: [
    {
      word: "Meeting package",
      phonetic: "/ˈmiːtɪŋ ˈpækɪdʒ/",
      definition: "Gói hội nghị",
      icon: "📦",
    },
    { word: "Half day rate", phonetic: "/hɑːf deɪ reɪt/", definition: "Giá nửa ngày", icon: "🕐" },
    { word: "Coffee break", phonetic: "/ˈkɒfi breɪk/", definition: "Giải lao cà phê", icon: "☕" },
    { word: "Projector", phonetic: "/prəˈdʒektə/", definition: "Máy chiếu", icon: "📽️" },
    { word: "Microphone", phonetic: "/ˈmaɪkrəfəʊn/", definition: "Micro", icon: "🎤" },
    {
      word: "Free parking",
      phonetic: "/friː ˈpɑːkɪŋ/",
      definition: "Đỗ xe miễn phí",
      icon: "🅿️",
      art: "",
    },
    {
      word: "Extra chairs",
      phonetic: "/ˈekstrə tʃeəz/",
      definition: "Ghế bổ sung",
      icon: "🪑",
      art: "",
    },
    // 8 = countable noun
    { word: "Flip chart", phonetic: "/flɪp tʃɑːt/", definition: "Bảng giấy lật", icon: "📊" },
    // 9 = adjective
    {
      word: "Negotiable",
      phonetic: "/nɪˈɡəʊʃiəbl/",
      definition: "Có thể thương lượng",
      icon: "🤝",
    },
    // 10 = mass/plural noun
    {
      word: "Basic equipment",
      phonetic: "/ˈbeɪsɪk ɪˈkwɪpmənt/",
      definition: "Thiết bị cơ bản",
      icon: "🧰",
    },
  ],
  details: [
    { word: "Event date", phonetic: "/ɪˈvent deɪt/", definition: "Ngày tổ chức", icon: "📅" },
    {
      word: "Number of people",
      phonetic: "/ˈnʌmbə əv ˈpiːpl/",
      definition: "Số người dự",
      icon: "👥",
    },
    {
      word: "Start and end time",
      phonetic: "/stɑːt ənd end taɪm/",
      definition: "Giờ bắt đầu và kết thúc",
      icon: "🕓",
    },
    {
      word: "Contact person",
      phonetic: "/ˈkɒntækt ˈpɜːsn/",
      definition: "Người liên hệ",
      icon: "🧑‍💼",
    },
    {
      word: "Billing details",
      phonetic: "/ˈbɪlɪŋ ˈdiːteɪlz/",
      definition: "Thông tin xuất hóa đơn",
      icon: "🧾",
    },
    {
      word: "Room layout",
      phonetic: "/ruːm ˈleɪaʊt/",
      definition: "Cách bố trí phòng",
      icon: "🪑",
    },
    {
      word: "Change request",
      phonetic: "/tʃeɪndʒ rɪˈkwest/",
      definition: "Yêu cầu thay đổi",
      icon: "🔄",
    },
    { word: "Meeting note", phonetic: "/ˈmiːtɪŋ nəʊt/", definition: "Biên bản họp", icon: "🔁" },
    {
      word: "Written confirmation",
      phonetic: "/ˈrɪtn ˌkɒnfəˈmeɪʃn/",
      definition: "Xác nhận bằng văn bản",
      icon: "📄",
    },
    { word: "Email reply", phonetic: "/ˈiːmeɪl rɪˈplaɪ/", definition: "Thư trả lời", icon: "📧" },
  ],
  paperwork: [
    { word: "Purchase order", phonetic: "/ˈpɜːtʃəs ˈɔːdə/", definition: "Đơn đặt mua", icon: "📝" },
    {
      word: "Delivery note",
      phonetic: "/dɪˈlɪvəri nəʊt/",
      definition: "Phiếu giao hàng",
      icon: "🚚",
    },
    {
      word: "Receipt copy",
      phonetic: "/rɪˈsiːt ˈkɒpi/",
      definition: "Bản sao biên lai",
      icon: "🧾",
    },
    {
      word: "Payment term",
      phonetic: "/ˈpeɪmənt tɜːm/",
      definition: "Điều khoản thanh toán",
      icon: "📆",
    },
    // Slot 4 fills "A ten percent {w} is added." — it must name a CHARGE.
    // The old fillers made the surcharge lesson teach "A ten percent duration
    // is added." / "…membership number…" / "…thirty days…", and the Vietnamese
    // answer key inherited the wrong noun straight from `definition`.
    { word: "Handling fee", phonetic: "/ˈhændlɪŋ fiː/", definition: "Phí xử lý", icon: "📦" },
    {
      word: "Bank transfer",
      phonetic: "/bæŋk ˈtrænsfɜː/",
      definition: "Chuyển khoản ngân hàng",
      icon: "🏦",
    },
    { word: "Stamp", phonetic: "/stæmp/", definition: "Con dấu", icon: "🔖" },
    {
      word: "Attach the file",
      phonetic: "/əˈtætʃ ðə faɪl/",
      definition: "Đính kèm tệp",
      icon: "📎",
    },
    { word: "Approved", phonetic: "/əˈpruːvd/", definition: "Đã được duyệt", icon: "✅" },
    {
      word: "Write the reference",
      phonetic: "/raɪt ðə ˈrefrəns/",
      definition: "Ghi số tham chiếu",
      icon: "🔢",
    },
  ],
  rules: [
    {
      word: "Staff entrance only",
      phonetic: "/stɑːf ˈentrəns ˈəʊnli/",
      definition: "Chỉ dành cho nhân viên",
      icon: "🚪",
    },
    {
      word: "Wear the badge",
      phonetic: "/weə ðə bædʒ/",
      definition: "Đeo thẻ nhân viên",
      icon: "🏷️",
    },
    { word: "Clock in", phonetic: "/klɒk ɪn/", definition: "Chấm công vào ca", icon: "⏱️" },
    {
      word: "Confidential file",
      phonetic: "/ˌkɒnfɪˈdenʃl faɪl/",
      definition: "Hồ sơ mật",
      icon: "🔐",
    },
    { word: "Password", phonetic: "/ˈpɑːswɜːd/", definition: "Mật khẩu", icon: "🔑" },
    { word: "Cash box", phonetic: "/kæʃ bɒks/", definition: "Hộp đựng tiền mặt", icon: "💰" },
    {
      word: "No personal use",
      phonetic: "/nəʊ ˈpɜːsənl juːs/",
      definition: "Không dùng việc riêng",
      icon: "🚫",
    },
    {
      word: "Company policy",
      phonetic: "/ˈkʌmpəni ˈpɒləsi/",
      definition: "Chính sách công ty",
      icon: "📜",
    },
    {
      word: "Health and safety",
      phonetic: "/helθ ənd ˈseɪfti/",
      definition: "An toàn lao động",
      icon: "🦺",
    },
    { word: "Office rule", phonetic: "/ˈɒfɪs ruːl/", definition: "Nội quy văn phòng", icon: "📋" },
  ],
  choices: [
    {
      word: "Supplier A or B",
      phonetic: "/səˈplaɪə eɪ ɔː biː/",
      definition: "Nhà cung cấp A hay B",
      icon: "🏭",
    },
    {
      word: "Cheaper option",
      phonetic: "/ˈtʃiːpə ˈɒpʃn/",
      definition: "Phương án rẻ hơn",
      icon: "🪙",
    },
    {
      word: "Better quality",
      phonetic: "/ˈbetə ˈkwɒləti/",
      definition: "Chất lượng tốt hơn",
      icon: "💎",
    },
    {
      word: "Faster delivery",
      phonetic: "/ˈfɑːstə dɪˈlɪvəri/",
      definition: "Giao nhanh hơn",
      icon: "⚡",
    },
    { word: "Long term", phonetic: "/lɒŋ tɜːm/", definition: "Dài hạn", icon: "📈" },
    {
      word: "Trial order",
      phonetic: "/ˈtraɪəl ˈɔːdə/",
      definition: "Đơn hàng dùng thử",
      icon: "🧪",
    },
    { word: "Comparison", phonetic: "/kəmˈpærɪsn/", definition: "Sự so sánh", icon: "⚖️" },
    {
      word: "Value for money",
      phonetic: "/ˈvæljuː fə ˈmʌni/",
      definition: "Đáng đồng tiền",
      icon: "💰",
    },
    {
      word: "Personal opinion",
      phonetic: "/ˈpɜːsənl əˈpɪnjən/",
      definition: "Ý kiến cá nhân",
      icon: "💭",
    },
    {
      word: "Final decision",
      phonetic: "/ˈfaɪnl dɪˈsɪʒn/",
      definition: "Quyết định cuối cùng",
      icon: "❓",
    },
  ],
  reports: [
    { word: "Sent", phonetic: "/sent/", definition: "Đã gửi", icon: "📤" },
    { word: "Departed", phonetic: "/dɪˈpɑːtɪd/", definition: "Đã rời đi", icon: "🚪" },
    { word: "Paid", phonetic: "/peɪd/", definition: "Đã thanh toán", icon: "💳" },
    { word: "Emailed", phonetic: "/ˈiːmeɪld/", definition: "Đã gửi email cho", icon: "📧" },
    { word: "Last month", phonetic: "/lɑːst mʌnθ/", definition: "Tháng trước", icon: "📅" },
    { word: "Invoices", phonetic: "/ˈɪnvɔɪsɪz/", definition: "Các hoá đơn", icon: "🧾" },
    {
      word: "Arrived later",
      phonetic: "/əˈraɪvd ˈleɪtə/",
      definition: "Tới muộn hơn",
      icon: "🕐",
    },
    { word: "Followed up", phonetic: "/ˈfɒləʊd ʌp/", definition: "Đã theo dõi tiếp", icon: "🔍" },
    { word: "Agreed", phonetic: "/əˈɡriːd/", definition: "Đã thống nhất", icon: "🤝" },
    { word: "Typed", phonetic: "/taɪpt/", definition: "Đã nhập máy", icon: "⌨️" },
  ],
  wrapUp: [
    { word: "Efficient", phonetic: "/ɪˈfɪʃnt/", definition: "Hiệu quả", icon: "📊" },
    { word: "On schedule", phonetic: "/ɒn ˈʃedjuːl/", definition: "Đúng tiến độ", icon: "🎯" },
    {
      word: "Monthly report",
      phonetic: "/ˈmʌnθli rɪˈpɔːt/",
      definition: "Báo cáo tháng",
      icon: "📄",
    },
    { word: "Do better", phonetic: "/duː ˈbetə/", definition: "Làm tốt hơn", icon: "💡" },
    { word: "Good result", phonetic: "/ɡʊd rɪˈzʌlt/", definition: "Kết quả tốt", icon: "📈" },
    {
      word: "Filed properly",
      phonetic: "/faɪld ˈprɒpəli/",
      definition: "Đã lưu đúng cách",
      icon: "🗄️",
    },
    { word: "Next quarter", phonetic: "/nekst ˈkwɔːtə/", definition: "Quý tới", icon: "📆" },
    { word: "Sign off", phonetic: "/saɪn ɒf/", definition: "Ký duyệt kết thúc", icon: "📁" },
    {
      word: "Cost control",
      phonetic: "/kɒst kənˈtrəʊl/",
      definition: "Kiểm soát chi phí",
      icon: "📉",
    },
    { word: "Files closed", phonetic: "/faɪlz kləʊzd/", definition: "Hồ sơ đã đóng", icon: "🗄️" },
  ],
};

export const P2_BANKS: Record<string, P2Bank> = {
  FO: FO_BANK,
  FB: FB_BANK,
  HK: HK_BANK,
  SW: SW_BANK,
  GR: GR_BANK,
  BO: BO_BANK,
};
