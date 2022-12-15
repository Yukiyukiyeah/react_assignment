import { Fragment, useState } from 'react';
import { steps, meals } from '../utils/config';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

interface StepProps {
  step: number;
}

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

const Step: React.FC<StepProps> = ({ step }) => {
  const [selectedMeal, setSelectedMeal] = useState(meals[0]);
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [restaurant, setRestaurant] = useState('');
  const [dishes, setDishes] = useState([]);
  
  console.log(step);
  return <div className="p-10 m-10">
    <div className="">
      {
        step === steps.MEAL_AND_PEOPLE && 
        <div>
          <div className="mb-20">
          <Listbox value={selectedMeal} onChange={setSelectedMeal}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">Please Select a Meal</Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">{selectedMeal}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {meals.map((meal) => (
                  <Listbox.Option
                    key={meal}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={meal}
                  >
                    {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                        >
                          {meal}
                        </span>
                      </div>
                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                      )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
            )}
          </Listbox>
          </div>
          <div className="mb-3 xl:w-96">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Please Enter Number of People
            </label>
            <input
              type="number"
              name="people"
              id="people"
              className="form-control px-3 py-1.5 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0"
            />
          </div>
        </div>
      }
      {
        step === steps.RESTAURANT && 
        <div>

        </div>
      }
      {
        step === steps.DISHES && 
        <div>

        </div>
      }
      {
        step === steps.REVIEW && 
        <div>

        </div>
      }
    </div>
    <div className="pt-10 flex justify-between">
      <button className='relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-indigo-200 text-indigo-700 rounded hover:bg-indigo-300'>Previous</button>
      <button className='relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-indigo-200 text-indigo-700 rounded hover:bg-indigo-300'>Next</button>
    </div>
  </div>
}

export default Step;