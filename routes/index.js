var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/queryAll', function(req, res, next) {
    userDao.queryAll(req, res, next);
});
module.exports = router;
