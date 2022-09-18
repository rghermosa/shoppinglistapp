import { inject, injectable } from 'tsyringe';
import { Brand } from './Brand';
import { BrandRepository } from './BrandRepository';
import { BrandNotFoundException } from './Exceptions/BrandNotFoundException';
import { BrandId } from './valueobjects/BrandId';

@injectable()
export class BrandFinder {
  constructor(
    @inject('BrandRepository')
    private brandRepository: BrandRepository
  ) {
    this.brandRepository = brandRepository;
  }

  async execute(id: BrandId): Promise<Brand> {
    await this.exists(id);
    return this.brandRepository.find(id);
  }

  private async exists(id: BrandId) {
    if (!(await this.brandRepository.exists(id))) throw new BrandNotFoundException(id.value);
  }
}
