import funcResultsToDisplay from './funcResultsToDisplay';

/**
 *
 * @param quotesData - Global quotes data table
 * @param quote_ref_id - Quote ref that is being updated
 * @param cust_id - Customer ID to update or "global"
 * @param arr - Array to run through
 * @param range - Product range.
 * @param product (optional) - Product choose.
 * @returns
 */
function funcSetDefaultQuoteValues(
  quotesData: {
    [key: string]: { [key: string]: { [key: string]: string | number | string[] } };
  },
  quote_ref_id: string,
  cust_id: string,
  arr: { [x: string]: any },
  range: string,
  product?: string,
) {

  // Clear product options of target customer.
  quotesData[quote_ref_id][cust_id] = {};
  if (product) {
    quotesData[quote_ref_id][cust_id]['quoteProduct'] = product;
  }

  // Loop through all product options to set a default value.
  Object.values<any>(arr).forEach((value, index) => {
    const key = Object.keys(arr)[index];

    let results: any = {};
    if (product) {
      results = funcResultsToDisplay(
        quotesData,
        quote_ref_id,
        value[product].displayResults,
      );
    } else {
      results = value.displayResults;
    }

    quotesData[quote_ref_id][cust_id][key] = results[0];
  });
  return quotesData;
}

export default funcSetDefaultQuoteValues;
