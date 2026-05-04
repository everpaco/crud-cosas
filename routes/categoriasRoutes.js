'use strict';
const express = require('express');
const router = express.Router();
const categoriasCtrl = require('../controllers/categoriasController');
const auth = require('../middlewares/authMiddleware');

router.get('/', categoriasCtrl.list);
router.post('/', auth, categoriasCtrl.create);
router.delete('/:id', auth, categoriasCtrl.destroy);
router.put('/:id', auth, categoriasCtrl.update);

module.exports = router;
