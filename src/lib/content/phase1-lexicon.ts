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

export type P1Word = { word: string; phonetic: string; definition: string; icon: string };

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
    { word: "Receptionist", phonetic: "/rɪˈsepʃənɪst/", definition: "Nhân viên lễ tân", icon: "🧑‍💼" },
    { word: "Bellman", phonetic: "/ˈbelmæn/", definition: "Nhân viên hành lý", icon: "🛎️" },
    { word: "Concierge", phonetic: "/ˌkɒnsiˈeəʒ/", definition: "Nhân viên hỗ trợ khách", icon: "🎩" },
    { word: "Cashier", phonetic: "/kæˈʃɪə/", definition: "Thu ngân", icon: "💰" },
    { word: "Doorman", phonetic: "/ˈdɔːmən/", definition: "Nhân viên đứng cửa", icon: "🚪" },
    { word: "Supervisor", phonetic: "/ˈsuːpəvaɪzə/", definition: "Giám sát", icon: "📋" },
    { word: "Duty manager", phonetic: "/ˈdjuːti ˈmænɪdʒə/", definition: "Quản lý trực ca", icon: "🗝️" },
    { word: "Night shift", phonetic: "/naɪt ʃɪft/", definition: "Ca đêm", icon: "🌙" },
  ],
  places: [
    { word: "Lobby", phonetic: "/ˈlɒbi/", definition: "Sảnh khách sạn", icon: "🏨" },
    { word: "Reception", phonetic: "/rɪˈsepʃn/", definition: "Quầy lễ tân", icon: "🛎️" },
    { word: "Car park", phonetic: "/kɑː pɑːk/", definition: "Bãi đỗ xe", icon: "🅿️" },
    { word: "Luggage room", phonetic: "/ˈlʌɡɪdʒ ruːm/", definition: "Phòng giữ hành lý", icon: "🧳" },
    { word: "Business centre", phonetic: "/ˈbɪznəs ˈsentə/", definition: "Trung tâm thương vụ", icon: "💼" },
    { word: "Rest room", phonetic: "/ˈrest ruːm/", definition: "Nhà vệ sinh", icon: "🚻" },
    { word: "Corridor", phonetic: "/ˈkɒrɪdɔː/", definition: "Hành lang", icon: "🚶" },
    { word: "Main door", phonetic: "/meɪn dɔː/", definition: "Cửa chính", icon: "🚪" },
  ],
  requests: [
    { word: "Extra key", phonetic: "/ˈekstrə kiː/", definition: "Chìa khóa dự phòng", icon: "🔑" },
    { word: "City map", phonetic: "/ˈsɪti mæp/", definition: "Bản đồ thành phố", icon: "🗺️" },
    { word: "Taxi", phonetic: "/ˈtæksi/", definition: "Xe taxi", icon: "🚕" },
    { word: "Wake-up call", phonetic: "/ˈweɪk ʌp kɔːl/", definition: "Cuộc gọi báo thức", icon: "⏰" },
    { word: "Newspaper", phonetic: "/ˈnjuːzpeɪpə/", definition: "Báo giấy", icon: "📰" },
    { word: "Umbrella", phonetic: "/ʌmˈbrelə/", definition: "Ô, dù", icon: "☂️" },
    { word: "Receipt", phonetic: "/rɪˈsiːt/", definition: "Biên lai", icon: "🧾" },
    { word: "Directions", phonetic: "/dɪˈrekʃnz/", definition: "Chỉ dẫn đường đi", icon: "🧭" },
  ],
  states: [
    { word: "Busy", phonetic: "/ˈbɪzi/", definition: "Bận, đông khách", icon: "🏃" },
    { word: "Full", phonetic: "/fʊl/", definition: "Kín phòng, đầy", icon: "🈵" },
    { word: "Quiet", phonetic: "/ˈkwaɪət/", definition: "Yên tĩnh", icon: "🤫" },
    { word: "Noisy", phonetic: "/ˈnɔɪzi/", definition: "Ồn ào", icon: "🔊" },
    { word: "Safe", phonetic: "/seɪf/", definition: "An toàn", icon: "🛡️" },
    { word: "Empty", phonetic: "/ˈempti/", definition: "Trống, rỗng", icon: "⬜" },
    { word: "Late", phonetic: "/leɪt/", definition: "Muộn, trễ", icon: "🕐" },
    // Slot 8 feeds "Careful, the floor is ___" — a floor cannot be
    // "crowded"; a marble lobby floor after rain genuinely is slippery.
    { word: "Slippery", phonetic: "/ˈslɪpəri/", definition: "Trơn trượt", icon: "⚠️" },
  ],
  routines: [
    { word: "Check in", phonetic: "/tʃek ɪn/", definition: "Làm thủ tục nhận phòng", icon: "📥" },
    { word: "Check out", phonetic: "/tʃek aʊt/", definition: "Làm thủ tục trả phòng", icon: "📤" },
    { word: "Print", phonetic: "/prɪnt/", definition: "In ra", icon: "🖨️" },
    { word: "Sign", phonetic: "/saɪn/", definition: "Ký tên", icon: "✍️" },
    { word: "Greet", phonetic: "/ɡriːt/", definition: "Chào đón", icon: "🙋" },
    { word: "Register", phonetic: "/ˈredʒɪstə/", definition: "Đăng ký", icon: "📖" },
    { word: "Deliver", phonetic: "/dɪˈlɪvə/", definition: "Giao, chuyển đến", icon: "📦" },
    { word: "Update", phonetic: "/ʌpˈdeɪt/", definition: "Cập nhật", icon: "🔄" },
  ],
  phone: [
    { word: "Extension", phonetic: "/ɪkˈstenʃn/", definition: "Số máy lẻ", icon: "☎️" },
    { word: "Message", phonetic: "/ˈmesɪdʒ/", definition: "Lời nhắn", icon: "📝" },
    { word: "Transfer", phonetic: "/trænsˈfɜː/", definition: "Chuyển máy", icon: "🔀" },
    { word: "Line", phonetic: "/laɪn/", definition: "Đường dây", icon: "📞" },
    { word: "Caller", phonetic: "/ˈkɔːlə/", definition: "Người gọi", icon: "🗣️" },
    { word: "Dial", phonetic: "/ˈdaɪəl/", definition: "Quay số, bấm số", icon: "🔢" },
    { word: "Ring", phonetic: "/rɪŋ/", definition: "Đổ chuông", icon: "🔔" },
    { word: "Operator", phonetic: "/ˈɒpəreɪtə/", definition: "Tổng đài viên", icon: "🎧" },
  ],
  problems: [
    { word: "Broken", phonetic: "/ˈbrəʊkən/", definition: "Bị hỏng", icon: "🔧" },
    { word: "Lost", phonetic: "/lɒst/", definition: "Bị mất", icon: "❓" },
    { word: "Wrong", phonetic: "/rɒŋ/", definition: "Sai, nhầm", icon: "❌" },
    { word: "Delayed", phonetic: "/dɪˈleɪd/", definition: "Bị chậm trễ", icon: "⏳" },
    { word: "Faulty", phonetic: "/ˈfɔːlti/", definition: "Bị lỗi kỹ thuật", icon: "⚠️" },
    { word: "Missing", phonetic: "/ˈmɪsɪŋ/", definition: "Thiếu, không thấy", icon: "🕳️" },
    { word: "Stuck", phonetic: "/stʌk/", definition: "Bị kẹt", icon: "🚧" },
    { word: "Locked", phonetic: "/lɒkt/", definition: "Bị khóa", icon: "🔒" },
  ],
  closing: [
    { word: "Signature", phonetic: "/ˈsɪɡnətʃə/", definition: "Chữ ký", icon: "🖋️" },
    { word: "Suitcase", phonetic: "/ˈsuːtkeɪs/", definition: "Va li", icon: "🧳" },
    { word: "Airport", phonetic: "/ˈeəpɔːt/", definition: "Sân bay", icon: "✈️" },
    { word: "Trip", phonetic: "/trɪp/", definition: "Chuyến đi", icon: "🚗" },
    { word: "Farewell", phonetic: "/ˌfeəˈwel/", definition: "Lời tiễn biệt", icon: "👋" },
    { word: "Boarding pass", phonetic: "/ˈbɔːdɪŋ pɑːs/", definition: "Thẻ lên máy bay", icon: "🎫" },
    { word: "Lobby seat", phonetic: "/ˈlɒbi siːt/", definition: "Ghế chờ ở sảnh", icon: "💺" },
  ],
};

// ------------------------------------------------------------
// FOOD & BEVERAGE — the floor, the table, the plate.
// ------------------------------------------------------------
const FB_BANK: P1Bank = {
  roles: [
    { word: "Waiter", phonetic: "/ˈweɪtə/", definition: "Nhân viên phục vụ (nam)", icon: "🧑‍🍳" },
    { word: "Waitress", phonetic: "/ˈweɪtrəs/", definition: "Nhân viên phục vụ (nữ)", icon: "👩‍🍳" },
    { word: "Chef", phonetic: "/ʃef/", definition: "Bếp trưởng", icon: "👨‍🍳" },
    { word: "Barista", phonetic: "/bəˈriːstə/", definition: "Nhân viên pha chế cà phê", icon: "☕" },
    { word: "Bartender", phonetic: "/ˈbɑːtendə/", definition: "Nhân viên pha chế quầy bar", icon: "🍸" },
    { word: "Host", phonetic: "/həʊst/", definition: "Nhân viên đón khách nhà hàng", icon: "🤵" },
    { word: "Kitchen staff", phonetic: "/ˈkɪtʃɪn stɑːf/", definition: "Nhân viên bếp", icon: "🍳" },
    { word: "Head waiter", phonetic: "/hed ˈweɪtə/", definition: "Trưởng nhóm phục vụ", icon: "📋" },
  ],
  places: [
    { word: "Dining room", phonetic: "/ˈdaɪnɪŋ ruːm/", definition: "Phòng ăn", icon: "🍽️" },
    { word: "Kitchen", phonetic: "/ˈkɪtʃɪn/", definition: "Nhà bếp", icon: "🍳" },
    { word: "Bar", phonetic: "/bɑː/", definition: "Quầy bar", icon: "🍹" },
    { word: "Buffet line", phonetic: "/ˈbʊfeɪ laɪn/", definition: "Dãy quầy buffet", icon: "🥗" },
    { word: "Terrace", phonetic: "/ˈterəs/", definition: "Sân hiên ngoài trời", icon: "🌤️" },
    { word: "Counter", phonetic: "/ˈkaʊntə/", definition: "Quầy", icon: "🧱" },
    { word: "Coffee corner", phonetic: "/ˈkɒfi ˈkɔːnə/", definition: "Góc cà phê", icon: "☕" },
    { word: "Pantry", phonetic: "/ˈpæntri/", definition: "Kho đồ khô", icon: "📦" },
  ],
  requests: [
    { word: "Fork", phonetic: "/fɔːk/", definition: "Nĩa", icon: "🍴" },
    { word: "Knife", phonetic: "/naɪf/", definition: "Dao ăn", icon: "🔪" },
    { word: "Glass", phonetic: "/ɡlɑːs/", definition: "Ly, cốc", icon: "🥛" },
    { word: "Plate", phonetic: "/pleɪt/", definition: "Đĩa", icon: "🍽️" },
    { word: "Straw", phonetic: "/strɔː/", definition: "Ống hút", icon: "🥤" },
    { word: "High chair", phonetic: "/haɪ tʃeə/", definition: "Ghế ăn cho trẻ em", icon: "🪑" },
    { word: "Ice", phonetic: "/aɪs/", definition: "Đá lạnh", icon: "🧊" },
    { word: "Bread", phonetic: "/bred/", definition: "Bánh mì", icon: "🍞" },
  ],
  states: [
    { word: "Hot", phonetic: "/hɒt/", definition: "Nóng", icon: "🔥" },
    { word: "Cold", phonetic: "/kəʊld/", definition: "Lạnh", icon: "❄️" },
    { word: "Fresh", phonetic: "/freʃ/", definition: "Tươi mới", icon: "🥬" },
    { word: "Sweet", phonetic: "/swiːt/", definition: "Ngọt", icon: "🍬" },
    { word: "Salty", phonetic: "/ˈsɔːlti/", definition: "Mặn", icon: "🧂" },
    { word: "Sour", phonetic: "/ˈsaʊə/", definition: "Chua", icon: "🍋" },
    { word: "Delicious", phonetic: "/dɪˈlɪʃəs/", definition: "Ngon", icon: "😋" },
    // Slot 8 feeds "Careful, the floor is ___" — a floor isn't "sharp";
    // a dining/kitchen floor with spilled food genuinely is greasy.
    { word: "Greasy", phonetic: "/ˈɡriːsi/", definition: "Trơn dầu mỡ", icon: "⚠️" },
  ],
  routines: [
    { word: "Serve", phonetic: "/sɜːv/", definition: "Phục vụ", icon: "🍽️" },
    { word: "Pour", phonetic: "/pɔː/", definition: "Rót", icon: "🫗" },
    { word: "Cook", phonetic: "/kʊk/", definition: "Nấu", icon: "🍳" },
    { word: "Take an order", phonetic: "/teɪk ən ˈɔːdə/", definition: "Ghi món khách gọi", icon: "📝" },
    { word: "Set the table", phonetic: "/set ðə ˈteɪbl/", definition: "Bày bàn ăn", icon: "🍴" },
    { word: "Refill", phonetic: "/ˌriːˈfɪl/", definition: "Rót thêm, châm đầy", icon: "🔁" },
    { word: "Prepare", phonetic: "/prɪˈpeə/", definition: "Chuẩn bị", icon: "⚙️" },
    { word: "Wash", phonetic: "/wɒʃ/", definition: "Rửa", icon: "🧽" },
  ],
  phone: [
    { word: "Booking", phonetic: "/ˈbʊkɪŋ/", definition: "Việc đặt bàn", icon: "📒" },
    { word: "Reserve", phonetic: "/rɪˈzɜːv/", definition: "Đặt trước", icon: "✅" },
    { word: "Party size", phonetic: "/ˈpɑːti saɪz/", definition: "Số người trong nhóm", icon: "👥" },
    { word: "Cancel", phonetic: "/ˈkænsl/", definition: "Hủy", icon: "🚫" },
    { word: "Tonight", phonetic: "/təˈnaɪt/", definition: "Tối nay", icon: "🌆" },
    { word: "Window seat", phonetic: "/ˈwɪndəʊ siːt/", definition: "Chỗ ngồi cạnh cửa sổ", icon: "🪟" },
    { word: "Takeaway", phonetic: "/ˈteɪkəweɪ/", definition: "Mang đi", icon: "🥡" },
    { word: "Room service", phonetic: "/ruːm ˈsɜːvɪs/", definition: "Phục vụ tại phòng", icon: "🛎️" },
  ],
  problems: [
    { word: "Stained", phonetic: "/steɪnd/", definition: "Bị dây bẩn", icon: "💦" },
    { word: "Dirty", phonetic: "/ˈdɜːti/", definition: "Bẩn", icon: "🧻" },
    { word: "Overcooked", phonetic: "/ˌəʊvəˈkʊkt/", definition: "Nấu quá chín", icon: "🍖" },
    { word: "Undercooked", phonetic: "/ˌʌndəˈkʊkt/", definition: "Chưa chín tới", icon: "🥩" },
    { word: "Unhappy", phonetic: "/ʌnˈhæpi/", definition: "Không hài lòng", icon: "😟" },
    { word: "Slow", phonetic: "/sləʊ/", definition: "Chậm", icon: "🐢" },
    { word: "Cracked", phonetic: "/krækt/", definition: "Bị nứt, mẻ", icon: "💔" },
    { word: "Sold out", phonetic: "/səʊld aʊt/", definition: "Đã hết món", icon: "🚷" },
  ],
  closing: [
    { word: "Dessert", phonetic: "/dɪˈzɜːt/", definition: "Món tráng miệng", icon: "🍰" },
    { word: "Tip", phonetic: "/tɪp/", definition: "Tiền boa", icon: "💵" },
    { word: "Compliment", phonetic: "/ˈkɒmplɪmənt/", definition: "Lời khen", icon: "🌟" },
    { word: "Meal", phonetic: "/miːl/", definition: "Bữa ăn", icon: "🍲" },
    { word: "Bill folder", phonetic: "/bɪl ˈfəʊldə/", definition: "Bìa đựng hóa đơn", icon: "📁" },
    { word: "Toothpick", phonetic: "/ˈtuːθpɪk/", definition: "Tăm xỉa răng", icon: "🦷" },
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
    { word: "Room attendant", phonetic: "/ruːm əˈtendənt/", definition: "Nhân viên dọn phòng", icon: "🧹" },
    { word: "Floor supervisor", phonetic: "/flɔː ˈsuːpəvaɪzə/", definition: "Giám sát tầng", icon: "📋" },
    { word: "Linen staff", phonetic: "/ˈlɪnɪn stɑːf/", definition: "Nhân viên đồ vải", icon: "🧺" },
    { word: "Cleaner", phonetic: "/ˈkliːnə/", definition: "Nhân viên vệ sinh", icon: "🧽" },
    { word: "Gardener", phonetic: "/ˈɡɑːdnə/", definition: "Nhân viên làm vườn", icon: "🌿" },
    { word: "Public area staff", phonetic: "/ˈpʌblɪk ˈeəriə stɑːf/", definition: "Nhân viên khu vực công cộng", icon: "🏛️" },
    { word: "Laundry staff", phonetic: "/ˈlɔːndri stɑːf/", definition: "Nhân viên giặt là", icon: "👕" },
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
    { word: "Store room", phonetic: "/stɔː ruːm/", definition: "Kho chứa đồ", icon: "📦" },
    { word: "Staircase", phonetic: "/ˈsteəkeɪs/", definition: "Cầu thang bộ", icon: "🪜" },
    { word: "Guest room", phonetic: "/ɡest ruːm/", definition: "Phòng khách nghỉ", icon: "🛏️" },
    { word: "Balcony", phonetic: "/ˈbælkəni/", definition: "Ban công", icon: "🌇" },
  ],
  requests: [
    { word: "Extra bed", phonetic: "/ˈekstrə bed/", definition: "Giường phụ", icon: "🛏️" },
    { word: "Shampoo", phonetic: "/ʃæmˈpuː/", definition: "Dầu gội", icon: "🧴" },
    { word: "Toothbrush", phonetic: "/ˈtuːθbrʌʃ/", definition: "Bàn chải đánh răng", icon: "🪥" },
    { word: "Hairdryer", phonetic: "/ˈheədraɪə/", definition: "Máy sấy tóc", icon: "💨" },
    { word: "Bed sheet", phonetic: "/bed ʃiːt/", definition: "Ga trải giường", icon: "🛏️" },
    { word: "Slippers", phonetic: "/ˈslɪpəz/", definition: "Dép đi trong phòng", icon: "🩴" },
    { word: "Tissue", phonetic: "/ˈtɪʃuː/", definition: "Khăn giấy", icon: "🧻" },
    { word: "Water bottle", phonetic: "/ˈwɔːtə ˈbɒtl/", definition: "Chai nước", icon: "💧" },
  ],
  states: [
    { word: "Clean", phonetic: "/kliːn/", definition: "Sạch", icon: "✨" },
    { word: "Tidy", phonetic: "/ˈtaɪdi/", definition: "Gọn gàng", icon: "📐" },
    { word: "Wet", phonetic: "/wet/", definition: "Ướt", icon: "💧" },
    { word: "Dry", phonetic: "/draɪ/", definition: "Khô", icon: "☀️" },
    { word: "Dusty", phonetic: "/ˈdʌsti/", definition: "Bụi bặm", icon: "🌫️" },
    { word: "Bright", phonetic: "/braɪt/", definition: "Sáng sủa", icon: "🍃" },
    { word: "Soft", phonetic: "/sɒft/", definition: "Mềm", icon: "☁️" },
    // "Heavy" doesn't fit the week-10 "Careful, the floor is ___" warning
    // frame (a floor cannot itself be heavy) — "Uneven" is the real
    // hazard housekeeping actually warns guests about.
    { word: "Uneven", phonetic: "/ʌnˈiːvn/", definition: "Gập ghềnh, không bằng phẳng", icon: "⚠️" },
  ],
  routines: [
    { word: "Make the bed", phonetic: "/meɪk ðə bed/", definition: "Dọn giường", icon: "🛏️" },
    { word: "Vacuum", phonetic: "/ˈvækjuːm/", definition: "Hút bụi", icon: "🧹" },
    { word: "Mop", phonetic: "/mɒp/", definition: "Lau sàn", icon: "🧽" },
    { word: "Dust", phonetic: "/dʌst/", definition: "Lau bụi", icon: "🪶" },
    // "Change the linen", not bare "Change" — week 4 already teaches
    // "Change" meaning money given back, and one headword must not carry
    // two unrelated meanings for the same learner.
    { word: "Change the linen", phonetic: "/tʃeɪndʒ ðə ˈlɪnɪn/", definition: "Thay đồ vải", icon: "🔄" },
    { word: "Refill", phonetic: "/ˌriːˈfɪl/", definition: "Bổ sung đầy lại", icon: "🧴" },
    { word: "Collect", phonetic: "/kəˈlekt/", definition: "Thu gom", icon: "🗑️" },
    { word: "Check the room", phonetic: "/tʃek ðə ruːm/", definition: "Kiểm tra phòng", icon: "🔍" },
  ],
  phone: [
    { word: "Housekeeping desk", phonetic: "/ˈhaʊskiːpɪŋ desk/", definition: "Bàn trực buồng phòng", icon: "☎️" },
    { word: "Request", phonetic: "/rɪˈkwest/", definition: "Yêu cầu", icon: "🙋" },
    { word: "Right away", phonetic: "/raɪt əˈweɪ/", definition: "Ngay lập tức", icon: "⚡" },
    { word: "Send up", phonetic: "/send ʌp/", definition: "Gửi lên phòng", icon: "⬆️" },
    { word: "Ten minutes", phonetic: "/ten ˈmɪnɪts/", definition: "Mười phút", icon: "⏱️" },
    { word: "Note down", phonetic: "/nəʊt daʊn/", definition: "Ghi lại", icon: "📝" },
    { word: "Report", phonetic: "/rɪˈpɔːt/", definition: "Báo cáo", icon: "📢" },
    { word: "Repeat", phonetic: "/rɪˈpiːt/", definition: "Nhắc lại", icon: "🔁" },
  ],
  problems: [
    { word: "Torn", phonetic: "/tɔːn/", definition: "Bị rách", icon: "📄" },
    { word: "Leaking", phonetic: "/ˈliːkɪŋ/", definition: "Bị rò rỉ nước", icon: "🚰" },
    { word: "Blocked", phonetic: "/blɒkt/", definition: "Bị tắc", icon: "🚱" },
    { word: "Smelly", phonetic: "/ˈsmeli/", definition: "Có mùi hôi", icon: "👃" },
    { word: "Not working", phonetic: "/nɒt ˈwɜːkɪŋ/", definition: "Không hoạt động", icon: "⚠️" },
    { word: "Out of order", phonetic: "/aʊt əv ˈɔːdə/", definition: "Hỏng, ngừng dùng", icon: "🚧" },
    { word: "Burnt out", phonetic: "/bɜːnt aʊt/", definition: "Bóng đèn cháy", icon: "💡" },
    { word: "Damaged", phonetic: "/ˈdæmɪdʒd/", definition: "Bị hư hại", icon: "🔨" },
  ],
  closing: [
    { word: "Bin bag", phonetic: "/bɪn bæɡ/", definition: "Túi rác", icon: "🗑️" },
    { word: "Checklist", phonetic: "/ˈtʃeklɪst/", definition: "Bảng kiểm tra", icon: "☑️" },
    { word: "Done", phonetic: "/dʌn/", definition: "Xong", icon: "🏁" },
    { word: "Comfortable", phonetic: "/ˈkʌmftəbl/", definition: "Thoải mái", icon: "😌" },
    { word: "Fresh flowers", phonetic: "/freʃ ˈflaʊəz/", definition: "Hoa tươi", icon: "💐" },
    { word: "Welcome note", phonetic: "/ˈwelkəm nəʊt/", definition: "Thiệp chào mừng", icon: "💌" },
    { word: "Spotless", phonetic: "/ˈspɒtləs/", definition: "Sạch bong không vết", icon: "✨" },
  ],
};

// ------------------------------------------------------------
// SPA & WELLNESS — the treatment room, the water, the calm.
// (Reserved for SW-19/SW-23 and avoided here: Cabana, Lifeguard,
//  Swimwear, Consultation, Allergy, Pressure, Package, Feedback.)
// ------------------------------------------------------------
const SW_BANK: P1Bank = {
  roles: [
    { word: "Therapist", phonetic: "/ˈθerəpɪst/", definition: "Kỹ thuật viên trị liệu", icon: "💆" },
    { word: "Massage therapist", phonetic: "/ˈmæsɑːʒ ˈθerəpɪst/", definition: "Kỹ thuật viên massage", icon: "🤲" },
    { word: "Spa receptionist", phonetic: "/spɑː rɪˈsepʃənɪst/", definition: "Lễ tân spa", icon: "🧾" },
    { word: "Trainer", phonetic: "/ˈtreɪnə/", definition: "Huấn luyện viên", icon: "🏋️" },
    { word: "Pool attendant", phonetic: "/puːl əˈtendənt/", definition: "Nhân viên hồ bơi", icon: "🏊" },
    { word: "Beautician", phonetic: "/bjuːˈtɪʃn/", definition: "Chuyên viên làm đẹp", icon: "💅" },
    { word: "Spa manager", phonetic: "/spɑː ˈmænɪdʒə/", definition: "Quản lý spa", icon: "📋" },
    { word: "Afternoon shift", phonetic: "/ˌɑːftəˈnuːn ʃɪft/", definition: "Ca chiều", icon: "🌇" },
  ],
  places: [
    { word: "Treatment room", phonetic: "/ˈtriːtmənt ruːm/", definition: "Phòng trị liệu", icon: "🛋️" },
    { word: "Sauna", phonetic: "/ˈsɔːnə/", definition: "Phòng xông hơi khô", icon: "🔥" },
    { word: "Steam room", phonetic: "/stiːm ruːm/", definition: "Phòng xông hơi ướt", icon: "💨" },
    { word: "Changing room", phonetic: "/ˈtʃeɪndʒɪŋ ruːm/", definition: "Phòng thay đồ", icon: "🚪" },
    { word: "Swimming pool", phonetic: "/ˈswɪmɪŋ puːl/", definition: "Hồ bơi", icon: "🏊" },
    { word: "Gym", phonetic: "/dʒɪm/", definition: "Phòng tập", icon: "🏋️" },
    { word: "Shower", phonetic: "/ˈʃaʊə/", definition: "Vòi sen", icon: "🚿" },
    { word: "Relaxing area", phonetic: "/rɪˈlæksɪŋ ˈeəriə/", definition: "Khu thư giãn", icon: "🍵" },
  ],
  requests: [
    { word: "Bath towel", phonetic: "/bɑːθ ˈtaʊəl/", definition: "Khăn tắm lớn", icon: "🧺" },
    { word: "Water glass", phonetic: "/ˈwɔːtə ɡlɑːs/", definition: "Ly nước", icon: "🥛" },
    { word: "Sun bed", phonetic: "/sʌn bed/", definition: "Ghế tắm nắng", icon: "🏖️" },
    { word: "Blanket", phonetic: "/ˈblæŋkɪt/", definition: "Chăn đắp", icon: "🛌" },
    { word: "Music", phonetic: "/ˈmjuːzɪk/", definition: "Nhạc", icon: "🎵" },
    { word: "Herbal tea", phonetic: "/ˈhɜːbl tiː/", definition: "Trà thảo mộc", icon: "🍵" },
    { word: "Hair cap", phonetic: "/heə kæp/", definition: "Mũ trùm tóc", icon: "🧢" },
    { word: "Appointment", phonetic: "/əˈpɔɪntmənt/", definition: "Lịch hẹn", icon: "📅" },
  ],
  states: [
    { word: "Relaxing", phonetic: "/rɪˈlæksɪŋ/", definition: "Thư giãn", icon: "😌" },
    { word: "Gentle", phonetic: "/ˈdʒentl/", definition: "Nhẹ nhàng", icon: "🕊️" },
    { word: "Strong", phonetic: "/strɒŋ/", definition: "Mạnh", icon: "💪" },
    // Slot 4 feeds "It is too ___ now" / "The room is too ___ for me" —
    // a room can be too stuffy, never "too painful" (pain describes the
    // massage pressure, not the space). "Stuffy" is the real spa
    // complaint word for a warm treatment/sauna room.
    { word: "Stuffy", phonetic: "/ˈstʌfi/", definition: "Ngột ngạt, bí hơi", icon: "😖" },
    { word: "Calm", phonetic: "/kɑːm/", definition: "Yên bình", icon: "🧘" },
    { word: "Tired", phonetic: "/ˈtaɪəd/", definition: "Mệt", icon: "😴" },
    { word: "Deep", phonetic: "/diːp/", definition: "Sâu", icon: "🌊" },
    { word: "Slippery", phonetic: "/ˈslɪpəri/", definition: "Trơn trượt", icon: "⚠️" },
  ],
  routines: [
    { word: "Massage", phonetic: "/ˈmæsɑːʒ/", definition: "Xoa bóp", icon: "🤲" },
    { word: "Book", phonetic: "/bʊk/", definition: "Đặt lịch", icon: "📔" },
    { word: "Welcome the guest", phonetic: "/ˈwelkəm ðə ɡest/", definition: "Đón khách", icon: "🙏" },
    { word: "Warm the oil", phonetic: "/wɔːm ði ɔɪl/", definition: "Làm ấm tinh dầu", icon: "🫗" },
    { word: "Fold", phonetic: "/fəʊld/", definition: "Gấp", icon: "🧻" },
    { word: "Light a candle", phonetic: "/laɪt ə ˈkændl/", definition: "Thắp nến", icon: "🕯️" },
    { word: "Rest", phonetic: "/rest/", definition: "Nghỉ ngơi", icon: "🛋️" },
    { word: "Clean the pool", phonetic: "/kliːn ðə puːl/", definition: "Vệ sinh hồ bơi", icon: "🏊" },
  ],
  phone: [
    { word: "Spa desk", phonetic: "/spɑː desk/", definition: "Quầy spa", icon: "☎️" },
    { word: "Available time", phonetic: "/əˈveɪləbl taɪm/", definition: "Giờ còn trống", icon: "🕒" },
    { word: "Fully booked", phonetic: "/ˈfʊli bʊkt/", definition: "Đã kín lịch", icon: "🈵" },
    { word: "Change the time", phonetic: "/tʃeɪndʒ ðə taɪm/", definition: "Đổi giờ hẹn", icon: "🔄" },
    { word: "Sixty minutes", phonetic: "/ˈsɪksti ˈmɪnɪts/", definition: "Sáu mươi phút", icon: "⏱️" },
    { word: "Arrive early", phonetic: "/əˈraɪv ˈɜːli/", definition: "Đến sớm", icon: "🚶" },
    { word: "Male or female", phonetic: "/meɪl ɔː ˈfiːmeɪl/", definition: "Nam hay nữ", icon: "👥" },
    { word: "Confirm", phonetic: "/kənˈfɜːm/", definition: "Xác nhận", icon: "✅" },
  ],
  problems: [
    { word: "Too hot", phonetic: "/tuː hɒt/", definition: "Quá nóng", icon: "🥵" },
    { word: "Too cold", phonetic: "/tuː kəʊld/", definition: "Quá lạnh", icon: "🥶" },
    { word: "Uncomfortable", phonetic: "/ʌnˈkʌmftəbl/", definition: "Không thoải mái", icon: "😖" },
    { word: "Cloudy", phonetic: "/ˈklaʊdi/", definition: "Đục (nước)", icon: "🌫️" },
    { word: "Unheated", phonetic: "/ʌnˈhiːtɪd/", definition: "Không được làm nóng", icon: "🚿" },
    { word: "Overdue", phonetic: "/ˌəʊvəˈdjuː/", definition: "Quá giờ hẹn", icon: "⏰" },
    { word: "Double-booked", phonetic: "/ˈdʌbl bʊkt/", definition: "Bị trùng lịch", icon: "⚠️" },
    { word: "Noisy", phonetic: "/ˈnɔɪzi/", definition: "Ồn ào", icon: "🔊" },
  ],
  closing: [
    { word: "Drink water", phonetic: "/drɪŋk ˈwɔːtə/", definition: "Uống nước", icon: "💧" },
    { word: "Next visit", phonetic: "/nekst ˈvɪzɪt/", definition: "Lần đến tiếp theo", icon: "📅" },
    { word: "Refreshed", phonetic: "/rɪˈfreʃt/", definition: "Sảng khoái", icon: "🌸" },
    { word: "Take care", phonetic: "/teɪk keə/", definition: "Giữ gìn sức khỏe", icon: "🤗" },
    { word: "Warm shower", phonetic: "/wɔːm ˈʃaʊə/", definition: "Tắm nước ấm", icon: "🚿" },
    { word: "Quiet time", phonetic: "/ˈkwaɪət taɪm/", definition: "Thời gian nghỉ tĩnh", icon: "🤫" },
    { word: "Wellness tip", phonetic: "/ˈwelnəs tɪp/", definition: "Lời khuyên sức khỏe", icon: "🌿" },
  ],
};

// ------------------------------------------------------------
// GUEST RELATIONS — the lounge, the VIP, the small kindness.
// (Reserved for GR-27/GR-34 and avoided here: Privilege, Canapés,
//  Anniversary, Occasion, Milestone, Amenity, Apologize, Resolve.)
// ------------------------------------------------------------
const GR_BANK: P1Bank = {
  roles: [
    { word: "Guest relations officer", phonetic: "/ɡest rɪˈleɪʃnz ˈɒfɪsə/", definition: "Nhân viên quan hệ khách hàng", icon: "🎀" },
    { word: "Lounge attendant", phonetic: "/laʊndʒ əˈtendənt/", definition: "Nhân viên phòng chờ", icon: "🛋️" },
    { word: "Butler", phonetic: "/ˈbʌtlə/", definition: "Quản gia riêng", icon: "🤵" },
    { word: "Driver", phonetic: "/ˈdraɪvə/", definition: "Tài xế", icon: "🚗" },
    { word: "Tour guide", phonetic: "/tʊə ɡaɪd/", definition: "Hướng dẫn viên", icon: "🗺️" },
    { word: "Translator", phonetic: "/trænzˈleɪtə/", definition: "Phiên dịch viên", icon: "🗣️" },
    { word: "Photographer", phonetic: "/fəˈtɒɡrəfə/", definition: "Thợ chụp ảnh", icon: "📷" },
    { word: "Evening shift", phonetic: "/ˈiːvnɪŋ ʃɪft/", definition: "Ca tối", icon: "🌃" },
  ],
  places: [
    { word: "Lounge", phonetic: "/laʊndʒ/", definition: "Phòng chờ hạng sang", icon: "🛋️" },
    { word: "Meeting room", phonetic: "/ˈmiːtɪŋ ruːm/", definition: "Phòng họp", icon: "🪑" },
    { word: "Garden", phonetic: "/ˈɡɑːdn/", definition: "Khu vườn", icon: "🌳" },
    { word: "Beach", phonetic: "/biːtʃ/", definition: "Bãi biển", icon: "🏖️" },
    { word: "Library", phonetic: "/ˈlaɪbrəri/", definition: "Thư viện", icon: "📚" },
    { word: "Gift shop", phonetic: "/ɡɪft ʃɒp/", definition: "Cửa hàng lưu niệm", icon: "🎁" },
    { word: "Kids club", phonetic: "/kɪdz klʌb/", definition: "Khu vui chơi trẻ em", icon: "🧸" },
    { word: "Roof top", phonetic: "/ruːf tɒp/", definition: "Sân thượng", icon: "🌆" },
  ],
  requests: [
    { word: "Birthday cake", phonetic: "/ˈbɜːθdeɪ keɪk/", definition: "Bánh sinh nhật", icon: "🎂" },
    { word: "Candle", phonetic: "/ˈkændl/", definition: "Nến", icon: "🕯️" },
    { word: "Balloon", phonetic: "/bəˈluːn/", definition: "Bóng bay", icon: "🎈" },
    { word: "Fruit basket", phonetic: "/fruːt ˈbɑːskɪt/", definition: "Giỏ trái cây", icon: "🧺" },
    { word: "Champagne", phonetic: "/ʃæmˈpeɪn/", definition: "Rượu sâm banh", icon: "🍾" },
    { word: "Postcard", phonetic: "/ˈpəʊstkɑːd/", definition: "Bưu thiếp", icon: "📮" },
    { word: "Wheelchair", phonetic: "/ˈwiːltʃeə/", definition: "Xe lăn", icon: "♿" },
    { word: "Baby cot", phonetic: "/ˈbeɪbi kɒt/", definition: "Nôi em bé", icon: "🍼" },
  ],
  states: [
    { word: "Elegant", phonetic: "/ˈelɪɡənt/", definition: "Trang nhã", icon: "🌸" },
    { word: "Special", phonetic: "/ˈspeʃl/", definition: "Đặc biệt", icon: "⭐" },
    { word: "Beautiful", phonetic: "/ˈbjuːtɪfl/", definition: "Đẹp", icon: "🌺" },
    // "Surprised" doesn't work in the week-10 "It is too ___" frame (an
    // emotion can't describe "it"); "Formal" is a real GR ambiance word
    // that still fits the same slot.
    { word: "Formal", phonetic: "/ˈfɔːrml/", definition: "Trang trọng", icon: "🎩" },
    { word: "Upset", phonetic: "/ʌpˈset/", definition: "Buồn bực", icon: "😞" },
    { word: "Important", phonetic: "/ɪmˈpɔːtnt/", definition: "Quan trọng", icon: "❗" },
    { word: "Lovely", phonetic: "/ˈlʌvli/", definition: "Đáng yêu, dễ chịu", icon: "💐" },
    { word: "Dark", phonetic: "/dɑːk/", definition: "Tối", icon: "⚠️" },
  ],
  routines: [
    { word: "Meet the guest", phonetic: "/miːt ðə ɡest/", definition: "Gặp đón khách", icon: "🤝" },
    { word: "Write a card", phonetic: "/raɪt ə kɑːd/", definition: "Viết thiệp", icon: "✉️" },
    { word: "Arrange", phonetic: "/əˈreɪndʒ/", definition: "Sắp xếp", icon: "🗂️" },
    { word: "Show around", phonetic: "/ʃəʊ əˈraʊnd/", definition: "Dẫn đi tham quan", icon: "🚶" },
    { word: "Remember", phonetic: "/rɪˈmembə/", definition: "Ghi nhớ", icon: "🧠" },
    { word: "Invite", phonetic: "/ɪnˈvaɪt/", definition: "Mời", icon: "💌" },
    { word: "Decorate", phonetic: "/ˈdekəreɪt/", definition: "Trang trí", icon: "🎊" },
    { word: "Follow up", phonetic: "/ˈfɒləʊ ʌp/", definition: "Theo dõi tiếp", icon: "🔍" },
  ],
  phone: [
    { word: "Lounge desk", phonetic: "/laʊndʒ desk/", definition: "Quầy phòng chờ", icon: "☎️" },
    { word: "Special request", phonetic: "/ˈspeʃl rɪˈkwest/", definition: "Yêu cầu đặc biệt", icon: "🌟" },
    { word: "Family", phonetic: "/ˈfæməli/", definition: "Gia đình", icon: "👪" },
    { word: "Surprise", phonetic: "/səˈpraɪz/", definition: "Điều bất ngờ", icon: "🎉" },
    { word: "This evening", phonetic: "/ðɪs ˈiːvnɪŋ/", definition: "Tối nay", icon: "🌙" },
    { word: "Arrange a car", phonetic: "/əˈreɪndʒ ə kɑː/", definition: "Bố trí xe", icon: "🚙" },
    { word: "Take a note", phonetic: "/teɪk ə nəʊt/", definition: "Ghi chú lại", icon: "📝" },
    { word: "Call back", phonetic: "/kɔːl bæk/", definition: "Gọi lại", icon: "📲" },
  ],
  problems: [
    { word: "Forgotten", phonetic: "/fəˈɡɒtn/", definition: "Bị quên", icon: "🤦" },
    { word: "Misspelled", phonetic: "/ˌmɪsˈspeld/", definition: "Bị viết sai tên", icon: "✏️" },
    { word: "Not ready", phonetic: "/nɒt ˈredi/", definition: "Chưa sẵn sàng", icon: "⏳" },
    { word: "Disappointed", phonetic: "/ˌdɪsəˈpɔɪntɪd/", definition: "Thất vọng", icon: "😔" },
    { word: "Melted", phonetic: "/ˈmeltɪd/", definition: "Bị chảy (bánh, kem)", icon: "🫠" },
    { word: "Mistimed", phonetic: "/ˌmɪsˈtaɪmd/", definition: "Sai thời điểm", icon: "📅" },
    { word: "Rainy", phonetic: "/ˈreɪni/", definition: "Có mưa", icon: "🌧️" },
    { word: "Cancelled", phonetic: "/ˈkænsld/", definition: "Bị hủy", icon: "🚫" },
  ],
  closing: [
    { word: "Photo", phonetic: "/ˈfəʊtəʊ/", definition: "Ảnh chụp", icon: "📸" },
    { word: "Memory", phonetic: "/ˈmeməri/", definition: "Kỷ niệm", icon: "💭" },
    { word: "Smile", phonetic: "/smaɪl/", definition: "Nụ cười", icon: "😊" },
    { word: "Come back", phonetic: "/kʌm bæk/", definition: "Quay trở lại", icon: "🔁" },
    { word: "Thank-you note", phonetic: "/ˈθæŋk juː nəʊt/", definition: "Thiệp cảm ơn", icon: "💌" },
    { word: "Guest book", phonetic: "/ɡest bʊk/", definition: "Sổ lưu bút", icon: "📖" },
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
    { word: "Sales staff", phonetic: "/seɪlz stɑːf/", definition: "Nhân viên kinh doanh", icon: "📈" },
    { word: "Assistant", phonetic: "/əˈsɪstənt/", definition: "Trợ lý", icon: "🧑‍💼" },
    { word: "HR officer", phonetic: "/eɪtʃ ɑː ˈɒfɪsə/", definition: "Nhân viên nhân sự", icon: "👥" },
    { word: "IT staff", phonetic: "/aɪ tiː stɑːf/", definition: "Nhân viên tin học", icon: "💻" },
    { word: "Purchaser", phonetic: "/ˈpɜːtʃəsə/", definition: "Nhân viên thu mua", icon: "🛒" },
    { word: "General manager", phonetic: "/ˈdʒenrəl ˈmænɪdʒə/", definition: "Tổng giám đốc", icon: "🏅" },
    { word: "Office hours", phonetic: "/ˈɒfɪs ˈaʊəz/", definition: "Giờ hành chính", icon: "🕘" },
  ],
  places: [
    { word: "Office", phonetic: "/ˈɒfɪs/", definition: "Văn phòng", icon: "🏢" },
    { word: "Meeting room", phonetic: "/ˈmiːtɪŋ ruːm/", definition: "Phòng họp", icon: "🪑" },
    { word: "Store", phonetic: "/stɔː/", definition: "Kho hàng", icon: "📦" },
    { word: "Staff canteen", phonetic: "/stɑːf kænˈtiːn/", definition: "Căng tin nhân viên", icon: "🍱" },
    { word: "Locker room", phonetic: "/ˈlɒkə ruːm/", definition: "Phòng tủ đồ nhân viên", icon: "🔐" },
    { word: "Loading area", phonetic: "/ˈləʊdɪŋ ˈeəriə/", definition: "Khu nhận hàng", icon: "🚚" },
    // Week 8's "lost guest" scenario escorts someone to slots 7-8 — a
    // restricted server room / staff-only entrance is not somewhere
    // any staff member would ever lead a visitor. A sales/BO coordinator
    // showing a client around uses guest-accessible spaces instead.
    { word: "Business centre", phonetic: "/ˈbɪznəs ˈsentə/", definition: "Trung tâm thương vụ", icon: "💼" },
    { word: "Elevator", phonetic: "/ˈelɪveɪtə/", definition: "Thang máy", icon: "🛗" },
  ],
  requests: [
    // Slot 1 is the week-9 "guest asks for it" frame — a resort guest
    // plausibly asks Back Office for an envelope, never for a stapler
    // (which stays in slot 4, the staff-to-staff "Do you need…?" frame).
    { word: "Envelope", phonetic: "/ˈenvələʊp/", definition: "Phong bì", icon: "✉️" },
    { word: "Notebook", phonetic: "/ˈnəʊtbʊk/", definition: "Sổ tay", icon: "📓" },
    { word: "Paper", phonetic: "/ˈpeɪpə/", definition: "Giấy", icon: "📄" },
    { word: "Stapler", phonetic: "/ˈsteɪplə/", definition: "Dập ghim", icon: "📎" },
    { word: "Calculator", phonetic: "/ˈkælkjuleɪtə/", definition: "Máy tính bỏ túi", icon: "🧮" },
    { word: "Charger", phonetic: "/ˈtʃɑːdʒə/", definition: "Bộ sạc", icon: "🔌" },
    { word: "Name tag", phonetic: "/neɪm tæɡ/", definition: "Bảng tên", icon: "🏷️" },
    { word: "Uniform", phonetic: "/ˈjuːnɪfɔːm/", definition: "Đồng phục", icon: "👔" },
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
    { word: "Cheap", phonetic: "/tʃiːp/", definition: "Rẻ", icon: "🪙" },
    { word: "Expensive", phonetic: "/ɪkˈspensɪv/", definition: "Đắt", icon: "💎" },
    { word: "Confidential", phonetic: "/ˌkɒnfɪˈdenʃl/", definition: "Bảo mật", icon: "🔐" },
    { word: "Sticky", phonetic: "/ˈstɪki/", definition: "Dính", icon: "⚠️" },
  ],
  routines: [
    { word: "Send an email", phonetic: "/send ən ˈiːmeɪl/", definition: "Gửi thư điện tử", icon: "📧" },
    { word: "File", phonetic: "/faɪl/", definition: "Lưu hồ sơ", icon: "🗄️" },
    { word: "Count", phonetic: "/kaʊnt/", definition: "Đếm, kiểm đếm", icon: "🔢" },
    { word: "Order supplies", phonetic: "/ˈɔːdə səˈplaɪz/", definition: "Đặt mua vật tư", icon: "📝" },
    { word: "Attend a meeting", phonetic: "/əˈtend ə ˈmiːtɪŋ/", definition: "Dự họp", icon: "👥" },
    { word: "Pay", phonetic: "/peɪ/", definition: "Thanh toán", icon: "💳" },
    { word: "Confirm the order", phonetic: "/kənˈfɜːm ði ˈɔːdə/", definition: "Xác nhận đơn hàng", icon: "☑️" },
    { word: "Save", phonetic: "/seɪv/", definition: "Lưu lại", icon: "💾" },
  ],
  phone: [
    { word: "Supplier", phonetic: "/səˈplaɪə/", definition: "Nhà cung cấp", icon: "🏭" },
    { word: "Company", phonetic: "/ˈkʌmpəni/", definition: "Công ty", icon: "🏢" },
    { word: "Delivery", phonetic: "/dɪˈlɪvəri/", definition: "Việc giao hàng", icon: "🚚" },
    { word: "Quotation", phonetic: "/kwəʊˈteɪʃn/", definition: "Bảng báo giá", icon: "📊" },
    { word: "Send again", phonetic: "/send əˈɡen/", definition: "Gửi lại", icon: "🔁" },
    { word: "Tomorrow morning", phonetic: "/təˈmɒrəʊ ˈmɔːnɪŋ/", definition: "Sáng mai", icon: "🌅" },
    { word: "Contact", phonetic: "/ˈkɒntækt/", definition: "Liên hệ", icon: "📇" },
    { word: "Sorry to trouble you", phonetic: "/ˈsɒri tə ˈtrʌbl juː/", definition: "Xin lỗi vì làm phiền", icon: "🙇" },
  ],
  problems: [
    { word: "Overdue", phonetic: "/ˌəʊvəˈdjuː/", definition: "Quá hạn giao", icon: "⏰" },
    { word: "Incorrect", phonetic: "/ˌɪnkəˈrekt/", definition: "Không chính xác", icon: "🔢" },
    { word: "Unavailable", phonetic: "/ˌʌnəˈveɪləbl/", definition: "Không còn hàng", icon: "📭" },
    { word: "Offline", phonetic: "/ˌɒfˈlaɪn/", definition: "Mất kết nối", icon: "📵" },
    { word: "Frozen", phonetic: "/ˈfrəʊzn/", definition: "Bị treo (máy tính)", icon: "🐌" },
    { word: "Deleted", phonetic: "/dɪˈliːtɪd/", definition: "Bị xóa mất", icon: "🗃️" },
    { word: "Overcharged", phonetic: "/ˌəʊvəˈtʃɑːdʒd/", definition: "Bị tính dư tiền", icon: "⚠️" },
    { word: "Unanswered", phonetic: "/ʌnˈɑːnsəd/", definition: "Không ai trả lời", icon: "🔕" },
  ],
  closing: [
    { word: "Deadline", phonetic: "/ˈdedlaɪn/", definition: "Hạn chót", icon: "⌛" },
    { word: "Team", phonetic: "/tiːm/", definition: "Đội nhóm", icon: "🤝" },
    { word: "Well done", phonetic: "/wel dʌn/", definition: "Làm tốt lắm", icon: "👏" },
    { word: "Next week", phonetic: "/nekst wiːk/", definition: "Tuần sau", icon: "📅" },
    { word: "Summary", phonetic: "/ˈsʌməri/", definition: "Bản tóm tắt", icon: "📄" },
    { word: "Progress", phonetic: "/ˈprəʊɡres/", definition: "Tiến độ", icon: "📈" },
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
