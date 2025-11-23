import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { useStats, useReport } from './hooks/useBudget';

const queryClient = new QueryClient();

function BudgetApp() {
  const [currentView, setCurrentView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError
  } = useStats();

  const {
    data: report,
    isLoading: reportLoading,
    error: reportError
  } = useReport(currentView);

  const loading = statsLoading || reportLoading;
  const error = (statsError as Error)?.message || (reportError as Error)?.message || null;

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      <Dashboard
        currentView={currentView}
        stats={stats || null}
        report={report || null}
        loading={loading}
        error={error}
      />
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BudgetApp />
    </QueryClientProvider>
  );
}

export default App;
