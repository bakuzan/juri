const { Source } = require('../connectors');
const SourceResolvers = require('./source');

module.exports = {
  Query: {
    async sourcesManagementInformation() {
      return {
        returnObject: `
        type ContentItem {
          id: String
          href: String
          title: String
          image: String
    
          subtitle: String
          authour: String
          versions: String
    
          type: String
          status: String
          startDate: String
          endDate: String
          currentEpisode: Int
          postedDate: String
        }
        `,
        urlReplacements: [':searchString', ':paging', ':timestamp'],
        availableHelperFunctions: ['generateUniqueId', 'joinTextContent']
      };
    },
    async sources(_, args = {}) {
      return await Source.findAll({
        where: {
          ...args
        }
      });
    },
    async sourceById(_, { id }) {
      return await Source.findByPk(id);
    },
    // Content Queries
    async latest(_, { sourceId, page }, context) {
      const siteData = await Source.findByPk(sourceId, { raw: true });
      return await context.fetchContentFromSource(siteData, { page });
    },
    async search(_, { sourceId, searchString }, context) {
      const siteData = await Source.findByPk(sourceId, { raw: true });
      return await context.fetchContentFromSource(siteData, { searchString });
    }
  },
  Mutation: {
    async sourceCreate(_, { payload }) {
      const created = await Source.create(payload);

      return {
        success: true,
        errorMessages: [],
        data: created
      };
    },
    async sourceUpdate(_, { payload }) {
      const { id, ...data } = payload;

      await Source.update(data, { where: { id } });
      const updated = await Source.findByPk(id);

      return {
        success: true,
        errorMessages: [],
        data: updated
      };
    }
  },
  Source: SourceResolvers
};
