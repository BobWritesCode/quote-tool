type Customer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: number;
  residence_country?: string;
};

function funcGetProductCode(
  customerDetails: Customer,
  QuoteLine: any,
  quoteData: any,
): string {
  console.log('customerDetails', customerDetails);
  console.log('QuoteLine', QuoteLine);
  console.log('quoteData', quoteData);

  switch (quoteData['range']) {
    case 'GHP v1':
      return '';
    case 'GHP v2':
      return '';
    case 'WHO':
      return '';
    case 'LL':
      const country:string = customerDetails["residence_country"] || "";
      const product:string = QuoteLine["quoteProduct"] || "";
      const deductible:string = QuoteLine["quoteIPDeductible"] || "";
      const currency:string = quoteData["currency"] || "";
      const prodCode = `${country}${product}${deductible}${currency}`;
      console.log(prodCode);
      return prodCode;
    default:
      return '';
  }
}
export default funcGetProductCode;
