const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const Drink = model('Drink', {
  drinkName: {type: String, required: true},
  drinkUnits: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
});

const createDrink = async (drink, user) => {
  const newDrink = new Drink({
    drinkName: drink.drinkName,
    drinkUnits: drink.drinkUnits,
    user: user.id,
  });
  return newDrink.save();
};

const getAllDrinks = async (user) => {
  const query = Drink.find({user: user.id});
  return query.exec();
};

const getDrinkByID = async (_id) => {
  const query = Drink.findById({_id: _id});
  return query.exec();
};

const deleteDrinkById = async (_id) => {
  const result = await Drink.deleteOne({_id: _id});
  return result.deletedCount;
};

const updateDrink = async (_id, drinkName, drinkUnits) => {
  const result = await Drink.replaceOne(
    {_id: _id},
    {
      drinkName: drinkName,
      drinkUnits: drinkUnits,
    },
  );
  return {
    _id: _id,
    drinkName: drinkName,
    drinkUnits: drinkUnits,
  };
};

module.exports = {
  createDrink,
  getAllDrinks,
  getDrinkByID,
  updateDrink,
  deleteDrinkById,
};
