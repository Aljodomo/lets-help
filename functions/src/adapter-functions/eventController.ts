/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {eventService} from "../core/eventService";

export const createEvent = onRequest(async (request, response) => {
  const userEvent = await eventService
    .create(request.body.title, request.body.description, request.body.location, request.body.owner);
  response.send(userEvent);
});

export const deleteEvent = onRequest(async (request, response) => {
  logger.info("deleteEvent request", request.body);
  const userEvent = await eventService.delete(request.body.id);
  response.send(userEvent);
});

export const updateEvent = onRequest(async (request, response) => {
  logger.info("updateEvent request", request.body);
  const userEvent = await eventService.update(request.body.id,
    {
      title: request.body.event.title,
      description: request.body.event.description,
      owner: request.body.event.owner,
    }
  );
  response.send(userEvent);
});

export const findEventById = onRequest(async (request, response) => {
  logger.info("findEventById request", request.body);
  const userEvent = await eventService.findById(request.body.id);
  response.send(userEvent);
});
