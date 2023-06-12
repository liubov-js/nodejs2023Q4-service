import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    const tracks = await this.trackRepository.find();
    return tracks.map((track) => track.toResponse());
  }

  async getOne(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track.toResponse();
  }

  async create(dto: CreateTrackDto) {
    const newTrack = {
      id: uuidv4(),
      ...dto,
    };

    const createdTrack = this.trackRepository.create(newTrack);

    return (await this.trackRepository.save(createdTrack)).toResponse();
  }

  async update(id: string, dto: UpdateTrackDto) {
    const updatedTrack = await this.trackRepository.findOne({ where: { id } });

    if (!updatedTrack) {
      throw new NotFoundException('Track not found');
    }

    return this.trackRepository.save(Object.assign(updatedTrack, dto));
  }

  async delete(id: string) {
    const result = await this.trackRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Track not found');
    }
  }
}
