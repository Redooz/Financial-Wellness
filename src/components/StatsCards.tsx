import React from 'react';
import type { StatsResponse } from '../types';
import { cn } from './Layout';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface StatsCardsProps {
    stats: StatsResponse | null;
    loading: boolean;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const getStatusColor = (pct: number) => {
    if (pct < 0) return 'text-red-500 border-red-500 bg-red-500/10';
    if (pct < 0.20) return 'text-yellow-500 border-yellow-500 bg-yellow-500/10';
    return 'text-green-500 border-green-500 bg-green-500/10';
};

const getStatusIcon = (pct: number) => {
    if (pct < 0) return <AlertCircle className="w-5 h-5" />;
    if (pct < 0.20) return <TrendingUp className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
};

const StatCard: React.FC<{ title: string; amount: number; pct: number }> = ({ title, amount, pct }) => {
    const statusColor = getStatusColor(pct);

    return (
        <div className={cn("p-4 rounded-2xl border bg-gray-800/50 backdrop-blur-sm transition-all", statusColor, "border-opacity-20")}>
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-medium opacity-80">{title}</h3>
                <div className={cn("p-1 rounded-full", statusColor.split(' ')[0])}>
                    {getStatusIcon(pct)}
                </div>
            </div>
            <div className="text-2xl font-bold tracking-tight">
                {formatCurrency(amount)}
            </div>
            <div className="text-xs mt-1 opacity-70">
                Restant
            </div>
        </div>
    );
};

const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
    if (loading || !stats) {
        return (
            <div className="grid grid-cols-2 gap-4 animate-pulse">
                <div className="h-32 bg-gray-800 rounded-2xl col-span-2"></div>
                <div className="h-32 bg-gray-800 rounded-2xl"></div>
                <div className="h-32 bg-gray-800 rounded-2xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Global Summary Card could go here if needed, but for now we focus on the two main categories */}

            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    title="Indispensable"
                    amount={stats.remaining.indispensable}
                    pct={stats.pct.indispensable}
                />
                <StatCard
                    title="Plaisir"
                    amount={stats.remaining.plaisir}
                    pct={stats.pct.plaisir}
                />
            </div>
        </div>
    );
};

export default StatsCards;
