
export interface IPlayer {
    id: number;
    name: string;
    team?: number;
    aliases?: IPlayer[] // Maybe want something like this? For when there are result by same player with different names (typos or nicknames)
}

