// =============================================================
// Bài viết topical-authority — hỗ trợ SEO/GEO cho các trang tuyến.
// Không bán hàng trực tiếp, chỉ build authority + internal link về /tuyen.
// =============================================================

export interface BlogSection {
  heading: string;
  body: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  updated: string; // 'YYYY-MM'
  updatedLabel: string;
  intro: string;
  sections: BlogSection[];
  relatedSlugs: string[]; // slug trong ROUTES liên quan
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'hang-cam-gui-di-my',
    title: 'Hàng Cấm Gửi Đi Mỹ 2026 — Danh Sách Đầy Đủ Cần Biết',
    description:
      'Danh sách hàng cấm và hàng hạn chế khi gửi hàng đi Mỹ theo quy định CBP: vũ khí, pin lithium rời, thực phẩm tươi sống, hàng giả... Cập nhật 2026.',
    keyword: 'hàng cấm gửi đi nước ngoài',
    updated: '2026-07',
    updatedLabel: 'Tháng 7/2026',
    intro:
      'Trước khi gửi hàng đi Mỹ, bạn cần biết rõ danh mục hàng cấm để tránh bị hải quan CBP (Cục Hải quan và Biên phòng Mỹ) giữ hàng, tịch thu hoặc phạt. Dưới đây là danh sách đầy đủ SAIGON LOGISTICS tổng hợp từ quy định hiện hành.',
    sections: [
      {
        heading: 'Nhóm hàng cấm tuyệt đối',
        body: [
          'Vũ khí, đạn dược, vật liệu nổ, pháo dưới mọi hình thức.',
          'Ma tuý, chất kích thích, thuốc không rõ nguồn gốc.',
          'Hàng giả, hàng nhái thương hiệu (fake logo).',
          'Tiền mặt, kim loại quý chưa qua khai báo hải quan.',
          'Động thực vật hoang dã, sản phẩm từ động vật quý hiếm (ngà voi, sừng tê giác...).',
        ],
      },
      {
        heading: 'Nhóm hàng hạn chế — cần khai báo/giấy phép',
        body: [
          'Pin lithium rời (không gắn kèm thiết bị) — cần khai báo IATA section II, một số trường hợp bị từ chối vận chuyển.',
          'Thực phẩm tươi sống, thịt, hải sản chưa qua chế biến — CBP kiểm tra rất nghiêm.',
          'Thực phẩm đóng gói (trà, cà phê, bánh kẹo) — được phép nhưng phải khai báo đầy đủ thành phần bằng tiếng Anh.',
          'Mỹ phẩm, thực phẩm chức năng — cần nhãn thành phần rõ ràng, một số hoạt chất bị FDA hạn chế.',
          'Hàng giá trị trên 800 USD — có thể phát sinh thuế nhập khẩu phía Mỹ, cần khai đúng giá trị.',
        ],
      },
      {
        heading: 'Mẹo tránh bị giữ hàng tại hải quan Mỹ',
        body: [
          'Khai báo đúng tên hàng, số lượng, giá trị thực tế — không khai thấp hơn để né thuế.',
          'Dán nhãn hàng hoá rõ ràng bằng tiếng Anh, kèm mô tả thành phần với thực phẩm/mỹ phẩm.',
          'Với hàng thương mại, chuẩn bị đầy đủ invoice và packing list.',
          'Liên hệ đội ngũ SAIGON LOGISTICS trước khi gửi để được tư vấn hàng có được phép hay không.',
        ],
      },
    ],
    relatedSlugs: ['gui-hang-di-my'],
  },
  {
    slug: 'dong-goi-hang-quoc-te',
    title: 'Cách Đóng Gói Hàng Gửi Đi Nước Ngoài Đúng Chuẩn Quốc Tế',
    description:
      'Hướng dẫn đóng gói hàng gửi quốc tế đúng chuẩn: chọn hộp, chèn đệm, dán nhãn, quy cách với hàng dễ vỡ/chất lỏng/pin. Giảm rủi ro hư hỏng, chậm thông quan.',
    keyword: 'cách đóng gói hàng gửi đi nước ngoài',
    updated: '2026-07',
    updatedLabel: 'Tháng 7/2026',
    intro:
      'Đóng gói đúng cách quyết định phần lớn việc hàng có đến tay người nhận nguyên vẹn và thông quan nhanh hay không. SAIGON LOGISTICS chia sẻ quy trình đóng gói chuẩn áp dụng cho mọi tuyến quốc tế.',
    sections: [
      {
        heading: 'Nguyên tắc đóng gói cơ bản',
        body: [
          'Dùng hộp carton 3–5 lớp, còn nguyên vẹn, không dùng lại hộp đã móp méo.',
          'Chèn đệm (mút xốp, giấy vụn, màng bọc khí) lấp đầy khoảng trống — hàng không được xê dịch trong hộp khi lắc nhẹ.',
          'Dán băng keo hình chữ H ở đáy và nắp hộp để chịu lực tốt hơn.',
          'Ghi rõ thông tin người gửi/người nhận, số điện thoại, mã vận đơn ở mặt ngoài.',
        ],
      },
      {
        heading: 'Đóng gói theo loại hàng đặc biệt',
        body: [
          'Hàng dễ vỡ (gốm sứ, thuỷ tinh): bọc riêng từng món bằng màng khí, đặt cách thành hộp tối thiểu 5cm, dán nhãn "Fragile".',
          'Chất lỏng: đóng chai kín, bọc túi nilon chống rò rỉ, đặt trong hộp chống sốc riêng — một số chất lỏng dễ cháy bị cấm vận chuyển quốc tế.',
          'Thiết bị điện tử có pin lithium: giữ nguyên bao bì gốc nếu có, khai báo pin theo quy định IATA, tách rời pin dự phòng nếu vận chuyển hàng không cho phép.',
          'Thực phẩm khô: đóng gói kín khí, ghi rõ hạn sử dụng và thành phần để không bị giữ ở hải quan nước nhận.',
        ],
      },
      {
        heading: 'Checklist trước khi gửi',
        body: [
          'Cân trọng lượng thực tế — khai sai cân nặng có thể phát sinh phụ phí.',
          'Chụp ảnh hàng hoá trước khi đóng gói để làm bằng chứng nếu có khiếu nại.',
          'Kiểm tra hàng có thuộc danh mục cấm của nước nhận hay không.',
          'Dán nhãn địa chỉ người nhận bằng cả tiếng Việt và tiếng Anh/ngôn ngữ bản địa.',
        ],
      },
    ],
    relatedSlugs: ['gui-hang-di-uc', 'gui-hang-di-chau-au'],
  },
  {
    slug: 'hai-quan-my-quy-dinh-2026',
    title: 'Hải Quan Mỹ 2026 — Quy Định Nhập Khẩu Cần Biết Khi Gửi Hàng',
    description:
      'Quy định hải quan Mỹ (CBP) mới nhất 2026 khi gửi hàng cá nhân/thương mại từ Việt Nam: ngưỡng miễn thuế, thủ tục khai báo, thời gian thông quan.',
    keyword: 'hải quan Mỹ nhập khẩu',
    updated: '2026-07',
    updatedLabel: 'Tháng 7/2026',
    intro:
      'Hải quan Mỹ (CBP) áp dụng quy trình kiểm soát hàng nhập khẩu khá chặt chẽ. Hiểu đúng quy định giúp hàng của bạn thông quan nhanh, tránh bị giữ hoặc phát sinh phí phạt.',
    sections: [
      {
        heading: 'Ngưỡng miễn thuế nhập khẩu',
        body: [
          'Hàng cá nhân (quà tặng) giá trị dưới 800 USD/lần nhập thường được miễn thuế theo quy định de minimis.',
          'Hàng trên ngưỡng này có thể phát sinh thuế nhập khẩu và phí xử lý hải quan (MPF).',
          'Hàng thương mại (bán online) áp dụng quy định khác, cần mã HS code và commercial invoice.',
        ],
      },
      {
        heading: 'Chứng từ cần chuẩn bị',
        body: [
          'Invoice ghi rõ tên hàng, số lượng, đơn giá, tổng giá trị bằng USD.',
          'Địa chỉ người nhận đầy đủ, số điện thoại liên hệ được.',
          'Với hàng thương mại: packing list, HS code, giấy phép nhập khẩu nếu thuộc danh mục quản lý chuyên ngành (mỹ phẩm, thực phẩm chức năng...).',
        ],
      },
      {
        heading: 'Thời gian thông quan thực tế',
        body: [
          'Hàng cá nhân khai báo đúng, không thuộc diện kiểm tra: thông quan trong 1–2 ngày.',
          'Hàng bị đưa vào diện kiểm tra ngẫu nhiên hoặc khai báo thiếu thông tin: có thể mất thêm 3–5 ngày.',
          'SAIGON LOGISTICS hỗ trợ khai báo hải quan trọn gói để giảm tối đa rủi ro chậm trễ — xem chi tiết tại trang gửi hàng đi Mỹ.',
        ],
      },
    ],
    relatedSlugs: ['gui-hang-di-my'],
  },
  {
    slug: 'gui-do-an-di-uc',
    title: 'Gửi Đồ Ăn Đi Úc 2026 — Được Gì, Cấm Gì, Cách Qua Kiểm Dịch',
    description:
      'Gửi đồ ăn đi Úc được không? Danh sách thực phẩm được phép & bị cấm theo quy định kiểm dịch Úc (DAFF) 2026: bánh tráng, cà phê, mắm, đồ khô... và cách đóng gói đúng chuẩn.',
    keyword: 'gửi đồ ăn đi Úc',
    updated: '2026-07',
    updatedLabel: 'Tháng 7/2026',
    intro:
      'Úc có hệ thống kiểm dịch sinh học (biosecurity) nghiêm ngặt nhất thế giới — gửi sai một món đồ ăn có thể bị tịch thu cả kiện và phạt đến hàng nghìn AUD. Bài này tổng hợp danh sách thực phẩm Việt được phép và bị cấm khi gửi đi Úc theo quy định DAFF, kèm cách đóng gói để qua kiểm dịch thuận lợi.',
    sections: [
      {
        heading: 'Thực phẩm ĐƯỢC PHÉP gửi đi Úc (có điều kiện)',
        body: [
          'Cà phê rang xay, cà phê hoà tan đóng gói công nghiệp còn nguyên seal — được phép, cần nhãn thành phần tiếng Anh.',
          'Bánh kẹo, bánh tráng, mì gói, phở khô đóng gói công nghiệp có nhãn đầy đủ — được phép khai báo bình thường.',
          'Trà khô đóng hộp/túi công nghiệp — được phép, tránh trà thảo mộc có thành phần hoa lá tự nhiên chưa qua xử lý.',
          'Gia vị khô đóng chai công nghiệp (muối tôm, sa tế, bột nêm) — thường được phép nếu không chứa thịt.',
          'Hạt điều, đậu phộng rang chín đóng gói hút chân không — được phép; hạt tươi/còn vỏ sống bị cấm.',
        ],
      },
      {
        heading: 'Thực phẩm BỊ CẤM tuyệt đối — đừng mất tiền oan',
        body: [
          'Thịt và sản phẩm từ thịt dưới mọi hình thức: chà bông, lạp xưởng, khô bò, nem — nhóm bị tịch thu nhiều nhất.',
          'Trứng và sản phẩm chứa trứng: bánh trung thu nhân trứng muối, trứng muối.',
          'Mật ong và sản phẩm từ ong — cấm hoàn toàn với hàng cá nhân.',
          'Trái cây tươi, rau củ tươi, hạt giống, cây trồng.',
          'Sữa tươi và sản phẩm sữa chưa tiệt trùng.',
          'Mắm các loại đóng gói thủ công không nhãn mác — bị giữ vì không chứng minh được thành phần; mắm đóng chai công nghiệp có nhãn tiếng Anh xét theo từng trường hợp.',
        ],
      },
      {
        heading: 'Cách đóng gói & khai báo để qua kiểm dịch Úc',
        body: [
          'Chỉ gửi thực phẩm đóng gói công nghiệp, còn nguyên seal, hạn sử dụng ≥ 6 tháng.',
          'Khai báo TẤT CẢ món trong kiện bằng tiếng Anh — giấu hàng là lý do phạt nặng nhất, kiểm dịch Úc soi X-quang 100% kiện hàng thực phẩm.',
          'Nhãn thành phần tiếng Anh dán ngoài từng món giúp thông quan nhanh gấp đôi.',
          'Không trộn thực phẩm với quần áo/mỹ phẩm trong cùng lớp gói — dễ bị mở kiện kiểm tra toàn bộ.',
          'SAIGON LOGISTICS kiểm tra danh mục từng món trước khi nhận hàng và khai báo DAFF đúng chuẩn — xem bảng giá tại trang gửi hàng đi Úc, hoặc nhắn Zalo chụp ảnh món hàng để được xác nhận trong 5 phút.',
        ],
      },
    ],
    relatedSlugs: ['gui-hang-di-uc', 'gui-hang-di-nhat-han'],
  },
  {
    slug: 'gui-thuoc-tay-di-my',
    title: 'Gửi Thuốc Tây Đi Mỹ Được Không? Quy Định FDA & Cách Gửi 2026',
    description:
      'Gửi thuốc tây đi Mỹ được không? Điều kiện FDA cho thuốc kê đơn, thuốc không kê đơn, thực phẩm chức năng, thuốc nam khi gửi từ Việt Nam sang Mỹ. Cập nhật 2026.',
    keyword: 'gửi thuốc đi Mỹ',
    updated: '2026-07',
    updatedLabel: 'Tháng 7/2026',
    intro:
      'Rất nhiều gia đình muốn gửi thuốc quen dùng cho người thân bên Mỹ. Câu trả lời ngắn: ĐƯỢC với điều kiện — thuốc không kê đơn số lượng dùng cá nhân thường qua được, thuốc kê đơn cần kèm toa, một số hoạt chất bị FDA cấm tuyệt đối. Chi tiết từng nhóm dưới đây.',
    sections: [
      {
        heading: 'Nhóm gửi được — số lượng dùng cá nhân (~90 ngày)',
        body: [
          'Thuốc không kê đơn (OTC): giảm đau paracetamol, dầu gió, cao dán, thuốc ho thảo dược — gửi được với số lượng hợp lý cho cá nhân dùng.',
          'Vitamin, thực phẩm chức năng có nhãn thành phần rõ ràng — được phép nếu không chứa hoạt chất bị FDA cảnh báo.',
          'Thuốc kê đơn thông thường (huyết áp, tiểu đường...): cần kèm bản sao toa bác sĩ, tên thuốc khớp với toa, số lượng tối đa ~90 ngày sử dụng.',
          'Nguyên tắc chung của FDA: thuốc cho mục đích cá nhân, không mang tính thương mại, khai báo trung thực.',
        ],
      },
      {
        heading: 'Nhóm KHÔNG gửi được — bị tịch thu, có thể liên đới pháp lý',
        body: [
          'Thuốc chứa codeine, tramadol, morphine và mọi chất thuộc danh mục kiểm soát (controlled substances) của DEA.',
          'Thuốc an thần, thuốc ngủ nhóm benzodiazepine không có giấy phép nhập khẩu.',
          'Thuốc nam, thuốc bắc dạng thang không nhãn mác, không rõ thành phần — CBP không xác minh được nên giữ lại gần như 100%.',
          'Thuốc giảm cân, tăng cường sinh lý trôi nổi — nhóm FDA thu giữ và cảnh báo nhiều nhất.',
        ],
      },
      {
        heading: 'Cách gửi thuốc đi Mỹ đúng chuẩn',
        body: [
          'Giữ nguyên vỏ hộp gốc còn tem, hạn sử dụng — không san chiết sang chai lọ khác.',
          'Kèm toa bác sĩ (bản sao, có thể kèm bản dịch tiếng Anh) với thuốc kê đơn.',
          'Khai báo đúng tên thuốc + hoạt chất bằng tiếng Anh trên tờ khai — khai "gift" chung chung dễ bị mở kiện.',
          'Gửi số lượng vừa đủ dùng — kiện 5–10 hộp cùng loại sẽ bị coi là hàng thương mại.',
          'Chưa chắc thuốc của bạn thuộc nhóm nào? Nhắn Zalo chụp ảnh vỏ hộp, SAIGON LOGISTICS đối chiếu danh mục và báo kết quả trong 5 phút — xem thêm tại trang gửi hàng đi Mỹ.',
        ],
      },
    ],
    relatedSlugs: ['gui-hang-di-my', 'gui-hang-di-canada'],
  },
];
