import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export default new GraphQLObjectType({
    name: 'CakeType',
    description: 'A delicious piece of cake.',
    fields: () => ({
        flavour: {
            type: GraphQLString,
            description: 'But how does it taste?',
        }
    })
});
