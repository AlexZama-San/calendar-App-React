import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(event) => {
      // TODO: llegar al backend y guardar el evento

      if( event._id){
        dispatch(onUpdateEvent({...event}));
      }else{
        console.log(event)
        dispatch(onAddNewEvent({...event, _id: new Date().getTime()}));
      }
    }

    const startDeleteEvent = async() => {
      dispatch(onDeleteEvent());
    }


  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // funciones
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent
  }
}
