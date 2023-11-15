import {h} from 'preact';
import {useState} from 'preact/hooks';
import axios from 'axios';
import {Link} from 'preact-router/match';
import toast from 'react-hot-toast';

import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const ChangeDrink = () => {
  const [savedDrinks, setSavedDrinks] = useState([
    {drinkName: 'Wine', drinkUnits: '1.4'},
    {drinkName: 'Gin and Tonic', drinkUnits: '1.4'},
    {drinkName: 'Vodka Cran', drinkUnits: '1.4'},
  ]);
  const [selectedDrink, setSelectedDrink] = useState({
    drinkName: 'Beer',
    drinkUnits: '1',
  });
  const [drinkData, setDrinkData] = useState({
    drinkName: '',
    drinkUnits: '',
  });

  const changeHandler = (e) => {
    setDrinkData({
      ...drinkData,
      [e.target.name]: e.target.value,
    });
  };

  const saveDrink = (drink) => {
    console.log('drinkData: ', axios.defaults.headers);
    axios
      .post('/api/drinks/add', {drinkData})
      .then(() => {
        toast.success('Success!');
      })
      .catch((err) => {
        toast.error('Unable to Authenticate. ' + err.msg);
        console.log('auth err: ', err);
      });
  };

  return (
    <div class={style.selectorContainer}>
      <div class={style.selectorHead}>
        <h2>Selected Drink: {selectedDrink.drinkName}</h2>
      </div>
      <div class={style.drinkSelector}>
        <div class={style.form}>
          <div class={style.formInput}>
            <label for="drinkName">Drink Name: </label>
            <input
              id="drinkName"
              name="drinkName"
              value={drinkData.drinkName}
              type="text"
              onChange={changeHandler}
            />
          </div>
          <div>
            <label for="drinkUnits">Standard Drink Units: </label>
            <input
              id="drinkUnits"
              name="drinkUnits"
              value={drinkData.drinkUnits}
              type="number"
              step="any"
              onChange={changeHandler}
            />
          </div>

          <div class={style.buttons}>
            <Link activeClassName={style.active} href="/">
              <button>{'< Back'}</button>
            </Link>
            <button onClick={() => saveDrink(drinkData)}>Save</button>
          </div>
        </div>

        <div class={style.savedDrinks}>
          <ul>
            {savedDrinks.map((drink, index) => (
              <li key={index} onClick={() => setSelectedDrink(drink)}>
                {drink.drinkName}: {drink.drinkUnits} Standard Units
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangeDrink;
