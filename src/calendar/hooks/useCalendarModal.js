import { useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { useUiStore } from '../../hooks/useUiStore';

export const useCalendarModal = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2),
})

  const {closeDateModal} = useUiStore()
  const {activeEvent, startSavingEvent} = useCalendarStore()

const titleClass = useMemo(() => {
  if(!formSubmitted) return '';

  return (formValues.title.length > 0 ) ? '' : 'is-invalid';
}, [formValues.title, formSubmitted])

useEffect(() => {
  
  if(activeEvent !== null) {
    setFormValues({...activeEvent});
  } 
}, [activeEvent])


const onInputChange = ({ target }) => {
  setFormValues({
      ...formValues,
      [target.name]: target.value
  })
}

const onDateChange = (e, changing) => {
  setFormValues({
      ...formValues,
      [changing]: e
  })
}

const onSubmit = async(event) => {
  event.preventDefault();
  setFormSubmitted(true)

  const difference = differenceInSeconds(formValues.end, formValues.start)
  console.log(difference);

  if(isNaN(difference) || difference <= 0){
      Swal.fire('Error', 'La fecha fin y hora debe ser mayor a la fecha y hora de inicio', 'error')
      return;
  }

  if(formValues.title.length <= 0){
      Swal.fire('Error', 'El titulo es obligatorio', 'error')

      return;
  }

  await startSavingEvent(formValues);
  closeDateModal()
  setFormSubmitted(false)
}
return{
  
  formValues,
  titleClass,
  onInputChange,
  onDateChange,
  onSubmit
}
}
