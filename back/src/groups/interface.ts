
// Club: ie. tammer-kyykkä, nurmes etc...
// Team: Anaali-vandaalit, AiM 
type IGroupType = "team" | "club";

interface ITeam {
    id: number;
    type: IGroupType;
    abbreviation?: string;
} 
