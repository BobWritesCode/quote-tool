function funcGetProductCode(range: string, product: string, currency: string | number) {

  const productCode = `${product}${currency}`
  // console.log('productCode', productCode);
  return productCode;
}

export default funcGetProductCode;
