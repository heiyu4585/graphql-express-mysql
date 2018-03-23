var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource users');
});


//graphql
var graphqlHTTP = require('express-graphql');
var userSchema =require ('../graphql/user/schema');

router.use('/graphql', graphqlHTTP({
    schema: userSchema,
    graphiql: true, //启用GraphiQL
}));

router.get('/queryAll', function(req, res, next) {

    // userDao.queryAll(req, res, next);
    userDao.queryAll({
    },function (err, result) {
        if(err){
            res.json({status: 500, message: err});
        }else{
            res.json({status: 200, message: "ok", responseList:result});
        }
    });

});


module.exports = router;
