export interface ISearchZenLink {
    name: string;
    template: string;
    desc?: string;
    icon?: string
  }

export const defaultLinksConfig: ISearchZenLink[] = [
    {
      name: 'Google',
      template: 'https://www.google.com/search?q={%s}'
    },
    {
      name: '头条搜索',
      template: 'https://so.toutiao.com/search?keyword={%s}'
    },
    {
      name: '百度',
      template: 'https://www.baidu.com/s?ie=utf-8&wd={%s}'
    },
    {
      name: 'Bing 必应',
      template: 'https://www.bing.com/search?q={%s}',
    },
    {
      name: 'Magi 搜索',
      template: 'https://magi.com/search?q={%s}',
      icon: 'https://magi.com/assets/icons/favicon.ico',
    },
    {
      name: '知乎',
      template: 'https://www.zhihu.com/search?type=content&q={%s}',
      icon: 'https://static.zhihu.com/static/favicon.ico'
    },
    {
      name: 'DeepL 中译英',
      template: 'https://www.deepl.com/zh/translator#zh/en/{%s}',
      icon: 'https://www.deepl.com/img/favicon/favicon_32.png'
    },
    {
      name: 'DeepL 英译中',
      template: 'https://www.deepl.com/zh/translator#en/zh/{%s}',
    },
  ];
  