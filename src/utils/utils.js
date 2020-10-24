export const getTimePassed = (date) => {
  const diff = Date.now() - date.getTime();
  return diff;
};

// limit in hours!
/** Возвращает true если время превышено. limitHours указано в часах */
export const isTimeExceeded = (date, limitHours) => {
  const interval = Date.now() - date.getTime();
  const limitTransform = limitHours * (1000 * 60 * 60);
  if ( interval > limitTransform ) return;
};

/** Форматирование времени */
export const formatTime = (time) => {
  const formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formatter.format(time);
}