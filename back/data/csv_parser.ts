import csv from 'csv-parse';
import express from 'express';
import * as fs from 'fs';
import moment from 'moment';
import { Moment } from 'moment';
import { IGameData } from './interface.model';
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


export const sendKVData = async (req: express.Request, res: express.Response) => {

    try {
        const result = await parese2021KVData();

        result.data.forEach(x => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", 'http://localhost:8080/api/scores/newScore', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(x));
        })
        console.debug("sent this many requests by parser: ", result.data.length)

        res.status(200).send(result);
    }
    catch (e) {
        res.status(500).send(e.message);
    }

}

async function parese2021KVData(): Promise<{ data: IGameData[], headers: string[] }> {
    const resultData: IGameData[] = [];
    let headers: string[] = []
    // No interest in looking for document to handle header
    // just skip first
    let first = true;
    return new Promise((resolve, reject) => {
        fs.createReadStream('data/kv_2021_tulokset.csv')
            .pipe(csv())
            .on('data', (dataString: string[]) => {
                const data = dataString[0].split(";")
                if (data[0] && !first) {
                    const date: Moment = moment(data[1], "dd/mm/yyyy hh:mm:ss")
                    let val: IGameData = {
                        time: date.toDate(),
                        representation: data[2],
                        proof: data[3],
                        variant: handleVariant(data[4]),
                        league: handleLeague(data[5]),
                        players: { p1: data[6] },
                        score: parseInt(data[7]),
                    }
                    resultData.push(val);
                } else {
                    if (data[0]) {
                        const headerData: string[] = [...data.slice(0, 5), "result"]

                        headers = headerData;
                    }
                }
                first = false;
            }).on('end', () => {
                resolve({ data: resultData, headers: headers })
            }).on('error', (err: Error) => {
                reject(err.message);
            });
    });
}
const handleLeague = (league: string): "M" | "W" | "A" => {
    if (!league) {
        return "A"
    }

    switch (league.toLocaleLowerCase()) {
        case "miesten":
            return "M";
        case "naisten":
            return "M";
        default:
            return "A";

    }
}
const handleVariant = (variant: string): string => {
    if (!variant) {
        return "Henkkari"
    }

    switch (variant.toLocaleLowerCase()) {
        case "5-ottelu":
            return "Viisiottelu";
        case "7-ottelu":
            return "Seitsenottelu";
        default:
            return variant;

    }
}

/**
 *
 export class DataParser {
     public data: Promise<IKVData>;
     constructor() {
         this.data = this.pareseDataKV();
        }

        private pareseDataKV = (): Promise<IKVData> => {
            const resultData: IData[] = [];
            let headers: string[] = []
            // No interest in looking for document to handle header
            // just skip first
            let first = true;
            return new Promise((resolve, reject) => {
                fs.createReadStream('data/kv_2020_tulokset.csv')
                .pipe(csv())
                .on('data', (data: string[]) => {
                    if (data[0] && !first) {
                        const date: Moment = moment(data[0], "dd/mm/yyyy hh:mm:ss")
                        let val: IData = {
                            time: date.toDate(),
                            representation: data[1],
                            proof: data[2],
                            variant: data[3],
                            league: data[4],
                            score: 0,
                        }
                        if (data[6]) {
                            val.players = {
                                p1: data[5],
                            },
                            val = {...val, score: parseInt(data[6])}
                        } else if (data[9]) {
                            val.players = {
                                p1: data[7],
                                p2: data[8],
                            };
                            val = {...val, score: parseInt(data[9]) }
                        } else if(data[14]) {
                            val.players = {
                                p1: data[10],
                                p2: data[11],
                                p3: data[12],
                                p4: data[13],
                                //league: data[15],
                            }
                            val = {...val, score: parseInt(data[14])}
                        }
                        resultData.push(val);
                    } else {
                        if(data[0]) {
                            const headerData: string[] = [...data.slice(0,5), "result"]

                            headers = headerData;
                        }
                    }
                    first = false;

                }).on('end', () => {
                    resolve({data: resultData, headers: headers})
                }).on('error', (err: Error) => {
                    reject(err.message);
                });
        });
    }
}
*/

