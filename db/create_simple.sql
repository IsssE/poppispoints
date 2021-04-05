CREATE TABLE [IF NOT EXISTS] players (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    result_id INTEGER NOT NULL,
)

CREATE TABLE [IF NOT EXISTS] results (
    id INTEGER PRIMARY KEY,
    location TEXT,
    time DATE,
    score INTEGER,
    proof TEXT,
    variant INTEGER,
)

CREATE TABLE [IF NOT EXISTS] players_results (
    player_id INTEGER,
    result_id INTEGER,
    FOREIGN KEY (player_id) REFERENCES results (id)
    FOREIGN KEY (result_id) REFERENCES players (id)
)

CREATE TABLE [IF NOT EXISTS] variants {
    id INTEGER PRIMARY KEY,
    name TEXT,
    max_players INTEGER NOT NULL,
    description TEXT,
}