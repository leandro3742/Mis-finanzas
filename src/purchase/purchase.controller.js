const Purchase = require('./purchase.model');

const purchaseController = {
  create: async (req, res) => {
    try {
      console.log('entra')
      console.log(req.body)
      const purchase = await Purchase.create(req.body);
      console.log(purchase)
      res.status(201).json(purchase);
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error.message });
    }
  },
  getPurchase: async (req, res) => {
    try {
      const purchase = await get();
      res.status(200).json(purchase);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getByMonth: async (req, res) => {
    try {
      const purchase = await Purchase.find({ date: { $gte: new Date(req.params.month) } }).sort({ date: -1 });
      res.status(200).json(purchase);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deletePurchase: async (req, res) => {
    try {
      const purchase = await Purchase.findByIdAndDelete(req.params.id);
      res.status(200).json(purchase);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

}


module.exports = purchaseController;
