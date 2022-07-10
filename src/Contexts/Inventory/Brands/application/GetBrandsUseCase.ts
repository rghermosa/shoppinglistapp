import { inject, injectable } from 'tsyringe';
import { Brand } from '../domain/Brand';
import { BrandRepository } from '../domain/BrandRepository';

@injectable()
export class GetBrandsUseCase {
  constructor(
    @inject('BrandRepository')
    public brandRepository: BrandRepository
  ) {
    this.brandRepository = brandRepository;
  }

  execute(): Promise<Brand[]> {
    return new Promise((resolve, reject) => {
      resolve(this.brandRepository.getAll());
    });
  }
}
