'use strict';
const express = require('express');
const router = express.Router();
const mueblesCtrl = require('../controllers/mueblesController');
const auth = require('../middlewares/authMiddleware');

router.get('/', mueblesCtrl.list);
router.post('/', auth, mueblesCtrl.create);
router.delete('/:id', auth, mueblesCtrl.destroy);
router.put('/:id', auth, mueblesCtrl.update);

module.exports = router;
