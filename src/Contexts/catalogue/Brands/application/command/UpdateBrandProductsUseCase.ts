import { delay, inject, injectable, injectAll } from 'tsyringe';
import { Product } from '../../../Products/domain/Product';
import { ProductFinder } from '../../../Products/domain/ProductFinder';
import { BrandFinder } from '../../domain/BrandFinder';
import { BrandRepository } from '../../domain/BrandRepository';

@injectable()
export class UpdateBrandProductsUseCase {
  constructor(
    @injectAll('BrandRepository')
    private brandRepository: BrandRepository[],
    @inject(delay(() => BrandFinder))
    private brandFinder: BrandFinder,
    @inject(delay(() => ProductFinder))
    private productFinder: ProductFinder
  ) {
    this.brandRepository = brandRepository;
    this.brandFinder = brandFinder;
    this.productFinder = productFinder;
  }

  async execute(product: Product) {
    const productFound: Product = await this.productFinder.execute(product.id);

    const brand = await this.brandFinder.execute(product.brand);
    brand.products.push(product.id);

    await this.brandRepository.forEach((brandRepository: BrandRepository) => {
      brandRepository.save(brand);
    });
  }
}
