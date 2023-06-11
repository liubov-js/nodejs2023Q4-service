import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll() {
    const artists = await this.artistRepository.find();
    return artists.map((artist) => artist.toResponse());
  }

  async getOne(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async create(dto: CreateArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...dto,
    };

    const createArtist = this.artistRepository.create(newArtist);

    return (await this.artistRepository.save(createArtist)).toResponse();
  }

  async update(id: string, dto: UpdateArtistDto) {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id },
    });

    if (!updatedArtist) {
      throw new NotFoundException('Artist not found');
    }

    return this.artistRepository.save(Object.assign(updatedArtist, dto));
  }

  async delete(id: string) {
    const result = await this.artistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Artist not found');
    }
  }
}
