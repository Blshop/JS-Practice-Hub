import { verifyAccessToken } from '../services/tokenService.js';
import { t } from '../utils/localization.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: t('auth.no_token_provided', req.lang) });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: t('auth.invalid_token', req.lang) });
  }
};
