import { Publisher } from '../../../../nats-test/src/events/base-publisher';
import { Subjects } from '../../../../nats-test/src/events/subjects';
import { TicketUpdateEvent } from '../../../../nats-test/src/events/ticket-updated-event';

export class TicketUpdatedPublisher extends Publisher<TicketUpdateEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}