import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '../types';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { userId: 1, id: 1, title: 'First post', body: 'Hello world' },
    { userId: 2, id: 2, title: 'Second post', body: 'Another post' },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`Post with id ${id} not found`);
    return post;
  }

  create(post: Omit<Post, 'id'>): Post {
    const newPost: Post = {
      id: this.posts.length ? Math.max(...this.posts.map((p) => p.id)) + 1 : 1,
      ...post,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: number, update: Partial<Post>): Post {
    const post = this.findOne(id); // will throw if not found
    Object.assign(post, update);
    return post;
  }

  remove(id: number): boolean {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) return false; // not found

    this.posts.splice(index, 1);
    return true; // successfully deleted
  }

  findByUser(userId: number): Post[] {
    return this.posts.filter((p) => p.userId === userId);
  }
}
