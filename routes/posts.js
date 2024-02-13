const express = require('express');
const router = express.Router();
const { combineJSONDATA } = require('./combineJSONDATA');

router.get('/combineJSONDATA', async (req, res) => {
    try {
        const combinedData = await combineJSONDATA();
        res.json({ combineJSONDATA: combinedData });
    } catch (error) {
        console.error('Error combining JSON data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
