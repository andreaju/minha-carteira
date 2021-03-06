import styled from 'styled-components';


interface ILegendProps{
    color:string;
}

export const Container = styled.div`
    width:48%;
    height: 260px;

    margin: 10px 0;
    background-color: ${props => props.theme.colors.tertiary};
    border-radius: 7px;
    display: flex;
`;


export const SideLeft = styled.aside`
    padding: 30px 20px;
    > h1{
        margin-bottom: 20px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;
    height: 180px;
    padding-right: 15px;
    overflow-y: scroll;
    ::-webkit-scrollbar{
           width: 10px;
        };

        ::-webkit-scrollbar-thumb{
           background-color: ${props => props.theme.colors.secondary};
           border-radius: 10px;
        };

        ::-webkit-scrollbar-track{
           background-color: ${props => props.theme.colors.tertiary};
        };
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    > div{
        background-color: ${props => props.color};
        width: 40px;
        height: 40px;
        border-radius: 7px;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
    }

    > span{
        margin-left: 10px;
    }
  
`;

export const SideRight = styled.main`
    display: flex;
    justify-content: center;
    flex: 1;
`;
