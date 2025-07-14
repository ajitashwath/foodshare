export interface DatabaseConfig {
    supabaseUrl: string;
    supabaseAnonKey: string;
    supabaseServiceRoleKey?: string;
}

export interface AppConfig {
    database: DatabaseConfig;
    frontend: {
        mainUrl: string;
        aiUrl: string;
        partnershipUrl: string;
    };
    api: {
        version: string;
        prefix: string;
    };
    foodSafety: {
        defaultExpiryHours: number;
        preparedFoodExpiryHours: number;
    };
    logging: {
        level: 'debug' | 'info' | 'warn' | 'error';
        enabled: boolean;
    };
}

export const config: AppConfig = {
    database: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
        supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    },
    frontend: {
        mainUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
        aiUrl: process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:3000/ai-chat',
        partnershipUrl: process.env.NEXT_PUBLIC_PARTNERSHIP_URL || 'http://localhost:3000/partnership',
    },
    api: {
        version: 'v1',
        prefix: '/api/v1',
    },
    foodSafety: {
        defaultExpiryHours: 24,
        preparedFoodExpiryHours: 2,
    },
    logging: {
        level: 'info',
        enabled: true,
    },
};

export function validateConfig(): boolean {
    const hasValidSupabase =
        config.database.supabaseUrl !== 'https://placeholder.supabase.co' &&
        config.database.supabaseAnonKey !== 'placeholder-anon-key' &&
        config.database.supabaseUrl.includes('supabase.co');

    if (!hasValidSupabase) {
        console.warn('Supabase credentials not configured. Some features may not work.');
        return false;
    }

    return true;
}