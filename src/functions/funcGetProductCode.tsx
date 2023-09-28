type TCustomer = {
  customer_id: string;
  age?: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: number;
  residence_country?: string;
};

function funcGetProductCode(
  customerDetails: TCustomer,
  quoteLine: any,
  quoteData: any,
): string | string[] {

  // console.log('customerDetails', customerDetails);
  // console.log('quoteLine', quoteLine);
  // console.log('quoteData', quoteData);

  let country: string = customerDetails['residence_country'] || '';
  let product: string = quoteLine['quoteProduct'] || '';
  let currency: string = quoteData['currency'] || '';
  let age: string = customerDetails['age'] || '';
  let opCoInsurance: string = quoteLine['quoteOPCoInsurance']  || '';
  let deductible: string = quoteLine['quoteIPDeductible'] || '';
  let assistance: string = quoteLine['quoteAssistance'] || '';
  let prodCode: string = '';
  let prodCode2: string = '';

  switch (quoteData['range']) {
    case 'GHP v1':
      prodCode = `${country} ${currency} ${product} ${age} ${opCoInsurance}`;
      return [prodCode];
    case 'GHP v2':
      return [''];
    case 'WHO':
      return [''];
    case 'LL':
      prodCode = `${country}${product}${deductible}${currency}`;
      prodCode2 = `${age}${assistance}`;
      return [prodCode, prodCode2];
    case 'LLAssistance':
      return [''];
    default:
      return [''];
  }
}
export default funcGetProductCode;
