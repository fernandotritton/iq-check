import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Get all test sessions where payment is pending (crypto)
        // For now, we'll return sessions that were created but not paid
        // In a real implementation, you'd have a separate table for pending payments

        const { data: sessions, error } = await supabase
            .from('TestSession')
            .select('*')
            .eq('hasPaid', false)
            .order('createdAt', { ascending: false })
            .limit(50);

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        // For this MVP, we'll check localStorage for pending_payment entries
        // In production, you'd have a proper PendingPayments table
        const pendingPayments = (sessions || [])
            .filter((session: any) => {
                // Only show sessions that are less than 24 hours old
                const sessionDate = new Date(session.createdAt);
                const now = new Date();
                const hoursDiff = (now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60);
                return hoursDiff < 24;
            })
            .map((session: any) => ({
                id: session.id,
                sessionId: session.id,
                amount: '1.49',
                method: 'USDT (TRC20)',
                timestamp: new Date(session.createdAt).getTime(),
            }));

        return NextResponse.json({
            success: true,
            payments: pendingPayments
        });

    } catch (error: any) {
        console.error('Error fetching pending payments:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to fetch pending payments' },
            { status: 500 }
        );
    }
}
