module.exports = async function sourcesManagementInformation() {
  return [
    {
      key: 'optionsParser',
      functionSignature: 'function optionsParser(replacements, helpers)',
      returnObject: `type FetchOptions {
        url: String
        options?: RequestInit
      }
      `,
      availableHelperFunctions: ['FormData', 'JSON']
    },
    {
      key: 'responseParser',
      functionSignature: 'async function responseParser(response, helpers)',
      returnObject: `Array<ResponseItem>`,
      availableHelperFunctions: [
        'sourceName: string',
        'debugging: JuriDebugging',
        'processNestedJson: (data: any, attrString: string) => any;',
        'handleBadJsonTextResponse: (data: any) => any[];',
        'processHtml: (selector: string, html: HTMLElement) => HTMLElement[];'
      ]
    },
    {
      key: 'itemParser',
      functionSignature: `function itemParser(
          dataItem, 
          helpers, 
          index, 
          allDataItems)`,
      returnObject: `type ContentItem {
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
        episodes: Int
        postedDate: String
      }
      `,
      availableHelperFunctions: [
        'generateUniqueId: () => string;',
        'joinTextContent: (nodes: HTMLElement[]) => string;',
        'proxyUrl: string'
      ]
    }
  ];
};
