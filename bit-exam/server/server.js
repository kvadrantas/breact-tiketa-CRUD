import isValid from "./js/isValid.js";

// import moment from "moment-timezone";

// ----------------- EXPRESS SERVER -----------------
// const express = require('express')
import express, { json } from "express";
const app = express()
const port = 3003
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

// const cors = require('cors')
import cors from "cors";
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


// ----------------- MY SQL CONNECT -----------------
// const mysql = require('mysql')
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "tiketa",
    password: "Laikinas1",
    database: "Koncertai",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// -------------------------------------------------




// GET ALL RECORDS FROM TABLE
app.get('/koncertai/', (req, res) => {
    const sql = `
        select * from koncertai
    `
    con.query(sql, (err, results) => {
        if (err) throw err;
        // console.log(results);
        // console.log(moment.tz('2021-11-03T22:00:00.000Z', "Europe/Vilnius").format('YYYY-MM-DD'))
        // console.log('AAA ', results);
        // console.log('BBB ', fixDate(results));
        res.send(results);
    });
})


// INSERT NEW RECORD IN TABLE
app.post('/koncertai', (req, res) => {
    const sql = `
        insert into koncertai
        (renginys, kaina, data, laikas, renginioadresas, vietostipas, vietosnr)
        values (?, ?, ?, ?, ?, ?, ?)
    `
    if(
        isValid('txt', 'required', req.body.renginys) &&
        isValid('num', 'required', req.body.kaina) &&
        isValid('txt', 'required', req.body.data.slice(0, 10)) &&
        isValid('txt', 'required', req.body.laikas) &&
        isValid('txt', 'required', req.body.renginioadresas) &&
        isValid('txt', 'required', req.body.vietostipas) &&
        isValid('txt', 'optional', req.body.vietosnr)
    ) {
        con.query(sql, [
            req.body.renginys, 
            req.body.kaina, 
            req.body.data.slice(0, 10)||'0001-01-01', 
            req.body.laikas, 
            req.body.renginioadresas, 
            req.body.vietostipas, 
            req.body.vietosnr, 
        ], (err, results) => {
            try {
                if (err) throw err;
                // console.log(results);
                res.send(results)
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err)
            }
        });
    } else console.log('BAD DATA');
})


// EDIT RECORD 
app.put('/koncertai/:id', (req, res) => {
    // console.log(req.body.vietostipas);
    const sql = `
        UPDATE koncertai
        SET renginys = ?, kaina = ?, data = ?, laikas = ?, renginioadresas = ?, vietostipas = ?, vietosnr = ?
        WHERE id = ?
    `;
    if(
        isValid('txt', 'required', req.body.renginys) &&
        isValid('num', 'required', req.body.kaina) &&
        isValid('txt', 'required', req.body.data.slice(0, 10)) &&
        isValid('txt', 'required', req.body.laikas) &&
        isValid('txt', 'required', req.body.renginioadresas) &&
        isValid('txt', 'required', req.body.vietostipas) &&
        isValid('txt', 'optional', req.body.vietosnr) &&
        isValid('num', 'required', req.params.id)
    ) {
        con.query(sql, [
            req.body.renginys, 
            req.body.kaina, 
            req.body.data.slice(0, 10)||'0001-01-01', 
            req.body.laikas, 
            req.body.renginioadresas, 
            req.body.vietostipas, 
            req.body.vietosnr, 
            req.params.id
        ], (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                res.send(results);
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err);
            }
        }) 
    } else console.log('BAD DATA');
})


// DELETE RECORD 
app.delete('/koncertai/:id', (req, res) => {
    const sql = `
        DELETE FROM koncertai
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        try {
            if (err) {
                throw err;
            }
            res.send(result);
        } catch(err) {
            console.log('THIS IS HANDLED ERROR: ', err);
        }
    })
})
// -------------------------------------------------




// FILTER CHECKBOX CONTENT - GET DISTINCT TYPES
app.get('/koncertai-vietostipas', (req, res) => {
    const sql = `
        SELECT DISTINCT vietostipas
        FROM koncertai
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

app.get('/koncertai-vietosnr', (req, res) => {
    const sql = `
        SELECT DISTINCT vietosnr
        FROM koncertai
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// FILTER - GET DATA BY TYPE
app.get('/koncertai-filter/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM koncertai
        WHERE vietostipas = ?
    `;
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

app.get('/koncertai-filter2/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM koncertai
        WHERE vietosnr = ?
    `;
    con.query(sql, [req.params.t], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})


// SORT1 & FILTER MIX (SORT1)  
// app.get('/koncertai-filter/:t', (req, res) => {
//     // console.log(kainaof req.params.t, req.params.t);
//     // console.log(req.params.t === '3');
//     let sql;
//     if(req.params.t === 'ASC') {
//         sql = `
//         SELECT * FROM koncertai
//         order by laikas ASC
//     `} else if(req.params.t === 'DESC') {
//         sql = `
//         SELECT * FROM koncertai
//         order by laikas DESC
//     `} else if(req.params.t === '1' || req.params.t === '0') {
//         sql = `
//         SELECT *
//         FROM koncertai
//         WHERE renginioadresas = ?
//     `;
//     }
    
//     con.query(sql, [req.params.t], (err, results) => {
//         if (err) {
//             throw err;
//         }
//         res.send(results);
//         // console.log(results)
//     })
// })

// SEARCH DATA
app.get('/koncertai-search', (req, res) => {
    const searchText = (`%${req.query.s}%`).toLowerCase();
    const sql = `
        SELECT *
        FROM koncertai
        where LOWER(renginys) like ? OR LOWER(kaina) like ? OR LOWER(data) like ? OR LOWER(laikas) like ? OR LOWER(renginioadresas) like ? OR LOWER(vietostipas) like ? OR LOWER(vietosnr) like ?
    `;
    con.query(sql, [searchText, searchText, searchText, searchText, searchText, searchText, searchText, searchText], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// STATISTICS
app.get('/statistics', (req, res) => {

    let totalPrice;
    let totalCount;
    let groupByArtist;
    let goupByAddress;
    
    //     let totalQuantity;
    //     let totalValue;
    //     let uniquerenginyss;
    //     let avgPrice;
    //     let itmInStock;
    //     let itmOutStock;
    //     let groupStats;
    
    let sql = `
    SELECT 
    SUM(kaina) as totalPrice,
    COUNT(id) as totalCount
    FROM koncertai
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        // res.send(results);
         
            totalPrice = results[0].totalPrice;
            totalCount = results[0].totalCount;
    });

    sql = `
    SELECT renginys, count(renginys) as renginysCount
    from koncertai
    group by renginys
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        
        groupByArtist = results;
        // res.send(results);
    });

    sql = `
    SELECT renginioadresas, count(renginioadresas) as adresasCount
    from koncertai
    group by renginioadresas
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }

        goupByAddress = results;
        // res.send(results);
         
            res.send({
                totalPrice,
                totalCount,
                groupByArtist,
                goupByAddress
            });
    });


})

//     sql = `
//     select 
//     SUM(data) as itmInStock
//     from koncertai
//     where renginioadresas = '1';
//     `;
//     con.query(sql, (err, results) => {
//         if (err) {
//             throw err;
//         }
//         // res.send(results);
//         itmInStock = results[0].itmInStock;
//     });

//     sql = `
//     select 
//     SUM(data) as itmOutStock
//     from koncertai
//     where renginioadresas = '0';
//     `;
//     con.query(sql, (err, results) => {
//         if (err) {
//             throw err;
//         }
//         // res.send(results);
//          itmOutStock = results[0].itmOutStock;
//     });

//     sql = `
//     select kaina, sum(data) as data
//     from koncertai
//     where renginioadresas = '1'
//     group by kaina;
//     `;
//     con.query(sql, (err, results) => {
//         if (err) {
//             throw err;
//         }
//         // res.send(results);
//         groupStats = results;
//         res.send({
//             totalQuantity,
//             totalValue,
//             uniquerenginyss,
//             avgPrice: totalValue/totalQuantity,
//             itmInStock,
//             itmOutStock,
//             groupStats
//         });
//     });
// })

