/**
 * Returns age different between two dates.
 * @param quotesData
 * @param date1 For example: Date of birth
 * @param date2 For example: Today's date
 * @returns
 */
const funcGetAge = (date1: Date, date2: Date): number => {
  const date1Year = date1.getFullYear();
  const date1Month = date1.getMonth();
  const date1Day = date1.getDate();

  const date2Year = date2.getFullYear();
  const date2Month = date2.getMonth();
  const date2Day = date2.getDate();

  let age = date2Year - date1Year;

  // Check if the birthday has already occurred this year
  if (
    date2Month < date1Month ||
    (date2Month === date1Month && date2Day < date1Day)
  ) {
    age--;
  }

  return age;
};

export default funcGetAge;
