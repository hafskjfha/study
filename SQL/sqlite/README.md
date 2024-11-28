# sqlite
## 테이블 생성
```sql
CREATE TABLE topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    first_letter TEXT NOT NULL,
    last_letter TEXT NOT NULL,
    initial TEXT NOT NULL
);

CREATE TABLE word_topics (
    word_id INTEGER,
    topic_id INTEGER,
    PRIMARY KEY (word_id, topic_id),
    FOREIGN KEY (word_id) REFERENCES words (id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES topics (id) ON DELETE CASCADE
);
```

---

## 단어와 주제 정보를 한 줄로 그룹화하여 조회
```sql
SELECT 
    w.id AS word_id,
    w.word,
    w.first_letter,
    w.last_letter,
    w.initial,
    GROUP_CONCAT(t.name, ', ') AS topics
FROM 
    words w
LEFT JOIN 
    word_topics wt ON w.id = wt.word_id
LEFT JOIN 
    topics t ON wt.topic_id = t.id
GROUP BY 
    w.id, w.word, w.first_letter, w.last_letter, w.initial;
```

---

## topics 테이블에 데이터 삽입
```sql
INSERT INTO topics (name) VALUES 
    ('Science'), 
    ('Literature'), 
    ('Technology'), 
    ('Art');
```

---

## words 테이블에 데이터 삽입
```sql
INSERT INTO words (word, first_letter, last_letter, initial) 
VALUES 
    ('apple', 'a', 'e', 'ae'),
    ('banana', 'b', 'a', 'ba'),
    ('cherry', 'c', 'y', 'cy');
```

---

## word_topics 테이블에 데이터 삽입 (자동화 삽입)
SQLite에서는 서브쿼리를 직접 사용할 수 없으므로 `INSERT INTO`를 분리하여 실행합니다.
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'apple'), (SELECT id FROM topics WHERE name = 'Science'));

INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'apple'), (SELECT id FROM topics WHERE name = 'Art'));

INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'banana'), (SELECT id FROM topics WHERE name = 'Literature'));
```

---

## 여러 주제를 한 단어에 삽입
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'cherry'), (SELECT id FROM topics WHERE name = 'Science'));

INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'cherry'), (SELECT id FROM topics WHERE name = 'Technology'));

INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'cherry'), (SELECT id FROM topics WHERE name = 'Art'));
```

---

## 한 단어의 주제를 추가
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'apple'), (SELECT id FROM topics WHERE name = 'Technology'));
```

---

## 한 단어의 주제를 수정
### 기존 주제 삭제
```sql
DELETE FROM word_topics
WHERE word_id = (SELECT id FROM words WHERE word = 'apple')
  AND topic_id = (SELECT id FROM topics WHERE name = 'Science');
```

### 새로운 주제 삽입
```sql
INSERT INTO word_topics (word_id, topic_id)
VALUES 
    ((SELECT id FROM words WHERE word = 'apple'), (SELECT id FROM topics WHERE name = 'Art'));
```

---

## 한 단어의 특정 주제 삭제
```sql
DELETE FROM word_topics
WHERE word_id = (SELECT id FROM words WHERE word = 'banana')
  AND topic_id = (SELECT id FROM topics WHERE name = 'Literature');
```

---

## 한 단어의 모든 주제 삭제
```sql
DELETE FROM word_topics
WHERE word_id = (SELECT id FROM words WHERE word = 'cherry');
```

---

## 한 단어와 주제를 조회하는 쿼리
```sql
SELECT 
    w.word,
    GROUP_CONCAT(t.name, ', ') AS topics
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

---

