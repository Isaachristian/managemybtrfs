drop table if exists public."user";

create table public."user"
(
    id         serial,
    fisrt_name char(256) not null,
    last_name  char(256) not null,
    email      char(256) not null,
    password   char(256) not null,
    jwt        char(256),
    ttl        date
);

INSERT INTO public."user"(fisrt_name, last_name, email, password)
VALUES ('Isaac', 'Liljeros', 'isaac.liljeros@icloud.com', '1234'),
       ('Katherine', 'Lane', 'test@test.com', '1234');
