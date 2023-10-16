import {h} from 'preact';
import {useState, useEffect} from 'preact/hooks';
import style from './style.css';
import {Link} from 'preact-router/match';

import BACGraph from '../../components/BACGraph';
import DrinkList from '../../components/DrinkList';

const Home = () => {
  const [drinks, setDrinks] = useState([
    {
      name: 'Wine',
      time: 1697330812924,
      alcoholUnits: 1,
    },
    {
      name: 'Wine',
      time: 1697330812924,
      alcoholUnits: 1,
    },
    {
      name: 'Beer',
      time: 1697330812924 - 0.5 * 60 * 60 * 1000,
      alcoholUnits: 1,
    },
    // {
    //   name: 'Beer',
    //   time: 1697328051572 - 1.5 * 60 * 60 * 1000,
    //   alcoholUnits: 1.4,
    // },
    // {
    //   name: 'Wine',
    //   time: 1697328051572 - 2 * 60 * 60 * 1000,
    //   alcoholUnits: 2,
    // },
    // {
    //   name: 'Beer',
    //   time: 1697328051572 - 3 * 60 * 60 * 1000,
    //   alcoholUnits: 1.6,
    // },
    // {
    //   name: 'Whiskey',
    //   time: 1697328051572 - 8 * 60 * 60 * 1000,
    //   alcoholUnits: 2,
    // },
  ]);

  const [currentBacIndex, setCurrentBacIndex] = useState(0);
  const [bacForecast, setBacForecast] = useState([]);
  // write a function that will calculate correct the starting bac from lists with varied times
  // write a function that will divide the current bac into matabolized parts until it reaches zero and add to an array
  // create a function with an interval that will remove an item from the array the data too the graph

  useEffect(() => {
    const updateBacIndex = () => {
      setCurrentBacIndex((prevIndex) => {
        if (prevIndex + 1 < bacForecast.length) {
          return prevIndex + 1; // Move to the next BAC value
        }
        clearInterval(interval); // If we've reached the end, clear the interval
        return prevIndex; // Return the current index
      });
    };

    const interval = setInterval(updateBacIndex, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [bacForecast]);

  function handleAddDrink() {
    const drink = {
      name: 'Beer',
      time: Date.now(),
      alcoholUnits: 1,
    };

    if (drink.name) {
      setDrinks((prevDrinks) => {
        const updatedDrinks = [...prevDrinks, drink];
        const forecast = generateBacForecast(updatedDrinks);

        setBacForecast(forecast);

        return updatedDrinks;
      });
    }
  }

  function generateBacForecast(drinks) {
    let currentBac = calculateStartingBac(drinks);
    const forecastedBacValues = [currentBac];

    // Reduce BAC until it reaches zero
    while (currentBac > 0.001) {
      // Using 0.001 as a small threshold to avoid infinite loops
      const decrease = METABOLIZATION_RATE_PER_MINUTE * 5; // Metabolization over 5 minutes
      currentBac = Math.max(currentBac - decrease, 0); // Don't go below 0
      forecastedBacValues.push(currentBac);
    }

    return forecastedBacValues;
  }

  /// *** MOVE CONSTANTS TO A CONSTANTS FILE AND EXPORT *** ///
  const METABOLIZATION_RATE_PER_MINUTE = 0.015 / 60; // Example value
  const BAC_INCREASE_PER_UNIT = 0.02; // BAC increase by 0.02% per unit of alcohol

  function calculateStartingBac(drinks) {
    // Determine the current time
    const currentTime = Date.now();

    let totalBac = 0;

    drinks.forEach((drink) => {
      // Calculate initial BAC for this drink
      const initialBacFromThisDrink =
        drink.alcoholUnits * BAC_INCREASE_PER_UNIT;

      // Calculate how much BAC has been metabolized since this drink was consumed
      const timeSinceDrinkInMinutes = (currentTime - drink.time) / (1000 * 60);
      const bacDecreaseFromThisDrink =
        METABOLIZATION_RATE_PER_MINUTE * timeSinceDrinkInMinutes;

      // Adjust the initial BAC for this drink by subtracting the metabolized amount
      const adjustedBacForThisDrink = Math.max(
        initialBacFromThisDrink - bacDecreaseFromThisDrink,
        0,
      );

      totalBac += adjustedBacForThisDrink;
    });

    return totalBac;
  }

  return (
    <div class={style.home}>
      <div class={style.main}>
        <div class={style.sections}>
          <h2>
            {isNaN(Number(bacForecast[currentBacIndex]))
              ? 0
              : Number(bacForecast[currentBacIndex]).toFixed(4)}
            % BAC
          </h2>
          <DrinkList drinks={drinks} />
        </div>
        <div class={style.sections}>
          <BACGraph
            bacForecast={bacForecast}
            currentBacIndex={currentBacIndex}
            drinks={drinks}
          />
        </div>
      </div>
      <div class={style.buttonContainer}>
        <button onClick={handleAddDrink} class={style.button}>
          Add Drink
        </button>
        <Link activeClassName={style.active} href="/change-drink">
          <button onClick={handleAddDrink} class={style.button}>
            Change Drink
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
