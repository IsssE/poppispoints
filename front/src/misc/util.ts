
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