// ===============================================================================
// Require dependencies
// ===============================================================================

var fs = require("fs");
var noteData = JSON.parse(fs.readFileSync("db/db.json"));

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // ---------------------------------------------------------------------------
    app.get("/api/notes", function (req, res) {
        return res.json(noteData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {
        noteData.push(req.body);
        addId();
        rewriteFile();
        return res.json(noteData)
    });

    // Creating an ID for all the notes 
    // Below adds a unique ID to all notes in the array
    // -----------------------------------------------------------------------------

    var addId = function () {
        noteData.forEach(function (num, newnum) {
            num.id = newnum + 1;
            console.log('Added Note: ' + num.id);
        });

    };

    // API DELETE Request 
    // Below code delets notes when selecting trash icon
    // -----------------------------------------------------------------------------

    app.delete("/api/notes/:id", function (req, res) {
        var chosen = req.params.id;
        var removedData = noteData.findIndex(function (num) {
            num.id == chosen
        });
        noteData.splice(removedData, 1);
        console.log('Deleted Note ID: ' + chosen);
        rewriteFile();
        return res.json(noteData);
    });

    // Rewrites notes to the db.json file after deleting
    // -----------------------------------------------------------------------------

    var rewriteFile = function () {
        var newnoteData = JSON.stringify(noteData);
        fs.writeFile('db/db.json', newnoteData, function (err) {
            if (err) throw err
        });
        console.log(`Updated Array and ID's`);
    };
};