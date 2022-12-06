import { IEventManager } from '../../domain/events/IEventManager';
import amqp, { Channel, Connection } from 'amqplib'
import { AggregateRoot } from "../../domain/AggregateRoot";
import { DIRECT, USER } from './MQconstants'
import { singleton } from 'tsyringe';

export class RabbitMqImpl implements IEventManager {
  private channel: Channel;
  private connection: Connection;


  async initialize(queues: string[], exchanges: string[], routingKey: string): Promise<void> {
    this.connection = await amqp.connect('amqp://rabbitmq');
    this.channel = await this.connection.createChannel();
    for (const exchange of exchanges) {
      await this.channel.assertExchange(exchange, DIRECT)
      for (const queue of queues) {
        console.log(queue)
        await this.channel.assertQueue(queue);
        await this.channel.bindQueue(queue, exchange, routingKey); //CHANGE THIS USER TO AN AGGREGATE 
      }
    }
  }

  async close(): Promise<void> {
    //CLOSE CONNECTION
  }

  async dispatchEvents(exchange: string, aggregate: AggregateRoot, routingKey: string): Promise<void> {
    for (const event of aggregate.domainEvents) {
      await this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(event)));
    }
  }

  async consume(queues: string[]): Promise<void> {
    for (const queue of queues) {
      await this.channel.consume(queue, (msg) => console.log(msg, 'THIS IS A MESSAGE'))
        .catch(err => console.log(err, 'THIS IS AN ERROR'));
    }
  }
}