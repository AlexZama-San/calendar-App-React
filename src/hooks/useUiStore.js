import { useDispatch, useSelector } from "react-redux"
import { onSetIncativeEvent } from "../store/calendar/calendarSlice"
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice"

export const useUiStore = () => {

    const dispatch = useDispatch()

    const {isDateModalOpen} = useSelector(state => state.ui)

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
        dispatch(onSetIncativeEvent())
    }

    return {
        // propiedades
        isDateModalOpen,


        // funciones
        openDateModal,
        closeDateModal
    }
}