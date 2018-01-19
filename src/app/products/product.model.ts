export interface ProductInterface {
  id: string;
  name: string;
  price: number;
}

export class Product {
  id: string;
  name  = '';
  price = 0;
  constructor(values: Partial<ProductInterface> = {}) {
    Object.assign(this, values);
  }
}

