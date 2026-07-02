import { STAT_CARD } from '@/lib/admin/ui';
import { cx } from '@/lib/ui';

export default function StatCard({
  label,
  value,
  hint,
  delta,
}: {
  label: string;
  value: string;
  hint?: string;
  delta?: number | null; // % thay đổi so kỳ trước (dương = tăng)
}) {
  return (
    <div className={STAT_CARD}>
      <span className="text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="font-display text-2xl font-extrabold text-ink">
        {value}
      </span>
      <div className="flex items-center gap-2">
        {typeof delta === 'number' && (
          <span
            className={cx(
              'text-xs font-bold',
              delta >= 0 ? 'text-teal' : 'text-coral',
            )}
          >
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(0)}%
          </span>
        )}
        {hint && <span className="text-xs text-muted-2">{hint}</span>}
      </div>
    </div>
  );
}
