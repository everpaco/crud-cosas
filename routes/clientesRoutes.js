'use strict';
const express = require('express');
const router = express.Router();
const clientesCtrl = require('../controllers/clientesController');
const auth = require('../middlewares/authMiddleware');

router.get('/', clientesCtrl.list);
router.post('/', auth, clientesCtrl.create);
router.delete('/:id', auth, clientesCtrl.destroy);
router.put('/:id', auth, clientesCtrl.update);

module.exports = router;
