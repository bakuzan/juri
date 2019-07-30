module.exports = async function sourcesManagementInformation() {
  return [
    {
      key: 'optionsParser',
      functionSignature: 'function optionsParser(replacements, helpers)',
      returnObject: `
      type FetchOptions {
        url: String
        options: RequestInit
      }
      `,
      availableHelperFunctions: []
    },
    {
      key: 'responseParser',
      functionSignature: 'async function responseParser(response, helpers)',
      returnObject: `Array<ResponseItem>`,
      availableHelperFunctions: [
        'processNestedJson',
        'handleBadJsonTextResponse',
        'processHtml'
      ]
    },
    {
      key: 'itemParser',
      functionSignature: 'function itemParser(dataItem, helpers)',
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
      availableHelperFunctions: ['generateUniqueId', 'joinTextContent']
    }
  ];
};
