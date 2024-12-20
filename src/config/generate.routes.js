const express = require('express');
const router = express.Router();
const analyzeImage = require('../vision');

router.post('/', async (req, res) => {
  const { photo } = req.body;
  const base64Data = photo.replace(/^data:image\/jpeg;base64,/, ""); // Asegurar el formato correcto
  const detections = await analyzeImage(base64Data);
  if (detections) {
    res.json({ detections });
  }
}
);

module.exports = router;
