import { BrandId } from '../../Shared/domain/valueobjects/BrandId';
import { ProductId } from '../../Shared/domain/valueobjects/ProductId';
import { ProductName } from '../../Shared/domain/valueobjects/ProductName';
import { ProductCategory } from './valueobjects/ProductCategory';
import { ProductPrice } from './valueobjects/ProductPrice';

export interface ProductRepository {
  create(
    productId: ProductId,
    productName: ProductName,
    productCategory: ProductCategory,
    productPrice: ProductPrice,
    brandId: BrandId
  ): Promise<void>;
}
