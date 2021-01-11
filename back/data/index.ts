import { rejects } from 'assert';
import csv = require('csv-parse');
import fs = require('fs');


export interface IKVData {
    time: Date;
    representation: string;
    proof: string;
    type: string;
    // Being layzy for now. Putting data in all
    // later check which single/double/team
    single: ISingle;
    double: IDouble;
    group: ITeam;
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
    public data: Promise<IKVData[]>;
    constructor() {
        this.data = this.pareseDataKV();
    }

    private pareseDataKV = (): Promise<IKVData[]> => {
        const results: IKVData[] = [];
        let yksi = 0;
        return new Promise((resolve, reject) => {
            fs.createReadStream('data/kv_2020_tulokset.csv')
                .pipe(csv())
                .on('data', (data: string[]) => {
                    if (data[0]) {
                        results.push({
                            time: new Date(data[0]),
                            representation: data[1],
                            proof: data[2],
                            type: data[3],
                            league: data[4],
                            single: {
                                player: data[5],
                                score: parseInt(data[6]),
                            },
                            double: {
                                p1: data[7],
                                p2: data[8],
                                score: parseInt(data[9])
                            },
                            group: {
                                p1: data[9],
                                p2: data[10],
                                p3: data[11],
                                p4: data[12],
                                score: parseInt(data[13]),
                                league: data[14],
                            },
                        })
                    }


                }).on('end', () => {
                    resolve(results)
                }).on('error', (err) => {
                    reject(err.message);
                });
        });
    }
}

