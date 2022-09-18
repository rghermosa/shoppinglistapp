import { BrandId } from '../../Brands/domain/valueobjects/BrandId';
import { ProductId } from './valueobjects/ProductId';
import { ProductName } from '../domain/valueobjects/ProductName';
import { Product } from './Product';
import { ProductCategory } from './valueobjects/ProductCategory';
import { ProductPrice } from './valueobjects/ProductPrice';

export interface ProductRepository {
  create(product: Product): Promise<void>;
  find(productId: ProductId): Promise<Product>;
  exists(productId: ProductId): Promise<boolean>;
}
