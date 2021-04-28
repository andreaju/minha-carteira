import React, {useState, useMemo} from 'react';
import ContentHeader from '../../components/ContentHeader';
import {
    Container,
    Content
} from './styles';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';


import gains from  '../../repositories/gains';
import expenses from  '../../repositories/expenses';
import listOfMonths from '../../utils/months';
import HappyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import PieChartBox from '../../components/PieChartBox';

import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';
const Dashboard: React.FC = ()=>{

    const [yearSelected, setYearSelected] = useState<string>(String( new Date().getFullYear()));
    const [monthSelected, setMonthSelected] = useState<string>(String( new Date().getMonth() + 1));

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
        [...expenses, ...gains].forEach(item => {
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
    },[]);

    const totalExpenses = useMemo(()=>{
        let total: number = 0;
        expenses.forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1
            if (String(month) === monthSelected && String(year) === yearSelected){
                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount! amount must be number!');
                }
            }
        });
        return total;
    },[monthSelected, yearSelected])

    const totalGains = useMemo(()=>{
        let total: number = 0;
        gains.forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1
            if (String(month) === monthSelected && String(year) === yearSelected){
                try {
                    total += Number(item.amount);
                } catch (error) {
                    throw new Error('Invalid amount! amount must be number!');
                }
            }
        });
        return total;
    },[monthSelected, yearSelected])

    const totalBalance = useMemo(()=>{
        return totalGains - totalExpenses;
    },[totalGains, totalExpenses])

    const message = useMemo(()=>{
        if (totalBalance < 0){
            return {
                title: 'Que triste!',
                description: 'Neste mês você gastou mais do que deveria',
                footerText: 'Verifique seus gastos e tente cortar algumas coisas!',
                icon: sadImg,
            }
        } else {
            return {
                title: 'Bem vindo!',
                description: 'Sua carteira está positiva!',
                footerText: 'Continue assim, invista seu saldo!',
                icon: HappyImg,
            }
        }
    },[totalBalance])

    const relationExpensesVersusGains = useMemo(()=>{
        const total = totalGains +  totalExpenses;
        const percentGains = (totalGains/total)*100;
        const percentExpenses = (totalExpenses/total)*100;

        const data = [
            {
                name:'entradas',
                value: totalGains,
                percent: percentGains ? Number(percentGains.toFixed(1)) : 0,
                color: '#E44C4E',
            },
            {
                name:'saídas',
                value: totalExpenses,
                percent: percentExpenses ? Number(percentExpenses.toFixed(1)) : 0,
                color: '#F7931B',
            }
        ]

        return data;
    },[ totalExpenses, totalGains])

    const historyData = useMemo(() => {
        return listOfMonths
        .map((_, month) => {
            
            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMonth === month && gainYear === Number(yearSelected)){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }
                }
            });

            let amountOutput = 0;
            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(Number(expenseMonth) === month && Number(expenseYear) === Number(yearSelected)){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }
                }
            });


            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (Number(yearSelected) === Number(currentYear) && item.monthNumber <= Number(currentMonth) ) || (Number(yearSelected) < Number(currentYear))
        });
    },[yearSelected]);

    const relationExpensesRecurrentVersusEventual = useMemo(()=>{
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses
        .filter((expense)=>{
            const date = new Date(expense.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === Number(monthSelected) && year === Number(yearSelected);
        })
        .forEach((expense)=>{
            if(expense.frequency === 'recorrente'){
                amountRecurrent += Number(expense.amount);
            }
            if(expense.frequency === 'eventual'){
                amountEventual += Number(expense.amount);
            }
        })

        let total = amountRecurrent + amountEventual;

        const percentRecurrent =  Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual =  Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#4E41F0',
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: '#E44C4E',
            },
        ]
    },[monthSelected, yearSelected])

    return (
       <Container>
         <ContentHeader title={'Dashboard'} lineColor={'#F7931B'}>
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
            <Content>
                <WalletBox
                    title='Saldo'
                    amount={totalBalance}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon="dollar"
                    color='#4E41F0'
                />
                  <WalletBox
                    title='Entradas'
                    amount={totalGains}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon="arrowUp"
                    color='#F7931B'
                />
                  <WalletBox
                    title='Saidas'
                    amount={totalExpenses}
                    footerLabel='atualizado com base nas entradas e saídas'
                    icon="arrowDown"
                    color='#E44C4E'
                />

                <MessageBox
                 title = {message.title} 
                 description={message.description}
                 footerText={message.footerText}
                 icon={message.icon}
                />
                <PieChartBox
                    data={relationExpensesVersusGains}
                />

                <HistoryBox
                 data={historyData}
                 lineColorAmountEntry='#F7931B'
                 lineColorAmountOutput='#E44C4E'
                />

                <BarChartBox
                    title='Saidas'
                    data={relationExpensesRecurrentVersusEventual}
                />

                <BarChartBox
                    title='Entradas'
                    data={relationExpensesRecurrentVersusEventual}
                />
               
            </Content>
       </Container>
    )
} 

export default Dashboard;