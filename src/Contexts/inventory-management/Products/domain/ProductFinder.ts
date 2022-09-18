import { inject, injectable } from 'tsyringe';
import { ProductId } from './valueobjects/ProductId';
import { ProductNotFoundException } from './Exceptions/ProductNotFoundException';
import { Product } from './Product';
import { ProductRepository } from './ProductRepository';

@injectable()
export class ProductFinder {
  constructor(
    @inject('ProductRepository')
    private productRepository: ProductRepository
  ) {
    this.productRepository = productRepository;
  }

  async execute(id: ProductId): Promise<Product> {
    console.log(id, 'sdsds');
    await this.exists(id);
    return this.productRepository.find(id);
  }

  private async exists(id: ProductId) {
    if (!(await this.productRepository.exists(id))) throw new ProductNotFoundException(id.value);
  }
}
