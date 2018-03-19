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
    name:'sdfasdfasdf',
    description:"用户信息实体",
    fields: () => {
        return ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            // name: {type: new GraphQLNonNull(GraphQLString)},
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

// module.exports = {
//     query:{
//         user:{
//             type:User,
//             description:'根据id查询单个用户',
//             args: {
//                 id: {type: new GraphQLNonNull(GraphQLInt)}
//             },
//             resolve:async function (source,{id}) {
//                 return (await util.searchSql($sql.queryAll))[id];
//             }
//         }
//     }
// };


const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:'UserQuery',
        description:'用户信息查询',
        fields:()=>({
            user:{
                type:User,
                description:'根据id查询单个用户',
                args: {
                    id: {type: new GraphQLNonNull(GraphQLInt)}
                },
                resolve:async function (source,{id}) {
                    console.log("++++++")
                    console.log(id)
                    console.log("========")
                    console.log(await util.searchSql($sql.queryById,[id]));
                    return (await util.searchSql($sql.queryById,[id]))[0];
                }
            }
        }),
    })
});

module.exports = schema;


