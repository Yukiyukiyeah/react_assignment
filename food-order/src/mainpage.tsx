import { useState } from 'react';
import Navigation from './components/Navigation';
import Steps from './components/Steps';

const MainPage = () =>{
  const [step, setStep] = useState(1)
  return (
    <div className="flex flex-col items-center h-screen">
      <Navigation step={step}/>
      <Steps step={step} setStep={setStep}/>
    </div>
  )
}


export default MainPage;