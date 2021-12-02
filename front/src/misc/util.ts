import { IPlayerScoreData } from "../score/interface";

type locations = "Tampere" | "Helsinki" | "Lappeenranta" | "Oulu"

export const getLocationPicture = (locName: string): string => {
    let result = "/resources/cities/";
    switch (locName.toLocaleLowerCase()) {
        case "tampere":
            result += "Tampere.vaakuna.svg"
            break;
        case "oulu":
            result += "Oulu.vaakuna.svg"
            break;
        case "lappeenranta":
            result += "Lappeenranta.vaakuna.svg"
            break;
        case "helsinki":
            result += "Helsinki.vaakuna.svg"
            break;
        default:
            result += "Icon-round-Question_mark.svg"
    }
    return result;

}

export const orderPlayerScores = (a: IPlayerScoreData, b:IPlayerScoreData, ascending: boolean) => {
    return (a.score - b.score) *  (ascending ? 1 : -1);
}

export const filterDuplicatePlayerScores = (orginal: IPlayerScoreData[], highest:boolean = true): IPlayerScoreData[] => {
    var result: IPlayerScoreData[] = []
    orginal.forEach(player => {
        const found=result.find(x => x.player === player.player)
        if(!found) {
            result.push(player);
        }
        else {
            // feels like there is a better way, but this should also work :D
            let change = found.score > player.score
            change = highest ? change : !change
            if(change) {
                found.score=player.score
            }
        }
    })
    return result;
}