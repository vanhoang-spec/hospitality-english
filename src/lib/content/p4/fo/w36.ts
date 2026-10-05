// FO week 36 — a crisis at the desk: a fire alarm, a guest who collapses, a
// lift or the power that stops, a storm (see ../kit.ts).
//
//  · One instruction and one time, never a feeling: "Please take the
//    stairwell now", "I will call you back in fifteen minutes". Never "Please
//    stay calm", "There is no danger", "He is in good hands".
//  · Fire: for the first two minutes the desk stays at the desk, reads the
//    zone on the fire panel and never silences or resets it; 114 is
//    confirmed and the in-house list printed. Stairs, never the lift; bags
//    stay; everyone goes out to the assembly point. The cause is never
//    guessed, and a drill gets exactly the same words.
//  · This hotel has no refuge area: a guest who cannot use the stairs stays
//    in the room with the door closed, and the desk gives the room number to
//    the fire team (floor and number of people only on an open radio). A
//    guest who will not leave is asked twice, then handed to Security and
//    kept as not accounted for. Only the fire officer gives the all-clear.
//  · A guest who collapses: stop, call the first aider; no response or no
//    normal breathing → 115 for an ambulance at once; then the Duty Manager.
//    Stay with the guest, nothing to eat or drink, people stand back, no
//    guess at the cause, no word about blame or compensation.
//  · A lift that stops: answer the lift phone at once, call Engineering,
//    nobody opens the doors, speak to the guests every two minutes, and never
//    give a time that belongs to another team. A power cut: say what is
//    happening and call back in fifteen minutes. A storm: inside, away from
//    the windows; flights are the airline's; a stay is extended only subject
//    to availability, and the rate is not the desk's.
import { game, g, read, sp } from "../../phase0";
import { cardsFor, lessonsFor, risk, type AuthoredWeek } from "../kit";

const c = cardsFor("FO");
const L = lessonsFor("FO");

const t1a =
  "The fire alarm has been triggered, madam, and Security will look into it. Please leave now by the nearest stairwell.";
const t1b =
  "Please leave the suitcase in the room, madam. Take only your phone and your key card, and go down now.";
const t1c =
  "Please go to the assembly point, madam. It is the open car park in front of the hotel.";

const t2a =
  "Please stay in the room with her and keep the door closed, madam. I am giving the fire team your room number now.";
const t2b =
  "I cannot give you their time, madam, but I will call you back every five minutes until they reach you.";
const t2c =
  "Yes, madam. Put a wet towel along the gap under the door, and keep your phone free for my call.";

export const week: AuthoredWeek = {
  canDo:
    "Nói được: trong sự cố — báo cháy, khách ngất, kẹt thang máy, mất điện, bão — đưa MỘT hướng dẫn kèm MỘT mốc giờ, gọi đúng người theo đúng thứ tự, ở lại với khách, và không đoán nguyên nhân hay trấn an suông.",
  lessons: [
    L(36, 1, "The First Minutes of a Fire Alarm", "Những phút đầu khi chuông báo cháy reo", {
      vocabulary: [
        c("Evacuate", "If the fire team says so, we evacuate the whole building by the stairs.", [
          "/ɪˈvækjueɪt/",
          "Sơ tán",
          "🚨",
        ]),
        c("Stairwell", "The nearest stairwell is at the end of your corridor.", [
          "/ˈsteəwel/",
          "Lồng cầu thang thoát hiểm",
          "🪜",
        ]),
        c("Out of use", "The lifts are out of use during a fire alarm.", [
          "/aʊt əv juːs/",
          "Ngừng sử dụng",
          "⛔",
        ]),
        c("Assembly point", "Our assembly point is the open car park in front of the hotel.", [
          "/əˈsembli pɔɪnt/",
          "Điểm tập kết",
          "📍",
        ]),
        c("Fire panel", "Read the zone on the fire panel, but never reset it.", [
          "/ˈfaɪə ˈpænl/",
          "Tủ trung tâm báo cháy",
          "🔴",
        ]),
      ],
      grammar: [
        g(
          "Do not worry, it is probably nothing.",
          "The alarm is ringing on your floor, sir, so please take the nearest stairwell now.",
          "Trong sự cố, nói điều đang xảy ra rồi MỘT việc phải làm ngay, nối bằng 'so'. Đoán nguyên nhân ('probably nothing') là điều bị cấm. Chủ ngữ số ít 'the alarm' đi với 'is'.",
          "The alarm are ringing on your floor, sir, so please take the nearest stairwell now.",
        ),
        g(
          "Someone set off the alarm on the fourth floor.",
          "The fire alarm has been triggered, madam, and Security is looking into it now.",
          "Bị động hiện tại hoàn thành 'has been triggered' nói sự việc mà không quy cho ai — quầy chưa biết, và đoán trước mặt khách là cách tin đồn bắt đầu.",
          "The fire alarm has been trigger, madam, and Security is looking into it now.",
        ),
      ],
      speaking: [
        sp(
          "What is that noise? Is there a fire in the building?",
          t1a,
          "Câu đầu là bị động 'has been triggered': nói sự việc, không nói ai bấm chuông. Câu sau là MỘT việc khách làm ngay — rời phòng bằng lối 'stairwell' gần nhất.",
          undefined,
          ["triggered"],
        ),
        sp(
          "Should I pack my suitcase before we go down?",
          t1b,
          "Khách hỏi về hành lý: trả lời bằng một việc cụ thể — để vali lại, chỉ mang điện thoại và thẻ phòng — rồi kết bằng một mốc: ngay bây giờ.",
          undefined,
          undefined,
          t1a,
        ),
        sp(
          "Where do we go once we are downstairs?",
          t1c,
          "Nói tên điểm tập kết ('assembly point'), rồi tả nó bằng thứ khách nhìn thấy được khi bước ra cửa chính.",
          undefined,
          undefined,
          t1b,
        ),
        risk({
          ...sp(
            "It is only an alarm. Can we take the lift? We are on the ninth floor.",
            "Please take the stairwell, sir, not the lift. The lifts are out of use.",
            "Câu phải đúng của tuần: báo cháy thì đi cầu thang, không bao giờ đi thang máy. Việc phải làm đứng trước ('take the stairwell'), lý do ngắn đứng sau: thang máy đang 'out of use'.",
            undefined,
            ["lift", "lifts"],
          ),
          alsoAccept: [
            "Please use the stairwell, sir, not the lift. The lifts are out of use.",
            "Please take the stairs, sir, not the lift. The lifts are out of use.",
            "Please take the stairwell, sir, not the lift. The lift is out of use.",
          ],
        }),
        {
          ...sp(
            "Is this a real fire, or just one of your drills?",
            "We do not know yet, sir. Either way, we evacuate, so please take the stairwell down to the assembly point now.",
            "Không biết thì nói thật là chưa biết, rồi dẫn tới việc khách vẫn phải làm. Cháy thật hay diễn tập, câu trả lời giống hệt nhau: 'we evacuate'.",
          ),
          alsoAccept: [
            "We do not know yet, sir. Either way, we evacuate, so please take the stairwell down to the assembly point.",
            "We do not know yet, sir. Either way, we evacuate, so please use the stairwell and go to the assembly point now.",
          ],
        },
        sp(
          "The fire panel says zone four. Should I run up and have a look?",
          "No. Stay at the desk and report the zone to Security. Never reset the fire panel.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Hai mệnh lệnh ngắn — ở lại quầy, báo khu vực cho An ninh — rồi một điều cấm tuyệt đối.",
          "colleague",
        ),
        sp(
          "I am on my way down. What has the desk done so far?",
          "Security has the zone, the fire brigade has been called, and the in-house list is printed. I am staying at the desk.",
          "Báo cáo lên Duty Manager, không gọi sir hay madam: ba việc đã xong theo đúng thứ tự của quy trình, rồi mình đang ở đâu.",
          "manager",
        ),
      ],
      reading: read(
        `FIRE ALARM — FRONT DESK, THE FIRST FIFTEEN MINUTES
Four facts only your own hotel can give you. Ask your Security Manager in your first week, and write them here.
Where is our assembly point? Who calls 114, and from which phone? Do we have a refuge area? Who reads the announcement?
0–2 minutes: do NOT leave the desk. Read the zone on the fire panel and report it to Security.
Never silence or reset the panel. It belongs to Security, not to the desk.
2–5 minutes: confirm that 114 has been called. Print the in-house list and the room-status report.
Those two pages are the only record of who is in the building tonight.
To every caller and every guest: the lifts are out of use, so take the nearest stairwell and go out to the assembly point.
Say it before they ask. Bags stay in the rooms.
Never guess the cause. "It is probably a drill" is the one sentence the desk never says.
If it IS a drill, say exactly the same words. A shift that treats a drill casually will treat a fire casually.`,
        [
          {
            q: "Trong hai phút đầu khi chuông báo cháy reo, lễ tân làm gì?",
            options: [
              "Lên tầng có chuông để tự xem có khói hay không, rồi báo lại cho An ninh",
              "Ở lại quầy, đọc khu vực trên tủ báo cháy và báo An ninh",
              "Tắt chuông ở tủ báo cháy để khách trong sảnh khỏi hoảng sợ",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "0–2 minutes: do NOT leave the desk. Read the zone on the fire panel and report it to Security." và "Never silence or reset the panel" — tủ báo cháy là của An ninh.',
          },
          {
            q: "Vì sao phải in danh sách khách đang lưu trú?",
            options: [
              "Để kế toán tính tiền phòng cho khách sau khi sự cố đã kết thúc",
              "Để gửi cho công ty bảo hiểm của khách sạn vào sáng hôm sau",
              "Vì đó là bản ghi duy nhất cho biết ai đang ở trong toà nhà",
            ],
            correct: 2,
            explanation:
              'Tài liệu ghi "Those two pages are the only record of who is in the building tonight."',
          },
          {
            q: "Nếu đó chỉ là diễn tập, lễ tân nói gì với khách?",
            options: [
              "Đúng những câu như khi có cháy thật",
              "Báo ngay đó là diễn tập để khách yên tâm ở lại phòng",
              "Không nói gì cả, chờ chuông tự tắt",
            ],
            correct: 0,
            explanation:
              'Tài liệu ghi "If it IS a drill, say exactly the same words." — ca nào coi nhẹ diễn tập sẽ coi nhẹ cả một đám cháy thật.',
          },
        ],
      ),
      game: [
        game(
          "Can we wait here in the lobby until the noise stops?",
          "I am afraid not, madam. Please go out to the assembly point now, and we will update you there.",
          "I am afraid not, madam. Please going out to the assembly point now, and we will update you there.",
          "Of course, madam. Please take a seat in the lobby, and do not worry, because it is probably only a test of the system.",
          undefined,
          "Sau 'Please' là động từ nguyên thể 'go', không phải 'going'. Câu mời ngồi ở sảnh và 'probably only a test' đúng tiếng Anh nhưng giữ khách trong toà nhà và đoán nguyên nhân — hai điều tài liệu cấm.",
        ),
        game(
          "This beeping is driving me mad. Can I switch the panel off for a minute?",
          "No. Never silence the fire panel. Report the zone to Security and stay at the desk.",
          "No. Never silence the fire panel. Report the zone to Security and staying at the desk.",
          "Yes, switch it off for a minute so the guests in the lobby do not panic, and then call Security about it.",
          "colleague",
          "Sau 'and' hai mệnh lệnh song song đều ở dạng nguyên thể: 'Report… and stay'. Câu tắt chuông cho khách khỏi hoảng nghe có lý, nhưng tủ báo cháy là của An ninh — tắt chuông là tắt cảnh báo cho cả toà nhà.",
        ),
      ],
    }),

    L(
      36,
      2,
      "Guests Who Cannot Take the Stairs, and Guests Who Will Not Go",
      "Khách không đi cầu thang được, và khách không chịu rời phòng",
      {
        vocabulary: [
          c("Mobility need", "There is a guest with a mobility need on the fourth floor.", [
            "/məʊˈbɪləti niːd/",
            "Nhu cầu hỗ trợ đi lại",
            "♿",
          ]),
          c("In-house list", "The in-house list shows every guest in the building tonight.", [
            "/ˌɪn ˈhaʊs lɪst/",
            "Danh sách khách đang lưu trú",
            "📋",
          ]),
          c("Not accounted for", "One room is still not accounted for.", [
            "/nɒt əˈkaʊntɪd fɔː/",
            "Chưa xác định được có mặt hay không",
            "❓",
          ]),
          c("All-clear", "Only the fire officer gives the all-clear.", [
            "/ˌɔːl ˈklɪə/",
            "Tín hiệu an toàn, được quay vào",
            "✅",
          ]),
        ],
        grammar: [
          g(
            "You have to go down the stairs like everybody else.",
            "Please stay in your room with the door closed, sir. I am giving the fire team your room number now.",
            "Không bắt khách làm điều họ không làm được. Một việc khách làm ngay, một việc mình đang làm (hiện tại tiếp diễn). 'with the door closed': phân từ hai 'closed' tả trạng thái của cửa.",
            "Please stay in your room with the door close, sir. I am giving the fire team your room number now.",
          ),
          g(
            "Room 402 has a disabled guest.",
            "There is a guest with a mobility need on the fourth floor.",
            "Không gắn nhãn tình trạng cho khách ('disabled guest'). Trên bộ đàm mở chỉ nói TẦNG và số người, vì khách khác nghe được. 'There is' đi với danh từ số ít.",
            "There are a guest with a mobility need on the fourth floor.",
          ),
        ],
        speaking: [
          sp(
            "My mother uses a wheelchair. We cannot get her down four floors.",
            t2a,
            "Không bắt khách làm điều họ không làm được. Một việc khách làm (ở trong phòng, đóng cửa), rồi một việc mình đang làm ngay lúc này, ở thì hiện tại tiếp diễn.",
          ),
          sp(
            "How long will the fire team take to reach us?",
            t2b,
            "Không hứa giờ thay đội cứu hoả. Hứa điều mình tự giữ được: gọi lại cho khách, kèm một mốc đều đặn.",
            undefined,
            undefined,
            t2a,
          ),
          sp(
            "Is there anything we can do while we wait?",
            t2c,
            "Cho khách hai việc cụ thể để làm trong lúc chờ: khăn ướt chèn khe cửa, và để trống điện thoại cho cuộc gọi của mình.",
            undefined,
            undefined,
            t2b,
          ),
          {
            ...sp(
              "I have paid for this room, and I am not walking down eight floors in a towel.",
              "I understand, sir. Please take a moment to dress, and then take the stairwell down to the assembly point.",
              "Khách từ chối: không cãi, không doạ. Công nhận, cho khách một việc nhỏ làm được ngay (mặc đồ), rồi nhắc lại đúng một hướng dẫn.",
            ),
            alsoAccept: [
              "I understand, sir. Please take a moment to get dressed, and then take the stairwell down to the assembly point.",
              "I understand, sir. Please take a moment to dress, then take the stairwell down to the assembly point.",
            ],
          },
          {
            ...sp(
              "I told you, I am not leaving. It is probably a false alarm anyway.",
              "I understand, sir. I will escalate it to Security, so they know you are still in your room.",
              "Mời lần hai mà khách vẫn từ chối thì dừng: không cãi, không chạm vào khách, không đồng ý là báo động giả. Chuyển việc lên An ninh ('escalate') để họ biết khách còn trong phòng.",
              undefined,
              ["escalate"],
            ),
            alsoAccept: [
              "I understand, sir. I will escalate it to Security, so they know you are still in the room.",
              "I understand, sir. I will escalate this to Security, so they know you are still in your room.",
            ],
          },
          {
            ...sp(
              "My father walks with a stick. Is that a problem in a hotel this size?",
              "Not at all, sir. May I note his mobility need for the duty team, in case of an emergency?",
              "Hỏi xin phép TRƯỚC khi ghi một điều về sức khoẻ của khách. Ghi chú đó chỉ để đội trực biết khi có sự cố, và khách là người đồng ý.",
            ),
            alsoAccept: [
              "Not at all, sir. May I note his mobility need for the duty team, in case there is an emergency?",
              "Not at all, sir. Shall I note his mobility need for the duty team, in case of an emergency?",
            ],
          },
          sp(
            "Room 806 did not answer the phone. Can I mark him as out of the building?",
            "No. Until somebody has seen him outside, he is not accounted for.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Không gọi được khách không có nghĩa là khách đã ra ngoài: phòng vẫn 'not accounted for' cho tới khi có người thấy khách bên ngoài.",
            "colleague",
          ),
          {
            ...sp(
              "Everyone else is going back inside. Can we go up now?",
              "Not yet, madam. Only the fire officer gives the all-clear, and I will tell you the moment we have it.",
              "Chỉ cán bộ phòng cháy cho quay vào ('all-clear'). Không đoán thay; hứa việc của mình: báo khách ngay khi có tín hiệu.",
            ),
            alsoAccept: [
              "Not yet, madam. Only the fire officer gives the all-clear, and I will tell you as soon as we have it.",
              "Not yet, madam. Only the fire officer can give the all-clear, and I will tell you the moment we have it.",
            ],
          },
        ],
        reading: read(
          `GUESTS WHO CANNOT USE THE STAIRS, AND GUESTS WHO WILL NOT GO
At check-in, ask first: "May I note that you would need help in an emergency?" The note stays with the duty team.
Mark the FLOOR on the in-house list. That list is the only reason anyone knows to look for them.
This hotel has no refuge area. So during an alarm, a guest who cannot use the stairs stays in the room.
The door stays closed, with a wet towel along the gap. The desk gives the room number to the fire team, face to face or by phone.
On an open radio, say the floor and the number of people only. Other guests can hear an open radio.
Never leave a guest on a staircase landing. It is the way out for every floor above.
A guest who will not leave: ask twice, calmly, then stop. Never argue in a corridor, and never touch the guest.
Tell Security the floor and that the guest has declined. The room stays on the list as not accounted for.
Guests out at dinner also show as not accounted for. Say so when you hand over the list.
Only the fire officer gives the all-clear. The desk never sends guests back inside.`,
          [
            {
              q: "Khách sạn trong tài liệu không có gian lánh nạn. Khi có báo cháy, khách đi xe lăn làm gì?",
              options: [
                "Chờ ở chiếu nghỉ cầu thang gần nhất để đội cứu hoả dễ thấy và đưa xuống",
                "Ở lại phòng, đóng cửa; quầy báo số phòng cho đội cứu hoả",
                "Đi xuống bằng thang máy dịch vụ, có một nhân viên an ninh đi kèm",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "a guest who cannot use the stairs stays in the room" và "The desk gives the room number to the fire team" — chiếu nghỉ cầu thang là lối thoát của mọi tầng phía trên.',
            },
            {
              q: "Khách nhất quyết không rời phòng sau hai lần mời. Lễ tân làm gì?",
              options: [
                "Tiếp tục thuyết phục ngoài hành lang cho tới khi khách chịu đi xuống",
                "Ghi khách là đã sơ tán, vì khách đã được báo hai lần rồi",
                "Dừng lại, báo An ninh; phòng vẫn là chưa xác định",
              ],
              correct: 2,
              explanation:
                'Tài liệu ghi "ask twice, calmly, then stop" và "The room stays on the list as not accounted for."',
            },
            {
              q: "Trên bộ đàm mở, lễ tân được nói những gì?",
              options: [
                "Số phòng và họ tên của khách",
                "Tầng và số người",
                "Họ tên khách và tình trạng sức khoẻ",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "On an open radio, say the floor and the number of people only." — khách khác nghe được bộ đàm.',
            },
          ],
        ),
        game: [
          game(
            "I have a broken leg. Am I supposed to hop down six floors?",
            "No, madam. Please stay in your room with the door closed — the fire team is getting your room number now.",
            "No, madam. Please stay in your room with the door closed — the fire team is get your room number now.",
            "Please wait on the staircase landing with your husband, madam, and somebody from the fire team will come up and find you there.",
            undefined,
            "'is get' sai: sau 'is' phải là V-ing 'getting'. Câu chờ ở chiếu nghỉ cầu thang nghe tiện, nhưng đó là lối thoát của mọi tầng phía trên — tài liệu cấm để khách ở đó.",
          ),
          game(
            "The alarm has stopped. That means it is over, right?",
            "Not quite, sir. We wait for the fire officer to give the all-clear, and I will tell you as soon as we have it.",
            "Not quite, sir. We wait for the fire officer to gives the all-clear, and I will tell you as soon as we have it.",
            "Yes, sir, it looks as if it is all finished now, so please go back up to your room, and use the lifts if your legs are tired.",
            undefined,
            "Sau 'to' là động từ nguyên thể 'give'. Câu 'it looks as if it is all finished' đoán thay cơ quan chức năng — chỉ cán bộ phòng cháy mới cho quay vào, và thang máy chưa chắc đã chạy lại.",
          ),
        ],
      },
    ),

    L(36, 3, "A Guest Collapses in the Lobby", "Khách ngất ở sảnh", {
      vocabulary: [
        c("Collapse", "If a guest collapses, stop what you are doing and call for help.", [
          "/kəˈlæps/",
          "Ngã quỵ, ngất xỉu",
          "🆘",
        ]),
        c("First aider", "Our first aider is trained and on duty around the clock.", [
          "/ˌfɜːst ˈeɪdə/",
          "Nhân viên sơ cứu",
          "🩹",
        ]),
        c("Ambulance", "If the guest does not respond, call 115 for an ambulance at once.", [
          "/ˈæmbjələns/",
          "Xe cấp cứu",
          "🚑",
        ]),
        c("Stand back", "Please stand back and give him some space.", [
          "/stænd bæk/",
          "Lùi ra, đứng tránh ra",
          "🚧",
        ]),
      ],
      grammar: [
        g(
          "Do not worry, he is in good hands.",
          "Our first aider is coming now, madam. Two minutes.",
          "Không trấn an suông ('in good hands', 'nothing serious'). Trấn an bằng MỘT việc đang xảy ra và MỘT mốc giờ. Hiện tại tiếp diễn 'is coming' cho việc đang diễn ra.",
          "Our first aider is come now, madam. Two minutes.",
        ),
        g(
          "He just fainted. Give him some water and sugar.",
          "Please do not give him anything to eat or drink, madam, until the first aider has seen him.",
          "Không cho khách bị ngất ăn, uống hay dùng thuốc, và không đoán bệnh. 'until' + hiện tại hoàn thành 'has seen': chờ một việc xong rồi mới làm.",
          "Please do not give him anything to eat or drink, madam, until the first aider has see him.",
        ),
      ],
      speaking: [
        risk({
          ...sp(
            "Help! My husband just collapsed by the lift!",
            "I am calling our first aider now, madam, and I will stay with you.",
            "Câu phải đúng của tuần: khách ngã thì dừng mọi việc, gọi nhân viên sơ cứu ('first aider') NGAY, và ở lại với khách. Không đoán bệnh, không hứa gì khác.",
            undefined,
            ["calling", "first", "aider", "stay"],
          ),
          alsoAccept: [
            "I am calling our first aider now, madam, and I am staying with you.",
            "I will call our first aider now, madam, and I will stay with you.",
            "I am calling the first aider now, madam, and I will stay with you.",
          ],
        }),
        sp(
          "He is not answering me! What is wrong with him?",
          "I do not know, madam, and I will not guess. He is not responding, so I am calling an ambulance now.",
          "Không đoán bệnh trước mặt người nhà. Khách không phản ứng thì gọi xe cấp cứu ('ambulance') ngay — không chờ ai cho phép.",
          undefined,
          undefined,
          "I am calling our first aider now, madam, and I will stay with you.",
        ),
        sp(
          "How long will the ambulance take?",
          "I cannot promise their time, madam. Our first aider is coming now — two minutes — and I am staying right here.",
          "Không hứa giờ của xe cấp cứu — đó không phải giờ của mình. Trấn an bằng MỘT việc đang xảy ra và MỘT mốc giờ mình biết chắc.",
          undefined,
          undefined,
          "I do not know, madam, and I will not guess. He is not responding, so I am calling an ambulance now.",
        ),
        {
          ...sp(
            "Let me through! I want to see what happened.",
            "Please stand back, sir, and give him some space. Our first aider is on the way.",
            "Nói với người hiếu kỳ bằng một mệnh lệnh lịch sự ('stand back') và một lý do ngắn. Không kể chuyện gì đã xảy ra.",
          ),
          alsoAccept: [
            "Please stand back, sir, and give him some room. Our first aider is on the way.",
            "Please stand back, sir, and give him space. Our first aider is on the way.",
          ],
        },
        sp(
          "I have called 115. What do you need me to do now?",
          "Please meet the ambulance at the main door and hold a lift for them. I am staying with the guest.",
          "Nói với đồng nghiệp, không gọi sir hay madam. Giao MỘT việc cụ thể (đón xe ở cửa chính, giữ thang máy), và nói rõ mình đang ở đâu.",
          "colleague",
        ),
        sp(
          "I am here now. Tell me what we have.",
          "I saw a guest collapse by the lift, and he is not responding. The first aider is with him, and an ambulance is on the way.",
          "Báo cáo lên Duty Manager, không gọi sir hay madam: chuyện gì, tình trạng của khách, và hai việc đã làm. Không đoán nguyên nhân.",
          "manager",
        ),
        {
          ...sp(
            "Will the hotel pay for the hospital? He fell in your lobby.",
            "I am sorry, madam, I cannot discuss that here. I will ask my Duty Manager to speak with you this morning.",
            "Ở quầy không bàn chuyện ai trả tiền, ai có lỗi. Nói điều mình không làm, rồi chuyển đúng người — Duty Manager — kèm một mốc.",
          ),
          alsoAccept: [
            "I am sorry, madam, I am not able to discuss that here. I will ask my Duty Manager to speak with you this morning.",
            "I am sorry, madam, I cannot discuss that here. I will ask the manager on duty to speak with you this morning.",
          ],
        },
        {
          ...sp(
            "Is any of this written down? I want to know exactly what happened.",
            "Yes, madam. Every call and every time is on record, and my Duty Manager can go through it with you.",
            "Sự cố nào cũng có nhật ký: giờ ngã, giờ từng cuộc gọi, giờ từng người tới. Nói là đã ghi ('on record') và ai sẽ cùng khách xem lại.",
          ),
          alsoAccept: [
            "Yes, madam. Every call and every time is on record, and my Duty Manager can go through it with you today.",
          ],
        },
      ],
      reading: read(
        `A GUEST COLLAPSES IN A PUBLIC AREA — FRONT DESK
Stop what you are doing. A queue can wait; a guest on the floor cannot.
Call the first aider on the emergency line, and say exactly where: "Lobby, by the lift."
If the guest does not respond, or is not breathing normally, call 115 for an ambulance at once.
Do not wait for anyone's permission. Then call the Duty Manager: the danger first, the manager second.
Stay with the guest, and keep one colleague at the desk.
Do not move the guest, and give nothing to eat or drink. Ask people to stand back.
Never guess what is wrong. "It looks like a heart attack" can frighten a family and mislead the ambulance crew.
Reassure with one action and one time: "Our first aider is coming — two minutes."
Never say "He is in good hands" or "It is nothing serious". Nobody at the desk knows that.
Send a colleague to the main door to meet the ambulance, and hold a lift for the crew.
Afterwards, write every time in the log: the fall, each call, each arrival. Facts only, no opinion.
Nobody at the desk talks about cause, blame or compensation. That is the Duty Manager's conversation.`,
        [
          {
            q: "Khách ngã ở sảnh và không phản ứng khi được gọi. Lễ tân làm gì?",
            options: [
              "Chờ Duty Manager tới rồi mới quyết định có gọi xe cấp cứu hay không",
              "Gọi 115 ngay, rồi báo Duty Manager",
              "Đỡ khách ngồi dậy và cho khách uống một chút nước đường",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "If the guest does not respond… call 115 for an ambulance at once. Do not wait for anyone\'s permission. Then call the Duty Manager".',
          },
          {
            q: "Theo tài liệu, trấn an người nhà khách thế nào cho đúng?",
            options: [
              "Nói khách đang được chăm sóc tốt, xin người nhà đừng lo lắng gì",
              "Nói chắc là không có gì nghiêm trọng, để người nhà bớt sợ",
              "Nói một việc đang xảy ra và một mốc giờ",
            ],
            correct: 2,
            explanation:
              'Tài liệu dặn "Reassure with one action and one time" và cấm "He is in good hands" hay "It is nothing serious" — vì quầy không biết điều đó.',
          },
          {
            q: "Ai nói chuyện với gia đình khách về nguyên nhân hay bồi thường?",
            options: [
              "Lễ tân đang trực, ngay tại quầy",
              "Duty Manager",
              "Nhân viên sơ cứu, sau khi xem khách",
            ],
            correct: 1,
            explanation:
              'Tài liệu ghi "Nobody at the desk talks about cause, blame or compensation. That is the Duty Manager\'s conversation."',
          },
        ],
      ),
      game: [
        game(
          "Should I give him some water? He looks so pale.",
          "Please do not give him anything yet, madam. Our first aider is coming — two minutes.",
          "Please do not giving him anything yet, madam. Our first aider is coming — two minutes.",
          "Yes, madam, a little water with some sugar will help him, and I am sure it is nothing serious at all.",
          undefined,
          "Sau 'do not' là động từ nguyên thể 'give'. Câu cho nước đường và 'nothing serious' đúng tiếng Anh nhưng sai cả hai điều tài liệu dặn: không cho ăn uống gì, và không trấn an bằng điều quầy không biết.",
        ),
        game(
          "There is a man on the floor by the lift and a queue at the desk. Which first?",
          "The man on the floor. Call the first aider now — the queue can wait.",
          "The man on the floor. Calls the first aider now — the queue can wait.",
          "Finish the check-in you started first, then phone the Duty Manager and ask him what to do about the guest.",
          "colleague",
          "Mệnh lệnh dùng động từ nguyên thể 'Call', không thêm -s. Câu làm xong thủ tục rồi mới hỏi Duty Manager đúng tiếng Anh nhưng đảo thứ tự: người gặp nguy trước, hàng chờ và quản lý sau.",
        ),
      ],
    }),

    L(
      36,
      4,
      "When the Lift Stops, the Power Goes or a Storm Comes",
      "Kẹt thang máy, mất điện, và khi bão đến",
      {
        vocabulary: [
          c("Trapped", "Two guests are trapped in the lift between floors.", [
            "/træpt/",
            "Bị kẹt, mắc kẹt",
            "🛗",
          ]),
          c("Power cut", "During a power cut, the emergency lights stay on.", [
            "/ˈpaʊə kʌt/",
            "Mất điện",
            "🔌",
          ]),
          c("Generator", "The generator keeps the lifts and the emergency lights running.", [
            "/ˈdʒenəreɪtə/",
            "Máy phát điện",
            "⚡",
          ]),
          c("Storm warning", "There is a storm warning for tonight, so the pool closes early.", [
            "/stɔːm ˈwɔːnɪŋ/",
            "Cảnh báo bão",
            "🌀",
          ]),
          c(
            "Away from the windows",
            "During a storm, guests should stay inside, away from the windows.",
            ["/əˈweɪ frəm ðə ˈwɪndəʊz/", "Tránh xa cửa kính", "🪟"],
          ),
        ],
        grammar: [
          g(
            "The power is off. I do not know when it comes back.",
            "There is a power cut, sir, and the generator is starting now. I will call you back in fifteen minutes.",
            "Không biết khi nào có điện lại thì không đoán. Nói điều đang xảy ra, việc đang làm (hiện tại tiếp diễn 'is starting'), và MỘT mốc mình tự giữ được.",
            "There is a power cut, sir, and the generator is start now. I will call you back in fifteen minutes.",
          ),
          g(
            "Stay calm. Do not panic.",
            "Please do not open the doors, madam. I will speak to you again in two minutes.",
            "'Stay calm' bảo khách CẢM THẤY một điều — vô ích. Cho khách MỘT việc (không mở cửa) và MỘT mốc giờ. Sau 'do not' là động từ nguyên thể.",
            "Please do not opening the doors, madam. I will speak to you again in two minutes.",
          ),
        ],
        speaking: [
          risk({
            ...sp(
              "Hello? The lift has stopped between floors, and the doors will not open!",
              "Please do not open the doors, sir. Engineering is on the way now.",
              "Câu phải đúng của tuần: khách kẹt thang máy thì KHÔNG tự mở cửa — chỉ bộ phận kỹ thuật mở. Một điều cấm, rồi một việc đang xảy ra ('on the way').",
              undefined,
              ["open", "doors", "engineering", "way"],
            ),
            alsoAccept: [
              "Please do not try to open the doors, sir. Engineering is on the way now.",
              "Please do not open the lift doors, sir. Engineering is on the way now.",
              "Please do not open the doors, sir. Our engineering team is on the way now.",
            ],
          }),
          sp(
            "How long will we be stuck in here? My wife is getting upset.",
            "I will stay on the line with you, sir, and I will speak to you again every two minutes.",
            "Không hứa giờ của bộ phận kỹ thuật. Hứa điều mình giữ được: ở lại trên máy và nói chuyện với khách theo một mốc đều đặn.",
            undefined,
            undefined,
            "Please do not open the doors, sir. Engineering is on the way now.",
          ),
          sp(
            "It is getting very warm in here.",
            "Thank you for telling me, sir. If anyone feels unwell, I will have our first aider waiting at the lift.",
            "Khách báo nóng: cảm ơn khách đã nói, rồi đưa một phương án cho tình huống xấu hơn — nhân viên sơ cứu chờ sẵn ở cửa thang.",
            undefined,
            undefined,
            "I will stay on the line with you, sir, and I will speak to you again every two minutes.",
          ),
          {
            ...sp(
              "All the lights have gone out in my room! What is happening?",
              "There is a power cut, madam, and the generator is starting now. I will call you back in fifteen minutes.",
              "Nói điều đang xảy ra ('power cut'), việc đang làm, và MỘT mốc mình tự giữ được. Không đoán khi nào có điện lại.",
            ),
            alsoAccept: [
              "There is a power cut, madam, and the generator is starting now. I will call you again in fifteen minutes.",
              "There is a power cut, madam. The generator is starting now, and I will call you back in fifteen minutes.",
            ],
          },
          {
            ...sp(
              "My phone says there is a storm warning. Can we still walk to the beach?",
              "I would not go tonight, madam. Based on the storm warning, please stay inside and away from the windows.",
              "Lời khuyên bắt đầu từ căn cứ ('Based on the storm warning'), rồi hai việc khách làm: ở trong nhà, tránh xa cửa kính.",
              undefined,
              ["based"],
            ),
            alsoAccept: [
              "I would not go tonight, madam. Based on the storm warning, please stay inside, away from the windows.",
            ],
          },
          {
            ...sp(
              "Our flight tomorrow might be cancelled because of the storm. Can you help us?",
              "Please check with your airline first, sir. If it is cancelled, we can extend your stay by one night, subject to availability.",
              "Chuyến bay là việc của hãng bay — đừng đoán. Quầy chỉ hứa việc của quầy: gia hạn phòng, kèm điều kiện ('subject to availability').",
              undefined,
              ["subject", "availability"],
            ),
            alsoAccept: [
              "Please check with your airline first, sir. If the flight is cancelled, we can extend your stay by one night, subject to availability.",
            ],
          },
          sp(
            "The lift phone is ringing, but I am checking someone in. What do I do?",
            "Answer the lift phone first. A guest may be trapped, and I will look after your check-in.",
            "Nói với đồng nghiệp, không gọi sir hay madam. Người có thể đang bị kẹt ('trapped') đi trước khách đang làm thủ tục — và mình nhận phần việc còn lại.",
            "colleague",
          ),
          sp(
            "Engineering says thirty minutes for the lift. What have you told the guests inside?",
            "That Engineering is on the way, and that I will speak to them every two minutes. I have not given them a time.",
            "Báo cáo lên cấp trên, không gọi sir hay madam: điều đã nói với khách, và điều mình cố ý không nói — một mốc giờ không phải của mình.",
            "manager",
          ),
        ],
        reading: read(
          `LIFTS, POWER CUTS AND STORMS — FRONT DESK
THE LIFT PHONE rings at the desk. Answer it at once, even with a queue.
Ask how many people are inside, and whether anyone feels unwell. If anyone does, call the first aider too.
Call Engineering. Only Engineering opens a lift, and guests must never force the doors.
Stay on the line, and speak to the guests every two minutes, even with no news.
Never give a time that belongs to another team. Say what YOU will do, and when.
A POWER CUT: the emergency lights stay on, and the generator runs the lifts.
Tell callers what is happening, then call them back in fifteen minutes, even if nothing has changed.
A STORM WARNING: close the pool and the terrace, and tell arriving guests at check-in.
Ask guests to stay inside, away from the windows, until the warning ends.
Flights are the airline's decision. Never promise that a flight will leave.
If a flight is cancelled, the desk can extend a stay by one night, subject to availability.
The rate for that night is not the desk's decision. Ask the Duty Manager.`,
          [
            {
              q: "Điện thoại khẩn trong thang máy reo khi quầy đang có khách xếp hàng. Lễ tân làm gì?",
              options: [
                "Làm xong cho khách đang đứng ở quầy rồi mới nghe máy",
                "Nhờ một khách trong hàng chờ nghe máy giúp trong lúc mình bận",
                "Nghe máy ngay",
              ],
              correct: 2,
              explanation:
                'Tài liệu ghi "Answer it at once, even with a queue." — người kẹt trong thang máy là người đang gặp nguy.',
            },
            {
              q: "Kỹ thuật báo cần ba mươi phút. Lễ tân nói gì với khách trong thang máy?",
              options: [
                "Hứa chắc với khách là đúng ba mươi phút nữa thang máy sẽ chạy lại bình thường",
                "Kỹ thuật đang tới; mình nói chuyện với khách đều đặn",
                "Khuyên khách tự mở cửa nếu thang dừng ngay gần sàn của một tầng",
              ],
              correct: 1,
              explanation:
                'Tài liệu ghi "Never give a time that belongs to another team" và dặn nói chuyện với khách đều đặn, kể cả khi chưa có tin mới.',
            },
            {
              q: "Chuyến bay của khách bị huỷ vì bão. Quầy làm được gì?",
              options: [
                "Hứa với khách là hãng bay chắc chắn sẽ xếp chuyến sớm nhất sáng mai",
                "Tự giảm giá đêm ở thêm vì đó là lỗi của thời tiết, không phải của khách",
                "Gia hạn thêm một đêm nếu còn phòng; giá do Duty Manager quyết",
              ],
              correct: 2,
              explanation:
                'Tài liệu ghi "the desk can extend a stay by one night, subject to availability" và "The rate for that night is not the desk\'s decision."',
            },
          ],
        ),
        game: [
          game(
            "The lift is stuck! Can we push the doors open ourselves?",
            "Please do not, madam. Engineering is on the way, and I am staying on the line with you.",
            "Please do not, madam. Engineering is on the way, and I am stay on the line with you.",
            "Please stay calm, madam. There is no danger at all, and the engineer will have you out of there very soon.",
            undefined,
            "'I am stay' sai: sau 'am' phải là V-ing 'staying'. Câu 'stay calm… no danger' đúng ngữ pháp nhưng là trấn an suông, và hứa thay bộ phận kỹ thuật một kết quả quầy không giữ được.",
          ),
          game(
            "Will our flight still leave tomorrow, with this storm?",
            "Please check with your airline, sir. If it is cancelled, we can extend your stay, subject to availability.",
            "Please check with your airline, sir. If it is cancel, we can extend your stay, subject to availability.",
            "Do not worry, sir. Storms here always pass by the morning, so I am sure your flight will leave on time tomorrow.",
            undefined,
            "Bị động cần phân từ hai: 'is cancelled', không phải 'is cancel'. Câu 'I am sure your flight will leave on time' nghe dễ chịu nhưng là hứa thay hãng bay — quầy chỉ hứa việc của quầy.",
          ),
        ],
      },
    ),
  ],
};
