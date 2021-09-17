import React from 'react';
import styled from 'styled-components';

const DivWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    background-color: #1E1F21;
    color: #DCD0D0;
    padding: 16px;
`;

const TextWrapper = styled('span')`
    font-size: 32px;

`;

const TitleWrapper = styled(TextWrapper)`
    font-weight: bold;
    margin-right: 8px
`;

const ButtonsDiv = styled('div')`
    display: flex;
    align-items: center;
`;

const ButtonWrapper = styled('button')`
    border: unset;
    background-color: #565759;
    height: 20px;
    margin-right: 2px;
    border-radius: 4px;
    color: #E6E6E6;
    outline: unset;
    cursor: pointer;
`;

const MiddleButton = styled(ButtonWrapper)`
    padding-left: 16px;
    padding-right: 16px;
    font-weight: bold;
`;

const Header = ({today, handlePrevDay, handleToday, handleNextDay}) => {
    return (
        <DivWrapper>
            <div>
                <TitleWrapper>
                    {today.format('MMMM')}
                </TitleWrapper>
                <TextWrapper>
                    {today.format('YYYY')}
                </TextWrapper>
            </div>
            <ButtonsDiv>
                <ButtonWrapper onClick={handlePrevDay}> &lt; </ButtonWrapper>
                <MiddleButton onClick={handleToday} >Today</MiddleButton>
                <ButtonWrapper onClick={handleNextDay} > &gt; </ButtonWrapper>
            </ButtonsDiv>
        </DivWrapper>
    );
};

export default Header;