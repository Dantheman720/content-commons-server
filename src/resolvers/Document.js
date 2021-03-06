
import { getSignedUrlPromiseGet } from '../services/aws/s3';

export default {
  Query: {
    documentFiles( parent, args, ctx ) {
      return ctx.prisma.documentFiles( { ...args } );
    },

    documentFile( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: args.id } );
    },

    documentUses( parent, args, ctx ) {
      return ctx.prisma.documentUses( { ...args } );
    },

    documentUse( parent, args, ctx ) {
      return ctx.prisma.documentUse( { id: args.id } );
    }
  },

  Mutation: {
    async createDocumentFile( parent, args, ctx ) {
      const documentFile = await ctx.prisma.createDocumentFile( { ...args } );

      return documentFile;
    },

    updateDocumentFile( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id }
      } = updates;
      return ctx.prisma.updateDocumentFile( { data, where: { id } } );
    },

    deleteDocumentFile( parent, { id }, ctx ) {
      return ctx.prisma.deleteDocumentFile( { id } );
    },

    deleteManyDocumentFiles( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDocumentFiles( { ...where } );
    },

    async createDocumentUse( parent, args, ctx ) {
      const documentUse = await ctx.prisma.createDocumentUse( {
        ...args
      } );

      return documentUse;
    },

    updateDocumentUse( parent, args, ctx ) {
      const updates = { ...args };
      const {
        data,
        where: { id }
      } = updates;
      return ctx.prisma.updateDocumentUse( {
        data,
        where: { id }
      } );
    },

    updateManyDocumentUses( parent, args, ctx ) {
      const updates = { ...args };
      const { data, where } = updates;
      return ctx.prisma.updateManyDocumentUses( { data, where } );
    },

    deleteDocumentUse( parent, { id }, ctx ) {
      return ctx.prisma.deleteDocumentUse( { id } );
    },

    deleteManyDocumentUses( parent, { where }, ctx ) {
      return ctx.prisma.deleteManyDocumentUses( { ...where } );
    }
  },

  DocumentFile: {
    async signedUrl( parent ) {
      const signed = await getSignedUrlPromiseGet( {
        key: parent.url,
        expires: 3600 // hour
      } );
      return signed.url;
    },

    language( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).language( { ...args } );
    },

    use( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).use( { ...args } );
    },

    image( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).image( { ...args } );
    },

    bureaus( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).bureaus( { ...args } );
    },

    countries( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).countries( { ...args } );
    },

    tags( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).tags( { ...args } );
    },

    categories( parent, args, ctx ) {
      return ctx.prisma.documentFile( { id: parent.id } ).categories( { ...args } );
    }
  }
};
