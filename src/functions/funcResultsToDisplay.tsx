/**
 * Checks to see if there is result variable is set to choose the
 * correct variable. For example if displayResultVariable is set
 * to "currency", and the currency selected is "EUR", then
 * the "EUR" array from displayResults is returned.
 * @param quotesData
 * @param quote_ref_id
 * @param displayResults A table of results.
 * @returns The correct array of results if there is a
 * displayResultVariable set in the table.
 */
const funcResultsToDisplay = (
  quotesData: {
    [x: string]:
      | { [key: string]: { [key: string]: string | number } }
      | { [x: string]: { [x: string]: string | number } };
  },
  quote_ref_id: string,
  displayResults: any,
) => {
  return displayResults.displayResultVariable ?
    displayResults[quotesData[quote_ref_id]['global'][`${displayResults.displayResultVariable}`]] : displayResults;
}

export default funcResultsToDisplay;
