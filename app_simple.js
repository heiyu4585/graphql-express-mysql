var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

//TODO begin
var mysql = require('mysql');
var $conf = require('./conf/db');
var $sql = require('./dao/userSqlMapping');
var graphqlHTTP = require('express-graphql');
var {graphql, buildSchema } = require('graphql');
var pool  = mysql.createPool($conf.mysql);
var util = require('./util/util');

var schema = buildSchema(`
    type User{
        id:Int
        name: String!
        sex: String
        intro: String
    }
    input UserInput {
        name: String!
        sex: String
        intro: String
    }
    type course{
        id:Int
        score:Int
        course:String
        userId:Int!
    }
    type Query {
        user(id:Int!):User
        users:[User]
        courses(limt:Int):[course]
        course(userId:Int!):course
    }

    type Mutation{
        addUser(name:String!,sex:String,intro:String):User
        addUserByInput(userInfo:UserInput!):User
    }
`);
// type Mutation{
//     addUser(name:String!,sex:String,intro:String,skills:[String]!):User
//     addUserByInput(userInfo:UserInput!):User
// }
//服务端示例数据
// var users=[
//     {
//         name: 'zhaiqianfeng',
//         sex: '男',
//         intro: '博主，专注于Linux,Java,nodeJs,Web前端:Html5,JavaScript,CSS3',
//         skills: ['Linux','Java','nodeJs','前端'],
//     },
//     {
//         name: 'James',
//         sex: '男',
//         intro: 'zhaiqianfeng的英文名',
//         skills: ['Linux','Java','nodeJs','前端'],
//     },
// ];
async function createCourseQuery({userId,limt}) {
    return new Promise((succeed, fail) => {
        pool.getConnection(function (err, connection) {
            var msyql = $sql.course;
            if(userId){
                 msyql =  "SELECT * FROM `course`  where userId= "+userId+" limit 10";
            }else if(limt){
                 msyql =  "SELECT * FROM `course`   limit "+limt;
            }
            connection.query(msyql, function (err, result) {
                connection.release();
                if (err) {
                    return fail(err)
                }

                return succeed(result);
            });
        });
    })
}

async function createUseQuery() {
    return new Promise((succeed, fail) => {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                connection.release();
                if (err) {
                    return fail(err)
                }
                return succeed(result);
            });
        });
    })
}

async function addUser(user) {
    return new Promise((succeed, fail) => {
        pool.getConnection(function (err, connection) {
            connection.query($sql.addUser,[user.name,user.sex,user.intro],function (err, result) {
                connection.release();
                if (err) {
                    return fail(err)
                }
                user.id= result.insertId;
                return succeed(user);
            });
        });
    })
}
//定义resolver
var root= {
    course: async function ({userId}) {
        var result = await createCourseQuery(userId);
        result = JSON.parse(JSON.stringify(result));
        console.log("coursecoursecoursecourse")
        console.log(result[0])
        return result[0];
    },
    courses: async function ({userId,limt}) {
        // let data = await db.collection('dbo.TBL_NETNODE_INFO').find().limit(1500).sort({ 'ID': 1 }).toArray();
        var result = await createCourseQuery({userId:userId,limt:limt});
        result = JSON.parse(JSON.stringify(result))
        console.log(result)
        return result;
    },
    //TODO user与users 可分开用不用的sql,单独user不用整体都查询
    user: async function ({id}) {
        var result = await createUseQuery();
        result = JSON.parse(JSON.stringify(result))
        return result[id];
    },
    users: async function () {
        // let data = await db.collection('dbo.TBL_NETNODE_INFO').find().limit(1500).sort({ 'ID': 1 }).toArray();
        var result = await createUseQuery();
        result = JSON.parse(JSON.stringify(result))
        console.log(result)
        return result;
    },
    //mutation resolver

    addUser: async function({name,sex,intro}){
        var user={
            name:name,
            sex:sex,
            intro:intro
        };
        var result = await addUser(user);
        console.log("34343434")
        return result;
    },
    //对象形式  用户输入
    addUserByInput:async function({userInfo}){
        var user={
            name:userInfo.name,
            sex:userInfo.sex,
            intro:userInfo.intro,
        };
        var result = await addUser(user);
        return result;
    },

    //嵌套查询
    //用户去过的城市
    userVisitCity:async function({userInfo}){
        var user={
            name:userInfo.name,
            sex:userInfo.sex,
            intro:userInfo.intro,
        };
        var result = await addUser(user);
        return result;
    }

};
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, //启用GraphiQL
}));
//TODO  end


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//后端解析查询
graphql(schema, ' query HeroNameAndFriends{\n' +
    '\tcourses {\n' +
    '    id\n' +
    '\t  score\n' +
    '\t  course\n' +
    '\t}\n' +
    '}', root).then((response) => {
    console.log(response);
});

module.exports = app;
