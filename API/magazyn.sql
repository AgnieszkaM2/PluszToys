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


