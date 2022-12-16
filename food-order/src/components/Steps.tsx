import { Fragment, useState, useEffect, useMemo } from 'react';
import { steps, meals } from '../utils/config';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
const data = require('../data/dishes.json');

interface StepProps {
  step: number;
  setStep: any;
}

interface restaurantData {
  meals: string[];
  dishes: string[];
}

interface dishData {
  id: number;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

interface selectedDish {
  name: string;
  count: number;
}

interface finalResult {
  meal: string;
  people: number;
  restaurant: string;
  dishes: selectedDish[];
}

function classNames(...classes:string[]) {
  return classes.filter(Boolean).join(' ')
}

let restaurants = new Map();

const Step: React.FC<StepProps> = ({ step, setStep }) => {
  const [selectedMeal, setSelectedMeal] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [currentDish, setCurrentDish] = useState('');
  const [currentDishCount, setCurrentDishCount] = useState(1);
  const [selectedDishes, setSelectedDishes] = useState<selectedDish[]>([]);
  const [availableRestaurants, setAvailableRestaurants] = useState<string[]>([]);
  const [availableDishes, setAvailableDishes] = useState<string[]>([]);
  const [errorMeal, setErrorMeal] = useState(false);
  const [errorPeople, setErrorPeople] = useState(false);
  const [errorRestaurant, setErrorRestaurant] = useState(false);
  const [errorDishes, setErrorDishes] = useState(false);
  
  useMemo(
    () => {
      // generate a restaurant map for querying
      let restaurantMap = new Map();
      data['dishes'].map((element:dishData) => {
        if (!restaurantMap.get(element.restaurant)) {
          restaurantMap.set(element.restaurant, {
            meals: element.availableMeals,
            dishes: []
          }) ;
        }
        let value:restaurantData|undefined = restaurantMap.get(element.restaurant);
        if (value) {
          value.dishes.push(element.name);
        }
        restaurants = new Map(restaurantMap);
    })
  },[]
  );

  useEffect(() => {
    generateAvailableRestaurant();
  }, [selectedMeal]);

  useEffect(() => {
    generateAvailableDishes();
  }, [selectedRestaurant]);

  const generateAvailableRestaurant = () => {
    let availableList = [];
    for (const [key, value] of restaurants.entries()) {
      if (value.meals.includes(selectedMeal)) {
        availableList.push(key);
      }
    };
    setAvailableRestaurants([
      ...availableList
    ]);
  };

  const generateAvailableDishes = () => {
    if (selectedRestaurant) {
      let availableList = restaurants.get(selectedRestaurant).dishes;
      setAvailableDishes([
        ...availableList
      ]);
    }
  };

  const handleClick = () => {
    if (selectedDishes.filter((item)=>
    currentDish === item.name).length > 0) {
      alert(`You already add ${currentDish}`);
      return;
    }
    setSelectedDishes([
      ...selectedDishes,
      {
        name: currentDish,
        count: currentDishCount
      }
    ]);
  }

  const handleDelete = (name:string) => {
    const newSelectedDishes = selectedDishes.filter((item) => 
      item.name !== name
    )
    setSelectedDishes([
      ...newSelectedDishes,
    ]);
  }

  const validateMeal = () => {
    if (!selectedMeal) {
      setErrorMeal(true);
      return false;
    }
    setErrorMeal(false);
    return true;
  }

  const validatePeople = () => {
    if (numberOfPeople <= 0 || numberOfPeople > 10) {
      setErrorPeople(true);
      return false;
    }
    setErrorPeople(false);
    return true;
  }

  const validateRestaurant = () => {
    if (!selectedRestaurant) {
      setErrorRestaurant(true);
      return false;
    }
    setErrorRestaurant(false);
    return true;
  }

  const validateDishes = () => {
    let total: number = selectedDishes.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
    if (selectedDishes.length > 10 || total < numberOfPeople) {
      setErrorDishes(true);
      return false;
    }
    setErrorDishes(false);
    return true;
  }

  const handlePrevious = () => {
    setStep(step - 1);
    return;
  }

  const handleNext = () => {
    let flag = true;
    switch(step){
      case steps.MEAL_AND_PEOPLE:
        if (!validateMeal() || !validatePeople()) {
           flag = false;
        }
        break;
      case steps.RESTAURANT:
        if (!validateRestaurant()){
          flag = false;
        }
        break;
      case steps.DISHES:
        if (!validateDishes()) {
          flag = false;
        }
        break;
      default:
        break;
    }
    if (!flag) {
      return;
    }
    setStep(step + 1);
    return;
  }

  const handleSubmit = () => {
    let finalResult:finalResult = {
      meal: selectedMeal,
      people: numberOfPeople,
      restaurant: selectedRestaurant,
      dishes: selectedDishes
    };
    alert('Submitted!');
    console.log(finalResult);
  }

  return <div className="flex flex-col p-10 m-10">
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
                <Listbox.Button className="h-10 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
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
          <div className={classNames(errorMeal ? "visible": "invisible", "text-red-700 block text-sm font-medium")}>
              Please select a meal.
          </div>
          </div>
          <div className="mb-3 xl:w-96">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Please Enter Number of People
            </label>
            <input
              type="number"
              name="people"
              id="people"
              value={numberOfPeople}
              className="form-control pl-5 py-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0"
              onChange={(e)=>setNumberOfPeople(Number(e.target.value))}
            />
            <div className={classNames(errorPeople ? "visible": "invisible", "text-red-700 block text-sm font-medium")}>
              Number should be 1 to 10. 
            </div>
          </div>
        </div>
      }
      {
        step === steps.RESTAURANT && 
        <div>
          <Listbox value={selectedRestaurant} onChange={setSelectedRestaurant}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">Please Select a Restaurant</Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="h-10 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">{selectedRestaurant}</span>
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
                {availableRestaurants.map((restaurant) => (
                  <Listbox.Option
                    key={restaurant}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={restaurant}
                  >
                    {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                        >
                          {restaurant}
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
          <div className={classNames(errorRestaurant ? "visible": "invisible", "text-red-700 block text-sm font-medium")}>
              Please select a restaurant.
          </div>
        </div>
      }
      {
        step === steps.DISHES && 
        <div>
        <div className="flex justify-between">
          <div className="w-60 mr-10">
          <Listbox value={currentDish} onChange={setCurrentDish}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">Please Select a Dish</Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="h-10 relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="flex items-center">
                    <span className="ml-3 block truncate">{currentDish}</span>
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
                {availableDishes.map((dish) => (
                  <Listbox.Option
                    key={dish}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={dish}
                  >
                    {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                        >
                          {dish}
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
          <div className="w-80">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Please Enter No. of Serving
            </label>
            <input
              type="number"
              name="people"
              id="people"
              className="form-control pl-5 py-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="0"
              value={currentDishCount}
              onChange={(e)=>{setCurrentDishCount(Number(e.target.value))}}
            />
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <div>
          <ul role="list" className="divide-y divide-gray-200 rounded-md">
                  {selectedDishes.map((dish) => (
                    <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm" key={dish.name}>
                      <div className="flex">
                        <div className="">{dish.name}</div>
                      </div>
                      <div className="ml-4 flex flex-shrink-0">
                        <div className="">{dish.count}</div>
                        <div className="ml-4 font-medium text-red-700 hover:text-red-500" onClick={() => handleDelete(dish.name)}>
                          delete
                        </div>
                      </div>
                    </li>
                    )
                  )}
                </ul>
          </div>
          <button 
          className="w-10 h-10 rounded-full bg-indigo-500 hover:bg-indigo-500 text-white"
          onClick={handleClick}
                      >
            +
          </button>
        </div>
        <div className={classNames(errorDishes ? "visible": "invisible", "text-red-700 mt-5 block text-sm font-medium")}>
              The dishes' number should be greater or equal to the number of people ({numberOfPeople}) and a maximum of 10 is allowed.
        </div>
        </div>
      }
      {
        step === steps.REVIEW && 
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Meal</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedMeal}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">No.of. People</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{numberOfPeople}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Restaurant</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedRestaurant}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Dishes</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul role="list" className="divide-y divide-gray-200 rounded-md">
                  {selectedDishes.map((dish) => (
                    <li className="flex items-center justify-between py-3  text-sm">
                      <div className="pr-10 flex flex-1 justify-between items-center">
                        <div className="mr-20">{dish.name}</div>
                        <div className="">{dish.count}</div>
                      </div>
                    </li>
                    )
                  )}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      }
    </div>
    <div className="pt-10 flex justify-between">
      <button 
        className={classNames("relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-indigo-200 text-indigo-700 rounded hover:bg-indigo-300", step === steps.MEAL_AND_PEOPLE ? "invisible": "")}
        onClick={handlePrevious}
      >
        Previous
      </button>
      {step < steps.REVIEW && <button 
        className="relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-indigo-200 text-indigo-700 rounded hover:bg-indigo-300"
        onClick={handleNext}
      >
        Next
      </button>}
      {
        step === steps.REVIEW && <button 
        className="relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 bg-indigo-200 text-indigo-700 rounded hover:bg-indigo-300"
        onClick={handleSubmit}
        >
          Submit
        </button>
      }
    </div>
  </div>
}

export default Step;