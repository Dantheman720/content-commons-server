import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import merge from 'lodash/merge';
import path from 'path';
import AuthResolvers from './resolvers/Auth';
import LanguageResolvers from './resolvers/Language';
import RegionResolvers from './resolvers/Region';
import BureauResolvers from './resolvers/Bureau';
import TaxonomyResolvers from './resolvers/Taxonomy';
import TeamResolvers from './resolvers/Team';
import UserResolvers from './resolvers/User';
import UtilResolvers from './resolvers/Util';
import DocumentResolvers from './resolvers/Document';
import VideoResolvers from './resolvers/Video';
import PackageResolvers from './resolvers/Package';
import { prisma } from './schema/generated/prisma-client';

const typeDefs = importSchema( path.resolve( 'src/schema/index.graphql' ) );

const resolvers = merge(
  AuthResolvers,
  UtilResolvers,
  LanguageResolvers,
  TaxonomyResolvers,
  RegionResolvers,
  BureauResolvers,
  UserResolvers,
  TeamResolvers,
  DocumentResolvers,
  VideoResolvers,
  PackageResolvers
);


// Create Apollo server
const createApolloServer = () => new ApolloServer( {
  typeDefs,
  resolvers,
  introspection: true,
  subscriptions: {
    path: '/subscription',
    onConnect: () => {},
    onDisconnect: () => {},
    onOperation: ( message, params ) => params,
  },
  context: async ( { connection, ...other } ) => {
    if ( connection ) {
      return { ...connection.context, prisma };
    }
    return { ...other, prisma };
  }
} );

export default createApolloServer;
