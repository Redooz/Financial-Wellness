import React from 'react';
import type { StatsResponse, ReportResponse } from '../types';
import StatsCards from './StatsCards';
import BudgetChart from './BudgetChart';
import TransactionList from './TransactionList';

interface DashboardProps {
    currentView: 'daily' | 'weekly' | 'monthly';
    stats: StatsResponse | null;
    report: ReportResponse | null;
    loading: boolean;
    error: string | null;
}

const Dashboard: React.FC<DashboardProps> = ({ currentView, stats, report, loading, error }) => {
    if (error) {
        return (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                <h3 className="text-red-500 font-bold mb-2">Erreur</h3>
                <p className="text-red-400 text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Always show Stats Section */}
            <section>
                <h2 className="text-lg font-semibold mb-3 text-gray-200">Budget Global</h2>
                <BudgetChart stats={stats} loading={loading} />
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-3 text-gray-200">État du Budget</h2>
                <StatsCards stats={stats} loading={loading} />
            </section>

            {/* Transactions Section */}
            <section>
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-200">
                        {currentView === 'daily' && "Aujourd'hui"}
                        {currentView === 'weekly' && "Cette Semaine"}
                        {currentView === 'monthly' && "Ce Mois"}
                    </h2>
                    {report && !loading && (
                        <span className="text-sm text-gray-400">
                            Total: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(report.data.total)}
                        </span>
                    )}
                </div>
                <TransactionList
                    transactions={report?.data.transactions || []}
                    loading={loading}
                />
            </section>
        </div>
    );
};

export default Dashboard;
