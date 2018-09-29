const birds = require('../controllers/birds.js');
module.exports = function(app) {
    app.get('/', function(req, res) {
        birds.showAll(req, res);
    })
    app.get('/bird/new', function(req,res) {
        res.render('form_dash');
    })
    app.get('/bird/:id', function(req, res) {
        birds.showOne(req, res);
    });
    app.post('/birds', function(req, res) {
        birds.addBird(req, res);
    });
    app.get('/birds/edit/:id', function(req,res){
        birds.displayEdit(req, res);
    })
    app.post('/birds/:id', function(req, res) {
        birds.editBird(req, res);
    });
    app.get('/delete/:id', function(req, res) {
        birds.deleteBird(req, res);
    })
}
