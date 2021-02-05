import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() =>  {
          fetch('http://localhost:5000/bookings?email='+loggedInUser.email)
          .then(res => res.json())
          .then(data => setBookings(data));
          
    }, [])

    return (
        <div>
           <h3>Hi.., you have {bookings.length} Bookings</h3>
           {
               bookings.map(book => 
                <ol><li>From: {(new Date(book.startDate).toDateString('dd/MM/yyyy'))}   
                        to: {(new Date(book.endDate).toDateString('dd/MM/yyyy'))}</li></ol> )
           }
        </div>
    );
};

export default Bookings;