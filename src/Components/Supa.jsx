import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cefeomxrzjyxzwmesvwb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlZmVvbXhyemp5eHp3bWVzdndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MTk1OTUsImV4cCI6MjAwNTA5NTU5NX0.g4Wkrb58PwunvvGrplcG-gf13O6-I4B6we4uJRde7js"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
