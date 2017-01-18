const Animal = require('../models/animal');


function animalsIndex(req, res) {
  Animal.find({}, (err, animals) => {
    if (err) return res.render('animal/index', { animals: null, error :
    'Something went wrong'});
    return res.render('animals/index', { animals });
  });
}

function animalsNew(req, res) {
  return res.render('animals/new', { error: null });

}

function animalsCreate(req, res) {
  const animal = new Animal(req.body.animal);
  animal.save((err, animal) => {
    if (err) return res.render('animal/index', { animals: null, error: err.message });
    return res.redirect('/animals');
  });
}

function animalsShow(req, res) {
  Animal.findById(req.params.id, (err, animal) => {
    if (err) return res.render('animal/show', { animal: {}, error: 'Something went wrong'});
    if (!animal) return res.render('animals/show', { animal: {}, error: 'No animal exists?'});
    return res.render('animals/show', { animal, error: null});
  });
}

function animalsEdit(req, res) {
  Animal.findById(req.params.id, (err, animal) => {
    if (err) return res.render('animals/edit', { animal: {}, error: 'Something went wrong'});
    if (!animal) return res.render('animals/edit', { animal: {}, error: 'No animal to edit here!'});
    return res.render('animals/edit', { animal, error: null});
  });

}

function animalsUpdate(req, res) {
  Animal.findById(req.params.id, (err, animal) => {
    if (err) return res.render('animals/edit', { animal: {}, error: 'Something went wrong'});
    if (!animal) return res.render('animals/edit', { animal: {}, error: 'No animal found'});

    for (const field in Animal.schema.paths) {
      if ((field !== '_id') && (field !== '__v')) {
        if (req.body.animal[field] !== undefined) {
          animal[field] = req.body.animal[field];
        }
      }
    }
    animal.save((err, animal) => {
      if (err) return res.render('animals/edit', { animal: {}, error: 'Something went wrong'});
      return res.redirect(`/animals/${animal._id}`);
    });
  });

}

function animalsDelete(req, res) {
  Animal.findByIdAndRemove(req.params.id, err => {
    if (err) return res.render('animals/show', { animal: {}, error: 'Something went wrong'});
    return res.redirect('/animals');
  });

}

module.exports = {
  index: animalsIndex,
  new: animalsNew,
  create: animalsCreate,
  show: animalsShow,
  edit: animalsEdit,
  update: animalsUpdate,
  delete: animalsDelete
};

// index
// new
// create
// show
// edit
// update
// delete
