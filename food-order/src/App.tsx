import { useState } from 'react';
import Navigation from './components/Navigation'
import Steps from './components/Steps'

const App: React.FC = () =>  {
  const [step, setStep] = useState(1)
  return (
    <div className="App">
      <Navigation step={step}/>
      <Steps step={step} setStep={setStep}/>
    </div>
  );
}

export default App;
