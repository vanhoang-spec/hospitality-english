// ============================================================
// PHASE 4 word banks — B1.1 (weeks 31-40).
//
// The top of the ladder. Phase 3 taught the department to act on its
// own initiative inside known procedures; Phase 4 is what happens when
// the procedure runs out: persuade someone, absorb a real dispute,
// negotiate a trade, hold a room together during an incident, and put
// a commercial proposal in writing.
//
// Each slot carries a REQUIRED PART OF SPEECH, because the spine drops
// these words into fixed frames. See docs/phase4-bank-contract.md:
//   noun-phrase slots  — must read correctly after "the "
//   `tradeoffs`        — bare infinitive, reads after "What if we " / "I can "
//
// 9 slots × 14 words = 126 department-specific headwords each.
//
// Enforced by scripts/verify-content.ts and scripts/qa-full.ts:
//  · No word may repeat a headword the department already met in
//    Phases 0-3 (intra-department duplication gate).
//  · >=65% of each week's headwords must be department-specific.
//  · Sentences built from these words stay within the 22-word B1.1 cap.
//  · Icons must be a single code point (no ZWJ sequences).
// ============================================================

export type P4Word = { word: string; phonetic: string; definition: string; icon: string };

export type P4Bank = {
  /** W31 — noun phrases. What this department narrates to sell an experience. */
  story: P4Word[];
  /** W32 — noun phrases naming a guest taste or need worth recording. */
  preferences: P4Word[];
  /** W33 — noun phrases naming what a guest claims redress for. */
  disputes: P4Word[];
  /** W34 — noun phrases naming the elements of a special occasion. */
  occasions: P4Word[];
  /** W35 — BARE VERB PHRASES. What it can put on the table in a negotiation. */
  tradeoffs: P4Word[];
  /** W36 — noun phrases naming an incident it must handle calmly. */
  emergencies: P4Word[];
  /** W37 — noun phrases naming a commercial contract term. */
  terms: P4Word[];
  /** W38 — noun phrases naming a component of a written proposal. */
  proposal: P4Word[];
  /** W40 — noun phrases, mixed, for the final assessment week. */
  wrapUp: P4Word[];
};

const FO_BANK: P4Bank = {
  story: [],
  preferences: [],
  disputes: [],
  occasions: [
    {
      word: "Handwritten card",
      phonetic: "/ˌhændˈrɪtn kɑːd/",
      definition: "Tấm thiệp viết tay",
      icon: "💌",
    },
  ],
  tradeoffs: [],
  // SLOT ORDER IS SEMANTIC, not decorative — the week-36 frames commit to
  // what each position means, and a word in the wrong position produces
  // sentences no property would ever say ("we are handling the missing
  // child", "Nobody has been hurt by the medical call"):
  //   [3] must be able to INJURE  — "Nobody has been hurt by the {3}."
  //   [4] must be an INCIDENT, never a person — "we are handling the {4}."
  //   [6] must be a physical hazard — "There is no danger from the {6}."
  //   [8] must make the LIFT unsafe — "Because of the {8}, use the stairs."
  //   [9] must be a blockage — "Do not proceed until the {9} is cleared."
  emergencies: [],
  terms: [],
  proposal: [],
  wrapUp: [],
};

const FB_BANK: P4Bank = {
  story: [],
  preferences: [
    {
      word: "Dining pace",
      phonetic: "/ˈdaɪnɪŋ peɪs/",
      definition: "Nhịp độ ra món khách muốn",
      icon: "⏳",
    },
    {
      word: "Steak doneness",
      phonetic: "/steɪk ˈdʌnnəs/",
      definition: "Độ chín của miếng bò bít tết",
      icon: "🥩",
    },
    {
      word: "Usual order",
      phonetic: "/ˈjuːʒuəl ˈɔːdə/",
      definition: "Món khách quen luôn gọi",
      icon: "🔁",
    },
  ],
  disputes: [
    {
      word: "Food poisoning claim",
      phonetic: "/fuːd ˈpɔɪzənɪŋ kleɪm/",
      definition: "Khiếu nại về ngộ độc thực phẩm",
      icon: "⚠️",
    },
  ],
  occasions: [],
  tradeoffs: [],
  emergencies: [
    // Slot order is semantic — see the note on the FO bank above.
  ],
  terms: [],
  proposal: [
    {
      word: "Price per guest",
      phonetic: "/praɪs pɜː ɡest/",
      definition: "Giá tính trên mỗi khách",
      icon: "🧮",
    },
  ],
  wrapUp: [],
};

const HK_BANK: P4Bank = {
  story: [],
  preferences: [],
  disputes: [],
  occasions: [],
  tradeoffs: [],
  emergencies: [
    // Slot order is semantic — see the note on the FO bank above.
    {
      word: "Blocked fire exit",
      phonetic: "/blɒkt ˈfaɪər ˈeksɪt/",
      definition: "Lối thoát hiểm bị chắn",
      icon: "🚪",
    },
    {
      word: "Burst pipe",
      phonetic: "/bɜːst paɪp/",
      definition: "Đường ống nước bị vỡ",
      icon: "🚿",
    },
    {
      word: "Choking",
      phonetic: "/ˈtʃəʊkɪŋ/",
      definition: "Hóc nghẹn — không nói được, không ho được",
      icon: "🫁",
    },
    {
      word: "Chemical spill",
      phonetic: "/ˈkemɪkl spɪl/",
      definition: "Sự cố đổ hóa chất tẩy rửa",
      icon: "☣️",
    },
    {
      word: "Burning wire smell",
      phonetic: "/ˈbɜːnɪŋ ˈwaɪə smel/",
      definition: "Mùi khét từ dây điện",
      icon: "⚡",
    },
    {
      word: "Flooded bathroom",
      phonetic: "/ˈflʌdɪd ˈbɑːθruːm/",
      definition: "Phòng tắm bị ngập nước",
      icon: "🌊",
    },
  ],
  terms: [],
  proposal: [
    {
      word: "Incident summary",
      phonetic: "/ˈɪnsɪdənt ˈsʌməri/",
      definition: "Bản tóm tắt diễn biến sự việc",
      icon: "📝",
    },
    {
      word: "Garment replacement value",
      phonetic: "/ˈɡɑːmənt rɪˈpleɪsmənt ˈvæljuː/",
      definition: "Giá trị thay mới của món đồ",
      icon: "💲",
    },
    {
      word: "Compensation amount",
      phonetic: "/ˌkɒmpenˈseɪʃn əˈmaʊnt/",
      definition: "Số tiền bồi thường đề xuất",
      icon: "💰",
    },
    {
      word: "Laundry service voucher",
      phonetic: "/ˈlɔːndri ˈsɜːvɪs ˈvaʊtʃə/",
      definition: "Phiếu dùng dịch vụ giặt là",
      icon: "🎫",
    },
    {
      word: "Photo evidence sheet",
      phonetic: "/ˈfəʊtəʊ ˈevɪdəns ʃiːt/",
      definition: "Bảng ảnh chứng minh hư hại",
      icon: "📷",
    },
    {
      word: "Corrective action plan",
      phonetic: "/kəˈrektɪv ˈækʃn plæn/",
      definition: "Kế hoạch hành động sửa sai",
      icon: "🛠️",
    },
    {
      word: "Service recovery offer",
      phonetic: "/ˈsɜːvɪs rɪˈkʌvəri ˈɒfə/",
      definition: "Đề nghị bù đắp chất lượng dịch vụ",
      icon: "🕊️",
    },
    {
      word: "Payment timeline",
      phonetic: "/ˈpeɪmənt ˈtaɪmlaɪn/",
      definition: "Lịch trình chi trả bồi thường",
      icon: "📆",
    },
    {
      word: "Direct line",
      phonetic: "/ˈhaʊskiːpɪŋ ˈmænɪdʒə ˈkɒntækt/",
      definition: "Thông tin liên hệ trưởng buồng phòng",
      icon: "📞",
    },
    {
      word: "Preventive measures",
      phonetic: "/prɪˈventɪv ˈmeʒə lɪst/",
      definition: "Danh sách biện pháp phòng ngừa",
      icon: "🛡️",
    },
    {
      word: "Follow-up inspection date",
      phonetic: "/ˈfɒləʊ ʌp ɪnˈspekʃn deɪt/",
      definition: "Ngày kiểm tra lại căn phòng",
      icon: "🔎",
    },
  ],
  wrapUp: [],
};

const SW_BANK: P4Bank = {
  story: [
    {
      word: "Signature ritual",
      phonetic: "/ˈsɪɡnətʃə ˈrɪtʃuəl/",
      definition: "Nghi thức trị liệu đặc trưng của spa",
      icon: "🕯️",
    },
    {
      word: "Local herbal blend",
      phonetic: "/ˈləʊkl ˈhɜːbl blend/",
      definition: "Hỗn hợp thảo dược bản địa",
      icon: "🌿",
    },
    {
      word: "Family healing tradition",
      phonetic: "/ˈfæməli ˈhiːlɪŋ trəˈdɪʃn/",
      definition: "Truyền thống chữa lành gia truyền",
      icon: "🧬",
    },
    {
      word: "Volcanic stone source",
      phonetic: "/vɒlˈkænɪk stəʊn sɔːs/",
      definition: "Nguồn đá núi lửa dùng trị liệu",
      icon: "🌋",
    },
    {
      word: "Treatment philosophy",
      phonetic: "/ˈtriːtmənt fəˈlɒsəfi/",
      definition: "Triết lý trị liệu của spa",
      icon: "📖",
    },
    {
      word: "Mountain spring water",
      phonetic: "/ˈmaʊntɪn sprɪŋ ˈwɔːtə/",
      definition: "Nước suối trên núi",
      icon: "⛰️",
    },
    {
      word: "Spa herb garden",
      phonetic: "/spɑː hɜːb ˈɡɑːdn/",
      definition: "Vườn thảo mộc riêng của spa",
      icon: "🪴",
    },
    {
      word: "Ancient massage technique",
      phonetic: "/ˈeɪnʃənt ˈmæsɑːʒ tekˈniːk/",
      definition: "Kỹ thuật xoa bóp cổ truyền",
      icon: "👐",
    },
    {
      word: "Master therapist",
      phonetic: "/ˈmɑːstə ˈθerəpɪst/",
      definition: "Kỹ thuật viên bậc thầy",
      icon: "🎓",
    },
    {
      word: "Meditation pavilion",
      phonetic: "/ˌmedɪˈteɪʃn pəˈvɪljən/",
      definition: "Chòi ngồi thiền",
      icon: "🛕",
    },
    {
      word: "Village herbal recipe",
      phonetic: "/ˈvɪlɪdʒ ˈhɜːbl ˈresəpi/",
      definition: "Bài thuốc thảo dược của làng nghề",
      icon: "📜",
    },
    {
      word: "Handmade body balm",
      phonetic: "/ˈhændmeɪd ˈbɒdi bɑːm/",
      definition: "Sáp dưỡng thể làm thủ công",
      icon: "🫙",
    },
    {
      word: "Bamboo forest setting",
      phonetic: "/bæmˈbuː ˈfɒrɪst ˈsetɪŋ/",
      definition: "Không gian giữa rừng tre",
      icon: "🎋",
    },
    {
      word: "Wellness heritage",
      phonetic: "/ˈwelnəs ˈherɪtɪdʒ/",
      definition: "Di sản chăm sóc sức khỏe lâu đời",
      icon: "🏛️",
    },
  ],
  preferences: [
    {
      word: "Preferred pressure level",
      phonetic: "/prɪˈfɜːd ˈpreʃə ˈlevl/",
      definition: "Mức lực tay khách thích",
      icon: "💪",
    },
    {
      word: "Preferred aroma blend",
      phonetic: "/prɪˈfɜːd əˈrəʊmə blend/",
      definition: "Hương tinh dầu khách thích",
      icon: "🌺",
    },
    {
      word: "Spa music preference",
      phonetic: "/spɑː ˈmjuːzɪk ˈprefrəns/",
      definition: "Loại nhạc khách muốn nghe",
      icon: "🎵",
    },
    {
      word: "Dim lighting preference",
      phonetic: "/dɪm ˈlaɪtɪŋ ˈprefrəns/",
      definition: "Mong muốn để đèn mờ",
      icon: "💡",
    },
    {
      word: "Treatment room temperature",
      phonetic: "/ˈtriːtmənt ruːm ˈtemprətʃə/",
      definition: "Nhiệt độ phòng khách thấy dễ chịu",
      icon: "🌡️",
    },
    // Not "Same therapist request" — the week-32 frame already supplies
    // "the same …", which produced "the same same therapist request".
    {
      word: "Therapist request",
      phonetic: "/ˈθerəpɪst rɪˈkwest/",
      definition: "Yêu cầu về kỹ thuật viên",
      icon: "🔁",
    },
    {
      word: "Old injury note",
      phonetic: "/əʊld ˈɪndʒəri nəʊt/",
      definition: "Ghi chú chấn thương cũ của khách",
      icon: "🩹",
    },
    {
      word: "Skin allergy note",
      phonetic: "/skɪn ˈælədʒi nəʊt/",
      definition: "Ghi chú da dị ứng của khách",
      icon: "⚠️",
    },
    {
      word: "Scent sensitivity",
      phonetic: "/sent ˌsensəˈtɪvəti/",
      definition: "Sự nhạy cảm với mùi hương",
      icon: "👃",
    },
    {
      word: "Quiet treatment preference",
      phonetic: "/ˈkwaɪət ˈtriːtmənt ˈprefrəns/",
      definition: "Mong muốn không trò chuyện khi trị liệu",
      icon: "🤫",
    },
    {
      word: "Preferred treatment time",
      phonetic: "/prɪˈfɜːd ˈtriːtmənt taɪm/",
      definition: "Khung giờ khách quen chọn",
      icon: "🕒",
    },
    {
      word: "Herbal tea preference",
      phonetic: "/ˈhɜːbl tiː ˈprefrəns/",
      definition: "Loại trà thảo mộc khách thích",
      icon: "🍵",
    },
    {
      word: "Body focus area",
      phonetic: "/ˈbɒdi ˈfəʊkəs ˈeəriə/",
      definition: "Vùng cơ thể cần tập trung",
      icon: "🎯",
    },
    {
      word: "Preferred treatment length",
      phonetic: "/prɪˈfɜːd ˈtriːtmənt leŋθ/",
      definition: "Thời lượng liệu trình khách quen chọn",
      icon: "⏳",
    },
  ],
  disputes: [
    {
      word: "Skin reaction",
      phonetic: "/skɪn riˈækʃn/",
      definition: "Phản ứng trên da sau trị liệu",
      icon: "🔴",
    },
    {
      word: "Missing treatment minutes",
      phonetic: "/ˈmɪsɪŋ ˈtriːtmənt ˈmɪnɪts/",
      definition: "Số phút trị liệu bị thiếu",
      icon: "⏱️",
    },
    {
      word: "Double-booked session",
      phonetic: "/ˌdʌbl bʊkt ˈseʃn/",
      definition: "Buổi hẹn bị đặt trùng",
      icon: "📅",
    },
    {
      word: "Therapist no-show",
      phonetic: "/ˈθerəpɪst nəʊ ʃəʊ/",
      definition: "Kỹ thuật viên không đến làm",
      icon: "🚫",
    },
    {
      word: "Unsatisfactory treatment result",
      phonetic: "/ˌʌnsætɪsˈfæktəri ˈtriːtmənt rɪˈzʌlt/",
      definition: "Kết quả liệu trình không như mong đợi",
      icon: "😞",
    },
    {
      word: "Hot stone burn",
      phonetic: "/hɒt stəʊn bɜːn/",
      definition: "Vết bỏng do đá nóng",
      icon: "🔥",
    },
    {
      word: "Lost locker item",
      phonetic: "/lɒst ˈlɒkə ˈaɪtəm/",
      definition: "Đồ để trong tủ bị mất",
      icon: "🔑",
    },
    {
      word: "Oil-stained clothing",
      phonetic: "/ɔɪl steɪnd ˈkləʊðɪŋ/",
      definition: "Quần áo bị dính vết dầu",
      icon: "👕",
    },
    {
      word: "Poor nail finish",
      phonetic: "/pɔː neɪl ˈfɪnɪʃ/",
      definition: "Móng làm không đẹp",
      icon: "💅",
    },
    {
      word: "Membership charge error",
      phonetic: "/ˈmembəʃɪp tʃɑːdʒ ˈerə/",
      definition: "Thu sai tiền gói thành viên",
      icon: "💳",
    },
    {
      // Slot fills "I understand the {w} means more than money to you." — a
      // plural headword broke the agreement: "the unused package sessions
      // means more than money".
      word: "Unused session credit",
      phonetic: "/ʌnˈjuːzd ˈseʃn ˈkredɪt/",
      definition: "Buổi trị liệu chưa dùng",
      icon: "📦",
    },
    {
      word: "Expired treatment voucher",
      phonetic: "/ɪkˈspaɪəd ˈtriːtmənt ˈvaʊtʃə/",
      definition: "Phiếu trị liệu đã hết hạn",
      icon: "🎟️",
    },
    {
      word: "Delayed treatment start",
      phonetic: "/dɪˈleɪd ˈtriːtmənt stɑːt/",
      definition: "Liệu trình bắt đầu trễ giờ",
      icon: "⏰",
    },
    {
      word: "Facial breakout",
      phonetic: "/ˈfeɪʃl ˈbreɪkaʊt/",
      definition: "Nổi mụn sau khi chăm sóc da mặt",
      icon: "😣",
    },
  ],
  occasions: [
    {
      word: "Couples massage ritual",
      phonetic: "/ˈkʌplz ˈmæsɑːʒ ˈrɪtʃuəl/",
      definition: "Nghi thức xoa bóp dành cho cặp đôi",
      icon: "💑",
    },
    {
      word: "Bridal spa package",
      phonetic: "/ˈbraɪdl spɑː ˈpækɪdʒ/",
      definition: "Gói spa cho cô dâu",
      icon: "👰",
    },
    {
      word: "Wellness retreat day",
      phonetic: "/ˈwelnəs rɪˈtriːt deɪ/",
      definition: "Ngày tĩnh dưỡng trọn gói",
      icon: "🌅",
    },
    {
      word: "Birthday treatment",
      phonetic: "/ˈbɜːθdeɪ ˈtriːtmənt/",
      definition: "Liệu trình mừng sinh nhật",
      icon: "🎂",
    },
    {
      word: "Honeymoon massage",
      phonetic: "/ˈhʌnimuːn ˈmæsɑːʒ/",
      definition: "Buổi xoa bóp cho khách hưởng tuần trăng mật",
      icon: "💞",
    },
    {
      word: "Anniversary spa ritual",
      phonetic: "/ˌænɪˈvɜːsəri spɑː ˈrɪtʃuəl/",
      definition: "Nghi thức spa mừng ngày kỷ niệm",
      icon: "💍",
    },
    {
      word: "Mother's day spa offer",
      phonetic: "/ˈmʌðəz deɪ spɑː ˈɒfə/",
      definition: "Ưu đãi spa ngày của mẹ",
      icon: "🌷",
    },
    {
      word: "Pre-wedding facial",
      phonetic: "/priː ˈwedɪŋ ˈfeɪʃl/",
      definition: "Chăm sóc da mặt trước ngày cưới",
      icon: "💐",
    },
    {
      word: "Bachelorette spa party",
      phonetic: "/ˌbætʃələˈret spɑː ˈpɑːti/",
      definition: "Tiệc spa chia tay đời độc thân",
      icon: "🥂",
    },
    {
      word: "Detox retreat weekend",
      phonetic: "/ˈdiːtɒks rɪˈtriːt ˌwiːkˈend/",
      definition: "Kỳ nghỉ cuối tuần thải độc",
      icon: "🌿",
    },
    {
      word: "Corporate wellness day",
      phonetic: "/ˈkɔːpərət ˈwelnəs deɪ/",
      definition: "Ngày chăm sóc sức khỏe cho công ty",
      icon: "🏢",
    },
    {
      word: "Family spa afternoon",
      phonetic: "/ˈfæməli spɑː ˌɑːftəˈnuːn/",
      definition: "Buổi chiều spa cho cả gia đình",
      icon: "👪",
    },
    {
      word: "New year cleansing ritual",
      phonetic: "/njuː jɪə ˈklenzɪŋ ˈrɪtʃuəl/",
      definition: "Nghi thức thanh lọc đầu năm mới",
      icon: "🎊",
    },
    {
      word: "Spa gift voucher",
      phonetic: "/spɑː ɡɪft ˈvaʊtʃə/",
      definition: "Phiếu quà tặng dịch vụ spa",
      icon: "🎁",
    },
  ],
  tradeoffs: [
    {
      word: "Extend the treatment time",
      phonetic: "/ɪkˈstend ðə ˈtriːtmənt taɪm/",
      definition: "Kéo dài thời gian liệu trình",
      icon: "⏱️",
    },
    {
      word: "Include a complimentary scrub",
      phonetic: "/ɪnˈkluːd ə ˌkɒmplɪˈmentri skrʌb/",
      definition: "Tặng kèm liệu trình tẩy da chết",
      icon: "✨",
    },
    {
      word: "Waive the treatment cancellation fee",
      phonetic: "/weɪv ðə ˈtriːtmənt ˌkænsəˈleɪʃn fiː/",
      definition: "Miễn phí hủy buổi trị liệu",
      icon: "🚫",
    },
    {
      word: "Upgrade the treatment room",
      phonetic: "/ˈʌpɡreɪd ðə ˈtriːtmənt ruːm/",
      definition: "Nâng cấp lên phòng trị liệu tốt hơn",
      icon: "🚪",
    },
    {
      word: "Add a foot massage",
      phonetic: "/æd ə fʊt ˈmæsɑːʒ/",
      definition: "Thêm phần xoa bóp chân",
      icon: "🦶",
    },
    {
      word: "Move the treatment earlier",
      phonetic: "/muːv ðə ˈtriːtmənt ˈɜːliə/",
      definition: "Dời liệu trình lên giờ sớm hơn",
      icon: "⏪",
    },
    {
      word: "Split the package sessions",
      phonetic: "/splɪt ðə ˈpækɪdʒ ˈseʃnz/",
      definition: "Chia nhỏ số buổi trong gói",
      icon: "➗",
    },
    {
      word: "Freeze the membership",
      phonetic: "/friːz ðə ˈmembəʃɪp/",
      definition: "Tạm dừng thẻ thành viên",
      icon: "🧊",
    },
    {
      word: "Add a take-home oil",
      phonetic: "/æd ə teɪk həʊm ɔɪl/",
      definition: "Tặng thêm chai tinh dầu mang về",
      icon: "🫗",
    },
    {
      word: "Arrange a four-hands massage",
      phonetic: "/əˈreɪndʒ ə fɔː hændz ˈmæsɑːʒ/",
      definition: "Sắp xếp hai kỹ thuật viên cùng làm",
      icon: "👐",
    },
    {
      word: "Transfer the unused session",
      phonetic: "/trænsˈfɜː ði ˌʌnˈjuːzd ˈseʃn/",
      definition: "Chuyển buổi chưa dùng cho người khác",
      icon: "🔁",
    },
    {
      word: "Reserve the private jacuzzi",
      phonetic: "/rɪˈzɜːv ðə ˈpraɪvət dʒəˈkuːzi/",
      definition: "Giữ riêng bồn sục cho khách",
      icon: "🛁",
    },
    {
      word: "Discount your next treatment",
      phonetic: "/ˈdɪskaʊnt jɔː nekst ˈtriːtmənt/",
      definition: "Giảm giá liệu trình lần sau",
      icon: "💰",
    },
    {
      word: "Open the sauna earlier",
      phonetic: "/ˈəʊpən ðə ˈsɔːnə ˈɜːliə/",
      definition: "Mở phòng xông hơi sớm hơn",
      icon: "🌫️",
    },
  ],
  emergencies: [
    // Slot order is semantic — see the note on the FO bank above.
    {
      word: "Severe allergic reaction",
      phonetic: "/sɪˈvɪə əˈlɜːdʒɪk riˈækʃn/",
      definition: "Phản ứng dị ứng nặng của khách",
      icon: "🚑",
    },
    {
      word: "Swimmer in difficulty",
      phonetic: "/ˈswɪmə ɪn ˈdɪfɪkəlti/",
      definition: "Người bơi đang gặp nguy",
      icon: "🛟",
    },
    {
      word: "Sauna overheating fault",
      phonetic: "/ˈsɔːnə ˌəʊvəˈhiːtɪŋ fɔːlt/",
      definition: "Lỗi khiến phòng xông hơi quá nóng",
      icon: "♨️",
    },
    {
      word: "Broken shower glass",
      phonetic: "/ˈbrəʊkən ˈʃaʊə ɡlɑːs/",
      definition: "Kính buồng tắm bị vỡ",
      icon: "🪟",
    },
    {
      word: "Pool water contamination",
      phonetic: "/puːl ˈwɔːtə kənˌtæmɪˈneɪʃn/",
      definition: "Nước hồ bơi bị nhiễm bẩn",
      icon: "💧",
    },
    {
      word: "Steam room breakdown",
      phonetic: "/stiːm ruːm ˈbreɪkdaʊn/",
      definition: "Phòng xông hơi ướt bị hỏng",
      icon: "🌫️",
    },
    {
      word: "Hot water failure",
      phonetic: "/hɒt ˈwɔːtə ˈfeɪljə/",
      definition: "Sự cố mất nước nóng",
      icon: "🚿",
    },
    {
      word: "Spa fire alarm",
      phonetic: "/spɑː ˈfaɪə əˈlɑːm/",
      definition: "Chuông báo cháy khu spa",
      icon: "🔔",
    },
    {
      word: "Treatment room power cut",
      phonetic: "/ˈtriːtmənt ruːm ˈpaʊə kʌt/",
      definition: "Mất điện tại phòng trị liệu",
      icon: "💡",
    },
    {
      word: "Pool chemical spill",
      phonetic: "/puːl ˈkemɪkl spɪl/",
      definition: "Sự cố đổ hóa chất hồ bơi",
      icon: "🧪",
    },
    {
      word: "Poolside slip and fall",
      phonetic: "/ˈpuːlsaɪd slɪp ənd fɔːl/",
      definition: "Vụ trượt ngã cạnh hồ bơi",
      icon: "⚠️",
    },
    {
      word: "Locker room theft",
      phonetic: "/ˈlɒkə ruːm θeft/",
      definition: "Vụ trộm ở phòng tủ đồ",
      icon: "🔓",
    },
    {
      word: "Sauna fainting incident",
      phonetic: "/ˈsɔːnə ˈfeɪntɪŋ ˈɪnsɪdənt/",
      definition: "Sự cố khách ngất trong phòng xông hơi",
      icon: "😵",
    },
    {
      word: "Steam burn incident",
      phonetic: "/stiːm bɜːn ˈɪnsɪdənt/",
      definition: "Sự cố bỏng do hơi nóng",
      icon: "🔥",
    },
  ],
  terms: [],
  proposal: [
    {
      word: "Wellness package summary",
      phonetic: "/ˈwelnəs ˈpækɪdʒ ˈsʌməri/",
      definition: "Phần tóm tắt gói chăm sóc sức khỏe",
      icon: "📄",
    },
    {
      word: "Treatment menu list",
      phonetic: "/ˈtriːtmənt ˈmenjuː lɪst/",
      definition: "Danh mục các liệu trình",
      icon: "📋",
    },
    {
      word: "Spa price breakdown",
      phonetic: "/spɑː praɪs ˈbreɪkdaʊn/",
      definition: "Bảng chi tiết từng khoản giá spa",
      icon: "💰",
    },
    {
      word: "Wellness programme outline",
      phonetic: "/ˈwelnəs ˈprəʊɡræm ˈaʊtlaɪn/",
      definition: "Khung chương trình chăm sóc sức khỏe",
      icon: "🗒️",
    },
    {
      word: "Group spa discount",
      phonetic: "/ɡruːp spɑː ˈdɪskaʊnt/",
      definition: "Mức giảm giá cho nhóm khách",
      icon: "👥",
    },
    {
      word: "Therapist profile",
      phonetic: "/ˈθerəpɪst ˈprəʊfaɪl/",
      definition: "Hồ sơ giới thiệu kỹ thuật viên",
      icon: "👤",
    },
    {
      word: "Suggested daily programme",
      phonetic: "/səˈdʒestɪd ˈdeɪli ˈprəʊɡræm/",
      definition: "Lịch trình gợi ý cho mỗi ngày",
      icon: "🗓️",
    },
    {
      word: "Included spa facilities",
      phonetic: "/ɪnˈkluːdɪd spɑː fəˈsɪlətiz/",
      definition: "Các khu tiện ích spa được dùng kèm",
      icon: "🏊",
    },
    {
      word: "Retreat itinerary",
      phonetic: "/rɪˈtriːt aɪˈtɪnərəri/",
      definition: "Hành trình của kỳ tĩnh dưỡng",
      icon: "📔",
    },
    {
      word: "Optional treatment add-ons",
      phonetic: "/ˈɒpʃənl ˈtriːtmənt ˈæd ɒnz/",
      definition: "Các liệu trình cộng thêm tùy chọn",
      icon: "➕",
    },
    {
      word: "Minimum retreat group size",
      phonetic: "/ˈmɪnɪməm rɪˈtriːt ɡruːp saɪz/",
      definition: "Số khách tối thiểu cho kỳ tĩnh dưỡng",
      icon: "🔢",
    },
    {
      word: "Seasonal spa rates",
      phonetic: "/ˈsiːzənl spɑː reɪts/",
      definition: "Bảng giá spa theo mùa",
      icon: "📊",
    },
    {
      word: "Treatment cancellation clause",
      phonetic: "/ˈtriːtmənt ˌkænsəˈleɪʃn klɔːz/",
      definition: "Điều khoản hủy liệu trình",
      icon: "🚫",
    },
    {
      word: "Wellness goal statement",
      phonetic: "/ˈwelnəs ɡəʊl ˈsteɪtmənt/",
      definition: "Phần nêu mục tiêu sức khỏe của khách",
      icon: "🎯",
    },
  ],
  wrapUp: [
    {
      word: "Spa package price",
      phonetic: "/spɑː ˈpækɪdʒ praɪs/",
      definition: "Giá của gói dịch vụ spa",
      icon: "💰",
    },
    {
      word: "Membership start date",
      phonetic: "/ˈmembəʃɪp stɑːt deɪt/",
      definition: "Ngày bắt đầu thẻ thành viên",
      icon: "📆",
    },
    {
      word: "Therapist request",
      phonetic: "/ˈθerəpɪst rɪˈkwest/",
      definition: "Yêu cầu về kỹ thuật viên",
      icon: "🙋",
    },
    {
      word: "Steam room access",
      phonetic: "/stiːm ruːm ˈækses/",
      definition: "Quyền sử dụng phòng xông hơi ướt",
      icon: "🌫️",
    },
    {
      word: "Signature ritual booking",
      phonetic: "/ˈsɪɡnətʃə ˈrɪtʃuəl ˈbʊkɪŋ/",
      definition: "Lịch đặt nghi thức đặc trưng",
      icon: "🕯️",
    },
    {
      word: "Treatment room number",
      phonetic: "/ˈtriːtmənt ruːm ˈnʌmbə/",
      definition: "Số phòng trị liệu của khách",
      icon: "🚪",
    },
    {
      word: "Spa arrival time",
      phonetic: "/spɑː əˈraɪvl taɪm/",
      definition: "Giờ khách có mặt tại spa",
      icon: "🕐",
    },
    {
      word: "Health waiver signature",
      phonetic: "/helθ ˈweɪvə ˈsɪɡnətʃə/",
      definition: "Chữ ký trên giấy cam kết sức khỏe",
      icon: "✍️",
    },
    {
      word: "Package inclusions",
      phonetic: "/ˈpækɪdʒ ɪnˈkluːʒnz/",
      definition: "Những phần đã gồm trong gói",
      icon: "📦",
    },
    {
      word: "Spa deposit payment",
      phonetic: "/spɑː dɪˈpɒzɪt ˈpeɪmənt/",
      definition: "Khoản tiền cọc dịch vụ spa",
      icon: "💳",
    },
    {
      word: "Guest pass number",
      phonetic: "/ɡest pɑːs ˈnʌmbə/",
      definition: "Số vé mời dành cho khách đi kèm",
      icon: "🎟️",
    },
    {
      word: "Follow-up treatment date",
      phonetic: "/ˈfɒləʊ ʌp ˈtriːtmənt deɪt/",
      definition: "Ngày hẹn trị liệu tiếp theo",
      icon: "🔁",
    },
    {
      word: "Missed session charge",
      phonetic: "/mɪst ˈseʃn tʃɑːdʒ/",
      definition: "Phí cho buổi hẹn bị bỏ lỡ",
      icon: "💸",
    },
    {
      word: "Guest preference note",
      phonetic: "/ɡest ˈprefrəns nəʊt/",
      definition: "Ghi chú sở thích của khách",
      icon: "📝",
    },
  ],
};

const GR_BANK: P4Bank = {
  story: [
    {
      word: "Founding story",
      phonetic: "/ˈfaʊndɪŋ ˈstɔːri/",
      definition: "Câu chuyện thành lập khách sạn",
      icon: "📖",
    },
    {
      word: "Founding family",
      phonetic: "/ˈfaʊndɪŋ ˈfæməli/",
      definition: "Gia đình đã sáng lập nơi này",
      icon: "👪",
    },
    {
      word: "Resident historian",
      phonetic: "/ˈrezɪdənt hɪˈstɔːriən/",
      definition: "Người kể sử của khách sạn",
      icon: "🎓",
    },
  ],
  preferences: [
    {
      word: "Preferred newspaper",
      phonetic: "/prɪˈfɜːd ˈnjuːzpeɪpə/",
      definition: "Tờ báo quý khách thích đọc",
      icon: "📰",
    },
    {
      word: "Seating habit",
      phonetic: "/ˈsiːtɪŋ ˈhæbɪt/",
      definition: "Thói quen chọn chỗ ngồi",
      icon: "🪑",
    },
  ],
  disputes: [
    {
      word: "Broken commitment",
      phonetic: "/ˈbrəʊkən kəˈmɪtmənt/",
      definition: "Cam kết không được thực hiện",
      icon: "💔",
    },
    {
      word: "Ignored preference",
      phonetic: "/ɪɡˈnɔːd ˈprefrəns/",
      definition: "Sở thích của khách bị bỏ qua",
      icon: "🙉",
    },
  ],
  occasions: [
    {
      word: "Proposal set-up",
      phonetic: "/prəˈpəʊzl ˈsetʌp/",
      definition: "Phần dàn dựng cho màn cầu hôn",
      icon: "💍",
    },
    {
      word: "Milestone anniversary",
      phonetic: "/ˈmaɪlstəʊn ˌænɪˈvɜːsəri/",
      definition: "Dịp kỷ niệm tròn năm quan trọng",
      icon: "💐",
    },
  ],
  tradeoffs: [
    {
      word: "Write off the night",
      phonetic: "/raɪt ɒf ðə naɪt/",
      definition: "Xóa tiền phòng của một đêm",
      icon: "🧾",
    },
    {
      word: "Arrange a private transfer",
      phonetic: "/əˈreɪndʒ ə ˈpraɪvət ˈtrænsfɜː/",
      definition: "Sắp xếp xe riêng đưa đón khách",
      icon: "🚙",
    },
    {
      word: "Grant lounge access",
      phonetic: "/ɡrɑːnt laʊndʒ ˈækses/",
      definition: "Cho phép khách vào phòng chờ",
      icon: "🛋️",
    },
    {
      word: "Offer a return voucher",
      phonetic: "/ˈɒfə ə rɪˈtɜːn ˈvaʊtʃə/",
      definition: "Tặng phiếu cho lần quay lại",
      icon: "🎟️",
    },
    {
      word: "Upgrade the whole stay",
      phonetic: "/ˈʌpɡreɪd ðə həʊl steɪ/",
      definition: "Nâng hạng cho trọn kỳ nghỉ",
      icon: "⬆️",
    },
    {
      word: "Restore your tier status",
      phonetic: "/rɪˈstɔː jɔː tɪə ˈsteɪtəs/",
      definition: "Khôi phục cấp hạng hội viên",
      icon: "🏅",
    },
    {
      word: "Double your bonus points",
      phonetic: "/ˈdʌbl jɔː ˈbəʊnəs pɔɪnts/",
      definition: "Nhân đôi số điểm thưởng",
      icon: "⭐",
    },
    {
      word: "Waive the cancellation fee",
      phonetic: "/weɪv ðə ˌkænsəˈleɪʃn fiː/",
      definition: "Miễn khoản phí hủy đặt chỗ",
      icon: "💸",
    },
    {
      word: "Host a private tasting",
      phonetic: "/həʊst ə ˈpraɪvət ˈteɪstɪŋ/",
      definition: "Tổ chức buổi thử món riêng",
      icon: "🍷",
    },
    {
      word: "Cover your dinner bill",
      phonetic: "/ˈkʌvə jɔː ˈdɪnə bɪl/",
      definition: "Chi trả hóa đơn bữa tối cho khách",
      icon: "🍽️",
    },
    {
      word: "Assign a personal butler",
      phonetic: "/əˈsaɪn ə ˈpɜːsənl ˈbʌtlə/",
      definition: "Cử quản gia riêng phục vụ khách",
      icon: "🤵",
    },
    {
      word: "Guarantee the same suite",
      phonetic: "/ˌɡærənˈtiː ðə seɪm swiːt/",
      definition: "Bảo đảm giữ đúng phòng cũ",
      icon: "🛏️",
    },
    {
      word: "Block the adjoining room",
      phonetic: "/blɒk ði əˈdʒɔɪnɪŋ ruːm/",
      definition: "Giữ luôn phòng bên cạnh",
      icon: "🚪",
    },
    {
      word: "Add two free nights",
      phonetic: "/æd tuː friː naɪts/",
      definition: "Tặng thêm hai đêm nghỉ",
      icon: "🌙",
    },
  ],
  emergencies: [
    // Slot order is semantic — see the note on the FO bank above. GR's bank
    // is mostly people and possessions, so two entries were re-authored as
    // physical hazards to fill the slots the crisis frames require.
    {
      word: "Guest collapse",
      phonetic: "/ɡest kəˈlæps/",
      definition: "Khách bị ngã quỵ",
      icon: "🚑",
    },
    {
      word: "Missing child",
      phonetic: "/ˈmɪsɪŋ tʃaɪld/",
      definition: "Trẻ nhỏ bị lạc",
      icon: "🧒",
    },
    {
      word: "Security incident",
      phonetic: "/sɪˈkjʊərəti ˈɪnsɪdənt/",
      definition: "Sự cố về an ninh",
      icon: "🚨",
    },
    {
      word: "Broken lobby glass",
      phonetic: "/ˈbrəʊkən ˈlɒbi ɡlɑːs/",
      definition: "Kính sảnh bị vỡ",
      icon: "🪟",
    },
    {
      word: "Lost passport",
      phonetic: "/lɒst ˈpɑːspɔːt/",
      definition: "Hộ chiếu của khách bị thất lạc",
      icon: "🛂",
    },
    {
      word: "Press intrusion",
      phonetic: "/pres ɪnˈtruːʒn/",
      definition: "Báo chí xâm phạm sự riêng tư",
      icon: "📷",
    },
    {
      word: "Fire alarm evacuation",
      phonetic: "/ˈfaɪər əˈlɑːm ɪˌvækjuˈeɪʃn/",
      definition: "Việc sơ tán khi có báo cháy",
      icon: "🔥",
    },
    {
      word: "Guest allergic reaction",
      phonetic: "/ɡest əˈlɜːdʒɪk riˈækʃn/",
      definition: "Khách bị phản ứng dị ứng",
      icon: "⚠️",
    },
    {
      word: "Lift breakdown",
      phonetic: "/lɪft ˈbreɪkdaʊn/",
      definition: "Thang máy bị hỏng giữa chừng",
      icon: "🛗",
    },
    {
      word: "Blocked lobby exit",
      phonetic: "/blɒkt ˈlɒbi ˈeksɪt/",
      definition: "Lối ra sảnh bị chắn",
      icon: "🚧",
    },
    {
      word: "Aggressive visitor",
      phonetic: "/əˈɡresɪv ˈvɪzɪtə/",
      definition: "Người lạ có thái độ hung hăng",
      icon: "😠",
    },
    {
      word: "Stolen handbag",
      phonetic: "/ˈstəʊlən ˈhændbæɡ/",
      definition: "Túi xách bị lấy cắp",
      icon: "👜",
    },
    {
      word: "Lost passport report",
      phonetic: "/lɒst ˈpɑːspɔːt rɪˈpɔːt/",
      definition: "Trình báo mất hộ chiếu",
      icon: "🛂",
    },
    {
      word: "Family emergency call",
      phonetic: "/ˈfæməli ɪˈmɜːdʒənsi kɔːl/",
      definition: "Cuộc gọi báo việc gấp từ gia đình",
      icon: "📞",
    },
  ],
  terms: [],
  proposal: [],
  wrapUp: [
    {
      word: "Preference update",
      phonetic: "/ˈprefrəns ˈʌpdeɪt/",
      definition: "Lần cập nhật sở thích của khách",
      icon: "📝",
    },
    {
      word: "Celebration date",
      phonetic: "/ˌselɪˈbreɪʃn deɪt/",
      definition: "Ngày diễn ra dịp kỷ niệm",
      icon: "🎉",
    },
    {
      word: "Escalation contact",
      phonetic: "/ˌeskəˈleɪʃn ˈkɒntækt/",
      definition: "Đầu mối chuyển việc lên cấp trên",
      icon: "☎️",
    },
    {
      word: "Compensation amount",
      phonetic: "/ˌkɒmpenˈseɪʃn əˈmaʊnt/",
      definition: "Mức bồi thường cho khách",
      icon: "💰",
    },
    {
      word: "Tier expiry date",
      phonetic: "/tɪə ɪkˈspaɪəri deɪt/",
      definition: "Ngày hết hạn của cấp hạng",
      icon: "⌛",
    },
    {
      word: "Consent status",
      phonetic: "/kənˈsent ˈsteɪtəs/",
      definition: "Tình trạng đồng ý của quý khách",
      icon: "✍️",
    },
    {
      word: "Incident report number",
      phonetic: "/ˈɪnsɪdənt rɪˈpɔːt ˈnʌmbə/",
      definition: "Số hiệu biên bản sự cố",
      icon: "🚨",
    },
    {
      word: "Transfer pick-up point",
      phonetic: "/ˈtrænsfɜː ˈpɪk ʌp pɔɪnt/",
      definition: "Điểm đón của xe đưa rước",
      icon: "🚙",
    },
    {
      word: "Voucher validity",
      phonetic: "/ˈvaʊtʃə vəˈlɪdəti/",
      definition: "Thời hạn sử dụng của phiếu",
      icon: "🎟️",
    },
    {
      word: "Decoration timing",
      phonetic: "/ˌdekəˈreɪʃn ˈtaɪmɪŋ/",
      definition: "Giờ hoàn tất phần trang trí",
      icon: "🕐",
    },
    {
      word: "Dietary note",
      phonetic: "/ˈdaɪətəri nəʊt/",
      definition: "Ghi chú về chế độ ăn của khách",
      icon: "🥗",
    },
    {
      word: "Flower delivery time",
      phonetic: "/ˈflaʊə dɪˈlɪvəri taɪm/",
      definition: "Giờ đưa hoa lên phòng",
      icon: "💐",
    },
    {
      word: "Preferred title",
      phonetic: "/prɪˈfɜːd ˈtaɪtl/",
      definition: "Danh xưng khách muốn được gọi",
      icon: "🎩",
    },
    {
      word: "Departure gift note",
      phonetic: "/dɪˈpɑːtʃə ɡɪft nəʊt/",
      definition: "Thiệp kèm quà tiễn khách",
      icon: "🎁",
    },
  ],
};

const BO_BANK: P4Bank = {
  story: [
    {
      word: "Market position",
      phonetic: "/ˈmɑːkɪt pəˈzɪʃn/",
      definition: "Vị thế trên thị trường",
      icon: "📍",
    },
    {
      word: "Guest satisfaction score",
      phonetic: "/ɡest ˌsætɪsˈfækʃn skɔː/",
      definition: "Điểm hài lòng của khách",
      icon: "⭐",
    },
    {
      word: "Sustainability certification",
      phonetic: "/səˌsteɪnəˈbɪləti ˌsɜːtɪfɪˈkeɪʃn/",
      definition: "Chứng nhận phát triển bền vững",
      icon: "🌱",
    },
    {
      word: "Award history",
      phonetic: "/əˈwɔːd ˈhɪstri/",
      definition: "Bề dày giải thưởng đã đạt",
      icon: "🏆",
    },
    {
      word: "Occupancy trend",
      phonetic: "/ˈɒkjəpənsi trend/",
      definition: "Xu hướng công suất phòng",
      icon: "📈",
    },
    {
      // Week 31 frames put this slot in a visitor's experience ("Many guests
      // describe the {w} as unforgettable.", "There is something calming
      // about the {w}.", "Families usually notice the {w} most.", "I hope
      // you will notice the {w} during your stay."). Internal metrics broke
      // every one of them. Back Office runs site inspections, so what it
      // shows a corporate client is the property itself.
      word: "Executive lounge",
      phonetic: "/ɪɡˈzekjʊtɪv laʊndʒ/",
      definition: "Phòng chờ hạng thương gia",
      icon: "🛋️",
    },
    {
      word: "Garden courtyard",
      phonetic: "/ˈɡɑːdn ˈkɔːtjɑːd/",
      definition: "Sân vườn trong",
      icon: "🌳",
    },
    {
      word: "Service track record",
      phonetic: "/ˈsɜːvɪs træk ˈrekɔːd/",
      definition: "Thành tích phục vụ nhiều năm",
      icon: "📊",
    },
    {
      word: "Conference capacity",
      phonetic: "/ˈkɒnfrəns kəˈpæsəti/",
      definition: "Sức chứa khu hội nghị",
      icon: "🏛️",
    },
    {
      word: "Location advantage",
      phonetic: "/ləʊˈkeɪʃn ədˈvɑːntɪdʒ/",
      definition: "Lợi thế về vị trí",
      icon: "🗺️",
    },
    {
      word: "Family suite layout",
      phonetic: "/ˈfæməli swiːt ˈleɪaʊt/",
      definition: "Bố trí phòng suite gia đình",
      icon: "🛏️",
    },
    {
      word: "Upper floor",
      phonetic: "/ˈʌpə flɔː/",
      definition: "Tầng cao",
      icon: "🏙️",
    },
    {
      word: "Riverside terrace",
      phonetic: "/ˈrɪvəsaɪd ˈterəs/",
      definition: "Sân hiên bên sông",
      icon: "🌅",
    },
    {
      word: "Client testimonial",
      phonetic: "/ˈklaɪənt ˌtestɪˈməʊniəl/",
      definition: "Lời nhận xét của khách hàng",
      icon: "💬",
    },
  ],
  preferences: [
    {
      word: "Preferred billing cycle",
      phonetic: "/prɪˈfɜːd ˈbɪlɪŋ ˈsaɪkl/",
      definition: "Chu kỳ xuất hóa đơn mong muốn",
      icon: "📆",
    },
    {
      word: "Room type mix",
      phonetic: "/ruːm taɪp mɪks/",
      definition: "Cơ cấu các loại phòng",
      icon: "🛏️",
    },
    {
      word: "Meeting layout",
      phonetic: "/ˈmiːtɪŋ ˈleɪaʊt/",
      definition: "Kiểu bố trí phòng họp",
      icon: "🪑",
    },
    {
      word: "Budget ceiling",
      phonetic: "/ˈbʌdʒɪt ˈsiːlɪŋ/",
      definition: "Mức trần ngân sách",
      icon: "💰",
    },
    {
      word: "Decision timeline",
      phonetic: "/dɪˈsɪʒn ˈtaɪmlaɪn/",
      definition: "Lộ trình ra quyết định",
      icon: "⏳",
    },
    {
      word: "Payment method preference",
      phonetic: "/ˈpeɪmənt ˈmeθəd ˈprefrəns/",
      definition: "Hình thức thanh toán quen dùng",
      icon: "💳",
    },
    {
      word: "Preferred contact channel",
      phonetic: "/prɪˈfɜːd ˈkɒntækt ˈtʃænl/",
      definition: "Kênh liên hệ quen dùng",
      icon: "📱",
    },
    {
      word: "Invoice format",
      phonetic: "/ˈɪnvɔɪs ˈfɔːmæt/",
      definition: "Định dạng hóa đơn yêu cầu",
      icon: "🧾",
    },
    {
      word: "Approved supplier list",
      phonetic: "/əˈpruːvd səˈplaɪə lɪst/",
      definition: "Danh sách nhà cung cấp được duyệt",
      icon: "✅",
    },
    {
      word: "Travel policy limit",
      phonetic: "/ˈtrævl ˈpɒləsi ˈlɪmɪt/",
      definition: "Hạn mức chi công tác",
      icon: "✈️",
    },
    {
      word: "Reporting frequency",
      phonetic: "/rɪˈpɔːtɪŋ ˈfriːkwənsi/",
      definition: "Tần suất gửi báo cáo",
      icon: "📊",
    },
    {
      word: "Catering budget per head",
      phonetic: "/ˈkeɪtərɪŋ ˈbʌdʒɪt pə hed/",
      definition: "Ngân sách ăn uống mỗi khách",
      icon: "🍽️",
    },
    {
      word: "Contract start month",
      phonetic: "/ˈkɒntrækt stɑːt mʌnθ/",
      definition: "Tháng bắt đầu hợp đồng",
      icon: "📅",
    },
    {
      word: "Signing authority",
      phonetic: "/ˈsaɪnɪŋ ɔːˈθɒrəti/",
      definition: "Thẩm quyền ký duyệt",
      icon: "✍️",
    },
  ],
  disputes: [
    {
      word: "Invoice discrepancy",
      phonetic: "/ˈɪnvɔɪs dɪsˈkrepənsi/",
      definition: "Sai lệch số liệu trên hóa đơn",
      icon: "⚖️",
    },
    {
      word: "Unapplied discount",
      phonetic: "/ˌʌnəˈplaɪd ˈdɪskaʊnt/",
      definition: "Chiết khấu chưa được áp dụng",
      icon: "🏷️",
    },
    {
      word: "Duplicate charge",
      phonetic: "/ˈdjuːplɪkət tʃɑːdʒ/",
      definition: "Khoản thu bị lặp lại",
      icon: "💳",
    },
    {
      word: "Missed deadline",
      phonetic: "/mɪst ˈdedlaɪn/",
      definition: "Trễ hạn đã cam kết",
      icon: "⏰",
    },
    {
      word: "Contract breach",
      phonetic: "/ˈkɒntrækt briːtʃ/",
      definition: "Vi phạm hợp đồng",
      icon: "📄",
    },
    {
      word: "Unauthorised charge",
      phonetic: "/ʌnˈɔːθəraɪzd tʃɑːdʒ/",
      definition: "Khoản thu không được chấp thuận",
      icon: "🚫",
    },
    {
      word: "Unexpected rate increase",
      phonetic: "/ˌʌnɪkˈspektɪd reɪt ɪnˈkriːs/",
      definition: "Tăng giá ngoài dự kiến",
      icon: "📈",
    },
    {
      word: "Missing credit note",
      phonetic: "/ˈmɪsɪŋ ˈkredɪt nəʊt/",
      definition: "Thiếu giấy báo có",
      icon: "🧾",
    },
    {
      word: "Service level shortfall",
      phonetic: "/ˈsɜːvɪs ˈlevl ˈʃɔːtfɔːl/",
      definition: "Không đạt mức dịch vụ cam kết",
      icon: "📉",
    },
    {
      word: "Overbooked room block",
      phonetic: "/ˌəʊvəˈbʊkt ruːm blɒk/",
      definition: "Số phòng giữ chỗ bị bán vượt",
      icon: "🏨",
    },
    {
      word: "Late contract amendment",
      phonetic: "/leɪt ˈkɒntrækt əˈmendmənt/",
      definition: "Sửa hợp đồng quá muộn",
      icon: "✏️",
    },
    {
      word: "Currency conversion error",
      phonetic: "/ˈkʌrənsi kənˈvɜːʃn ˈerə/",
      definition: "Sai sót khi quy đổi tiền tệ",
      icon: "💱",
    },
    {
      word: "Unreturned deposit",
      phonetic: "/ˌʌnrɪˈtɜːnd dɪˈpɒzɪt/",
      definition: "Tiền cọc chưa được trả lại",
      icon: "💰",
    },
    {
      word: "Incorrect tax rate",
      phonetic: "/ˌɪnkəˈrekt tæks reɪt/",
      definition: "Áp sai thuế suất",
      icon: "🧮",
    },
  ],
  occasions: [
    {
      word: "Annual conference",
      phonetic: "/ˈænjuəl ˈkɒnfrəns/",
      definition: "Hội nghị thường niên",
      icon: "🏛️",
    },
    {
      word: "Incentive trip",
      phonetic: "/ɪnˈsentɪv trɪp/",
      definition: "Chuyến đi khen thưởng nhân viên",
      icon: "🎯",
    },
    {
      word: "Product launch",
      phonetic: "/ˈprɒdʌkt lɔːntʃ/",
      definition: "Lễ ra mắt sản phẩm",
      icon: "🚀",
    },
    {
      word: "Gala dinner",
      phonetic: "/ˈɡɑːlə ˈdɪnə/",
      definition: "Tiệc tối trang trọng",
      icon: "🥂",
    },
    {
      word: "Roadshow",
      phonetic: "/ˈrəʊdʃəʊ/",
      definition: "Chuỗi sự kiện giới thiệu lưu động",
      icon: "🚌",
    },
    {
      word: "Award ceremony",
      phonetic: "/əˈwɔːd ˈserəməni/",
      definition: "Lễ trao giải",
      icon: "🏆",
    },
    {
      word: "Team building programme",
      phonetic: "/tiːm ˈbɪldɪŋ ˈprəʊɡræm/",
      definition: "Chương trình gắn kết đội ngũ",
      icon: "🤝",
    },
    {
      word: "Exhibition booth",
      phonetic: "/ˌeksɪˈbɪʃn buːθ/",
      definition: "Gian hàng triển lãm",
      icon: "🎪",
    },
    {
      word: "Networking reception",
      phonetic: "/ˈnetwɜːkɪŋ rɪˈsepʃn/",
      definition: "Tiệc giao lưu kết nối",
      icon: "🍸",
    },
    {
      word: "Shareholder meeting",
      phonetic: "/ˈʃeəhəʊldə ˈmiːtɪŋ/",
      definition: "Cuộc họp cổ đông",
      icon: "📊",
    },
    {
      word: "Training workshop",
      phonetic: "/ˈtreɪnɪŋ ˈwɜːkʃɒp/",
      definition: "Buổi tập huấn chuyên môn",
      icon: "📚",
    },
    {
      word: "Press conference",
      phonetic: "/pres ˈkɒnfrəns/",
      definition: "Buổi họp báo",
      icon: "🎤",
    },
    {
      word: "Year-end party",
      phonetic: "/jɪər end ˈpɑːti/",
      definition: "Tiệc tất niên",
      icon: "🎉",
    },
    {
      word: "Signing ceremony",
      phonetic: "/ˈsaɪnɪŋ ˈserəməni/",
      definition: "Lễ ký kết",
      icon: "✒️",
    },
  ],
  tradeoffs: [
    {
      word: "Extend the payment terms",
      phonetic: "/ɪkˈstend ðə ˈpeɪmənt tɜːmz/",
      definition: "Kéo dài kỳ hạn thanh toán",
      icon: "📆",
    },
    {
      word: "Include a meeting room",
      phonetic: "/ɪnˈkluːd ə ˈmiːtɪŋ ruːm/",
      definition: "Tặng kèm một phòng họp",
      icon: "🎁",
    },
    {
      word: "Reduce the deposit",
      phonetic: "/rɪˈdjuːs ðə dɪˈpɒzɪt/",
      definition: "Giảm mức tiền đặt cọc",
      icon: "💰",
    },
    {
      word: "Add complimentary room nights",
      phonetic: "/æd ˌkɒmplɪˈmentri ruːm naɪts/",
      definition: "Tặng thêm đêm phòng miễn phí",
      icon: "🌙",
    },
    {
      word: "Waive the amendment fee",
      phonetic: "/weɪv ði əˈmendmənt fiː/",
      definition: "Miễn phí sửa đổi hợp đồng",
      icon: "✂️",
    },
    {
      word: "Freeze the rate",
      phonetic: "/friːz ðə reɪt/",
      definition: "Giữ nguyên mức giá",
      icon: "❄️",
    },
    {
      word: "Upgrade the coffee break",
      phonetic: "/ˈʌpɡreɪd ðə ˈkɒfi breɪk/",
      definition: "Nâng cấp phần tiệc trà",
      icon: "☕",
    },
    {
      word: "Widen the room block",
      phonetic: "/ˈwaɪdn ðə ruːm blɒk/",
      definition: "Mở rộng số phòng giữ chỗ",
      icon: "🏨",
    },
    {
      word: "Move the release date",
      phonetic: "/muːv ðə rɪˈliːs deɪt/",
      definition: "Dời ngày trả phòng chưa dùng",
      icon: "📅",
    },
    {
      word: "Share the marketing cost",
      phonetic: "/ʃeə ðə ˈmɑːkɪtɪŋ kɒst/",
      definition: "Chia sẻ chi phí quảng bá",
      icon: "📣",
    },
    {
      word: "Lower the minimum spend",
      phonetic: "/ˈləʊə ðə ˈmɪnɪməm spend/",
      definition: "Hạ mức chi tiêu tối thiểu",
      icon: "📉",
    },
    {
      word: "Offer a free upgrade",
      phonetic: "/ˈɒfər ə friː ˈʌpɡreɪd/",
      definition: "Tặng một lượt nâng hạng",
      icon: "⬆️",
    },
    {
      word: "Guarantee the same rate",
      phonetic: "/ˌɡærənˈtiː ðə seɪm reɪt/",
      definition: "Bảo đảm giữ nguyên giá",
      icon: "🔒",
    },
    {
      word: "Absorb the service charge",
      phonetic: "/əbˈzɔːb ðə ˈsɜːvɪs tʃɑːdʒ/",
      definition: "Chịu phần phí phục vụ",
      icon: "🤲",
    },
  ],
  emergencies: [
    // Slot order is semantic — see the note on the FO bank above.
    {
      // Slot 0 is the incident a guest can SEE, reported in week 36 and again
      // in the week-39 pressure drill ("There is a {w} at the property.
      // Please stay calm and follow me."). A cash shortage is a back-office
      // problem no guest ever panics about, so the drill made no sense here.
      word: "Building power failure",
      phonetic: "/ˈbɪldɪŋ ˈpaʊə ˈfeɪljə/",
      definition: "Sự cố mất điện toàn toà nhà",
      icon: "🔌",
    },
    {
      word: "Payment gateway failure",
      phonetic: "/ˈpeɪmənt ˈɡeɪtweɪ ˈfeɪljə/",
      definition: "Lỗi cổng thanh toán",
      icon: "💳",
    },
    {
      word: "Booking system crash",
      phonetic: "/ˈbʊkɪŋ ˈsɪstəm kræʃ/",
      definition: "Hệ thống đặt phòng ngừng chạy",
      icon: "🖥️",
    },
    {
      word: "Server room flood",
      phonetic: "/ˈsɜːvə ruːm flʌd/",
      definition: "Ngập nước phòng máy chủ",
      icon: "🌊",
    },
    {
      word: "Mass cancellation",
      phonetic: "/mæs ˌkænsəˈleɪʃn/",
      definition: "Làn sóng hủy đặt chỗ",
      icon: "📉",
    },
    {
      word: "Overbooking crisis",
      phonetic: "/ˌəʊvəˈbʊkɪŋ ˈkraɪsɪs/",
      definition: "Khủng hoảng bán vượt số phòng",
      icon: "🛎️",
    },
    { word: "Data breach", phonetic: "/ˈdeɪtə briːtʃ/", definition: "Rò rỉ dữ liệu", icon: "🔓" },
    {
      word: "Fraudulent booking",
      phonetic: "/ˈfrɔːdjələnt ˈbʊkɪŋ/",
      definition: "Đặt phòng gian lận",
      icon: "🚨",
    },
    {
      word: "System outage",
      phonetic: "/ˈsɪstəm ˈaʊtɪdʒ/",
      definition: "Sự cố ngừng hệ thống",
      icon: "💻",
    },
    {
      word: "Bank transfer failure",
      phonetic: "/bæŋk ˈtrænsfɜː ˈfeɪljə/",
      definition: "Chuyển khoản không thành công",
      icon: "🏦",
    },
    {
      word: "Supplier default",
      phonetic: "/səˈplaɪə dɪˈfɔːlt/",
      definition: "Nhà cung cấp không giao được",
      icon: "🏭",
    },
    {
      word: "Lost contract file",
      phonetic: "/lɒst ˈkɒntrækt faɪl/",
      definition: "Thất lạc hồ sơ hợp đồng",
      icon: "📁",
    },
    {
      word: "Payroll delay",
      phonetic: "/ˈpeɪrəʊl dɪˈleɪ/",
      definition: "Chậm chi trả lương",
      icon: "💵",
    },
    {
      word: "Hacked email account",
      phonetic: "/hækt ˈiːmeɪl əˈkaʊnt/",
      definition: "Tài khoản thư bị xâm nhập",
      icon: "✉️",
    },
  ],
  terms: [],
  proposal: [],
  wrapUp: [
    {
      word: "Contract value",
      phonetic: "/ˈkɒntrækt ˈvæljuː/",
      definition: "Giá trị hợp đồng",
      icon: "💵",
    },
    { word: "Signing date", phonetic: "/ˈsaɪnɪŋ deɪt/", definition: "Ngày ký kết", icon: "🖊️" },
    {
      word: "Credit terms",
      phonetic: "/ˈkredɪt tɜːmz/",
      definition: "Điều kiện công nợ",
      icon: "💳",
    },
    {
      word: "Event budget",
      phonetic: "/ɪˈvent ˈbʌdʒɪt/",
      definition: "Ngân sách cho sự kiện",
      icon: "💰",
    },
    {
      word: "Delegate number",
      phonetic: "/ˈdelɪɡət ˈnʌmbə/",
      definition: "Số đại biểu tham dự",
      icon: "👥",
    },
    {
      word: "Room night total",
      phonetic: "/ruːm naɪt ˈtəʊtl/",
      definition: "Tổng số đêm phòng",
      icon: "🏨",
    },
    {
      word: "Discount percentage",
      phonetic: "/ˈdɪskaʊnt pəˈsentɪdʒ/",
      definition: "Tỷ lệ chiết khấu",
      icon: "🏷️",
    },
    {
      word: "Deposit amount",
      phonetic: "/dɪˈpɒzɪt əˈmaʊnt/",
      definition: "Số tiền đặt cọc",
      icon: "🪙",
    },
    {
      word: "Meeting start time",
      phonetic: "/ˈmiːtɪŋ stɑːt taɪm/",
      definition: "Giờ bắt đầu cuộc họp",
      icon: "🕘",
    },
    {
      word: "Contact email address",
      phonetic: "/ˈkɒntækt ˈiːmeɪl əˈdres/",
      definition: "Địa chỉ thư liên hệ",
      icon: "📧",
    },
    {
      word: "Billing company name",
      phonetic: "/ˈbɪlɪŋ ˈkʌmpəni neɪm/",
      definition: "Tên công ty xuất hóa đơn",
      icon: "🏢",
    },
    {
      word: "Payment reference",
      phonetic: "/ˈpeɪmənt ˈrefrəns/",
      definition: "Nội dung ghi khi chuyển khoản",
      icon: "🔢",
    },
    {
      word: "Contract expiry date",
      phonetic: "/ˈkɒntrækt ɪkˈspaɪəri deɪt/",
      definition: "Ngày hết hạn hợp đồng",
      icon: "📆",
    },
    {
      word: "Final invoice total",
      phonetic: "/ˈfaɪnl ˈɪnvɔɪs ˈtəʊtl/",
      definition: "Tổng tiền hóa đơn cuối cùng",
      icon: "🧾",
    },
  ],
};

export const P4_BANKS: Record<string, P4Bank> = {
  FO: FO_BANK,
  FB: FB_BANK,
  HK: HK_BANK,
  SW: SW_BANK,
  GR: GR_BANK,
  BO: BO_BANK,
};
