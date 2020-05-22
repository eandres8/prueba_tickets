import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TicketsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      useNewUrlParser: true,
      auth: {
        user: 'root',
        password: 'example'
      },
      dbName: 'tickets',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
