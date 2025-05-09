create user guest with password 'guest';
create database kaapiandculture_shop with owner=guest;
grant all privileges on database kaapiandculture_shop to guest;

CREATE TABLE IF NOT EXISTS users
 (
   id uuid,
   data jsonb,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT users_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );

 CREATE TABLE IF NOT EXISTS products
 (
   id uuid,
   data jsonb,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT products_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );

 CREATE UNIQUE INDEX IF NOT EXISTS products_sku_id_unique_index
  ON products
  USING btree
 ((data->>'sku_id'));

  CREATE TABLE IF NOT EXISTS orders
 (
   id uuid,
   data jsonb,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT orders_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );

 CREATE TABLE IF NOT EXISTS inventory
 (
   id uuid,
   data jsonb,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT inventory_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );


 CREATE TABLE IF NOT EXISTS notifications
 (
   id uuid,
   data jsonb,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT notifications_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );

 CREATE TABLE IF NOT EXISTS message_history
 (
   id uuid,
   data jsonb,
   created_date timestamp with time zone DEFAULT now(),
   modified_date timestamp with time zone DEFAULT now(),
   CONSTRAINT message_history_pkey PRIMARY KEY (id)
 )
 WITH (
   OIDS=FALSE
 );