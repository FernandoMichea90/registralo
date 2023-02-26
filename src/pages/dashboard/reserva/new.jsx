import React from 'react'
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout'
import PasoaPaso from 'src/pages/dashboard/reserva/Componentes/PasoaPaso'

NewReservaPage.getLayout = (page) => <DashboardLayout title="Reserva" children={page} />

export default function NewReservaPage() {
  return (
    <>
    <PasoaPaso></PasoaPaso>
    </>
  )
}

