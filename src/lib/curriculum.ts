// Local fallback for the 40-week frame (docs/curriculum-level-matrix.md).
// Used when Supabase reads return empty so the Tier 2 timeline and Tier 3
// lesson step indicators always render with zero missing nodes.
//
// Weeks 1-14 share one spine across all departments (Phase 0-1 of the
// matrix); authored weeks pull their real titles from week-content.ts;
// everything else renders a generic placeholder.

import { getWeekContent } from "@/lib/content/week-content";

export const TOTAL_WEEKS = 40;

export type CurriculumWeek = {
  department_id: string;
  week_number: number;
  title_en: string;
  title_vi: string;
  lessons: string[]; // 4 Vietnamese sub-lesson titles, ordered 1..4
};

// Shared Phase 0-1 spine + checkpoint weeks — mirrors the scenario
// titles seeded by migration 20260721150000_forty_week_frame.sql.
const SPINE_TITLES: Record<number, { en: string; vi: string }> = {
  1: { en: "Alphabet, Names & Greetings", vi: "Bảng chữ cái, Đánh vần tên & Chào hỏi" },
  2: { en: "Numbers, Rooms & Floors", vi: "Số đếm, Số phòng & Số tầng" },
  3: { en: "Times, Dates & Opening Hours", vi: "Giờ, Ngày & Giờ mở cửa dịch vụ" },
  4: { en: "Prices, Money & Quantities", vi: "Giá cả, Tiền tệ & Số lượng" },
  5: { en: "Core Courtesy Phrases", vi: "Cụm câu lịch sự cốt lõi" },
  6: { en: "Checkpoint — Survival Foundation", vi: "Kiểm tra tổng hợp — Nền tảng sống còn" },
  7: { en: "People & Jobs in the Hotel", vi: "Con người & Công việc trong khách sạn" },
  8: { en: "Places & Directions", vi: "Vị trí & Chỉ đường trong khuôn viên" },
  9: { en: "Simple Guest Requests", vi: "Yêu cầu đơn giản của khách" },
  10: { en: "Describing Things & States", vi: "Mô tả đồ vật & Trạng thái" },
  11: { en: "Schedules & Shift Routines", vi: "Lịch trình & Thói quen ca làm" },
  12: { en: "Answering the Phone", vi: "Nghe điện thoại cơ bản" },
  13: { en: "Simple Problems & Apologies", vi: "Sự cố đơn giản & Xin lỗi" },
  14: { en: "Checkpoint — First Sentences", vi: "Kiểm tra tổng hợp — Giao tiếp câu đơn" },
  22: { en: "Checkpoint — Core SOP Service", vi: "Kiểm tra tổng hợp — Nghiệp vụ chuẩn" },
  30: { en: "Checkpoint — Proactive Service", vi: "Kiểm tra tổng hợp — Dịch vụ chủ động" },
  40: { en: "Final Assessment — B1.1 Hospitality", vi: "Đánh giá cuối khóa — B1.1 nghiệp vụ" },
};

const GENERIC_LESSONS_VI = [
  "Chào đón khách",
  "Quy trình phục vụ",
  "Xử lý yêu cầu",
  "Tiễn khách & khắc phục",
];

function buildWeek(code: string, week: number): CurriculumWeek {
  const dep = code.toUpperCase();
  const authored = getWeekContent(dep, week);
  if (authored) {
    return {
      department_id: dep,
      week_number: week,
      title_en: authored.weekTitleEn,
      title_vi: authored.weekTitleVi,
      lessons: authored.lessons.map((l) => l.titleVi),
    };
  }
  const spine = SPINE_TITLES[week];
  return {
    department_id: dep,
    week_number: week,
    title_en: spine?.en ?? `Week ${week}`,
    title_vi: spine?.vi ?? `Tuần ${week}`,
    lessons: GENERIC_LESSONS_VI.map((t) => `${t} (Tuần ${week})`),
  };
}

export function weeksForDepartment(code: string): CurriculumWeek[] {
  return Array.from({ length: TOTAL_WEEKS }, (_, i) => buildWeek(code, i + 1));
}

export function findWeek(code: string, week: number | string): CurriculumWeek | undefined {
  const wn = typeof week === "string" ? parseInt(week, 10) : week;
  if (!Number.isFinite(wn) || wn < 1 || wn > TOTAL_WEEKS) return undefined;
  return buildWeek(code, wn);
}

// ------------------------------------------------------------------
// TOPIC SEEDS — the original "Classic Luxury" outline, kept ONLY as
// source material for authoring future week content (P2-P4 slots).
// ⚠️ Its week numbering follows the RETIRED model (20 weeks split
// across departments) and must NOT be used for week lookup.
// ------------------------------------------------------------------
export const TOPIC_SEEDS: CurriculumWeek[] = [
  {
    department_id: "FO",
    week_number: 1,
    title_en: "Standard Check-in & OTA Booking Verification",
    title_vi: "Quy trình Đón tiếp & Check-in Khách Lẻ (OTA/Direct)",
    lessons: [
      "Chào đón tại cửa/sảnh, khảo sát danh tính và kiểm tra thông tin đặt phòng trên hệ thống PMS (Agoda, Booking.com...)",
      "Quy trình mượn Hộ chiếu/CCCD, giải thích thủ tục đăng ký lưu trú với công an bản địa theo luật Việt Nam",
      "Thực hiện quẹt thẻ tạm giữ/đặt cọc (Pre-authorization) để bảo đảm các chi phí phát sinh",
      "Giới thiệu tiện ích cốt lõi của khách sạn (Vị trí nhà hàng buffet, giờ mở cửa hồ bơi), giao chìa khóa phòng và hướng dẫn lối đi thang máy",
    ],
  },
  {
    department_id: "FO",
    week_number: 2,
    title_en: "Group & MICE Check-in Management",
    title_vi: "Quản lý Đoàn Khách Tour & Phái Đoàn Doanh Nghiệp (MICE Groups)",
    lessons: [
      "Làm việc trực tiếp với Trưởng đoàn (Tour Leader) hoặc Đầu mối Ban tổ chức để đối chiếu danh sách phòng (Rooming List)",
      "Quy trình phát phòng nhanh (Express Check-in), điều phối hành lý phối hợp với bộ phận Bellman",
      "Xử lý các tình huống phát sinh ngay tại sảnh: Khách đổi phòng chéo cho nhau, yêu cầu tách hóa đơn phòng riêng lẻ",
      "Thông báo thông tin tập trung cho đoàn: Giờ ăn sáng tập thể, lịch trình xe bus đưa đón của sự kiện",
    ],
  },
  {
    department_id: "FO",
    week_number: 3,
    title_en: "Local Tour Booking & Transport Assistance",
    title_vi: "Trợ Lý Hành Trình (Concierge Desk & Local Tourism)",
    lessons: [
      "Hướng dẫn đường đi, bản đồ địa phương và tư vấn lịch trình tham quan tự túc trong ngày (Hạ Long, Ba Na Hills, Hội An...)",
      "Quy trình đặt hộ vé tham quan, hỗ trợ gọi taxi chính hãng hoặc hướng dẫn khách cài đặt, sử dụng ứng dụng đặt xe công nghệ (Grab, Xanh SM)",
      "Giới thiệu văn hóa ẩm thực địa phương, gợi ý các nhà hàng chuẩn bản địa từ quán ăn đường phố uy tín đến nhà hàng Fine-dining",
      "Xử lý các yêu cầu đặc biệt: Đặt hoa tặng đối tác, tìm mua thuốc tây khẩn cấp cho khách nước ngoài",
    ],
  },
  {
    department_id: "FO",
    week_number: 4,
    title_en: "Payment Settlements, Taxes & Currency Exchange",
    title_vi: "Quy Trình Check-out, Thuế VAT & Đổi Ngoại Tệ",
    lessons: [
      "Tiếp nhận chìa khóa phòng, xác nhận sử dụng dịch vụ Mini-bar/Giặt là và đối chiếu hóa đơn tổng (Master Bill)",
      "Giải thích các khoản chi phí bao gồm Thuế GTGT (VAT 8-10%) và Phí phục vụ (Service Charge 5%) một cách minh bạch",
      "Xử lý quy trình đổi ngoại tệ tại quầy (USD/EUR sang VND) đúng biểu phí pháp lý công khai",
      "Tiễn khách bằng kỹ thuật tạo ấn tượng cuối (Last Impression), khảo sát mức độ hài lòng và thu thập phản hồi",
    ],
  },
  {
    department_id: "FO",
    week_number: 5,
    title_en: "Localized Service Recovery",
    title_vi: "Cứu Vãn Dịch Vụ Sảnh (Front Office Service Recovery)",
    lessons: [
      "Xử lý phàn nàn khi phòng chưa sẵn sàng lúc cao điểm (Late Turnaround) bằng cách mời khách sử dụng Welcome Drink hoặc Lounge miễn phí",
      "Giải quyết sự cố kỹ thuật hạ tầng nhiệt đới: Điều hòa hỏng, phòng bốc mùi ẩm mốc hoặc có tiếng ồn từ công trình lân cận",
      "Ứng phó khủng hoảng thời tiết bất khả kháng: Khách bị kẹt lại do bão/mưa lớn, hỗ trợ đổi hủy lịch trình bay ngoại giao",
      "Áp dụng kỹ thuật xoa dịu LAST / HEAT để bồi thường thiệt hại (Tặng voucher Spa, nâng hạng phòng miễn phí)",
    ],
  },
  {
    department_id: "FB",
    week_number: 6,
    title_en: "Breakfast Buffet Welcoming & Station Mapping",
    title_vi: "Điều Phối & Đón Tiếp Tại Nhà Hàng Buffet Sáng",
    lessons: [
      "Chào đón khách tại cửa nhà hàng, kiểm tra số phòng/phiếu ăn sáng trên hệ thống PMS hoặc danh sách lưu trú",
      "Quản lý hàng đợi (Queue Management) và điều phối chỗ ngồi khéo léo trong khung giờ cao điểm (Peak Hours: 8:00 - 9:30 AM)",
      "Dẫn khách vào bàn ăn, giới thiệu sơ đồ các quầy line buffet (Quầy Phở/Trứng nóng, quầy bánh mì, khu vực nước trái cây)",
      "Tương tác dọn đĩa bẩn tại bàn (Clearing protocol) và chủ động hỏi thăm mức độ hài lòng của khách trong lúc dùng bữa",
    ],
  },
  {
    department_id: "FB",
    week_number: 7,
    title_en: "Presenting Local Cuisine & Coffee Culture",
    title_vi: "Quảng Bá Văn Hóa Ẩm Thực Bản Địa (Culinary Storytelling)",
    lessons: [
      "Giới thiệu chi tiết nguyên liệu và cách thưởng thức các món ăn di sản (Phở bò, Bánh mì, Chả giò Việt Nam) cho du khách nước ngoài",
      "Hướng dẫn trải nghiệm văn hóa Cà phê Việt Nam (Cà phê sữa đá, Cà phê trứng, Bạc sỉu) một cách cuốn hút",
      "Giao tiếp khai thác thông tin dị ứng (Allergies) hoặc chế độ ăn kiêng đặc biệt (Ăn chay, không ăn tinh bột, không gluten)",
      "Đề xuất các món ăn đặc sản Signature của nhà hàng dựa trên sở thích riêng của từng nhóm khách",
    ],
  },
  {
    department_id: "FB",
    week_number: 8,
    title_en: "A La Carte Order Taking & Wine Upselling",
    title_vi: "Quy Trình Phục Vụ Gọi Món (A La Carte) & Nghệ Thuật Upselling",
    lessons: [
      "Quy trình trải khăn ăn, phục vụ nước lọc/welcome bread và giới thiệu menu A la carte chuẩn chỉnh",
      "Kỹ thuật tư vấn gợi ý món ăn kèm (Cross-selling) and upselling các dòng rượu vang cao cấp phối hợp với món ăn (Wine Pairing)",
      "Quy trình ghi nhận order tỉ mỉ, áp dụng nguyên tắc lặp lại order (Repeat-order protocol) để tránh sai sót",
      "Giao tiếp phục vụ tại bàn: Trình bày món ăn, rót rượu vang đúng quy chuẩn và duy trì khoảng cách tinh tế",
    ],
  },
  {
    department_id: "FB",
    week_number: 9,
    title_en: "Gastronomic Service Recovery",
    title_vi: "Xử Lý Sự Cố Tại Phòng Ăn (F&B Service Recovery)",
    lessons: [
      "Xử lý phàn nàn khi nhà hàng lên món quá chậm (Long ticket time) hoặc phục vụ nhầm order của bàn khác",
      "Giải quyết tình huống khách không hài lòng về chất lượng đồ ăn (Steak sai độ chín, súp bị nguội, thức ăn quá mặn)",
      "Ứng phó sự cố vật lý nhạy cảm: Nhân viên làm đổ nước/súp lên trang phục của khách hoặc khách làm rơi vỡ dụng cụ ăn uống",
      "Xử lý tranh chấp hóa đơn ăn uống (Tính sai số lượng món, áp dụng nhầm chương trình giảm giá Happy Hour)",
    ],
  },
  {
    department_id: "HK",
    week_number: 10,
    title_en: "Room Service Requests & Extra Amenities",
    title_vi: "Quy Trình Giao Tiếp Phòng Khách & Phục Vụ Tiện Ích",
    lessons: [
      "Quy trình gõ cửa và thông báo danh tính trước khi vào phòng (Knocking & Announcement SOP) đối với phòng có khách",
      "Tiếp nhận và xử lý yêu cầu cung cấp thêm đồ amenities (Khăn tắm, bàn cạo râu, nước uống miễn phí)",
      "Quy trình setup và giải thích dịch vụ giường phụ (Rollaway bed) hoặc mượn các thiết bị chuyển đổi ổ cắm (Adapter), bàn là",
      "Giao tiếp xử lý khi phòng treo biển DND (Do Not Disturb) nhưng cần liên hệ để dọn dẹp hoặc trả đồ",
    ],
  },
  {
    department_id: "HK",
    week_number: 11,
    title_en: "Express Laundry Service & Damage Disputes",
    title_vi: "Dịch Vụ Giặt Là Cao Cấp & Tranh Chấp Đồ Vải",
    lessons: [
      "Quy trình kiểm tra, đếm và ghi nhận tình trạng đồ giặt là (Laundry Service) trực tiếp với khách tại phòng",
      "Giải thích các phân hệ dịch vụ: Giặt thường, giặt khô (Dry cleaning), giặt hỏa tốc (Express service) kèm biểu phí phát sinh",
      "Xử lý tình huống nhạy cảm khi khách khiếu nại đồ giặt bị hỏng, mất cúc, co rút vải hoặc phai màu",
      "Thương lượng mức độ đền bù theo đúng quy định SOP của khách sạn một cách khéo léo",
    ],
  },
  {
    department_id: "HK",
    week_number: 12,
    title_en: "In-Room Safe Box Lockout & Lost & Found",
    title_vi: "Xử Lý Két Sắt & Quy Trình Thất Lạc Tài Sản (Lost & Found)",
    lessons: [
      "Hỗ trợ tiếp nhận thông tin và phối hợp với bộ phận Kỹ thuật để reset két sắt phòng (Safe Box Lockout) khi khách quên mật mã",
      "Quy trình lập biên bản ghi nhận tài sản giá trị lớn (Ví tiền, trang sức, hộ chiếu) do nhân viên HK phát hiện sau khi khách check-out",
      "Kỹ năng gọi điện thoại/viết email ngoại giao để thông báo cho khách về tài sản bị bỏ quên một cách bảo mật",
      "Hướng dẫn khách quy trình xác minh danh tính và thủ tục chuyển phát nhanh quốc tế/nội địa để nhận lại đồ an toàn",
    ],
  },
  {
    department_id: "SW",
    week_number: 13,
    title_en: "Spa Treatment Consultation & Package Upselling",
    title_vi: "Tư Vấn Liệu Trình Spa & Kỹ Thuật Upselling Gói Trị Liệu",
    lessons: [
      "Chào đón khách tại quầy lễ tân Spa, hướng dẫn khách điền phiếu khảo sát thông tin sức khỏe (Health Consultation Form)",
      "Giải thích công dụng và sự khác biệt giữa các liệu pháp phổ biến (Massage truyền thống Việt Nam, massage đá nóng, xông hơi thảo dược)",
      "Kỹ thuật upselling từ một buổi trị liệu đơn lẻ lên các gói Combo trị liệu cặp đôi hoặc gói chăm sóc gia đình dài hạn",
      "Thu thập phản hồi sau trị liệu (Post-treatment care) và tư vấn các dòng sản phẩm tinh dầu, dưỡng da mang về",
    ],
  },
  {
    department_id: "SW",
    week_number: 14,
    title_en: "Pool & Private Cabana Elite Service",
    title_vi: "Điều Phối Khu Vực Hồ Bơi/Bãi Biển & Cảnh Báo An Toàn",
    lessons: [
      "Quy trình phục vụ tại quầy mượn khăn (Towel Station), hướng dẫn vị trí tủ đồ và cabana riêng tư",
      "Giao tiếp nhắc nhở lịch sự về các nội quy an toàn hồ bơi (Quy định trẻ em, trang phục bơi chuẩn quy định)",
      "Phát ngôn cảnh báo thời tiết nguy hiểm nhiệt đới, cấm tắm biển khi có cờ đỏ hoặc biển động mạnh",
      "Xử lý giao tiếp sơ cứu y tế cơ bản (Sự cố chuột rút, say nắng) tại khu vực bãi biển của resort",
    ],
  },
  {
    department_id: "GR",
    week_number: 15,
    title_en: "VIP & Executive Club Benefits Management",
    title_vi: "Chăm Sóc Khách Hàng Thượng Lưu (HNWI) Tại Executive Lounge",
    lessons: [
      "Đón tiếp khách hạng phòng Club/Suite tại sảnh VIP, giới thiệu chi tiết các đặc quyền cá nhân hóa",
      "Phục vụ giao tiếp trong các khung giờ đặc biệt: Trà chiều (Afternoon Tea) và Giờ Cocktail tối miễn phí",
      "Hỗ trợ thư ký hành chính cho doanh nhân: Đặt phòng họp bảo mật, in ấn tài liệu khẩn cấp",
      "Quy trình quản trị thông tin cá nhân (Guest History Profile), ghi nhận thói quen nhỏ nhất để chuẩn bị cho các lần lưu trú sau",
    ],
  },
  {
    department_id: "GR",
    week_number: 16,
    title_en: "Milestone Surprise Execution",
    title_vi: "Thiết Kế Trải Nghiệm Bất Ngờ (Milestone Moments)",
    lessons: [
      "Khai thác thông tin ngầm để phát hiện các dịp đặc biệt của khách (Ngày sinh nhật, kỷ niệm ngày cưới, tuần trăng mật)",
      "Phối hợp nội bộ (với bếp và HK) để lên kế hoạch set-up bánh kem hoặc trang trí giường bằng hoa/khăn tắm",
      "Quy trình trực tiếp tặng quà mang tính cảm xúc cao, phát biểu những lời chúc mừng mang tính nghệ thuật và quý phái",
      "Xử lý khi các set-up bất ngờ bị lỗi (Giao nhầm bánh kem, viết sai tên khách trên thiệp chúc mừng)",
    ],
  },
  {
    department_id: "BO",
    week_number: 17,
    title_en: "B2B Account Sales & Contract Negotiations",
    title_vi: "Đàm Phán Hợp Đồng Đại Lý Lữ Hành & Doanh Nghiệp (B2B Account Sales)",
    lessons: [
      "Thuyết trình bảng giá phòng (Pitching Corporate Rates) và Thuyết phục đối tác ký kết hợp đồng số lượng lớn",
      "Thống nhất các điều khoản về phân bổ quỹ phòng (Allotment) và thời hạn hoàn trả phòng không bán được (Release Period)",
      "Thương thảo về điều khoản ngày hạn chế cao điểm (Blackout Dates) và chính sách phạt hủy phòng (Cancellation Policy)",
      "Giải quyết mâu thuẫn khi đối tác lữ hành ép giá hoặc đòi tăng tỷ lệ hoa hồng (Commission rate)",
    ],
  },
  {
    department_id: "BO",
    week_number: 18,
    title_en: "MICE & Event Proposal Pitching (BEO)",
    title_vi: "Đấu Thầu Sự Kiện MICE & Ký Kết Văn Bản BEO",
    lessons: [
      "Tiếp nhận văn bản yêu cầu chào giá (RFP) từ các tập đoàn và tiến hành xây dựng bảng dự toán chi phí (Proposal)",
      "Hướng dẫn khách khảo sát mặt bằng sảnh tiệc (Site Inspection), thuyết trình sơ đồ setup bàn ghế (Theater, Classroom, Banquet)",
      "Đàm phán thực đơn tiệc, gói đồ uống và các điều khoản kỹ thuật (Âm thanh, ánh sáng, màn hình LED)",
      "Hoàn thiện và chốt Lệnh tổ chức sự kiện (BEO - Banquet Event Order) để ký kết chính thức",
    ],
  },
  {
    department_id: "BO",
    week_number: 19,
    title_en: "Digital Marketing, OTA Optimization & Brand Reputation",
    title_vi: "Tiếp Thị Số, Tối Ưu Kênh OTA & Quản Trị Danh Tiếng",
    lessons: [
      "Đàm phán điều khoản hợp tác, chạy chiến dịch Flash Sales chớp nhoáng với các Market Manager của sàn OTA (Agoda, Expedia...)",
      "Soạn thảo thư chào mời phối hợp trải nghiệm dịch vụ (Fam Trip Brief) gửi tới các KOLs/Influencers quốc tế",
      "Nghệ thuật viết phản hồi tiếng Anh chuyên nghiệp, khôn khéo đối với các Đánh giá tiêu cực (1-2 sao) trên TripAdvisor",
      "Họp điều phối nội bộ phòng Sales & Marketing phân tích các chỉ số RevPAR, Occupancy rate để điều chỉnh chiến lược giá",
    ],
  },
  {
    department_id: "BO",
    week_number: 20,
    title_en: "HR Interviewing, Cost Control & Inter-departmental Disputes",
    title_vi: "Quản Trị Nhân Sự, Kiểm Soát Chi Phí & Thu Mua Nội Bộ",
    lessons: [
      "Quy trình phỏng vấn tuyển dụng nhân sự cấp cao (Phỏng vấn Giám sát/Trưởng nhóm bằng tiếng Anh)",
      "Tiến hành đánh giá hiệu suất làm việc định kỳ (Performance Review) và đưa ra phản hồi mang tính xây dựng",
      "Làm việc với nhà cung cấp vật tư (Vendor), đàm phán công nợ và giải quyết tranh chấp khi hàng hóa giao lỗi/muộn",
      "Điều phối giao tiếp giải quyết xung đột vận hành liên phòng ban (FO khiếu nại HK dọn phòng chậm làm ảnh hưởng chỉ số check-in)",
    ],
  },
];
