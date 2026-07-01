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
];
