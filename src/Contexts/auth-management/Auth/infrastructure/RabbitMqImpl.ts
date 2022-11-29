import { EventManager } from "../domain/interfaces/EventManager";
import amqp from 'amqplib'
import { User } from "../domain/User";

export class RabbitMqImpl implements EventManager {
  private channel: any;
  private connection: any;

  async dispatchEvents(user: User) {   
      try {
          this.connection = await amqp.connect("amqp://rabbitmq");
          this.channel = await this.connection.createChannel()
          for (const event of user.domainEvents) {
            await this.channel.assertQueue(event.queue)
            await this.channel.sendToQueue(event.queue, Buffer.from(JSON.stringify(user)))
          }
          await this.channel.close();
          await this.connection.close(); 
      } catch (error) {
          console.log(error)
      }
  }
}