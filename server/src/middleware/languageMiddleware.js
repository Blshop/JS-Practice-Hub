export const languageMiddleware = (req, res, next) => {
  let lang = req.headers['x-language'];
  if (!lang && req.headers['accept-language']) {
    lang = req.headers['accept-language'].split(',')[0].split('-')[0];
  }
  req.lang = lang && (lang === 'ru' || lang === 'en') ? lang : 'en';
  next();
};
