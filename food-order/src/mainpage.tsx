import { useState } from 'react';
import Navigation from './components/Navigation';
import Steps from './components/Steps';

const MainPage = () =>{
  const [step, setStep] = useState(1)
  return (
    <div className="">
      <Navigation step={step} setStep={setStep}/>
      <Steps step={step} setStep={setStep}/>
    </div>
  )
}


export default MainPage;