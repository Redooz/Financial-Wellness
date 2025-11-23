export interface Expenses {
    indispensable: number;
    plaisir: number;
    total: number;
    monthName?: string;
}

export interface Remaining {
    indispensable: number;
    plaisir: number;
    total: number;
}

export interface Pct {
    indispensable: number;
    plaisir: number;
    total: number;
}

export interface StatsResponse {
    expenses: Expenses;
    remaining: Remaining;
    pct: Pct;
}

export interface Transaction {
    date: string;
    category: string;
    amount: number;
    description: string;
}

export interface ReportData {
    transactions: Transaction[];
    total: number;
    indispensable: number;
    plaisir: number;
}

export interface ReportResponse {
    period: string;
    data: ReportData;
}
