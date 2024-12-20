const User = require('./user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function encryptPassword(password) {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
}

const generateAccessToken = (userId) => {
  const payload = {
    user: userId,
  };
  const options = {
    expiresIn: '90d',
  };

  return jwt.sign(payload, process.env.JWT_KEY, options);
}
const userController = {
  create: async (req, res) => {
    try {
      const newUser = {
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
      };
      newUser.password = await encryptPassword(newUser.password);
      const findUser = await User.findOne({ phone: newUser.phone });
      if (findUser) {
        return res.status(400).json({ message: 'Ya existe un usuario con ese número de teléfono' });
      }
      const user = await User.create(newUser);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  signin: async (req, res) => {
    try {
      const user = await User.findOne({ phone: req.body.phone });
      if (!user) {
        return res.status(404).json({ message: 'Usuario y/o contraseña incorrectos' });
      }
      const validPassword = await bcryptjs.compare(req.body.password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Usuario y/o contraseña incorrectos' });
      }
      return res.status(200).json({ token: generateAccessToken(user._id) });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  addPaymentMethod: async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      const exist = user.payment_methods.find((element) => {
        if (element.name === req.body.name) {
          return element;
        }
        return false
      });
      console.log(exist);
      if (exist) {
        return res.status(400).json({ message: 'Ya existe una tarjeta con ese nombre' });
      }
      user.payment_methods.push(req.body);
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  getPaymentMethods: async (req, res) => {
    try {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      return res.status(200).json(user.payment_methods);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
}


module.exports = userController;
