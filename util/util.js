var mysql = require('mysql');
var $conf = require('../conf/db');
var pool  = mysql.createPool($conf.mysql);

async function searchSql($sql,params) {
  return   new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query($sql, params,function (err, result) {

                connection.release();
                if (err) {
                    reject(err)
                }
                if(result.insertId) result.id = result.insertId;
                 resolve(result);
            });
        });
    })
}

module.exports = {
    searchSql:searchSql
}
