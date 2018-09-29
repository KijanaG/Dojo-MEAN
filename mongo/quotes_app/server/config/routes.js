const quotes = require('../controllers/quotes.js');
module.exports = function(app){

    app.get('/', function(req, res) {
        res.render('quote_index');
    })
    app.get('/quotes', function(req, res) {
        quotes.find(req, res);
    });
    // Add User Request 
    app.post('/quotes', function(req, res) {
        quotes.create(req, res); 
        // This is where we would add the user from req.body to the database.
    });
};
