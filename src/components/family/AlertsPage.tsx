import React from 'react'
import DoctorAlerts from '../doctor/DoctorAlerts'
import { getAuthenticatedUser } from '../../services/authService';
const AlertsPage = () => {
  const user = getAuthenticatedUser();
  return (
   <>
      <div className="min-h-screen bg-slate-50">
        <DoctorAlerts />
      </div>
   </>
  )
}

export default AlertsPage
