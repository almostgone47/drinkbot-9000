import {h} from 'preact';
import {format} from 'date-fns';

function DrinkList({drinks}) {
  return (
    <ul>
      {drinks.map((drink, index) => (
        <li key={index}>
          {drink.name} at {format(new Date(drink.time), 'h:mm:ss a')}
        </li>
      ))}
    </ul>
  );
}

export default DrinkList;
