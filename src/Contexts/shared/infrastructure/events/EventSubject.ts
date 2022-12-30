import { DomainEvent } from "../../domain/events/common/DomainEvent";
import { Observer, Subject } from "../../domain/utils/ISubjectObserver";

export class EventSubject implements Subject {
    private observers: Observer[] = [];

    attachObserver(observer: Observer): void {
        // Check if the observer has already been attached
        const observerExists = this.observers.includes(observer);

        if (observerExists) {
            throw new Error('Observer has already been subscribed ');
        }

        // Add a new observer
        this.observers.push(observer);
        console.log('OBSERVER ADDED')
    }

    detachObserver(observer: Observer): void {
        console.log(`Detaching observer ${JSON.stringify(observer)}`);
        const observerIndex = this.observers.indexOf(observer);

        if (observerIndex === -1) {
            throw new Error('Observer does not exist');
        }

        this.observers.splice(observerIndex, 1);
        console.log('Observer detached...');
    }

    notifyObserver(event: DomainEvent): void {
        console.log('Notifying observers...');

        for (const observer of this.observers) {
            observer.update(event);
        }
    }
}