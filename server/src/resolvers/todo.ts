import { Todo } from "../entities/";
import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  async todos(@Ctx() { em }: MyContext): Promise<Todo[]> {
    return await em.find(Todo, {});
  }

  @Query(() => Todo, { nullable: true })
  async todo(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: MyContext
  ): Promise<Todo | null> {
    return await em.findOne(Todo, { id });
  }

  @Mutation(() => Todo)
  async createTodo(
    @Arg("title", () => String) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Todo> {
    const post = await em.create(Todo, { title, finished: false });
    await em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Todo, { nullable: true })
  async updateTodo(
    @Arg("id", () => String) id: string,
    @Arg("title", () => String) title: string,
    @Arg("finished", () => Boolean) finished: boolean,
    @Ctx() { em }: MyContext
  ): Promise<Todo | null> {
    const post = await em.findOne(Todo, { id });
    if (!post) {
      return null;
    }

    if (!!title) {
      post.title = title;
      post.finished = finished;
      await em.persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Todo, { id });
      return true;
    } catch (_) {
      return false;
    }
  }
}
