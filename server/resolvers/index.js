const { Source } = require('../connectors');
const sourcesManagementInformation = require('./sourcesManagementInformation');

module.exports = {
  Query: {
    sourcesManagementInformation,
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
    },
    async rManga(_, args, context) {
      return await context.Reddit.getPosts('manga', args);
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
    },
    async sourceRemove(_, { id }) {
      await Source.destroy({ where: { id } });
      return {
        success: true,
        errorMessages: [],
        data: null
      };
    }
  }
};
