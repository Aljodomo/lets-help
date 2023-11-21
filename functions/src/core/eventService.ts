import {Location, UserEvent} from "./UserEvent";
import {v4 as uuidv4} from "uuid";
import {EventRepositoryImpl} from "../adapter-functions/eventRepository";
import {EventRepositoryPort, EventServicePort} from "./eventPorts";

export class EventServiceImpl implements EventServicePort {
  constructor(private eventRepository: EventRepositoryPort) {}

  create(title: string, description: string, location: Location, owner: string): Promise<UserEvent> {
    return this.eventRepository.create({
      id: uuidv4(),
      title: title,
      description: description,
      location: location,
      owner: owner,
    });
  }

  delete(id: string): Promise<boolean> {
    return this.eventRepository.delete(id);
  }

  findById(id: string): Promise<UserEvent | null> {
    return this.eventRepository.findById(id);
  }

  update(id: string, event: UserEvent): Promise<UserEvent | null> {
    return this.eventRepository.update(id, event);
  }
}

export const eventService: EventServicePort = new EventServiceImpl(new EventRepositoryImpl());
