  const express   = require('express');
  const router    = express.Router();

  const animals   = require('../controllers/animals');


  router.route('/animals')
    .get(animals.index)
    .post(animals.create);
  router.route('/animals/new')
    .get(animals.new);
  router.route('/animals/:id')
    .get(animals.show)
    .put(animals.update)
    .delete(animals.delete);
  router.route('/animals/:id/edit')
    .get(animals.edit);


  router.route('/').get((req, res) => res.render('home'));


  module.exports = router;
