import { steps } from '../utils/config';

interface NavigationProps {
  step: number;
}

const Navigation: React.FC<NavigationProps> = ({ step }) => {
  return <div className="m-10 p-10">
    <div className="flex items-center justify-between bg-white sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-around">
        <div>
          <nav className="isolate inline-flex item-center -space-x-px rounded-md shadow-sm">
            <div
              className={"cursor-default relative inline-flex items-center border  px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.MEAL_AND_PEOPLE? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Step {steps.MEAL_AND_PEOPLE}
            </div>
            <div
              className={"cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.RESTAURANT? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Step {steps.RESTAURANT}
            </div>
            <div
              className={"cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.DISHES? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Step {steps.DISHES}
            </div>
            <div
              className={"cursor-default relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 " + (step === steps.REVIEW? 'border-indigo-500 text-indigo-600 bg-indigo-50 z-10': 'border-gray-300 bg-white text-gray-500')}
            >
              Review
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
}

export default Navigation;