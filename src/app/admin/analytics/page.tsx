import { getAnalyticsData } from '@/actions/analytics.actions';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export default async function AnalyticsPage() {
  const result = await getAnalyticsData();

  if (!result.success || !result.data) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Analitik & Laporan</h1>
        <p className="text-red-500">{result.message || 'Gagal memuat data.'}</p>
      </div>
    );
  }

  return <AnalyticsDashboard data={result.data} />;
}