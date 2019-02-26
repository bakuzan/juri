const Op = require('sequelize').Op;

const { Source } = require('../connectors');
const SourceResolvers = require('./source');

module.exports = {
  Query: {
    async sourcesManagement() {
      const sources = await Source.findAll();
      return {
        sources,
        urlReplacements: [':searchString', ':paging', ':timestamp'],
        availableHelperFunctions: []
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
