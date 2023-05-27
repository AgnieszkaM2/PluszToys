CREATE TABLE stanowisko(
id_stanowisko int IDENTITY(1,1) PRIMARY KEY,
nazwa varchar(20),
pensja int,
lvl_dostepu int
);

CREATE TABLE pracownicy(
id_pra int IDENTITY(1,1) PRIMARY KEY,
imie VARCHAR(20),
nazwisko varchar(20),
stanowisko int,
haslo varchar(20),
data_zatr DATE DEFAULT CAST( GETDATE() AS Date ) ,
CONSTRAINT FK_stanowisko FOREIGN KEY (stanowisko)
REFERENCES stanowisko(id_stanowisko)
);

CREATE TABLE logipracy(
id_pra int,
insdate date DEFAULT CAST( GETDATE() AS Date ) ,
iloscgodzin int
);

CREATE TABLE produkt(
id_pro int IDENTITY(1,1) PRIMARY KEY,
nazwa varchar(20),
wielosc int
);

CREATE TABLE magazyn (
stock int IDENTITY(1,1) PRIMARY KEY,
produkt varchar(20),
ilosc int,
oczekiwana int,
rezewacja int
);


CREATE TABLE zama(
id_zam int IDENTITY(1,1) PRIMARY KEY,
nr_zam int ,
typ varchar(10), 
klient varchar(20),
insdate datetime DEFAULT CURRENT_TIMESTAMP,
startorder TIMESTAMP
);

CREATE TABLE listazamwie(
nr_zam int,
material varchar(20),
wypelnienie varchar(20),
oczy varchar(20),
ilosc int,
aktilosc int
);

INSERT INTO stanowisko (nazwa,pensja,lvl_dostepu)
     VALUES('dev',0,10);

INSERT INTO stanowisko (nazwa,pensja,lvl_dostepu)
     VALUES('pracownik',3400,1);

INSERT INTO stanowisko (nazwa,pensja,lvl_dostepu)
     VALUES('kierownik zmiany',5000,6);

INSERT INTO stanowisko (nazwa,pensja,lvl_dostepu)
     VALUES('HR',4500,6);

insert into pracownicy (imie,nazwisko,haslo,stanowisko) values('test','test','test',3); 

-- ADDED 07.05.2023
alter table produkt add typ int;

create table type_p(
id int IDENTITY(1,1) PRIMARY KEY, 
p_desc varchar(50)
);

insert into pracownicy (imie,nazwisko,haslo,stanowisko) values('test2','tes','test2',4); 

alter table produkt add FOREIGN key (typ) REFERENCES type_p(id);

alter table logipracy add FOREIGN key (id_pra) REFERENCES pracownicy(id_pra);

insert into logipracy (id_pra, iloscgodzin) values (2,5);
insert into logipracy (id_pra, iloscgodzin) values (2,2);
insert into logipracy (id_pra, iloscgodzin) values (4,4);
insert into logipracy (id_pra,insdate , iloscgodzin) values (2,GETDATE()-9 ,4);


update stanowisko set pensja = 100 where id_stanowisko = 3;

-- added 27.05.2023
alter table pracownicy drop column nazwisko;
alter table zama drop column typ;
alter table zama drop column startorder;

alter table produkt drop column wielosc;

alter table listazamwie add stan int;
alter table listazamwie add typ_plusza int;
alter table listazamwie add wielkosc varchar(3);

alter table zama add stan int;
alter table zama add FOREIGN key (stan) REFERENCES stan_zam(id);

create table typ_plusz (
id int IDENTITY(1,1) PRIMARY KEY, 
p_desc varchar(50)
);
alter table listazamwie add FOREIGN key (typ_plusza) REFERENCES typ_plusz(id);

create table stan_zam (
id int IDENTITY(1,1) PRIMARY KEY, 
p_desc varchar(50)
);
alter table listazamwie add FOREIGN key (stan) REFERENCES stan_zam(id);

alter table listazamwie add FOREIGN key (stan) REFERENCES stan_zam(id);

insert into typ_plusz (p_desc) values ('Kot');
insert into typ_plusz (p_desc) values ('Pies');
insert into typ_plusz (p_desc) values ('S³oñ');
insert into typ_plusz (p_desc) values ('Miœ');

insert into type_p (p_desc) values ('material');
insert into type_p (p_desc) values ('wypelnienie');
insert into type_p (p_desc) values ('oczy');

insert into stan_zam (p_desc) values ('start');		--1 
insert into stan_zam (p_desc) values ('w trakcie');	--2
insert into stan_zam (p_desc) values ('koniec');	--3
insert into stan_zam (p_desc) values ('anulowane');	--4

insert into produkt (nazwa,typ) values ('materia³1',1)
insert into produkt (nazwa,typ) values ('wype³nienie1',2)
insert into produkt (nazwa,typ) values ('guzik1',3)
insert into produkt (nazwa,typ) values ('materia³2',1)
insert into produkt (nazwa,typ) values ('wype³nienie2',2)
insert into produkt (nazwa,typ) values ('guzik2',3)
insert into produkt (nazwa,typ) values ('materia³3',1)
insert into produkt (nazwa,typ) values ('wype³nienie3',2)
insert into produkt (nazwa,typ) values ('guzik3',3)


drop table magazyn;

alter table zama drop column nr_zam;
alter table listazamwie add FOREIGN key (nr_zam) REFERENCES zama(id_zam);

alter table listazamwie drop column aktilosc;
