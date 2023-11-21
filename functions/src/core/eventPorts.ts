import {Location, UserEvent, UserEventUpdate} from "./UserEvent";

export interface EventRepositoryPort {
    create(event: UserEvent): Promise<UserEvent>;
    update(id: string, event: UserEventUpdate): Promise<UserEvent | null>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<UserEvent | null>;
}

export interface EventServicePort {
    create(title: string, description: string, location: Location, owner: string): Promise<UserEvent>;
    update(id: string, event: UserEventUpdate): Promise<UserEvent | null>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<UserEvent | null>;
}
