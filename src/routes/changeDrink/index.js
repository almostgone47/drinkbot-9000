import {h} from 'preact';
import {useState} from 'preact/hooks';
import {Link} from 'preact-router/match';

import style from './style.css';

// Note: `user` comes from the URL, courtesy of our router
const ChangeDrink = () => {
  const [drinkData, setDrinkData] = useState({
    drinkName: '',
    drinkUnits: '',
  });

  const changeHandler = (name, value) => {
    console.log('drinkData: ', name, value);
    setDrinkData({
      ...drinkData,
      [name]: value,
    });
  };

  const saveDrink = (drink) => {
    console.log('drinkData: ', drink);
  };

  return (
    <div class={style.form}>
      <div class={style.formInput}>
        <label for="drinkName">Drink Name: </label>
        <input
          name="drinkName"
          value={drinkData.drinkName}
          type="text"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label for="drinkUnits">Standard Drink Units: </label>
        <input
          name="drinkUnits"
          value={drinkData.drinkUnits}
          type="number"
          step="any"
          onChange={changeHandler}
        />
      </div>

      <p>
        <Link activeClassName={style.active} href="/">
          <button>{'< Back'}</button>
        </Link>
        <button onClick={() => saveDrink(drinkData)}>Save</button>
      </p>
    </div>
  );
};

export default ChangeDrink;
