export interface IPlayerResults {
    player: string;
    location: string;
    time: Date;
    score: number;
    proof: string;
}
export interface IPlayerResultsWithVariant extends IPlayerResults {
    variant: IVariant;
}

interface IVariant {
    name: string;
    league: "M" | "W" | "A";
    description: string;
}

export interface IVariantInfo {
    name: string
}

/** 
 * Structure used when there is support for doubles and Teams
 * might come in handy
 * also used in 2020 csv data
 */
export type IPlayers = ISingle | IDouble | ITeam;

export interface IKVData {
    headers: string[];
    data: IGameData[];
}
export interface IGameData {
    time: Date;
    representation: string;
    proof: string;
    variant: string;
    players?: IPlayers;
    league: string;
    score: number;
}

interface ISingle {
    p1: string;
}

interface IDouble {
    p1: string;
    p2: string;
}

interface ITeam {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
}