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

//分数
const Course=new GraphQLObjectType({
    name:'Course',
    description:"用户分数查询",
    fields: {
        id: {type: GraphQLInt},
        score: {
            type: GraphQLString,
            args: {
                limit: {type: GraphQLInt}
            },
            resolve:async function (source,{limit}) {

                return `分数为${source.score} limit是${limit}`
            }
        },
        course: {type: GraphQLString},
        userId: {type: new GraphQLNonNull(GraphQLInt)}
    }
});


module.exports = {
    query:{
        courses:{
            type:new GraphQLList(Course),
            description:'查询用户整体分数',
            resolve:async function () {
                return await util.searchSql($sql.courses);
            }
        },
        course:{
            type:new GraphQLList(Course),
            description:'查询用户分数',
            args: {
                id: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve:async function(source,{id}) {
                return await util.searchSql($sql.courseById,[id]);
            }
        }
    }
};