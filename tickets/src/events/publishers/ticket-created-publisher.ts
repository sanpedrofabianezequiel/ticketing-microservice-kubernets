import { Publisher } from '../../../../nats-test/src/events/base-publisher';
import { Subjects } from '../../../../nats-test/src/events/subjects';
import { TicketCreatedEvent } from '../../../../nats-test/src/events/ticket-created-event';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}