import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'lo que sea',
//     notes: 'lo que sea',
//     start: new Date(),
//     end: addHours( new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//       _id: '123',
//       name: 'Alex'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, action) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action) => {
            state.events.push(action.payload)
            state.activeEvent = null
        },
        onUpdateEvent: (state, action) => {
            state.events = state.events.map( event => {
                if(event._id === action.payload.id){
                    return action.payload
                }
                    return event
            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id)
                state.activeEvent = null
                
            }
        },
        onSetIncativeEvent: (state) => {
            state.activeEvent = null
        },
        onLoadEvents: (state, {payload = []}) => {
            state.isLoadingEvents = false
            // state.events = payload
            payload.forEach(event => {
                const exist = state.events.some( e => e.id === event.id)
                if(!exist){
                    state.events.push(event)
                }
            });
        },
        onLogoutCalendar: (state) => {
            state.events = []
            state.activeEvent = null
            state.isLoadingEvents
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onLoadEvents, 
    onSetActiveEvent, 
    onAddNewEvent, 
    onUpdateEvent, 
    onDeleteEvent, 
    onSetIncativeEvent,
    onLogoutCalendar
} = calendarSlice.actions;