CREATE OR REPLACE FUNCTION public.execute_sql(sql TEXT, params JSONB)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    EXECUTE sql USING params INTO result;
    RETURN result;
END;
$$ LANGUAGE plpgsql;
