// =============================================================
// Nội dung tĩnh của trang — tách riêng để dễ sửa.
// =============================================================

// (3) Dải thống kê
export const STATS = [
  { value: '12+', label: 'năm kinh nghiệm' },
  { value: '500K+', label: 'đơn đã giao' },
  { value: '30+', label: 'quốc gia phủ sóng' },
  { value: '99%', label: 'giao đúng hẹn' },
] as const;

// (5) Giải pháp cho từng nhu cầu — màu nền xen kẽ peach / teal-tint
export const AUDIENCE = [
  {
    icon: '🎁',
    title: 'Gửi quà người thân',
    desc: 'Đóng gói cẩn thận, ship tận cửa nhà người nhận ở nước ngoài.',
    tone: 'peach',
  },
  {
    icon: '🎓',
    title: 'Du học sinh / Việt kiều',
    desc: 'Gửi đồ ăn, thuốc, giấy tờ — nhanh, an toàn, đúng quy định.',
    tone: 'teal',
  },
  {
    icon: '🛍️',
    title: 'Shop & TMĐT',
    desc: 'Fulfillment quốc tế, giá sỉ theo sản lượng, kết nối đơn dễ dàng.',
    tone: 'peach',
  },
  {
    icon: '🏢',
    title: 'Doanh nghiệp xuất khẩu',
    desc: 'Khai báo hải quan, chứng từ, vận đơn trọn gói — đúng tiến độ.',
    tone: 'teal',
  },
] as const;

// (6) Quy trình 4 bước
export const STEPS = [
  {
    icon: '💬',
    title: 'Nhận báo giá',
    desc: 'Nhắn Zalo / gọi hotline, sale báo cước trong 5 phút.',
  },
  {
    icon: '🚚',
    title: 'Lấy hàng tận nơi',
    desc: 'Nhân viên đến tận nhà/kho nhận hàng miễn phí.',
  },
  {
    icon: '📦',
    title: 'Đóng gói & hải quan',
    desc: 'Đóng gói chuẩn quốc tế, lo trọn thủ tục chứng từ.',
  },
  {
    icon: '📍',
    title: 'Giao & theo dõi',
    desc: 'Theo dõi đơn realtime đến tận tay người nhận.',
  },
] as const;

// Chip tin cậy ở Hero
export const TRUST_CHIPS = [
  'Theo dõi đơn realtime',
  'Cam kết bồi thường',
  'Giao tận cửa nhà',
] as const;

// Menu header
export const NAV = [
  { label: 'Bảng giá', href: '#tuyen-di' },
  { label: 'Tuyến đi', href: '#tuyen-di' },
  { label: 'Dịch vụ', href: '#dich-vu' },
  { label: 'Theo dõi đơn', href: '/theo-doi-don' },
] as const;
