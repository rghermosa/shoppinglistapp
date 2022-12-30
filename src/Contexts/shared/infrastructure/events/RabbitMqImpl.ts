import { IEventManager } from '../../domain/events/common/IEventManager';
import amqp, { Channel, Connection, ConsumeMessage, Message, Replies } from 'amqplib'
import { AggregateRoot } from "../../domain/AggregateRoot";
import { DIRECT } from './MQconstants'
import { DomainEvent } from '../../domain/events/common/DomainEvent';
import { Observer, Subject } from '../../domain/utils/ISubjectObserver';
import { EventSubject } from './EventSubject';
import { inject, injectable } from 'tsyringe';

@injectable()
export class RabbitMqImpl implements IEventManager {
  private channel: Channel;
  private connection: Connection;
  private eventData: DomainEvent;
  constructor(@inject('EventSubject') private eventSubject: Subject) {
    this.eventSubject = eventSubject;
  }

  async initialize(queues: string[], exchanges: string[], routingKey: string): Promise<void> {
    this.connection = await amqp.connect('amqp://rabbitmq');
    this.channel = await this.connection.createChannel();
    for (const exchange of exchanges) {
      await this.channel.assertExchange(exchange, DIRECT)
      for (const queue of queues) {
        await this.channel.assertQueue(queue);
        await this.channel.bindQueue(queue, exchange, routingKey);
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

  async consume(queue: string): Promise<void> {
    await this.channel.consume(queue, async (msg: Message) => {
      console.log(`Message: \n ${Buffer.from(msg.content)} \n received successfully!`)

      await this.channel.ack(msg)
      this.eventData = JSON.parse(Buffer.from(msg.content).toString('utf8'))

      console.log('Message acknowledged successfully')
      console.log(this.eventSubject)
      this.eventSubject.notifyObserver(this.eventData);
    }).catch(err => {
      console.log(`Error consuming the message: \n ${err}`)
    })

  }
}