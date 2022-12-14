import { NavBar } from "../components/NavBar"
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { localizer } from "../../helpers/calendarLocalizer"
import { getMessages } from "../../helpers/getMessages"
import { CalendarEvent } from "../components/CalendarEvent"
import { useEffect, useState } from "react"
import { CalendarModal } from "../components/CalendarModal"
import { useUiStore } from "../../hooks/useUiStore"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { FabAddNew } from "../components/FabAddNew"
import { FabDelete } from "../components/FabDelete"
import { useAuthStore } from "../../hooks/useAuthStore"

export const CalendarPage = () => {

  const { user } = useAuthStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()

  const {openDateModal} = useUiStore()

  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? '#367CF7': '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      display: 'block',
    }

    return {
      style
    }
  }

  const onDoubleClick = (e) => {
    console.log({ doubleClick: e })
    openDateModal()
  }

  const onSelect = (e) => {
    setActiveEvent(e)
  }

  const onViewChange = (e) => {
    localStorage.setItem('lastView', e)
    setlastView(e)
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <NavBar/>

      <div>
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          defaultView={lastView}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages={getMessages()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChange}
        />

    
  </div>
  <CalendarModal />
  <FabAddNew />
  <FabDelete />
    </>


  )
}
