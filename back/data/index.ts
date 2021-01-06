import csv = require('csv-parser');
import fs = require('fs');


interface IData {
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

export const pareseDataKV = (filePath: string): IData[] => {
    
    return [];  
} 