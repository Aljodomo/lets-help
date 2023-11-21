/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import {EventRepositoryPort} from "../core/eventPorts";
import {UserEvent, UserEventUpdate} from "../core/UserEvent";
import {getFirestore} from "firebase-admin/firestore";
import * as logger from "firebase-functions/logger";

export class EventRepositoryImpl implements EventRepositoryPort {
  async create(event: UserEvent): Promise<UserEvent> {
    logger.info("store new event", event);
    await getFirestore().collection("events").add(event);
    return event;
  }

  async delete(id: string): Promise<boolean> {
    const query = getFirestore()
      .collection("events")
      .where("id", "==", id);

    const queryResult = await query.get();
    if (!queryResult.empty) {
      if (queryResult.docs.length > 1) throw new Error("More than one event found for id " + id);

      await queryResult.docs[0].ref.delete();
      return true;
    } else {
      return false;
    }
  }

  async findById(id: string): Promise<UserEvent | null> {
    const query = getFirestore()
      .collection("events")
      .where("id", "==", id);

    const queryResult = await query.get();
    if (!queryResult.empty) {
      if (queryResult.docs.length > 1) throw new Error("More than one event found for id " + id);

      const data = queryResult.docs[0].data();
      return data as UserEvent;
    } else {
      return null;
    }
  }

  async update(id: string, event: UserEventUpdate): Promise<UserEvent | null> {
    const query = getFirestore()
      .collection("events")
      .where("id", "==", id);

    const queryResult = await query.get();
    if (!queryResult.empty) {
      if (queryResult.docs.length > 1) throw new Error("More than one event found for id " + id);

      const docRef = queryResult.docs[0].ref;

      await docRef.update({
        title: event.title,
        description: event.description,
        location: event.location,
        owner: event.owner,
      });

      const doc = await docRef.get();

      if (doc.exists) {
        return doc.data() as UserEvent;
      } else {
        throw new Error("Event updated but not found: " + id);
      }
    } else {
      return null;
    }
  }
}
