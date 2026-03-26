# SUPABASE에서 사용하다가 나온거 끄적끄적
## RLS 사용
```sql
ALTER TABLE public.table_name ENABLE ROW LEVEL SECURITY; -- public.table_name에 테이블명 넣기
```

## 누구나 읽기 가능
민감하지 않은 데이터만 해당 규칙을 적용하자
```sql
CREATE POLICY allow_read_all ON public.table_name -- public.table_name에 테이블명 넣기
FOR SELECT
USING (true);

```
