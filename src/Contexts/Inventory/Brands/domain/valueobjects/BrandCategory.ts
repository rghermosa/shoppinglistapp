export enum BrandCategory {
  ALIMENTATION = 'ALIMENTATION',
  DRINKS = 'DRINKS',
}

export namespace BrandCategory {
  export function toString(brandCategory: BrandCategory): string {
    return BrandCategory[brandCategory];
  }

  export function parse(brandCategory: string): BrandCategory {
    return brandCategory as BrandCategory;
  }
}
