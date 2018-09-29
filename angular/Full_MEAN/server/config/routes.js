const notes = require('../controllers/notes.js')

module.exports = function(app) {
    app.get('/notes', (req, res) => {
        notes.getNotes(req, res);
    });
    app.post('/notes', (req, res) => {
        notes.createNote(req, res);
    });
}
