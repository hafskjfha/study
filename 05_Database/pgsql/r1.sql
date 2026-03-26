CREATE TABLE single_char_data (
    id SERIAL PRIMARY KEY,  -- 각 데이터를 고유하게 식별하는 ID
    char_value CHAR(1) NOT NULL UNIQUE,  -- 한 글자로 된 데이터
);
SELECT char_value FROM single_char_data;

DELETE FROM single_char_data WHERE char_value = '삭제할문자';

INSERT INTO single_char_data (char_value) VALUES ('A');

ALTER TABLE single_char_data
ADD CONSTRAINT valid_characters CHECK (char_value ~ '^[가-힣A-Za-z0-9]$'); --한글, 영어, 숫자만 허용
