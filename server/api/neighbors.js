const router = require('express').Router();
const {neighborService} = require('../services');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const neighbors = await neighborService.getNeighbors();
        res.json(neighbors);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const neighbor = await neighborService.getNeighborById(req.params.id);
        res.json(neighbor);
    } catch (e) {
        next(e);
    }
});
