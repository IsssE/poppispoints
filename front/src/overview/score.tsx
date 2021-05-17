import React from 'react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';
import { IPlayerScoreData } from '../score/interface';

interface ICityScoresProps {
    variantPlayerData: IPlayerScoreData[];
}

interface IData {
    score: number,
    location: string,
    fill: string,
}

export const VariantCityScores = (props: ICityScoresProps) => {

    const playerData = summarizePlayerData(props.variantPlayerData);

    return <ResponsiveContainer width="95%" height={150}>

        <PieChart >
            <Pie data={playerData} dataKey="score" nameKey="location" />
        </PieChart>
    </ResponsiveContainer>
}

const summarizePlayerData = (allPlayerData: IPlayerScoreData[]): IData[] => {
    const result: IData[] = [
        {
            location: "Helsinki",
            score: 0,
            fill: "#4287f5"
        },
        {
            location: "Tampere",
            score: 0,
            fill: "#e32d2d"
        },
        {
            location: "Oulu",
            score: 0,
            fill: "#9b004b"
        },
        {
            location: "Lappeenranta",
            score: 0,
            fill: "#118c15"
        }
    ];
    allPlayerData.forEach(element => {
        const loc = result.find(x => x.location === element.location)
        if (loc) {
            loc.score += element.score
        }
    });

    return result;
}
