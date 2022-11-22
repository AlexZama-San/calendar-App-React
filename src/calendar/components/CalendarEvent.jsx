
export const CalendarEvent = (props) => {

    const { title, user } = props.event
  return (
    <>
        <span>{title}</span>
        <strong>- {user.name}</strong>
    </>
  )
}
