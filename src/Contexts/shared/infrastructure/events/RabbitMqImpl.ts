import { IEventManager } from '../../domain/events/IEventManager';
import amqp from 'amqplib'
import { AggregateRoot } from "../../domain/AggregateRoot";

export class RabbitMqImpl implements IEventManager {
  private channel: any;
  private connection: any;

  async dispatchEvents(aggregate: AggregateRoot) {
    try {
      this.connection = await amqp.connect("amqp://rabbitmq");
      this.channel = await this.connection.createChannel()
      for (const event of aggregate.domainEvents) {
        await this.channel.assertQueue(event.queue)
        await this.channel.sendToQueue(event.queue, Buffer.from(JSON.stringify(aggregate)))
      }
      await this.channel.close();
      await this.connection.close();
    } catch (error) {
      console.log(error)
    }
  }
}