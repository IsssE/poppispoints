CREATE TABLE [IF NOT EXISTS] players (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    result_id INTEGER NOT NULL,
    FOREIGN KEY (results)
        REFERENCES results (result_id)
)

-- Might want a many to one table here to link 
-- multiple players to single result.

CREATE TABLE [IF NOT EXISTS] results (
    id INTEGER PRIMARY KEY,
    location TEXT,
    time  DATE,
    score INTEGER,
    video TEXT,

)