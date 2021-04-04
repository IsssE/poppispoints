CREATE TABLE [IF NOT EXISTS] players (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    result_id INTEGER NOT NULL,
    FOREIGN KEY (result_id) REFERENCES results (id)
)

-- Might want a many to one table here to link 
-- multiple players to single result.

CREATE TABLE [IF NOT EXISTS] results (
    id INTEGER PRIMARY KEY,
    location TEXT,
    time  DATE,
    score INTEGER,
    video TEXT,
    variant INTEGER,
    FOREIGN KEY (variant) REFERENCES variants(id)
)

CREATE TABLE [IF NOT EXISTS] variants {
    id INTEGER PRIMARY KEY,
    name TEXT,
    max_players INTEGER NOT NULL,
    description TEXT,
}