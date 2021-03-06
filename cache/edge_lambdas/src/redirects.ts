const contentRedirects: Record<string, string> = {
  '/event-series/Wo1YeCoAACoAZFoN': '/events/Wqkd1yUAAB8sW4By',
  '/explore': '/stories',
  '/eventspaces': '/venue-hire',
  '/info/opening-times': '/opening-times',
  '/info/opening-hours': '/opening-times',
  '/visit': '/visit-us',
  '/visit-us.aspx': '/visit-us',
  '/whats-on/exhibitions/all-exhibitions': '/exhibitions',
  '/exhibitionsandevents': '/whats-on',
  '/packed-lunch': '/event-series/WifrbikAAGSyDtHk',
  '/ayurvedic-man': '/exhibitions/WduTricAAN7Mt8yY',
  '/whats-on/exhibitions/brains': '/exhibitions/W31EzykAACkAPuXG',
  '/brains': '/exhibitions/W31EzykAACkAPuXG',
  '/exhibitions/institute-sexology': '/exhibitions/W31ooSkAACIAP4So',
  '/thisisavoice': '/exhibitions/W31tHikAACgAP5gi',
  '/exhibitions/museum-modern-nature': '/exhibitions/W31waSkAACcAP6aX',
  '/electricity': '/exhibitions/W31vkCkAACkAP6LL',
  '/MakingNature': '/exhibitions/W31uwCkAACcAP58u',
  '/bedlam': '/exhibitions/W31tsSkAACkAP5p8',
  '/exhibitions/states-mind-tracing-edges-consciousness':
    '/exhibitions/W31sUykAACkAP5Um',
  '/secrettemple': '/exhibitions/W3Ls-SkAACgAEWMx',
  '/exhibitions/states-mind-ann-veronica-janssens':
    '/exhibitions/W31rWykAACIAP5DX',
  '/alice-anderson': '/exhibitions/W31qcCkAACIAP4zJ',
  '/forensics': '/exhibitions/W31pfCkAACkAP4iL',
  '/exhibitions/idiosyncratic-z-human-condition':
    '/exhibitions/W31n7ykAACcAP4F2',
  '/foreignbodies': '/exhibitions/W31I-ykAACkAPvh1',
  '/exhibitions/thinking-body-mind-and-movement-work-wayne-mcgregor-random-dance':
    '/exhibitions/W31ITCkAACcAPvVo',
  '/exhibitions/souzou': '/exhibitions/W31G5CkAACgAPu8q',
  '/exhibitions/death-self-portrait': '/exhibitions/W31GISkAACIAPuvB',
  '/whats-on/exhibitions/superhuman': '/exhibitions/W31FpSkAACkAPumK',
  '/exhibitions/brains-mind-matter': '/exhibitions/W31EzykAACkAPuXG',
  '/infinitas-gracias': '/exhibitions/W31D3CkAACIAPuGN',
  '/whats-on/exhibitions/infinitas-gracias': '/exhibitions/W31D3CkAACIAPuGN',
  '/dirt': '/exhibitions/W31CnikAACIAPtwS',
  '/exhibitions/dirt-filthy-reality-everyday-life':
    '/exhibitions/W31CnikAACIAPtwS',
  '/high-society': '/exhibitions/W31CFCkAACcAPtpJ',
  '/exhibitions/high-society': '/exhibitions/W31CFCkAACcAPtpJ',
  '/exhibitions/skin': '/exhibitions/W31AaCkAACIAPtUm',
  '/exhibitions/identity': '/exhibitions/W30_nikAACkAPtLL',
  '/exquisite-bodies': '/exhibitions/W30-zikAACcAPs8v',
  '/exhibitions/exquisite-bodies': '/exhibitions/W30-zikAACcAPs8v',
  '/exhibitions/madness-modernity': '/exhibitions/W308LykAACgAPsON',
  '/exhibitions/war-and-medicine': '/exhibitions/W302KCkAACcAPqi5',
  '/exhibitions/skeletons-london%E2%80%99s-buried-bones':
    '/exhibitions/W301BSkAACgAPqOR',
  '/exhibitions/atoms-patterns': '/exhibitions/W300HykAACgAPp9y',
  '/exhibitions/life-death': '/exhibitions/W30waSkAACcAPo_q',
  '/exhibitions/sleeping-dreaming': '/exhibitions/W30vSSkAACIAPowf',
  '/exhibitions/heart': '/exhibitions/W30t8ykAACcAPoc1',
  '/sexology': '/exhibitions/W31ooSkAACIAP4So',
  '/exhibitions/medicine-now': '/exhibitions/WeobUyQAAKdwjbEO',
  '/somewhere-in-between': '/exhibitions/WhvoAykAACgAlDoo',
  '/exhibitions/bobby-bakers-diary-drawings': '/exhibitions/W309HSkAACcAPsep',
  '/visit-us/accessibility': '/access',
  '/what-we-do/proposing-online-article': '/pages/Wvl00yAAAB8A3y8p',
  '/press/???forensics-anatomy-crime???-opens-wellcome-collection':
    '/pages/Wv7RnyAAAPtL9tHr',
  '/articles/obsessed-with-buffy-much': '/articles/WsT4Ex8AAHruGfWh',
  '/articles/wonder-womans-wonder-women': '/articles/WsT4Ex8AAHruGfWp',
  '/articles/a-drop-in-the-ocean-beth-hopkins': '/articles/WsT4Ex8AAHruGfWV',
  '/series/the-outsiders': '/series/WtCORCEAANQ76Sh9',
  '/articles/outsiders-the-prostitute': '/articles/WsT4Ex8AAHruGfWl',
  '/articles/outsiders-the-tradesman': '/articles/WsT4Ex8AAHruGfXj',
  '/articles/outsiders-the-cook': '/articles/WsT4Ex8AAHruGfW_',
  '/articles/outsiders-the-stranger': '/articles/WsT4Ex8AAHruGfXH',
  '/articles/outsiders-the-colonist': '/articles/WsT4Ex8AAHruGfWj',
  '/articles/outsiders-the-child': '/articles/WsT4Ex8AAHruGfXd',
  '/series/electric-sublime': '/series/WSQ9rygAAA9xtwgS',
  '/articles/thunderbolts-and-lightning': '/articles/WsT4Ex8AAHruGfXD',
  '/articles/the-current-that-kills': '/articles/WsT4Ex8AAHruGfWt',
  '/articles/titans-in-the-landscape': '/articles/WsT4Ex8AAHruGfXZ',
  '/articles/dazzling-luxury': '/articles/WsT4Ex8AAHruGfXB',
  '/articles/charged-bodies': '/articles/WsT4Ex8AAHruGfXR',
  '/articles/eels-and-feels': '/articles/WsT4Ex8AAHruGfXF',
  '/series/body-squabbles': '/series/WleP3iQAACUAYEoN',
  '/articles/body-squabbles-foot': '/articles/WWjT9SoAAL65Q6Ls',
  '/articles/body-squabbles-thirst': '/articles/WWjXACoAAItZQ7Bt',
  '/articles/body-squabbles-keyholes': '/articles/WWjXLioAAL65Q7FA',
  '/articles/body-squabbles-teeth': '/articles/WWjYdSoAAIpZQ7bl',
  '/articles/body-squabbles-crisps': '/articles/WWjY2CoAAIpZQ7ie',
  '/articles/body-squabbles-pundit': '/articles/WWjZYioAAIpZQ7sB',
  '/articles/body-squabbles-medal': '/articles/WWjZjioAAItZQ7vE',
  '/articles/body-squabbles-pots': '/articles/WWjZtyoAAItZQ7yE',
  '/articles/body-squabbles-parasites': '/articles/WWjaDioAAIpZQ74R',
  '/articles/body-squabbles-plague': '/articles/WWjabioAAAF0Q7',
  '/articles/body-squabbles-size': '/articles/WWjanioAAItZQ8CT',
  '/articles/body-squabbles-button': '/articles/WXH-ZCoAAC8ca_lj',
  '/webcomic-series/WleP3iQAACUAYEoN': '/series/WleP3iQAACUAYEoN',
  '/voices-within': '/books/WwVK3CAAAHm5Exxl',
  '/graphic-warnings': '/books/WwVK3CAAAHm5ExxT',
  '/visit-us/wellcome-kitchen': '/pages/Wuw19yIAAK1Z3Snk',
  '/visit-us/wellcome-caf??': '/pages/Wvl1wiAAADMJ3zNe',
  '/visit-us/events-tickets': '/pages/Wuw19yIAAK1Z3Sng',
  '/readingroom': '/pages/Wvlk4yAAAB8A3ufp',
  '/visit-us/photography': '/pages/Wuw19yIAAK1Z3Smw',
  '/articles/the-ladies-of-llangollen': '/articles/WqewRSUAAB8sVaKN',
  '/articles/drugs-in-victorian-britain': '/articles/W87wthIAACQizfap',
  '/articles/why-the-world-needs-collectors': '/articles/Wqf3GyUAAPjnVtnC',
  '/articles/photographs-as-evidence': '/articles/WqfysCUAAKsrVsYn',
  '/articles/mummies-revealed': '/articles/WqfrzCUAAPjnVqeT',
  '/articles/the-transvengers-webcomic': '/articles/W03jACYAACUAg5IR',
  '/articles/lustmord': '/articles/WqfvayUAAKsrVreh',
  '/articles/aids-posters-0': '/articles/W9hlyRAAANom8AzA',
  '/articles/aids-posters': '/articles/W9hlyRAAANom8AzA',
  '/articles/drugs-and-brain-quick-guide-brain-chemistry':
    '/articles/W9hIBBAAAHAb74ma',
  '/articles/condoms-beneath-the-sheath': '/articles/W88vXBIAAOEyzwO_',
  '/articles/science-art': '/articles/W9b0kRIAABdu8KBo',
  '/articles/hysteria': '/articles/W89GZBIAAN4yz1hQ',
  '/articles/sleep-paralysis-a-brief-history-of-fear-treatment-and-artistic-creativity':
    '/articles/W9beDBIAAHu08EVG',
  '/series/a-drop-in-the-ocean': '/series/Ww6kkCEAAEU5j4zy',
  '/articles/six-personal-health-zines-that-might-change-your-life':
    '/articles/WsT4Ex8AAHruGfWz',
  '/articles/the-humours-in-shakespeare': '/articles/W-MM-xUAAAinxgs3',
  '/articles/graphic-sex': '/articles/W-Q1sxEAAB5ffIw4',
  '/articles/a-brief-history-of-tattoos': '/articles/W9m2QxcAAF8AFvE5',
  '/articles/object-of-the-month-shrunken-heads-real-and-fake/':
    '/articles/W9sabBUAAC0Aoz5g',
  '/articles/digital-pets': '/articles/WsT4Ex8AAHruGfWb',
  '/articles/hamlet-the-melancholic-prince-of-denmark':
    '/articles/WsT4Ex8AAHruGfWf',
  '/articles/cholerics-the-real-drama-queens': '/articles/WsT4Ex8AAHruGfWn',
  '/articles/a-drop-in-the-ocean-daniel-regan': '/articles/WsT4Ex8AAHruGfXJ',
  '/articles/paris-morgue': '/articles/W-RTBBEAAO5mfQ3M',
  '/articles/sockets-and-stumps': '/articles/W-VjexEAAJKKgbWt',
  '/articles/ethical-taxidermy': '/articles/WsT4Ex8AAHruGfWx',
  '/what-we-do/wellcome-trust': '/what-we-do',
  '/articles/nymphomania': '/articles/W_v8XxQAACgA_WKS',
  '/articles/museums-in-context-the-birth-of-the-public-museum':
    '/articles/W_0kHhEAADUAbHiJ',
  '/articles/the-power-of-unicorns': '/articles/W_1gyREAADIAbXjT',
  '/youth': '/pages/Wuw2MSIAACtd3Ssg',
  '/young-people': '/pages/Wuw2MSIAACtd3Ssg',
  '/openplatform': '/pages/WvljzSAAAB4E3uMF',
  '/the-hub': '/pages/Wuw2MSIAACtd3SsU',
  '/rawminds': '/schools',
  '/medieval-bodies': '/books/Ww0QpiUAAFQXohEZ',
  '/touring': '/pages/Wuw2MSIAACtd3Sty',
  '/installations/W7T-FxAAADRy0mu0': '/exhibitions/XFximBAAAPkAioWx',
  '/installations/WryoVx8AAAjk9Xmg': '/exhibitions/XFximBAAAPkAioW9',
  '/installations/WthzICAAAOObLY5K': '/exhibitions/XFximBAAAPkAioWt',
  '/installations/W-K8VhUAAKOcxKsl': '/exhibitions/XFximBAAAPkAioW3',
  '/installations/W5Y-NyYAACMALAdp': '/exhibitions/XFximBAAAPkAioWl',
  '/installations/WyuWLioAACkACeYv': '/exhibitions/XFximBAAAPkAioW7',
  '/installations/W9sIhRUAANoQovHe': '/exhibitions/XFximBAAAPkAioWz',
  '/installations/W3LDcCkAACcAEKqy': '/exhibitions/XFximBAAAPkAioWp',
  '/installations/Wryoox8AAAjk9Xr0': '/exhibitions/XFximBAAAPkAioWr',
  '/installations/W9xNPBUAAO5nqHyO': '/exhibitions/XFximBAAAPkAioWv',
  '/installations/W78dJBEAAB8NpQle': '/exhibitions/XFximBAAAPkAioWj',
  '/installations/W-LESBUAAJ-dxM5y': '/exhibitions/XFximBAAAPkAioW5',
  '/installations/W-K6iBUAAJqYxKMi': '/exhibitions/XFximBAAAPkAioW_',
  '/installations/WqwC1iAAAB8AJgFB': '/exhibitions/XFximBAAAPkAioWn',
  '/installations/Wrynhx8AAAjk9XX-': '/exhibitions/XFximBAAAPkAioW1',
  '/articles/xksu0xiaadlrl4-h': '/articles/XKsU0xIAADlrL4-h',
  '/series/X8D9qxIAACIAcKSf': '/series/X76JKBMAACIAqtZ2',
  '/articles/X61xYhMAACAAX_z1': '/articles/X8dTWhIAACQAjJ5S',
  '/articles/X6P6_xMAACEANfQB': '/articles/X8dRxhIAACQAjJdL',
  '/articles/X5rs7RIAAB4Avr_r': '/articles/X8ZZChIAACUAiFbC',
  '/articles/X7bJORMAACEAiRPo': '/articles/X8dU2BIAACMAjKT-',
  '/articles/X8Ay3hIAACMAbSL2': '/articles/X8dV8xIAACIAjKn6',
  '/articles/X_dsXREAACMASftU': '/articles/X_g6ohEAACQATYJF',
};

/**
 * These are URLs that we expect to be served from a human-readable path
 * Redirecting the prismic path ensures we aren't serving the same content
 * from two paths, losing Google juice
 **/
const vanityUrls: Record<string, string> = {
  '/pages/WwQHTSAAANBfDYXU': '/opening-times',
  '/pages/WwLGFCAAAPMiB_Ps': '/what-we-do',
  '/pages/WuxrKCIAAP9h3hmw': '/press',
  '/pages/Wuw2MSIAACtd3SsC': '/venue-hire',
  '/pages/Wvm2uiAAAIYQ4FHP': '/access',
  '/pages/Wuw2MSIAACtd3Ste': '/youth',
  '/pages/Wuw2MSIAACtd3StS': '/schools',
  '/pages/X5amzBIAAB0Aq6Gm': '/covid-welcome-back',
  '/pages/X5aomxIAAB8Aq6n5': '/covid-book-your-ticket',
  '/pages/X8ZTSBIAACQAiDzY??': '/visit-us',
  '/pages/Wuw2MSIAACtd3Stq': '/about-us',
  '/pages/YDaZmxMAACIAT9u8': '/get-involved',
  '/pages/YH17kRAAACoAyWTB': '/user-panel',
};

export const literalRedirects = { ...contentRedirects, ...vanityUrls };

// Query redirects have the form:
// {
//   [original path to match]: {
//     matchParams: [URLSearchParams to match]
//     forwardParams: [param keys to forward if present]
//     redirectPath: [path to redirect to]
//   }
// }
type QueryRedirect = {
  matchParams: URLSearchParams;
  forwardParams: Set<string>;
  redirectPath: string;
};
export const queryRedirects: Record<string, QueryRedirect> = {
  '/works': {
    matchParams: new URLSearchParams({
      search: 'images',
    }),
    forwardParams: new Set([
      'query',
      'images.color',
      'locations.license',
      'source.genres.label',
      'source.contributors.agent.label',
      'page',
    ]),
    redirectPath: '/images',
  },
};
