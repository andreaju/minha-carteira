import Reat from 'react';
import { BarChart
        , ResponsiveContainer
        , Cell
        , Bar, 
        Tooltip} from 'recharts';
import formatCurrency from '../../utils/formateCurrency';


import {
    Container,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend} from './styles';

interface IBarChartBoxProps {
    title: string;
    data:{
        name: string;
        amount: number;
        percent: number;
        color: string
    }[]
}

const BarChartBox: React.FC<IBarChartBoxProps> = ({title, data
}) => {
    return(
    <Container>
        <SideLeft>
             <h2>{title}</h2>
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
                <BarChart data={data}>
                    <Bar dataKey="amount" name='Valor'>
                        {data.map((item)=> (
                                <Cell
                                  key={item.name}
                                  cursor="pointer"
                                  fill={item.color}
                               />)
                               )
                        }
                    </Bar>
                    <Tooltip
                      formatter={formatCurrency}
                      cursor={{fill:'none'}}
                    />
                </BarChart>
            </ResponsiveContainer>

        </SideRight>
    </Container>
    )
}


export default BarChartBox;