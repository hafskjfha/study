# pgsql 쿼리문 공부한거 저장

## 특정 테이블을 업데이트 했을때 업데이트 되게 하는 트리거 함수
```plpgsql
CREATE OR REPLACE FUNCTION update_last_modified()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.last_update (table_name, last_modified)
  VALUES (TG_TABLE_NAME, now() AT TIME ZONE 'utc')
  ON CONFLICT (table_name) DO UPDATE 
  SET last_modified = EXCLUDED.last_modified;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
### last_update
```sql
create table public.last_update (
  table_name text not null,
  last_modified timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
) TABLESPACE pg_default;
```

### 트리거 적용
```sql
CREATE TRIGGER trigger_update_last_modified -- 트리거 명
AFTER INSERT OR UPDATE OR DELETE ON public.your_table -- 테이블 명
FOR EACH ROW
EXECUTE FUNCTION update_last_modified();
```

## word 테이블 생성
```sql
CREATE TABLE
  topics (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    NAME TEXT NOT NULL
  );

CREATE TABLE
  words (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    word TEXT NOT NULL,
    first_letter TEXT NOT NULL,
    last_letter TEXT NOT NULL,
    initial TEXT NOT NULL
  );

CREATE TABLE
  word_topics (
    word_id BIGINT,
    topic_id BIGINT,
    PRIMARY KEY (word_id, topic_id),
    FOREIGN KEY (word_id) REFERENCES words (id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE CASCADE
  );
```

## 단어와 주제 정보를 한 줄로 그룹화하여 조회
```sql
SELECT 
    w.id AS word_id,
    w.word,
    w.first_letter,
    w.last_letter,
    w.initial,
    STRING_AGG(t.name, ', ') AS topics
FROM 
    words w
LEFT JOIN 
    word_topics wt ON w.id = wt.word_id
LEFT JOIN 
    topics t ON wt.topic_id = t.id
GROUP BY 
    w.id, w.word, w.first_letter, w.last_letter, w.initial;

```
## topics 테이블에 데이터 삽입
```sql
INSERT INTO topics (name, code) VALUES ('Topic1', 'CODE1'), ('Topic2', 'CODE2');
```
## words 테이블에 데이터 삽입
```sql
INSERT INTO words (word, first_letter, last_letter, initial) 
VALUES 
    ('apple', 'a', 'e', 'ae'),
    ('banana', 'b', 'a', 'ba'),
    ('cherry', 'c', 'y', 'cy');

```
## word_topics 테이블에 데이터 삽입 (자동화 삽입)
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'apple'), (SELECT id FROM topics WHERE code = '10'));
    
```
## 여러 주제를 한 단어에 삽입
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'cherry'), (SELECT id FROM topics WHERE name = 'Science')),
    ((SELECT id FROM words WHERE word = 'cherry'), (SELECT id FROM topics WHERE name = 'Technology')),
    ((SELECT id FROM words WHERE word = 'cherry'), (SELECT id FROM topics WHERE name = 'Art'));

```
## 한 단어의 주제를 추가
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'apple'), (SELECT id FROM topics WHERE code = 'Technology'));
```
## 한 단어의 주제를 수정
### 기존 주제 삭제
```sql
DELETE FROM word_topics
WHERE word_id = (SELECT id FROM words WHERE word = 'apple')
  AND topic_id = (SELECT id FROM topics WHERE code = 'Science');
```
### 새로운 주제 삽입
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'apple'), (SELECT id FROM topics WHERE code = 'Art'));
```
## 한 단어의 특정 주제 삭제
```sql
DELETE FROM word_topics
WHERE word_id = (SELECT id FROM words WHERE word = 'banana')
  AND topic_id = (SELECT id FROM topics WHERE name = 'Literature');
```
## 한 단어의 모든 주제 삭제
```sql
DELETE FROM word_topics
WHERE word_id = (SELECT id FROM words WHERE word = 'cherry');
```
## 한 단어와 주제를 조회하는 쿼리
```sql
SELECT 
    w.word,
    STRING_AGG(t.name, ', ') AS topics
FROM 
    words w
LEFT JOIN 
    word_topics wt ON w.id = wt.word_id
LEFT JOIN 
    topics t ON wt.topic_id = t.id
WHERE 
    w.word = 'apple'
GROUP BY 
    w.word;
```

