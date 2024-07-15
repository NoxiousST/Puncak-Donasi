
import { createClient } from '@supabase/supabase-js';
import { Database } from "@/lib/schema.ts"

const supabaseUrl = "https://yjugttxjvdbzftblrrya.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdWd0dHhqdmRiemZ0YmxycnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0MDAxMzMsImV4cCI6MjAzNDk3NjEzM30.A0FSERJlsM3Q7cWwhGQI9JTEVGRjwf85Fj6QbswQ3EQ";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase
