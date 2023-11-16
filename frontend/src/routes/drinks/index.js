import {h} from 'preact';
import {useEffect, useState} from 'preact/hooks';
import axios from 'axios';
import {Link} from 'preact-router/match';
import toast from 'react-hot-toast';

import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const Drinks = () => {
  const [savedDrinks, setSavedDrinks] = useState([]);
  const [selectedDrink, setSelectedDrink] = useState({
    drinkName: 'Beer',
    drinkUnits: '1',
  });
  const [drinkData, setDrinkData] = useState({
    drinkName: '',
    drinkUnits: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setSavedDrinks(user.userDrinks);
  }, []);

  const changeHandler = (e) => {
    setDrinkData({
      ...drinkData,
      [e.target.name]: e.target.value,
    });
  };

  const saveDrink = () => {
    axios
      .post('/api/drinks/', {drinkData})
      .then((res) => {
        adjustUsersDrinks([...savedDrinks, res.data]);
        toast.success('Success! Drink Added!');
      })
      .catch((err) => {
        toast.error('Unable to save drink. ');
        console.log('auth err: ', err);
      });
  };

  const removeDrink = (id) => {
    axios
      .delete(`/api/drinks/${id}`)
      .then(() => {
        const newArr = savedDrinks.filter((drink) => drink._id !== id);
        adjustUsersDrinks(newArr);
        toast.success('Success! Drink Removed!');
      })
      .catch((err) => {
        toast.error('Unable to remove drink. ');
        console.log('Remove Drink Error: ', err);
      });
  };

  const adjustUsersDrinks = (drinksArr) => {
    const user = JSON.parse(localStorage.getItem('user'));
    user.userDrinks = drinksArr;
    localStorage.setItem('user', JSON.stringify(user));
    setSavedDrinks(drinksArr);
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
                {drink.drinkName}: {drink.drinkUnits} Standard Units{' '}
                <span onClick={() => removeDrink(drink._id)}>🗑️</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drinks;
