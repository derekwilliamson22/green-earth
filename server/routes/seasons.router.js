const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const
    {
        rejectUnauthenticated,
    } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
    const queryString =
        `SELECT * FROM "season" WHERE "farm_id" = $1`

    pool.query(queryString, [req.query.farm_id])
        .then(dbRes => {
        res.send(dbRes.rows);
    })
    .catch(error => {
        console.log('error in GETting seasons', error);
        res.sendStatus(500);
    });
});


/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // POST route code here
console.log('what are the seasons fetch params', req.body);
const queryParams = 
    [
    req.body.farm_id,
    req.body.year,
    req.body.last_frost_date,
    req.body.first_frost_date
    ]
    const queryString = 
    `
    INSERT INTO "season"
    ("farm_id", "year", "last_frost_date", "first_frost_date")
    VALUES ($1, $2, $3, $4);
    `;

    pool.query(queryString, queryParams)
    .then((results) => {
    res.sendStatus(201);
    })
    .catch(error => {
    console.log('error in POSTing seasons', error);
    res.sendStatus(500);
    });
});


module.exports = router;