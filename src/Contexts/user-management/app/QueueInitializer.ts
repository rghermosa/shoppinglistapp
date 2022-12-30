import { container, inject, injectable } from "tsyringe";
import { IEventManager } from "../../shared/domain/events/common/IEventManager";
import { USER, USERS } from "../../shared/infrastructure/events/MQconstants";
import { QueuesToCreate } from "../User/infrastructure/events/QueuesToCreate";

@injectable()
export class QueueInitializer {
    constructor(@inject('EventManager') private eventManager: IEventManager) {
        this.eventManager = eventManager;
    }

    async run() {
        const queues: string[] = Object.values(QueuesToCreate)
        await this.eventManager.initialize(queues, new Array(USER), USERS);
    }
}