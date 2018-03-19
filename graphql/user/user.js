
var $sql = require('../../dao/userSqlMapping');
var util = require("../../util/util");
var {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLEnumType,
    GraphQLNonNull,
    GraphQLInterfaceType,
    GraphQLInputObjectType
} = require('graphql');

//定义schema及resolver
const Unit=new GraphQLEnumType({
    name:'Unit',
    description:"单位",
    values: {
        MM: {value: 'MM'},
        cm: {value: 'cm'},
        mm: {value: 'mm'},
    }
});

const User=new GraphQLObjectType({
    name:'User',
    description:"用户信息实体",
    fields: () => {
        return ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            name: {type: new GraphQLNonNull(GraphQLString)},
            sex: {type: new GraphQLNonNull(GraphQLString)},
            intro: {type: new GraphQLNonNull(GraphQLString)},
            skills: {type: new GraphQLNonNull(new GraphQLList(GraphQLString))},
            stature: {
                type: GraphQLFloat,
                args: {
                    unit: {type: Unit}
                },
                resolve: function (user, {unit}) {
                    if (unit == 'MM') {
                        return user.stature/100;
                    } if (unit == 'cm') {
                        return user.stature;
                    }else if (unit == 'mm') {
                        return user.stature*10;
                    }
                }
            },
        });
    },
});
const  UserInput=new GraphQLInputObjectType({
    name:'UserInput',
    description:"用户信息Input实体",
    fields:()=>({
        name:{type:new GraphQLNonNull(GraphQLString)},
        sex:{type:new GraphQLNonNull(GraphQLString)},
        intro:{type:new GraphQLNonNull(GraphQLString)},
        skills:{type:new GraphQLList(GraphQLString)},
        stature:{type:Unit},
    }),
});

module.exports = {
    query:{
        user:{
            type:User,
            description:'根据id查询单个用户',
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve:async function (source,{id}) {
                return (await util.searchSql($sql.queryAll))[id];
            }
        },
        users:{
            type:new GraphQLList(User),
            description:'查询全部用户列表',
            resolve:async function () {
                return await util.searchSql($sql.queryAll);
            }
        }
    },
    mutation:{
        addUser:{
            type:User,
            description:'添加用户',
            args: {
                id:{type: GraphQLInt},
                name:{type: new GraphQLNonNull(GraphQLString)},
                sex:{type: new GraphQLNonNull(GraphQLString)},
                intro:{type: new GraphQLNonNull(GraphQLString)},
                skills:{type:new GraphQLList(new GraphQLNonNull(GraphQLString))}
            },
            resolve:async function (source,{id,name,sex,intro}) {
                var user={
                    name:name,
                    sex:sex,
                    intro:intro
                };
                return await util.searchSql( $sql.addUser,[user.name,user.sex,user.intro]);
            }
        },
        addUserByInput:{
            type:User,
            description:'通过Input添加用户',
            args: {
                userInfo:{type: UserInput},
            },
            resolve:async function (source,{userInfo}) {
                return await util.searchSql( $sql.addUser,[userInfo.name,userInfo.sex,userInfo.intro]);
            }
        }
    }
};