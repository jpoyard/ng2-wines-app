// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

const queryRegex = /(?:\w+:[\w -]+)/g;

const responseDelay = 0; // 1000 for emulate delay for wine retrieving 
const dbSize = 1; // 1000 for lazy loading

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 4000;        // set our port

// UTILS FUNCTIONS
// =============================================================================
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "content-type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:{port}/api)
router.get('/', function (req, res) {
    res.json({ message: 'welcome to our wine api!' });
});

// on routes that end in /wines
// ----------------------------------------------------
router.route('/wines')

    // create a wine (accessed at POST http://localhost:{port}/api/wines)
    .post(function (req, res) {
        console.log('addWine...');
        delete req.body['0'];
        delete req.body['1'];
        delete req.body['2'];
        delete req.body['3'];
        delete req.body['4'];
        maxWineId++;
        req.body['id'] = maxWineId;
        app.wines.insert(req.body, function (err, doc) {
            if (err) {
                console.error('addWine  : unexpected error occurs :' + err);
                return next(err);
            }
            app.wines.findOne({ id: maxWineId }, function (err, doc) {
                if (err) {
                    console.error('getWine : unexpected error occurs :' + err);
                    return next(err);
                }
                console.log('addWine : for id=' + maxWineId + ': name=' + doc.name);
                res.status(200).send(doc);
            });
        });
    })

    // query on the wine (accessed at GET http://localhost:{port}/api/wines)
    // can add search params like : skip=5&limit=5&sort=year&q=name:ch
    // return like this : { 'totalCount': 12, 'incompleteResults': true, 'items': [{...}, {...}, ...]}
    .get(function (req, res) {
        var filterParams = {};
        var sortParams = {};
        var skipValue = 0;
        var limitValue = 0;
        var incompleteResults = false;

        console.log(`for following parameters :`);
        if (req.query.skip) {
            skipValue = parseInt(req.query.skip, 10);
            console.log(` - skip=${skipValue}`);
        }

        if (req.query.limit) {
            limitValue = parseInt(req.query.limit, 10);
            console.log(` - limit=${limitValue}`);
        }

        if (req.query.q) {
            var m;
            var paramQuery = req.query.q;
            
            // explose query (param q) and prepare query for NeDB, like en:query1+fr:query2
            // use default sorting depending of query
            var queries = [];
            while ((m = queryRegex.exec(paramQuery)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === queryRegex.lastIndex) {
                    queryRegex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    var t = match.split(':');
                    var query = {};
                    query[t[0]] = { $regex: new RegExp(t[1], 'gi') };
                    queries.push(query);
                    console.log(` - Found query : {${t[0]} : { $regex: ${query[t[0]].$regex}}}`);
                });
            }
            if (queries.length !== 0) {
                if (queries.length === 1) {
                    filterParams = queries[0];
                } else {
                    filterParams = { $or: queries }
                }
            }
        }
        
        sortParams = {};
        if (req.query.sort) {
            var m;

            // explose query (param q) and prepare query for NeDB, like en:query1+fr:query2
            // use default sorting depending of query
            while ((m = queryRegex.exec(req.query.sort)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === queryRegex.lastIndex) {
                    queryRegex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    var t = match.split(':');
                    sortParams[t[0]] = t[1];
                    console.log(` - Found sort : {${t[0]} : ${t[1]}}`);
                });
            }
        }

        app.wines.count(filterParams, function (err, count) {
            var totalCount = count;
            if (limitValue === 0) {
                limitValue = totalCount;
            }

            app.wines.find(filterParams).sort(sortParams).skip(skipValue).limit(limitValue).exec(function (err, wines) {
                var result = {
                    'totalCount': totalCount,
                    'incompleteResults': incompleteResults,
                    'items': wines
                };
                setTimeout(() => {
                    console.log(` => get wines : incompleteResults=${result.incompleteResults} and totalCount=${result.totalCount}`); 
                    res.status(200).send(result); 
                }, responseDelay);
            });
        });
    });

// on routes that end in /wines/:id
// ----------------------------------------------------
router.route('/wines/:id')

    // get the wine with that id (accessed at GET http://localhost:{port}/api/wines/:id)
    .get(function (req, res) {
        if (isNaN(req.params['id'])) {
            console.error('getWine : unexpected string for param id :' + req.params['id'])
            res.status(200).send(false);
        } else {
            var wineId = parseInt(req.params['id'], 10);
            app.wines.findOne({ id: wineId }, function (err, doc) {
                if (err) {
                    console.error('getWine : unexpected error occurs :' + err);
                    return next(err);
                }
                setTimeout(() => {
                    console.log('getWine : for id=' + wineId + ': name=' + (doc !== null ? doc.name : 'unknown'));
                    res.status(200).send(doc);
                }, responseDelay);
            });
        }
    })

    // update the wine with this id (accessed at PUT http://localhost:{port}/api/wines/:id)
    .put(function (req, res) {
        if (isNaN(req.params['id'])) {
            console.error('updateWine : unexpected string for param id :' + req.params['id']);
            res.status(200).send(false);
        } else {
            delete req.body['_id'];
            var wineId = parseInt(req.params['id'], 10);
            app.wines.update({ id: wineId }, { $set: req.body }, {}, function (err, nbReplaced) {
                if (err) {
                    console.error('updateWine  : unexpected error occurs :' + err);
                    return next(err);
                }
                app.wines.findOne({ id: wineId }, function (err, doc) {
                    if (err) {
                        console.error('getWine : unexpected error occurs :' + err);
                        return next(err);
                    }
                    console.log('updateWine : for id=' + wineId + ': name=' + doc.name);
                    res.status(200).send(doc);
                });
            });
        }
    })

    // delete the bear with this id (accessed at DELETE http://localhost:{port}/api/wines/:id)
    .delete(function (req, res) {
        if (isNaN(req.params['id'])) {
            console.error('deleteWine : unexpected string for param id :' + req.params['id']);
            res.send(200, false);
        } else {
            var wineId = parseInt(req.params['id'], 10);
            app.wines.remove({ id: wineId }, function (err, nbRemoved) {
                if (err) {
                    console.error('updateWine  : unexpected error occurs :' + err);
                    return next(err);
                }
                console.log('deleteWine : for id=' + wineId + ': nbRemoved=' + nbRemoved);
                res.status(200).send();
            });
        }
    });

// on routes that end in /wines/:id/picture
// ----------------------------------------------------
router.route('/wines/:id/picture')

    // get the bear with that id (accessed at GET http://localhost:{port}/api/wines/:id/picture)
    .get(function (req, res) {
        if (isNaN(req.params['id'])) {
            console.error('getPicture : unexpected string for param id :' + req.params['id']);
            res.status(200).send(false);
        } else {
            var wineId = parseInt(req.params['id'], 10);
            app.wines.findOne({ id: wineId }, function (err, doc) {
                if (err) {
                    console.error('getPicture : unexpected error occurs :' + err);
                    return next(err);
                }
                var file = __dirname + '/pics/';
                if ((!doc) || (doc && (doc.picture === undefined))) {
                    console.info('getPicture : for id=' + wineId + ': error retrieving picture, serving [generic.png]');
                    file = file + 'generic.png';
                } else {
                    console.log('getPicture : for id=' + wineId + ': picture=' + doc.picture);
                    var file = file + doc.picture;
                }
                res.download(file);
            });
        }
    });

// on routes that end in /countries
// ----------------------------------------------------
router.route('/countries')

    // get all the wines (accessed at GET http://localhost:{port}/api/wines)
    .get(function (req, res) {
        var m;

        // explose query (param q) and prepare query for NeDB, like en:query1+fr=query2
        // use default sorting depending of query
        var queries = [];
        var sort = {};
        while ((m = queryRegex.exec(req.query.q)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === queryRegex.lastIndex) {
                queryRegex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                var t = match.split(':');
                var query = {};
                query[t[0]] = { $regex: new RegExp(t[1], 'gi') };
                sort[t[0]] = 1; // order ASC by default for sort
                queries.push(query);
                console.log(`Found query : {${t[0]} : { $regex: ${query[t[0]].$regex}}}`);
            });
        }
        var queryForNeDB = {};
        if (queries.length !== 0) {
            if (queries.length === 1) {
                queryForNeDB = queries[0];
            } else {
                queryForNeDB = { $or: queries }
            }
        }

        // execute request
        app.countries.find(queryForNeDB).sort(sort).exec(function (err, countries) {
            console.info('getCountries :' + countries.length);
            res.status(200).send(countries);
        });
    });

// on routes that end in /countries/:code
// ----------------------------------------------------
router.route('/countries/:code')

    // get the country with that code (accessed at GET http://localhost:{port}/api/counties/:code)
    .get(function (req, res) {
        var code = req.params['code'];
        app.countries.findOne({ code: code }, function (err, doc) {
            if (err) {
                console.error('getCountry : unexpected error occurs :' + err);
                return next(err);
            }
            console.log('getCountry : for code=' + code);
            res.status(200).send(doc);
        });
    })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// BASE SETUP
// =============================================================================
var fs = require('fs')
var Datastore = require('nedb');
var maxWineId = -1;
var winesDbFilePath = './server/data/wines.nedb'
fs.writeFile(winesDbFilePath, '', () => {
    console.log('\033[96m + \033[39m clean previous nedb file : ' + winesDbFilePath);
    app.wines = new Datastore({ filename: winesDbFilePath });

    // Load Databases
    // =============================================================================    
    app.wines.loadDatabase(function (err) {
        if (err) {
            throw err;
        }
        console.log('\033[96m + \033[39m connected to NeDB (wines)');

        // insert data from json file
        var wines = require('./data/origin/wines.json');
        var maxYear = new Date().getFullYear();
        var minYear = (maxYear - 40) + 1;

        maxWineId = 0;

        wines.forEach((value, index) => {
            for (var i = 0; i < dbSize; i++) {
                var wine = Object.assign({}, value);
                wine.id = maxWineId++;
                wine.year = randomIntFromInterval(minYear, maxYear);
                wine.rating = randomIntFromInterval(0, 100) / 20;
                wine.price = randomIntFromInterval(30, 155) / 5;
                wine.goodDealRatio = wine.rating / wine.price;
                app.wines.insert(wine, function (err, newDocs) {
                    if (err) {
                        console.error('failed to insert wine :' + err);
                        throw err;
                    }
                });

            }
        });

        var countriesDbFilePath = './server/data/countries.nedb'
        fs.writeFile(countriesDbFilePath, '', () => {
            console.log('\033[96m + \033[39m clean previous nedb file : ' + countriesDbFilePath);
            app.countries = new Datastore({ filename: countriesDbFilePath });

            app.countries.loadDatabase(function (err) {
                if (err) {
                    throw err;
                }
                console.log('\033[96m + \033[39m connected to NeDB (countries)');

                // insert data from json file
                var countries = require('./data/origin/countries.json');
                countries.forEach((value, index) => {
                    var country = {
                        code: value.alpha3Code,
                        en: value.name,
                        de: value.translations.de || value.name,
                        fr: value.translations.fr || value.name
                    };
                    app.countries.insert(country, function (err, newDocs) {
                        if (err) {
                            console.error('failed to insert country :' + err);
                            throw err;
                        }
                    });
                });

                // START THE SERVER
                // =============================================================================
                app.listen(port, function () {
                    console.log('\033[96m + \033[39m app listening on *:', port);
                });
            });
        });
    });
});