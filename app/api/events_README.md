# Events Backend API

This document provides a quick reference for backend functions managing events within rooms.

---

## Functions

### 1. `addEvent`
Adds a new event to the `events` subcollection of a specific room.

**Parameters:**
- `eventData` (Omit<event, "id">): Event details excluding the Firestore-generated ID.
- `room_id` (string): The ID of the room where the event is added.
- `event_participants` (string[]): List of user IDs participating in the event.

**Returns:**
- Promise<string>: The Firestore-generated ID of the newly created event.

**Notes:**
- Ensures participants are members of the room.
- Adds the Firestore-generated ID to the event after creation.

---

### 2. `deleteEvent`
Deletes an event from the `events` subcollection of a specific room using the event's ID.

**Parameters:**
- `eventId` (string): The Firestore-generated ID of the event to delete.
- `room_id` (string): The ID of the room containing the event.

**Returns:**
- Promise<void>

**Notes:**
- Throws an error if the event does not exist.

---

### 3. `editEvent`
Edits an existing event in the `events` subcollection of a specific room.

**Parameters:**
- `eventData` (event): The updated event details, including its ID.
- `room_id` (string): The ID of the room containing the event.

**Returns:**
- Promise<void>

**Notes:**
- Converts `date` to Firestore's `Timestamp`.
- Ensures the event exists before updating.

---

### 4. `getAllRoomEvents`
Fetches all events from a room's `events` subcollection.

**Parameters:**
- `room_id` (string): The ID of the room.

**Returns:**
- Promise<event[]>: A list of all events in the room.

**Notes:**
- Converts Firestore's `Timestamp` to JavaScript `Date` for the `date` field.

---

### 5. `fetchUserEvents`
Fetches all events a user is participating in from a room's `events` subcollection.

**Parameters:**
- `user_id` (string): The ID of the user.
- `room_id` (string): The ID of the room.

**Returns:**
- Promise<event[]>: A list of events the user is participating in.

**Notes:**
- Uses Firestore's `array-contains` query to match the `user_id` in the `event_participants` array.

---

### 6. `eventRsvp`
Adds a user to the `event_participants` array of a specific event when they RSVP.

**Parameters:**
- `room_id` (string): The ID of the room containing the event.
- `event_id` (string): The Firestore-generated ID of the event.
- `user_id` (string): The ID of the user RSVPing.

**Returns:**
- Promise<void>

**Notes:**
- Ensures the event exists.
- Prevents duplicate RSVPs by checking if the user is already in the `event_participants` array.

---

## Firestore Structure Assumptions

1. **Rooms Collection:**
   - Each room is stored in the `rooms` collection, identified by `room_id`.

2. **Events Subcollection:**
   - Each room has an `events` subcollection to store event documents.

3. **Event Document Fields:**
   - `id` (string): Firestore-generated ID.
   - `name` (string): Name of the event.
   - `description` (string): Description of the event.
   - `date` (Timestamp): The date and time of the event.
   - `event_participants` (string[]): List of user IDs participating in the event.

---

Let me know if this works for you! 😊