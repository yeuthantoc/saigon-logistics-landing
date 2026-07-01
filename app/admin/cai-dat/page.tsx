import { requireAdmin } from '@/lib/admin/session';
import { createClient } from '@/lib/supabase/server';
import { ROUTES } from '@/lib/rates';
import SettingsTabs, { type RateRow } from '@/components/admin/settings/SettingsTabs';

export const dynamic = 'force-dynamic';

export default async function CaiDatPage() {
  await requireAdmin(); // chỉ admin

  const supabase = await createClient();
  const { data } = await supabase
    .from('rate_config')
    .select('route, name, base, per_kg, eta')
    .order('sort_order');

  const rates: RateRow[] =
    data && data.length > 0
      ? data
      : ROUTES.map((r) => ({ route: r.key, name: r.name, base: r.base, per_kg: r.perKg, eta: r.eta }));

  return (
    <div className="space-y-5">
      <h1 className="font-display text-2xl font-extrabold text-ink">Cài đặt</h1>
      <SettingsTabs initialRates={rates} zaloEnvConfigured={Boolean(process.env.ZALO_OA_TOKEN)} />
    </div>
  );
}
