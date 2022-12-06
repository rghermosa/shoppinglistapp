import { delay, inject, injectable } from 'tsyringe'
import { IEventManager } from '../../../shared/domain/events/IEventManager';
import { Id } from '../../../shared/domain/valueObjects/Id';
import { USER, USERS } from '../../../shared/infrastructure/events/MQconstants';
import { CreateUserUseCase } from '../application/CreateUserUseCase';
import { QueuesToConsume } from './events/QueuesToConsume';
import { User } from '../domain/User';

@injectable()
export class UserCreatedController {
	constructor(@inject('EventManager') private eventManager: IEventManager,
		@inject(delay(() => CreateUserUseCase))
		private createUserUseCase: CreateUserUseCase) {
		this.eventManager = eventManager;
		this.createUserUseCase = createUserUseCase;
	}

	async run() {
		const listOfQueues: string[] = Object.values(QueuesToConsume)
		await console.log(listOfQueues)
		const user: User = new User(new Id);
		user.addEvent(user, 'omitible?')
		await this.eventManager.dispatchEvents(USER, user, USERS)
		await this.eventManager.consume(listOfQueues);
		// for (const event in this.eventManager.consume(listOfQueues)) {
		// 	this.createUserUseCase.run();
		// }
	}
}