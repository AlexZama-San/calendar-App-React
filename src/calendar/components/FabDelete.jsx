import { useCalendarStore } from "../../hooks/useCalendarStore"

export const FabDelete= () => {

  const { startDeleteEvent, hasEventSelected } = useCalendarStore()

  const handleClickDelete = () => {
    startDeleteEvent()
  }

  return (
    <button style={{ display: hasEventSelected ? '' : 'none'}} className="btn btn-danger fab-danger" onClick={handleClickDelete}>
        <i className="fas fa-trash-alt">

        </i>
    </button>
  )
}
