import { BrandId } from '../domain/valueobjects/BrandId';
import { BrandName } from '../domain/valueobjects/BrandName';
import { Brand } from '../domain/Brand';

export class BrandMap {
  public static toDomain(raw: any): Promise<Brand> {
    return new Promise((resolve, reject) => {
      console.log(raw.id);
      const brand: Brand = Brand.create(new BrandName(raw.name), raw.category, raw.products, new BrandId(raw.id));
      console.log(brand, 'ORIGEN DEL PROBLEMA?');
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
