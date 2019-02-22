const Op = require('sequelize').Op;

const { Source } = require('../connectors');

module.exports = {
  Query: {
    async sourcesAll() {
      return await Source.findAll();
    },
    async sources(_, { sourceType, mediaType, isAdult }) {
      return await Source.findAll({
        where: {
          sourceType: { [Op.eq]: sourceType },
          mediaType: { [Op.eq]: mediaType },
          isAdult: { [Op.eq]: isAdult }
        }
      });
    },
    // Content Queries
    async latest(_, { sourceId, page }, context) {
      const siteData = await Source.findByPk(sourceId, { raw: true });
      return await context.fetchContentFromSource(siteDate, { page });
    },
    async search(_, { sourceId, search }, context) {
      const siteData = await Source.findByPk(sourceId, { raw: true });
      return await context.fetchContentFromSource(siteDate, { search });
    }
  },
  Mutation: {}
};
