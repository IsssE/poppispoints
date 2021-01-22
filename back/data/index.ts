import csv from 'csv-parse';
import * as fs from'fs';
import moment from 'moment';
import { Moment } from 'moment';


export interface IKVData {
    headers: string[];
    data: IData[];
}
interface IData {
    time: Date;
    representation: string;
    proof: string;
    variant: string;
    result?: ISingle | IDouble | ITeam;
    league: string;
}

interface ISingle {
    player?: string;
    score?: number;
}

interface IDouble {
    p1?: string;
    p2?: string;
    score?: number;
}

interface ITeam {
    p1?: string;
    p2?: string;
    p3?: string;
    p4?: string;
    score?: number;
    league?: string;
}

export default class DataParser {
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
                        const val: IData = {
                            time: date.toDate(),
                            representation: data[1],
                            proof: data[2],
                            variant: data[3],
                            league: data[4],
                        }
                        if (data[6]) {
                            val.result = {
                                player: data[5],
                                score: parseInt(data[6]),
                            };
                        } else if (data[9]) {
                            val.result = {
                                p1: data[7],
                                p2: data[8],
                                score: parseInt(data[9])
                            };
                        } else if(data[14]) {
                            val.result = {
                                p1: data[10],
                                p2: data[11],
                                p3: data[12],
                                p4: data[13],
                                score: parseInt(data[14]),
                                league: data[15],
                            }
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

