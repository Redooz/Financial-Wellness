import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface LayoutProps {
    children: React.ReactNode;
    currentView: 'daily' | 'weekly' | 'monthly';
    onViewChange: (view: 'daily' | 'weekly' | 'monthly') => void;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
    const tabs = [
        { id: 'daily', label: "Aujourd'hui" },
        { id: 'weekly', label: 'Cette Semaine' },
        { id: 'monthly', label: 'Ce Mois' },
    ] as const;

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans pb-20">
            <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-4">
                <h1 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                    Mon Budget 💸
                </h1>
                <nav className="flex justify-center space-x-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onViewChange(tab.id)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                currentView === tab.id
                                    ? "bg-white text-gray-900 shadow-lg scale-105"
                                    : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </header>
            <main className="container mx-auto px-4 py-6 max-w-md">
                {children}
            </main>
        </div>
    );
};

export default Layout;
