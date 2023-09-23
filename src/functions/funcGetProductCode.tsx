type Customer = {
  customer_id: string;
  first_name?: string;
  initials?: string;
  last_name?: string;
  date_of_birth?: number;
  residence_country?: string;
};

function funcGetProductCode(customerDetails: Customer, QuoteLine:any, productRange:any) {

  // console.log(customerDetails);
  // console.log(QuoteLine);
  // console.log(productRange);

  return "test";
}

export default funcGetProductCode;
