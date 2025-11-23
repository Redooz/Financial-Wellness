import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    type ChartOptions,
    type ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { StatsResponse } from '../types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BudgetChartProps {
    stats: StatsResponse | null;
    loading: boolean;
}

const COLOR_PINK = '#FF6384';
const COLOR_BLUE = '#36A2EB';
const COLOR_GREY = '#E0E0E0'; // Using a lighter grey for "Remaining"

const BudgetChart: React.FC<BudgetChartProps> = ({ stats, loading }) => {
    if (loading || !stats) {
        return <div className="h-24 bg-gray-800 rounded-xl animate-pulse w-full"></div>;
    }

    const safeRemaining = stats.remaining.total > 0 ? stats.remaining.total : 0;

    const data: ChartData<'bar'> = {
        labels: ['Budget'],
        datasets: [
            {
                label: 'Indispensable',
                data: [stats.expenses.indispensable],
                backgroundColor: COLOR_PINK,
                barThickness: 40,
            },
            {
                label: 'Plaisir',
                data: [stats.expenses.plaisir],
                backgroundColor: COLOR_BLUE,
                barThickness: 40,
            },
            {
                label: 'Restant',
                data: [safeRemaining],
                backgroundColor: COLOR_GREY,
                barThickness: 40,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const, // Horizontal bar
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                display: false, // Hide axis
                grid: {
                    display: false
                }
            },
            y: {
                stacked: true,
                display: false, // Hide axis
                grid: {
                    display: false
                }
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: '#fff',
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                enabled: true, // Enable tooltips for interactivity
            }
        },
        elements: {
            bar: {
                borderRadius: 4, // Slight rounding
            }
        }
    };

    return (
        <div className="w-full h-32 bg-gray-800/30 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
            <div className="h-full">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default BudgetChart;
