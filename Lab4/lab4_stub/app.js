import * as rooms from './data/rooms.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';


let db = await dbConnection();
await db.dropDatabase();
 
let room1 = undefined;
let room2 = undefined;
let room3 = undefined;
let fakeId = '507f1f77bcf86cd799439011';

try {
  room1 = await rooms.createRoom(
    'Gateway Study Room 201',
    'Gateway North',
    2,
    6,
    'group',
    ['whiteboard', 'display', 'power'],
    'Located near the elevators.'
  );
  console.log('First room created:');
  console.log(room1);
} catch (e) {
  console.log(e.message);
}
 
try {
  room2 = await rooms.createRoom(
    'Library Collaboration Room 4',
    "Samuel C Williams Library",
    '2',
    '4',
    'GROUP',
    ['  whiteboard  ', 'power'],
    '   '
  );
} catch (e) {
  console.log(e.message);
}
 
try {
  let allRooms = await rooms.getAllRooms();
  console.log('All rooms after creating two:');
  console.log(allRooms);
} catch (e) {
  console.log(e.message);
}
 
try {
  room3 = await rooms.createRoom(
    'Babbio Conference Room 310',
    'Babbio Center',
    3,
    20,
    'conference',
    ['projector', 'Video Conferencing', 'whiteboard'],
    'Reserve at least a day in advance.'
  );

  console.log('Third room created:');
  console.log(room3);
} catch (e) {
  console.log(e.message);
}
 
try {
  let updatedRoom = await rooms.updateRoomCapacity(room1._id, 8);
  console.log('First room after capacity update:');
  console.log(updatedRoom);
} catch (e) {
  console.log(e.message);
}

try {
  let removed = await rooms.removeRoom(room2._id);
  console.log('Removed second room:');
  console.log(removed);
} catch (e) {
  console.log(e.message);
}
 
try {
  let allRooms = await rooms.getAllRooms();
  console.log('All rooms after removing the second room:');
  console.log(allRooms);
} catch (e) {
  console.log(e.message);
}
 
try {
  await rooms.createRoom('Missing Fields Room', 'Gateway North', 2, 6, 'group');
  console.log('ERROR: missing fields did not throw');
} catch (e) {
  console.log('Missing fields:', e.message);
}
 
try {
  await rooms.createRoom('Bad@Name!', 'Gateway North', 2, 6, 'group', ['power'], '');
  console.log('ERROR: invalid roomName did not throw');
} catch (e) {
  console.log('Invalid roomName:', e.message);
}
 
try {
  await rooms.createRoom('gateway study room 201', 'Gateway North', 2, 6, 'group', ['power'], '');
  console.log('ERROR: duplicate roomName did not throw');
} catch (e) {
  console.log('Duplicate roomName:', e.message);
}
 
try {
  await rooms.createRoom('Floor Test Room', 'Gateway North', 2.5, 6, 'group', ['power'], '');
  console.log('ERROR: invalid floor did not throw');
} catch (e) {
  console.log('Invalid floor:', e.message);
}
 
try {
  await rooms.createRoom('Capacity Test Room', 'Gateway North', 2, 'six', 'group', ['power'], '');
  console.log('ERROR: invalid capacity did not throw');
} catch (e) {
  console.log('Invalid capacity:', e.message);
}
 
try {
  await rooms.createRoom('Type Test Room', 'Gateway North', 2, 6, 'lounge', ['power'], '');
  console.log('ERROR: invalid roomType did not throw');
} catch (e) {
  console.log('Invalid roomType:', e.message);
}
 
try {
  await rooms.createRoom('Features Test Room', 'Gateway North', 2, 6, 'group', ['Whiteboard', 'whiteboard'], '');
  console.log('ERROR: duplicate features did not throw');
} catch (e) {
  console.log('Duplicate features:', e.message);
}
 
try {
  await rooms.createRoom('Notes Test Room', 'Gateway North', 2, 6, 'group', ['power'], 'aaaaa');
  console.log('ERROR: repeated characters in notes did not throw');
} catch (e) {
  console.log('Repeated notes characters:', e.message);
}
 
try {
  await rooms.removeRoom(fakeId);
  console.log('ERROR: removing a nonexistent room did not throw');
} catch (e) {
  console.log('Remove nonexistent room:', e.message);
}
 
try {
  await rooms.updateRoomCapacity(fakeId, 10);
  console.log('ERROR: updating a nonexistent room did not throw');
} catch (e) {
  console.log('Update nonexistent room:', e.message);
}
 
try {
  await rooms.updateRoomCapacity(room1._id, 31);
  console.log('ERROR: capacity of 31 did not throw');
} catch (e) {
  console.log('Capacity 31:', e.message);
}
 
try {
  await rooms.updateRoomCapacity(room1._id, 'two');
  console.log('ERROR: capacity of "two" did not throw');
} catch (e) {
  console.log('Capacity "two":', e.message);
}
 
try {
  await rooms.updateRoomCapacity(room1._id, '8');
  console.log('ERROR: same capacity did not throw');
} catch (e) {
  console.log('Same capacity as current:', e.message);
}
 
try {
  await rooms.getRoomById(fakeId);
  console.log('ERROR: getting a nonexistent room did not throw');
} catch (e) {
  console.log('Get nonexistent room:', e.message);
}
 
try {
  await rooms.getRoomById('not-a-real-id');
  console.log('ERROR: invalid ObjectId did not throw');
} catch (e) {
  console.log('Invalid ObjectId:', e.message);
}
 
await closeConnection();
console.log('Done!');
