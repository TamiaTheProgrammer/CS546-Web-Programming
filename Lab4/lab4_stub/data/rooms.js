import {rooms} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
 
let allowedLettersNumbers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 
let hasOnlyAllowedChars = (str, allowedChars) => 
{
  for (let i = 0; i < str.length; i++) 
    {
      if (!allowedChars.includes(str[i])) 
        {
          return false;
        }
    }
  return true;
};
 
let checkId = (id) => 
  {
    if (id === undefined) 
      {
        throw new Error('You must provide an id');
      }

    if (typeof id !== 'string') 
      {
        throw new Error('id must be a string');
      }

    id = id.trim();
  
    if (id === '') 
      {
        throw new Error('id cannot be an empty string or just spaces');
      }

    if (!ObjectId.isValid(id)) 
      {
        throw new Error('id is not a valid ObjectId');
      }
    return id;
  };
 
//export the following functions using ES6 syntax
export const createRoom = async (
  roomName,
  building,
  floor,
  capacity,
  roomType,
  features,
  notes
) => {
  if(roomName === undefined || building === undefined || floor === undefined || capacity === undefined || roomType === undefined || features === undefined || notes === undefined) 
    {
      throw new Error('All required fields must be provided');
    }
 
  if(typeof roomName !== 'string' || typeof building !== 'string' || typeof roomType !== 'string' || typeof notes !== 'string') 
    {
      throw new Error('roomName, building, roomType, and notes must be strings');
    }
 
  roomName = roomName.trim();
  building = building.trim();
  roomType = roomType.trim();
  notes = notes.trim();
 
  if(roomName === '' || building === '' || roomType === '') 
    {
      throw new Error('roomName, building, and roomType cannot be empty or just spaces');
    }
 
  if(roomName.length < 5 || roomName.length > 60) 
    {
      throw new Error('roomName must be between 5 and 60 characters long');
    }

  if(!hasOnlyAllowedChars(roomName, allowedLettersNumbers + ' -')) 
    {
      throw new Error('roomName may only contain letters, numbers, spaces, and hyphens');
    }
 
  if(building.length < 3 || building.length > 50) 
    {
      throw new Error('building must be between 3 and 50 characters long');
    }

  if(!hasOnlyAllowedChars(building, allowedLettersNumbers + " -'")) 
    {
      throw new Error('building may only contain letters, numbers, spaces, hyphens, and apostrophes');
    }
 
  if(typeof floor === 'string') 
    {
      if(floor.trim() === '') 
        {
          throw new Error('Invalid floor value');
        }
      floor = Number(floor.trim());
    }

  if(typeof floor !== 'number' || !Number.isInteger(floor) || floor < 0 || floor > 50) 
    {
      throw new Error('floor must be a whole number between 0 and 50');
    }
 
  if(typeof capacity === 'string') 
    {
      if (capacity.trim() === '') 
        {
          throw new Error('Invalid capacity value');
        }
      capacity = Number(capacity.trim());
    }

  if(typeof capacity !== 'number' || !Number.isInteger(capacity) || capacity < 1 || capacity > 30) 
    {
      throw new Error('capacity must be a whole number between 1 and 30');
    }
 
  let validRoomTypes = ['individual', 'group', 'conference', 'computer', 'presentation'];
  roomType = roomType.toLowerCase();
  if (!validRoomTypes.includes(roomType)) 
    {
      throw new Error('roomType must be one of: individual, group, conference, computer, presentation');
    }
 
  if (!Array.isArray(features) || features.length < 1 || features.length > 8) 
    {
      throw new Error('features must be an array with 1 to 8 elements');
    }
 
  let trimmedFeatures = [];
  let lowerCaseFeatures = [];
  for(let feature of features) 
    {
      if(typeof feature !== 'string') 
        {
          throw new Error('Each feature must be a string');
        }
 
    let f = feature.trim();
 
    if(f === '') 
      {
        throw new Error('Features cannot be empty or just spaces');
      }

    if(f.length < 2 || f.length > 30) 
      {
        throw new Error('Each feature must be between 2 and 30 characters long');
      }

    if(!hasOnlyAllowedChars(f, allowedLettersNumbers + ' -')) 
      {
        throw new Error('Features may only contain letters, numbers, spaces, and hyphens');
      }
 
    let lower = f.toLowerCase();
    if(lowerCaseFeatures.includes(lower)) 
      {
        throw new Error('features cannot contain duplicates');
      }

    lowerCaseFeatures.push(lower);
    trimmedFeatures.push(f);
  }

  features = trimmedFeatures;
 
  if(notes.length > 250) 
    {
      throw new Error('notes cannot be more than 250 characters long');
    }
 
  let repeatCount = 1;
  for(let i = 1; i < notes.length; i++) 
    {
      if (notes[i] === notes[i - 1])  
        {
          repeatCount++;
          if(repeatCount >= 5) 
            {
              throw new Error('notes cannot contain the same character repeated 5 or more times in a row');
            }
        } else 
          {
            repeatCount = 1;
          }
    }
 
  let roomCollection = await rooms();
  let allRooms = await roomCollection.find({}).toArray();
  for(let room of allRooms) 
    {
      if (room.roomName.trim().toLowerCase() === roomName.toLowerCase()) 
        {
          throw new Error('A room with this name already exists');
        }
    }
 
  let newRoom = {
    roomName,
    building,
    floor,
    capacity,
    roomType,
    features,
    notes,
    availability: 'available'
  };
 
  let insertInfo = await roomCollection.insertOne(newRoom);
  if(!insertInfo.acknowledged || !insertInfo.insertedId) 
    {
      throw new Error('Could not create room');
    }
 
  let newId = insertInfo.insertedId.toString();
  return await getRoomById(newId);
};
 
export const getAllRooms = async () => 
  {
    let roomCollection = await rooms();
    let allRooms = await roomCollection.find({}).toArray();
    for(let room of allRooms) 
      {
        room._id = room._id.toString();
      }
    return allRooms;
  };
 
export const getRoomById = async (id) => 
  {
    id = checkId(id);
 
  let roomCollection = await rooms();
  let room = await roomCollection.findOne({ _id: ObjectId.createFromHexString(id) });
  if(!room) 
    {
      throw new Error('No room found with the given id');
    }
  room._id = room._id.toString();
  return room;
  };
 
export const removeRoom = async (id) =>
  {
    id = checkId(id);
 
    let roomCollection = await rooms();
    let deletedRoom = await roomCollection.findOneAndDelete({ _id: ObjectId.createFromHexString(id) });
    if(!deletedRoom) 
      {
        throw new Error(`Could not delete room with id of ${id}`);
      }
    return { roomName: deletedRoom.roomName, deleted: true };
  };
 
export const updateRoomCapacity = async (id, newCapacity) => 
  {
    id = checkId(id);
 
    if(newCapacity === undefined) 
      {
        throw new Error('You must provide a new capacity');
      }

  if(typeof newCapacity === 'string') 
    {
      if(newCapacity.trim() === '') 
        {
          throw new Error('Invalid newCapacity value');
        }
    newCapacity = Number(newCapacity.trim());
    }
  if(typeof newCapacity !== 'number' || !Number.isInteger(newCapacity) || newCapacity < 1 || newCapacity > 30) 
    {
      throw new Error('newCapacity must be a whole number between 1 and 30');
    }
 
  let currentRoom = await getRoomById(id);
  if(currentRoom.capacity === newCapacity) 
    {
      throw new Error('newCapacity is the same as the current capacity');
    }
 
  let roomCollection = await rooms();
  let updateInfo = await roomCollection.updateOne( { _id: ObjectId.createFromHexString(id) }, { $set: { capacity: newCapacity } });
  
  if(updateInfo.matchedCount === 0) 
    {
      throw new Error(`Could not update room with id of ${id}`);
    }
  return await getRoomById(id);
};