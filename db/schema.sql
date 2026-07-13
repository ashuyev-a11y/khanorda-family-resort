-- KHAN ORDA — схема БД бронирования (Neon / Postgres).
-- Применить один раз: в Neon SQL Editor или скриптом.
-- Таблицы с префиксом khanorda_ на случай общей БД.

create table if not exists khanorda_bookings (
  id            uuid primary key default gen_random_uuid(),
  house_id      text        not null,
  checkin       date        not null,
  checkout      date        not null,
  guests        integer     not null,
  name          text        not null,
  phone         text        not null,
  total         integer     not null,
  prepay        integer     not null,
  status        text        not null default 'pending', -- pending|confirmed|cancelled|expired
  consent_offer boolean     not null default true,
  created_at    timestamptz not null default now(),
  hold_until    timestamptz not null,
  confirmed_at  timestamptz,
  note          text
);

create table if not exists khanorda_blocks (
  id         uuid primary key default gen_random_uuid(),
  house_id   text        not null,
  from_date  date        not null,
  to_date    date        not null,
  reason     text,
  created_at timestamptz not null default now()
);

create index if not exists idx_khanorda_bookings_house
  on khanorda_bookings (house_id, checkin, checkout);
create index if not exists idx_khanorda_blocks_house
  on khanorda_blocks (house_id, from_date, to_date);
