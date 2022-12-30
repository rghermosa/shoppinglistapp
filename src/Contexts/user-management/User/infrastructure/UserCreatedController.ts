import { delay, inject, injectable } from 'tsyringe'
import { IEventManager } from '../../../shared/domain/events/common/IEventManager';
import { Observer, Subject } from '../../../shared/domain/utils/ISubjectObserver';
import { CreateUserUseCase } from '../application/CreateUserUseCase';
import { IMapper } from '../domain/interfaces/IMapper';
import { QueuesToConsume } from './events/QueuesToConsume';
import { AuthUser } from './external/dto/AuthUser';
import { UserCreated } from './external/events/UserCreated';

@injectable()
export class UserCreatedController implements Observer {
	constructor(
		@inject('EventManager') private eventManager: IEventManager,
		@inject('EventSubject') private eventSubject: Subject,
		@inject('UserMapper') private userMapper: IMapper,
		@inject(delay(() => CreateUserUseCase))
		private createUserUseCase: CreateUserUseCase) {
		this.eventManager = eventManager;
		this.userMapper = userMapper;
		this.createUserUseCase = createUserUseCase;
	}

	async run() {
		await this.eventSubject.attachObserver(this);
		console.log(this.eventSubject)
		await this.eventManager.consume(QueuesToConsume.USER_CREATED)
	}

	async update(event: UserCreated): Promise<void> {
		console.log('New event recorded: ', event)

		const authUserDto: AuthUser = event;
		//Object.assign(authUserDto, event.email, event.name, event.lastName)
		console.log(authUserDto)
		const mappedUser = await this.userMapper.fromExternalToDto(authUserDto)
		console.log(mappedUser)
		await this.createUserUseCase.run(mappedUser)
	}
}