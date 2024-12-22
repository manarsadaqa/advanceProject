const { getAllUser } = require(`./../models/userModle`);


const getAllUsers = async (req, res) => {
  try {
      const users = await userModel.getAllUsers();
      if (users.length === 0) {
          res.status(400).json({ message: 'No users found!' });
      } else {
          res.json(users);
      }
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
      const user = await userModel.getUserById(userId);
      if (!user) {
          res.status(404).json({ error: 'User not found' });
      } else {
          res.json(user);
      }
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
  }
};

const getUsersInCity = async (req, res) => {
  const city = req.params.city;
  try {
      const users = await userModel.getUsersInCity(city);
      res.json(users);
  } catch (error) {
      console.error('Error fetching users in city:', error);
      res.status(500).json({ error: 'Failed to fetch users in city' });
  }
};

const getUsersInCountry = async (req, res) => {
  const country = req.params.country;
  try {
      const users = await userModel.getUsersInCountry(country);
      res.json(users);
  } catch (error) {
      console.error('Error fetching users in country:', error);
      res.status(500).json({ error: 'Failed to fetch users in country' });
  }
};

const getUsersInCountryAndCity = async (req, res) => {
  const country = req.params.country;
  const city = req.params.city;
  try {
      const users = await userModel.getUsersInCountryAndCity(country, city);
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUsersInCountryCityAndIds = async (req, res) => {
  const country = req.params.country;
  const city = req.params.city;
  const userIDs = req.params.UserID.split(',').map(id => parseInt(id.trim(), 10));
  try {
      const users = await userModel.getUsersInCountryCityAndIds(country, city, userIDs);
      res.json(users);
  } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUsersInCity,
  getUsersInCountry,
  getUsersInCountryAndCity,
  getUsersInCountryCityAndIds
};

