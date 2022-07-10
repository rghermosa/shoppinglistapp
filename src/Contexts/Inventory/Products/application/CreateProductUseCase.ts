import { delay, inject, injectable } from 'tsyringe';
import { Brand } from '../../Brands/domain/Brand';
import { BrandRepository } from '../../Brands/domain/BrandRepository';
import { BrandFinder } from '../../Shared/domain/finder/BrandFinder';
import { BrandId } from '../../Shared/domain/valueobjects/BrandId';
import { ProductId } from '../../Shared/domain/valueobjects/ProductId';
import { ProductName } from '../../Shared/domain/valueobjects/ProductName';
import { ProductRepository } from '../domain/ProductRepository';
import { ProductCategory } from '../domain/valueobjects/ProductCategory';
import { ProductPrice } from '../domain/valueobjects/ProductPrice';

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository,
    @inject(delay(() => BrandFinder))
    private brandFinder: BrandFinder
  ) {
    this.productRepository = productRepository;
    this.brandFinder = brandFinder;
  }

  async execute(name: string, category: string, price: Number, brand: string) {
    const productId: ProductId = new ProductId();
    const productName: ProductName = new ProductName(name);
    const productCategory: ProductCategory =
      ProductCategory[ProductCategory.parse(category)];
    const productPrice: ProductPrice = new ProductPrice(price);
    const productBrandId: BrandId = new BrandId(brand);
    const productBrand: Brand = await this.brandFinder.execute(productBrandId);

    await this.productRepository.create(
      productId,
      productName,
      productCategory,
      productPrice,
      productBrand.id
    );
  }
}
