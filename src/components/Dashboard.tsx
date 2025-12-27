import React from 'react';
import type { StatsResponse, ReportResponse } from '../types';
import StatsCards from './StatsCards';
import BudgetChart from './BudgetChart';
import TransactionList from './TransactionList';
import { Plus } from 'lucide-react';

interface DashboardProps {
    currentView: 'daily' | 'weekly' | 'monthly';
    stats: StatsResponse | null;
    report: ReportResponse | null;
    loading: boolean;
    error: string | null;
}

const FORM_URL = import.meta.env.VITE_FORM_URL;

const Dashboard: React.FC<DashboardProps> = ({ currentView, stats, report, loading, error }) => {
    if (error) {
        return (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                <h3 className="text-red-500 font-bold mb-2">Erreur</h3>
                <p className="text-red-400 text-sm">{error}</p>
            </div>
        );
    }
    const { transactions } = report?.data ?? {};

    const orderedTransactions = transactions?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

            <section>
                <a
                    href={FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
                >
                    <Plus size={20} />
                    <span>Ajouter une transaction</span>
                </a>
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
                    transactions={orderedTransactions || []}
                    loading={loading}
                />
            </section>
        </div>
    );
};

export default Dashboard;
