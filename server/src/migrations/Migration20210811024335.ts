import { Migration } from '@mikro-orm/migrations';

export class Migration20210811024335 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "todo" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" text not null, "finished" bool not null);');
    this.addSql('alter table "todo" add constraint "todo_pkey" primary key ("id");');

    this.addSql('drop table if exists "post" cascade;');
  }

}
