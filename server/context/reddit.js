const snoowrap = require('snoowrap');

function getRedditInstance() {
  return new snoowrap({
    userAgent: process.env.REDDIT_USER_AGENT,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    refreshToken: process.env.REDDIT_REFRESH_TOKEN
  });
}

module.exports = {
  async getPosts(subreddit, { search, sort, time }) {
    const r = getRedditInstance();

    const results = await r.getSubreddit(subreddit).search({
      query: search || '[DISC]',
      sort: sort.toLowerCase(),
      time: time ? time.toLowerCase() : undefined
    });

    return results.map((p) => ({
      authour: p.author_fullname,
      bodyHTML: p.selftext_html,
      createdAt: p.created_utc,
      id: p.id,
      image: {
        src: p.thumbnail,
        height: p.thumbnail_height,
        width: p.thumbnail_width
      },
      nsfw: p.over_18,
      permalink: p.permalink,
      title: p.title,
      url: p.url
    }));
  }
};
