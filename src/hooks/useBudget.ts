import { useQuery } from '@tanstack/react-query';
import { fetchStats, fetchReport } from '../services/api';
import type { StatsResponse, ReportResponse } from '../types';

export const useStats = () => {
    return useQuery<StatsResponse>({
        queryKey: ['stats'],
        queryFn: fetchStats,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });
};

export const useReport = (period: 'daily' | 'weekly' | 'monthly') => {
    return useQuery<ReportResponse>({
        queryKey: ['report', period],
        queryFn: () => fetchReport(period),
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
    });
};
