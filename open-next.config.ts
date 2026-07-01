import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Cấu hình mặc định: chưa bật incremental cache (R2/KV) vì hầu hết trang admin
// là force-dynamic. Có thể thêm R2 cache sau nếu cần cache ISR.
export default defineCloudflareConfig();
