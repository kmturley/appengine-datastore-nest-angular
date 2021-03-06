import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Datastore } from '@google-cloud/datastore';

@Controller('items')
export class ItemsController {
  public db = new Datastore();

  @Get()
  async findAll(): Promise<any> {
    const query = this.db
      .createQuery('visit')
      .order('timestamp', { descending: true })
      .limit(10);
    return this.db.runQuery(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(): Promise<any> {
    return this.db.save({
      key: this.db.key('visit'),
      data: {
        message: 'User visits',
        timestamp: new Date().getTime(),
      },
    });
  }
}
