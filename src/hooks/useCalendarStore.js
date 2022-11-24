import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertStringToDate } from "../helpers/convertStringToDate";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async(event) => {
      // TODO: llegar al backend y guardar el evento
      
      try {

      if( event.id ){

        await calendarApi.put(`/events/${event.id}`, event);

        dispatch(onUpdateEvent({...event, user}));
        return
      }
          const {data} = await calendarApi.post('/events', event);
          console.log(data)
  
          dispatch(onAddNewEvent({...event, id: data.evento.id, user}))
          
      }catch (error) {
        console.log(error)
        Swal.fire('Error', 'No se pudo guardar el evento', 'error')
      }
    }

    const startDeleteEvent = async() => {

      try {
        await calendarApi.delete(`/events/${activeEvent.id}`);
        dispatch(onDeleteEvent());
      } catch (error) {
        console.log(error)
        Swal.fire('Error', 'No se pudo eliminar el evento', 'error')
      }

    }

    const startLoadingEvents = async() => {
      try {
        const {data} = await calendarApi.get('/events');
        const events = convertStringToDate(data.eventos);
        dispatch(onLoadEvents(events));
        console.log(data)

      } catch (error) {
        console.log('error', error)
      }
    }


  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // funciones
    setActiveEvent,
    startSavingEvent,
    startDeleteEvent,
    startLoadingEvents
  }
}
