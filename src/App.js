import moment, { defaultFormat } from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CalendarGrid from './components/Calndar/CalendarGrid';
import Header from './components/Header/Header';
import { API } from './components/helpers/API';

const CalendarWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 1px solid #737374;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`;
const FormWrapper = styled(CalendarWrapper)`
  width: 200px;
  background-color: #1E1F21;
  color: #DDDDDD;
`;

const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0, 35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EventTitle = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;
const EventBody = styled('input')`
  padding: 4px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #1E1F21;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;
const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

const totalDays = 42
const defaultEvent = {
  title: '',
  description: '',
  data: moment().format('X')
}

function App() {
  moment.updateLocale('en', {week: {dow: 1}});
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');
  window.moment = moment;
  const handlePrevDay = () => setToday(prev => prev.clone().subtract(1, 'month'))
  const handleToday = () => setToday(moment())
  const handleNextDay = () => setToday(prev => prev.clone().add(1, 'month'))
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState( )
  const [method, setMethod] = useState(null)
  const [isShowForm, setIsShowForm] = useState(null)
  const startDateQuery = startDay.clone().format('X')
  const endDateQuery = startDay.clone().add(totalDays, 'days').format('X')

  useEffect(() => {
    fetch(`${API}/reminder?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then(response => response.json())
      .then(res => setEvents(res))
  }, [today])
  console.log(events)

  const handleOpenChange = (methodName, eventOpenChange) => {
    setIsShowForm(true);
    setEvent(eventOpenChange || defaultEvent);
    setMethod(methodName);
  }
  const cancelButtonHandler = () => {
    setIsShowForm(false)
    setEvent(null)
  }

  const changeEventHandler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }

  const eventFetchHandler = () => {
    let fetchApi = method === 'Update' ? `${API}/reminder/${event.id}` : `${API}/reminder`
    const posMethod = method === 'Update' ? 'PATCH' : 'POST';

    fetch(fetchApi, {
      method: posMethod,
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(method === 'Update'){
          setEvents(prevState => prevState.map(element => element.id == res.id ? res : element))
        } else {
          setEvents(prevState => [...prevState, res]);
        }
        cancelButtonHandler()
      })
  }

  return (
    <>
    {
      isShowForm ? (
      <FormPositionWrapper onClick={cancelButtonHandler}>
        <FormWrapper onClick={e => e.stopPropagation()}>
          <EventTitle 
          value={event.title} 
          onChange={e => changeEventHandler(e.target.value, 'title')}
          />
          <EventBody 
          value={event.description} 
          onChange={e => changeEventHandler(e.target.value, 'description')}
          />
          <ButtonsWrapper>
            <button onClick={cancelButtonHandler}>Cancel</button>
            <button onClick={eventFetchHandler}>{method}</button>
          </ButtonsWrapper>
        </FormWrapper>
        </FormPositionWrapper>) : null
    }
      <CalendarWrapper>
        <Header 
        today={today} 
        handlePrevDay={handlePrevDay}
        handleToday={handleToday}
        handleNextDay={handleNextDay}
        />
        <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events} handleOpenChange={handleOpenChange} />
      </CalendarWrapper>
    </>
  );
}

export default App;
