import { DomainEvent } from "../events/common/DomainEvent";

export interface Subject {
    attachObserver(observer: Observer): void;
    detachObserver(observer: Observer): void;
    notifyObserver(event: DomainEvent): void;
}

export interface Observer {
    update(event: DomainEvent): void;
}