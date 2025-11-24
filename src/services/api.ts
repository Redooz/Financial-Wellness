import axios from 'axios';
import type { StatsResponse, ReportResponse, DeleteResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchStats = async (): Promise<StatsResponse> => {
    if (!API_BASE_URL || !API_KEY) {
        throw new Error('API Configuration Missing');
    }
    const response = await api.get('', {
        params: {
            key: API_KEY,
            action: 'stats',
        },
    });
    return response.data;
};

export const fetchReport = async (period: 'daily' | 'weekly' | 'monthly'): Promise<ReportResponse> => {
    if (!API_BASE_URL || !API_KEY) {
        throw new Error('API Configuration Missing');
    }
    const response = await api.get('', {
        params: {
            key: API_KEY,
            action: period,
        },
    });
    return response.data;
};

export const deleteTransaction = async (row: number): Promise<DeleteResponse> => {
    if (!API_BASE_URL || !API_KEY) {
        throw new Error('API Configuration Missing');
    }
    const response = await api.get('', {
        params: {
            key: API_KEY,
            action: 'delete',
            row: row,
        },
    });
    return response.data;
};
