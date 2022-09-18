import { ProductId } from '../domain/valueobjects/ProductId';
import { ProductName } from '../domain/valueobjects/ProductName';
import { Product } from '../domain/Product';

export class ProductMap {
  public static toDomain(raw: any): Promise<Product> {
    return new Promise((resolve, reject) => {
      const product: Product = Product.create(
        new ProductName(raw.name),
        raw.category,
        raw.price,
        raw.brandId,
        new ProductId(raw.id)
      );
      resolve(product);
    });
  }

  public static toPersistence(product: Product): any {
    return {
      productId: product.id.value,
      productName: product.name.value,
      productCategory: product.category,
    };
  }
}
