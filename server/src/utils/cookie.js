/**
 * Возвращает настройки для httpOnly cookie в зависимости от окружения
 * @param {number} maxAge - время жизни cookie в миллисекундах (по умолчанию 7 дней)
 * @returns {Object} - объект с параметрами для res.cookie / res.clearCookie
 */
export const getCookieOptions = (maxAge = 7 * 24 * 60 * 60 * 1000) => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge,
  };
};
