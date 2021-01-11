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
        return new Promise((resolve, reject) => {
            const results: IKVData[] = [];
            fs.createReadStream('data/kv_2020_tulokset.csv')
                .pipe(csv())
                .on('data', (data) => {
                    if(data["TimeStamp"])
                    {
                        results.push({
                            time: data["TimeStamp"],
                            representation: data["Edustus"],
                            proof: data["Todiste"],
                            type: data["Laji"],
                            single: {
                                player: data["Pelaaja"],
                                score: data["Tulos"]
                            },
                            double: {
                                p1: data["Pelaaja1"],
                                p2: data["Pelaaja2"],
                                score: data["Tulos"]
                            },
                            group: {
                                p1: data["Pelaaja1"],
                                p2: data["Pelaaja2"],
                                p3: data["Pelaaja3"],
                                p4: data["Pelaaja4"],
                                score: data["Tulos"],
                                league: data["Miesten_vai_naisten"],
                            },
                        })
                        //console.debug("data", data);
                        results.push(data);
                    }
                }).on('end', () => {
                    resolve(results)
                }).on('error', (err) => {
                    reject(err.message);
                });
        });
    }
}

