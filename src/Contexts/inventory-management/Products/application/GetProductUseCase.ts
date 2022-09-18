import { delay, inject, injectable } from 'tsyringe';
import { ProductId } from '../domain/valueobjects/ProductId';
import { Product } from '../domain/Product';
import { ProductFinder } from '../domain/ProductFinder';

@injectable()
export class GetProductUseCase {
  constructor(
    @inject(delay(() => ProductFinder))
    public productFinder: ProductFinder
  ) {
    this.productFinder = productFinder;
  }

  execute(id: string): Promise<Product> {
    return new Promise((resolve, reject) => {
      const productId: ProductId = new ProductId(id);
      resolve(this.productFinder.execute(productId));
    });
  }
}
