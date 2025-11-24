import React, { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import type { Transaction } from '../types';
import { cn } from './Layout';
import { deleteTransaction } from '../services/api';
import Loader from './Loader';

interface TransactionListProps {
    transactions: Transaction[];
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

const formatDate = (dateString: string) => {
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
        }).format(date);
    } catch (e) {
        return dateString;
    }
};

const TransactionList: React.FC<TransactionListProps> = ({ transactions, loading }) => {
    const [deletingRow, setDeletingRow] = useState<number | null>(null);

    const handleDelete = async (row: number) => {
        setDeletingRow(row);
        try {
            const response = await deleteTransaction(row);
            if (response.success) {
                const index = transactions.findIndex(t => t.row === row);
                if (index !== -1) {
                    transactions.splice(index, 1);
                }
            }
        } catch (error) {
            console.error('Error deleting transaction:', error);
        } finally {
            setDeletingRow(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-3 mt-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-800 rounded-xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                Aucune transaction
            </div>
        );
    }

    return (
        <div className="space-y-3 mt-4">
            {transactions.map((t, index) => {
                const isIndispensable = t.category.toLowerCase().includes('indispensable');
                const isPlaisir = t.category.toLowerCase().includes('plaisir');

                let categoryColor = "bg-gray-700 text-gray-300";
                if (isIndispensable) categoryColor = "bg-pink-500/20 text-pink-400 border border-pink-500/30";
                if (isPlaisir) categoryColor = "bg-blue-500/20 text-blue-400 border border-blue-500/30";

                return (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:bg-gray-800/60 transition-colors">
                        <div className="flex flex-col">
                            <span className="font-medium text-white">{t.description}</span>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-500">{formatDate(t.date)}</span>
                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider", categoryColor)}>
                                    {t.category}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="font-bold text-white">
                                {formatCurrency(t.amount)}
                            </div>
                            {t.editUrl && (
                                <a
                                    href={t.editUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
                                >
                                    <Pencil size={16} />
                                </a>
                            )}
                            <button
                                onClick={() => handleDelete(t.row)}
                                disabled={deletingRow === t.row}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deletingRow === t.row ? (
                                    <Loader size={16} />
                                ) : (
                                    <Trash size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TransactionList;
