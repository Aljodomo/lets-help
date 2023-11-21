export interface UserEvent {
    id: string,
    title: string,
    description: string,
    location?: Location,
    owner: string,
}

export interface UserEventUpdate {
    title?: string,
    description?: string,
    location?: Location,
    owner?: string,
}

export interface Location {
    lat: number,
    lng: number
}
