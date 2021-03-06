import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';
import { SearchModule } from './search/search.module';
import { SocketInsideModule } from './socket-inside/socket-inside.module';
import { ServeStaticModule } from '@nestjs/serve-static';
@Module({
  imports: [
    TasksModule,
    UsersModule,
    PostsModule,
    SharedModule,
    UploadModule,
    SearchModule,
    SocketInsideModule,
    ServeStaticModule.forRoot({
      rootPath: 'images',
      serveRoot: '/images',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
