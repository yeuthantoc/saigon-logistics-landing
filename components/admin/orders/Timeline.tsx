import { ORDER_STATUS_META } from '@/lib/admin/status';
import { fmtDateTime } from '@/lib/admin/format';
import type { StatusHistoryEntry } from '@/lib/database.types';

// Timeline dọc cho status_history. `names`: map profile id → tên (để hiện ai cập nhật).
export default function Timeline({
  history,
  names = {},
}: {
  history: StatusHistoryEntry[];
  names?: Record<string, string>;
}) {
  const items = [...history].reverse(); // mới nhất lên đầu

  if (items.length === 0) {
    return <p className="text-sm text-muted">Chưa có lịch sử cập nhật.</p>;
  }

  return (
    <ol className="relative space-y-4 pl-6">
      {/* đường dọc */}
      <span className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-ink/20" aria-hidden />
      {items.map((entry, i) => {
        const meta = ORDER_STATUS_META[entry.status] ?? ORDER_STATUS_META.received;
        const isLatest = i === 0;
        return (
          <li key={`${entry.timestamp}-${i}`} className="relative">
            <span
              className={`absolute -left-6 top-1 h-4 w-4 rounded-full border-2 border-ink ${
                isLatest ? 'bg-coral' : 'bg-white'
              }`}
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-2">
              <span className={meta.badge}>{meta.label}</span>
              <span className="text-xs text-muted-2">{fmtDateTime(entry.timestamp)}</span>
              {entry.updated_by && names[entry.updated_by] && (
                <span className="text-xs text-muted">· {names[entry.updated_by]}</span>
              )}
            </div>
            {entry.note && <p className="mt-1 text-sm text-ink">{entry.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}
