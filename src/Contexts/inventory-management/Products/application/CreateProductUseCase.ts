import { delay, inject, injectable, injectAll } from 'tsyringe';
import { Brand } from '../../Brands/domain/Brand';
import { BrandFinder } from '../../Brands/domain/BrandFinder';
import { BrandId } from '../../Brands/domain/valueobjects/BrandId';
import { ProductId } from '../domain/valueobjects/ProductId';
import { ProductName } from '../domain/valueobjects/ProductName';
import { Product } from '../domain/Product';
import { ProductRepository } from '../domain/ProductRepository';
import { ProductCategory } from '../domain/valueobjects/ProductCategory';
import { ProductPrice } from '../domain/valueobjects/ProductPrice';
import { constants } from '../infrastructure/constants/QueueNames';

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

  async execute(name: string, category: string, price: number, brand: string) {
    const productName: ProductName = new ProductName(name);
    const productCategory: ProductCategory = ProductCategory[ProductCategory.parse(category)];
    const productPrice: ProductPrice = new ProductPrice(price);
    const brandId: BrandId = new BrandId(brand);
    await this.brandFinder.execute(brandId);
    const product: Product = Product.create(productName, productCategory, productPrice, brandId);

    await this.productRepository.create(product);

    //console.log(this.domainEventBus);
    //ProductPublisher.execute(constants.PRODUCT_CREATED, product);
  }
}
