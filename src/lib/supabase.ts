import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Database {
  public: {
    Tables: {
      user_activities: {
        Row: {
          id: string;
          user_id: string;
          activity_type: string;
          input_format: string;
          output_format: string;
          file_size: number;
          success: boolean;
          timestamp: string;
        };
        Insert: {
          user_id: string;
          activity_type: string;
          input_format: string;
          output_format: string;
          file_size: number;
          success: boolean;
        };
        Update: {
          activity_type?: string;
          input_format?: string;
          output_format?: string;
          file_size?: number;
          success?: boolean;
        };
      };
      shared_files: {
        Row: {
          id: string;
          file_id: string;
          user_id: string;
          original_filename: string;
          file_type: string;
          file_size: number;
          expires_at: string;
          created_at: string;
        };
        Insert: {
          file_id: string;
          user_id: string;
          original_filename: string;
          file_type: string;
          file_size: number;
          expires_at: string;
        };
        Update: {
          expires_at?: string;
        };
      };
    };
  };
}