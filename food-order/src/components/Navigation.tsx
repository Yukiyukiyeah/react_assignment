import { useState } from 'react';
import { steps } from '../utils/config';

interface NavigationProps {
  step: number;
}

const Navigation: React.FC<NavigationProps> = ({ step }) => {
  console.log('step', step);
  console.log(step === steps.MEAL_AND_PEOPLE);
  console.log(step === steps.RESTAURANT);
  step = 1;
  return <div className="m-10 p-10">
    <div className="flex items-center justify-between bg-white sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-around">
        <div>
          <nav className="isolate inline-flex item-center -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              aria-current="step"
              className={"relative inline-flex items-center border  px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.MEAL_AND_PEOPLE? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Step {steps.MEAL_AND_PEOPLE}
            </a>
            <a
              href="#"
              className={"relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.RESTAURANT? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Step {steps.RESTAURANT}
            </a>
            <a
              href="#"
              aria-current="page"
              className={"relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.DISHES? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Step {steps.DISHES}
            </a>
            <a
              href="#"
              className={"relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.REVIEW? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Review
            </a>
          </nav>
        </div>
      </div>
    </div>
  </div>
}

export default Navigation;