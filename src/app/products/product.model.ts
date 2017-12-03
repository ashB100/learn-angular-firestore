interface ProductInterface {
  id: string;
  name: string;
  price: number;
}

export class Product {
  id: string = "";
  name: string = "";
  price: number = 0;
  
  constructor(values: Partial<ProductInterface> = {}) {
    console.log('new Product()', values);
    Object.assign(this, values);
  }
}
