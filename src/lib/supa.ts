import { createClient } from '@supabase/supabase-js';
const SERVICE_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hYXB2cHJvaWNrb3lqaHBtdW1sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3MDg4MDQ4NSwiZXhwIjoxOTg2NDU2NDg1fQ.OWODq7virHL_8w9r4chz_rLJA2iS00fSRF7aPv2Ucpg';
const SUPA_URL = 'https://oaapvproickoyjhpmuml.supabase.co';
const supabase = createClient<Database>(SUPA_URL, SERVICE_KEY);
export default supabase;

export interface Mercado {
	id: number;
	created_at: string;
	name: string;
	preco: number;
}

export interface Database {
	public: {
		Tables: {
			mercado: {
				Row: {
					id: number;
					created_at: string;
					name: string;
					preco: number;
				};
				Insert: {
					id?: number;
					created_at?: string;
					name: string;
					preco: number;
				};
				Update: {
					id?: number;
					created_at?: string;
					name: string;
					preco: number;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
