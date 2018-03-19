import { GraphQLList } from 'graphql';
import { CakeType } from '../types';

export default {
    cakes: {
        type: new GraphQLList(CakeType),
        resolve: (_, args, context) => {

            /**
             * Cake authorization
             */
            if (!context.user) {
                throw new Error('Only users can eat cakes.');
            }

            return [
                {flavour: 'red-velvet'},
                {flavour: 'mocca'},
            ];
        }
    }
};
