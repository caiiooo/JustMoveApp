export const daysBetween = function (date1, date2) {
  //Get 1 day in milliseconds
  var one_day = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  //take out milliseconds
  difference_ms = difference_ms / 1000;
  var seconds = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  var minutes = Math.floor(difference_ms % 60);
  difference_ms = difference_ms / 60;
  var hours = Math.floor(difference_ms % 24);
  var days = Math.floor(difference_ms / 24);

  //return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds';
  if (days >= 730) return 'Há ' + Math.floor(days / 365) + ' anos';

  if (days >= 365) return 'Há ' + Math.floor(days / 365) + ' ano';

  if (days >= 60) return 'Há ' + Math.floor(days / 30) + ' meses';

  if (days >= 30) return 'Há ' + Math.floor(days / 30) + ' mês';

  if (days > 1) return 'Há ' + days + ' dias';

  if (days == 1) return 'Há ' + days + ' dia';

  if (hours > 1) return 'Há ' + hours + ' horas';

  if (hours == 1) return 'Há ' + hours + ' hora';

  if (minutes > 1) return 'Há ' + minutes + ' minutos';

  if (minutes == 1) return 'Há ' + minutes + ' minuto';

  return 'Agora mesmo';
};
