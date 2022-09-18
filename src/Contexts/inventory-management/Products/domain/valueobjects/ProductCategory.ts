export enum ProductCategory {
  ALCOHOL = 'ALCOHOL',
}

export namespace ProductCategory {
  export function toString(productCategory: ProductCategory): string {
    return ProductCategory[productCategory];
  }

  export function parse(productCategory: string): ProductCategory {
    return productCategory as ProductCategory;
  }
}
