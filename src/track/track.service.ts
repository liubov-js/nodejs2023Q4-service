import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDb } from '../db/db.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(private db: InMemoryDb) {}

  getAll() {
    return this.db.users;
  }

  getOne(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  create(dto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      ...dto,
    };

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  update(id: string, dto: UpdateTrackDto) {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) {
      throw new NotFoundException('Track not found');
    }
    this.db.tracks[trackIdx] = {
      ...this.db.tracks[trackIdx],
      ...dto,
    };

    return this.db.tracks[trackIdx];
  }

  delete(id: string) {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);
    if (trackIdx === -1) {
      throw new NotFoundException('Track not found');
    }

    return this.db.tracks.splice(trackIdx, 1);
  }
}
