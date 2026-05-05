'use strict';
const express = require('express');
const router = express.Router();
const ventasCtrl = require('../controllers/ventasController');
const auth = require('../middlewares/authMiddleware');

router.get('/', ventasCtrl.list);
router.post('/', auth, ventasCtrl.create);
router.delete('/:id', auth, ventasCtrl.destroy);
router.put('/:id', auth, ventasCtrl.update);

module.exports = router;
