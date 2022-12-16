import { Migration } from '@mikro-orm/migrations';

export class Migration20221216101522 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension if not exists "uuid-ossp";');
    this.addSql(
      'create table "token" ("id" uuid not null default uuid_generate_v4(), "name" varchar(255) not null, "symbol" varchar(255) not null, "chain" text check ("chain" in (\'ethereum\')) not null, "address" varchar(255) not null, "update_continuously" boolean not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "token_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "token" add constraint "token_address_unique" unique ("address");',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "token" cascade;');
  }
}
