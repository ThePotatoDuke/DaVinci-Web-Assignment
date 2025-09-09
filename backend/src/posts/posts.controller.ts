import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { Post as PostType } from '../types'; // <-- notice "import type"
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): PostType[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): PostType {
    const post = this.postsService.findOne(Number(id));
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto): PostType {
    return this.postsService.create(createPostDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): PostType {
    const updatedPost = this.postsService.update(Number(id), updatePostDto);
    if (!updatedPost)
      throw new NotFoundException(`Post with id ${id} not found`);
    return updatedPost;
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    const deleted = this.postsService.remove(Number(id));

    if (!deleted) throw new NotFoundException(`Post with id ${id} not found`);
  }
}
