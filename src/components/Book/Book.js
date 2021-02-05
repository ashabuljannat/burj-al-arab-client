import React, { useContext, useReducer, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';

import {DateRangeInput} from '@datepicker-react/styled'
import Bookings from '../Bookings/Bookings';



    function reducer(state, action) {
      switch (action.type) {
        case 'focusChange':
          return {...state, focusedInput: action.payload}
        case 'dateChange':
          return action.payload
        default:
          throw new Error()
      }
    }
    const initialState = {
      startDate: null,
      endDate: null,
      focusedInput: null,
    }
   
const Book = ({room}) => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, initialState)
   
    const [selectedDate, setSelectedDate] = useState({
      checkIn: new Date(),
      checkOut: new Date()
    });
    const handleCheckInDate = (date) => {
      const newDates = {...selectedDate}
        newDates.checkIn = date;
        setSelectedDate(date);
      };
     const handleCheckOutDate = (date) => {
        const newDates = {...selectedDate}
          newDates.checkOut = date;
          setSelectedDate(date);
        };

        const handleBooking = () => {
        const newBooking = {...loggedInUser, ...state};
        fetch('http://localhost:5000/addBooking',{
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => console.log(data))

        }

      
       
    
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hi..{loggedInUser.name}! Let's book a <span style={{color: 'green'}}> {bedType} Room.</span></h1>
            <p>Want to book a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <Grid container justify="space-around">
        <KeyboardDatePicker
           disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Check In Date"
          value={selectedDate.checkIn}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Check Out Date"
          format="dd/MM/yyyy"
          value={selectedDate.checkOut}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>

       <div  style={{left:'30%',position:'relative',margin:'30px'}}>
         <DateRangeInput
         onDatesChange={data => dispatch({type: 'dateChange', payload: data})}
         onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
         startDate={state.startDate} // Date or null
         endDate={state.endDate} // Date or null
         focusedInput={state.focusedInput} // START_DATE, END_DATE or null
       />
      </div>
      <Button variant="contained" color="secondary" onClick={handleBooking}  >
      Book Now
      </Button>
      <Bookings></Bookings>
        </div>
    );
};

export default Book;