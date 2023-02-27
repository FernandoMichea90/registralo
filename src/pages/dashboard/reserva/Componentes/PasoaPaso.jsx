import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pasajeroform from './Pasajeroform';
import Reservaform from './Reservaform';
import Reciboform from './Reciboform';
import { useForm, Controller } from 'react-hook-form';
import { PasajeroYupTest } from './Yupfolder/PasajeroYUP';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../../components/hook-form';
import { ReservaYupTest } from './Yupfolder/ReservaYUP';
import { obtenerTipoHabitaciones } from 'src/functions/registros_db';

const steps = ['Registro Pasajero', 'Fecha y Habitacion', 'Recibo de reserva'];



export default function HorizontalNonLinearStepper() {
  const { methodsPasajero, valuesPasajero } = PasajeroYupTest();
  const {methodsReserva,valuesReserva}=ReservaYupTest();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  // crear un estado para guardar los datos del cliente
  const [cliente, setCliente] = React.useState({});
  // crear un estado para guarda los datos de la reserva
  const [reserva, setReserva] = React.useState({});
//crear state para guardar tipo de habitaciones
  const [tipohabitacion,setTipoHabitacion]=React.useState([]);
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };


  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  // esta es una prueba

  const guardarClientePrueba = () => {
    console.log(valuesPasajero)
    setPasajero(valuesPasajero)
  }

  //  Guardar Reserva 
  const guardarReserva=()=>{
    console.log(valuesReserva)
    setReserva(valuesReserva)
  }

  // funcion para guardar la 



  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const switchForm = (step) => {
    switch (step) {
      case 1:
        return <FormProvider methods={methodsPasajero} onSubmit={methodsPasajero.handleSubmit(guardarClientePrueba)}>
          <Pasajeroform  guardarClientePrueba={guardarClientePrueba} setCliente={setCliente} currentUser={cliente} handleNext={handleNext} valuesPasajero={valuesPasajero} methodsPasajero={methodsPasajero}>
            <StepperButton></StepperButton>
          </Pasajeroform>
        </FormProvider>
      case 2:
        return <FormProvider methods={methodsReserva} onSubmit={methodsReserva.handleSubmit(guardarReserva)}>
           <Reservaform  tipohabitacion={tipohabitacion} setReserva={setReserva} currentUser={reserva} handleNext={handleNext} >
              <StepperButton></StepperButton>
           </Reservaform>
        </FormProvider>
      case 3:
        return <Reciboform></Reciboform>
      default:
        return <div>Formulario Default</div>
    }
  }

  // crear useEffect 

  React.useEffect(() => {
   
    // pedir tipos de habitaciones a firestore
    const pedirhabitaciones=async()=>{
      const query_tipo_habitaciones=await obtenerTipoHabitaciones();
      console.log(query_tipo_habitaciones) 
      setTipoHabitacion(query_tipo_habitaciones);
    }
    
    pedirhabitaciones()

  }, [])
  


  // crear el componenente stepper
  const StepperButton = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button type="submit" sx={{ mr: 1 }}>
          Next
        </Button>
        {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: 'inline-block' }}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1
                ? 'Finish'
                : 'Complete Step'}
            </Button>
          ))}
      </Box>
    )
  }

  // funcion parar determinar el submit del formulario
  const onSubmitSwitch = () => {
    console.log('submit')
    handleNext();
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>

            {switchForm(activeStep + 1)}

            {/* <StepperButton completed={completed} totalSteps={totalSteps} completedSteps={completedSteps} steps={steps} activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} handleComplete={handleComplete}></StepperButton> */}
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}