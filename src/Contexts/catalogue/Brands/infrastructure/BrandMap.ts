import { Brand } from '../domain/Brand';
import { BrandId } from '../domain/valueobjects/BrandId';
import { BrandName } from '../domain/valueobjects/BrandName';

export class BrandMap {
  public static toDomain(raw: any): Promise<Brand> {
    return new Promise((resolve, reject) => {
      const brand: Brand = Brand.create(new BrandName(raw.name), raw.category, raw.products, new BrandId(raw.id));
      resolve(brand);
    });
  }

  public static toPersistence(brand: Brand): any {
    return {
      brandId: brand.id.value,
      brandName: brand.name.value,
      brandCategory: brand.category,
      products: brand.products,
    };
  }
}
