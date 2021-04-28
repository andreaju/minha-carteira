import React from 'react';
import { 
    Pie,
    ResponsiveContainer,
    Cell,
    PieChart,
 } from 'recharts';

import {
    Container,
    LegendContainer,
    Legend,
    SideLeft,
    SideRight
} from './styles';

interface IPieChartProps{
   data: {
       name: string;
       value: number;
       percent: number;
       color: string;
   }[]
}
const PieChartBox: React.FC<IPieChartProps> = ({data})=>(
    <Container>
        <SideLeft>
            <h1>Relação</h1>
            <LegendContainer>
                {  data.map(indicator => (
                    <Legend key={indicator.name} color={indicator.color}>
                        <div>{indicator.percent}%</div>
                        <span>{indicator.name}</span>
                    </Legend>))
                }
            </LegendContainer>

        </SideLeft>
        <SideRight>
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="percent">
                        {
                            data.map((indicator)=>(
                                <Cell key={indicator.name} fill={indicator.color}/>
                            ))

                        }

                    </Pie>
                </PieChart>

            </ResponsiveContainer>

        </SideRight>

    </Container>
)


export default PieChartBox;