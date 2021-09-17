import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1px;
    background-color: ${props => props.isHeader ? '#1E1F21' : '#4D4C4D'};
    ${props => props.isHeader && 'border-bottom: 1px solid #4D4C4D' }
`;

const BoxWrapper = styled.div`
    min-height: ${props => props.isHeader ? 24 : 80}px;
    min-width: 140px;
    background-color: ${props => props.isWeekend ? '#272829' : '#1E1F21'};
    color: ${props => props.isSelectedMonth ? '#DDDCDD' : '#555759'};
`;

const RowInBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
    ${props => props.pr && `padding-right: ${props.pr * 8}px`}
`;

const DayWrapper = styled.div`
    height: 33px;
    width: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const CurrentDay = styled('div')`
    height: 100%;
    width: 100%;
    background: #f00;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ShowDayWrapper = styled('div')`
    display: flex;
    justify-content: flex-end
`;

const EventListWrapper = styled('ul')`
    margin: unset;
    list-style-position: inside;
    padding-left: 4px;
`;
const EventItemWrapper = styled('button')`
    position: realative;
    left: -14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 114px;
    border: unset;
    color: #DDDDD;
    cursor: pointer;
    margin: 0;
    padding: 0;
    text-align: left;
`;

const CalendarGrid = ({startDay, today, totalDays, events, handleOpenChange}) => {
    console.log(events)
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (month) => today.isSame(month, 'month');

    return (
        <>
            <GridWrapper isHeader>
                {[...Array(7)].map((_, i) => (
                    <BoxWrapper isHeader isSelectedMonth key={i} >
                        <RowInBox
                            justifyContent={'flex-end'}
                            pr={1}
                        >
                            {moment().day(i + 1).format('ddd')}
                        </RowInBox>
                    </BoxWrapper>
                ))}
            </GridWrapper>
            <GridWrapper>
            {
                daysArray.map((dayItem) => (
                    <BoxWrapper
                    isWeekend={dayItem.day() === 6 || dayItem.day() === 0}
                    key={dayItem.unix()}
                    isSelectedMonth={isSelectedMonth(dayItem)}
                    >
                        <RowInBox
                            justifyContent={'flex-end'}
                        >
                            <ShowDayWrapper>
                            <DayWrapper onClick={() => handleOpenChange('Create')}>
                                {
                                    isCurrentDay(dayItem) ? (
                                        <CurrentDay>{dayItem.format('D')}</CurrentDay>
                                    ) : (
                                        dayItem.format('D')
                                    )
                                }
                            </DayWrapper>
                            </ShowDayWrapper>
                            <EventListWrapper>
                                {
                                    events.filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X')).map(event => (
                                            <li key={event.id}>
                                                <EventItemWrapper onDoubleClick={() => handleOpenChange('Update', event)} >
                                                {event.title}
                                                </EventItemWrapper>
                                                </li>
                                        ))
                                }
                            </EventListWrapper>
                        </RowInBox>
                    </BoxWrapper>
                ))

            }
        </GridWrapper>
        </>
        
    );
};

export default CalendarGrid;