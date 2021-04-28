import React, {useEffect, useMemo, useState} from 'react';
import ContentHeader from '../../components/ContentHeader'; 
import SelectInput from '../../components/SelectInput'; 
import HistoryFinanceCard from '../../components/HistoryFinanceCard'; 

import {Container, Content, Filters} from './styles';

import gains from  '../../repositories/gains';
import expenses from  '../../repositories/expenses';
import formateCurrency from '../../utils/formateCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

interface IRouterParams{
    match:{
        params:{
            type: string;
        }
    }
}

interface IData{
    id:string;
    description: string;
    amountFormated: string;
    frequency: string;
    dateFormated: string;
    tagColor: string; 
};
const List: React.FC<IRouterParams> = ({match})=>{
    
    const { type } = match.params;
    const [yearSelected, setYearSelected] = useState<string>(String( new Date().getFullYear()));
    const [monthSelected, setMonthSelected] = useState<string>(String( new Date().getMonth() + 1));
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente','eventual']);

    const [data, setData] = useState<IData[]>([]);
    const title = useMemo(()=>{
        return type === 'entry-balance' ?  'Entradas': 'Saidas';
    },[type])

    const listData = useMemo(()=>{
        return type === 'entry-balance' ? gains : expenses ;
    },[type]);

    const lineColor = useMemo(()=>{
        return type === 'entry-balance' ? '#4E41F0' : '#E44C4E';
    },[type])

    const months  = useMemo(()=>{
        return listOfMonths.map((item, index)=>{
            return {
                value: index + 1,
                label: item,
            }
        })
    },[]);

    const years  =  useMemo(()=>{
        let uniqueYears: number[] = [];
        listData.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });
        return uniqueYears.map( year => {
            return {
                value: year, 
                label: year,
            }
        });
    },[listData]);

    const handleFrequencyClick = (frequency:string) =>{
        const alradySelected = selectedFrequency.findIndex( item => item === frequency);
        if (alradySelected >= 0){ 
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
        }
        else {
            
            setSelectedFrequency((prev)=> [...prev, frequency]);
        }
    }

    useEffect(()=>{
        const filteredData = listData.filter((item)=>{
            const date =  new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());
            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
        });
        const formattedData = filteredData.map(item=>{
            return {
                id: String(Math.random() * data.length),
                description: item.description,
                amountFormated: formateCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormated: formatDate(item.date),
                tagColor: item.frequency === 'recorrente'? '#4E41F0' : '#E44C4E',
            }
        });

        setData(formattedData);

    },[monthSelected, yearSelected, listData, type, selectedFrequency, data.length]);

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput 
                    options={months} 
                    onChange={ (e)=> { setMonthSelected(e.target.value) } }
                    defaultValue={monthSelected}
                    />
                <SelectInput 
                    options={years} 
                    onChange={ (e)=> { setYearSelected(e.target.value) } }
                    defaultValue={yearSelected}
                    />
            </ContentHeader>

            <Filters>
                <button 
                    type="button" 
                    className={`tag-filter tag-filter-recorrent
                    ${selectedFrequency.includes('recorrente') && 'tag-actived'}
                    `}
                    onClick={()=> handleFrequencyClick('recorrente')}
                >Recorrentes</button>
                <button 
                type="button" 
                className={`tag-filter tag-filter-eventual
                ${selectedFrequency.includes('eventual') && 'tag-actived'}
                `}
                onClick={()=> handleFrequencyClick('eventual')}
                >Eventuais</button>
            </Filters>
            <Content>
                { 
                    data.map( item =>  (
                        <HistoryFinanceCard
                        key={Math.random()}
                        tagColor= {item.tagColor}
                        cardColor="#2F3960"
                        title={item.description}
                        subtitle={item.dateFormated}
                        amount={item.amountFormated}
                    />
                    ) )
                }
                 
            </Content>
        </Container>
    )
} 

export default List;