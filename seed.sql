CREATE TABLE hobbitTable
(
    userid serial PRIMARY KEY,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL, 
    phone character varying(20) NOT NULL,
    address varchar
);

INSERT INTO hobbitTable (name, email, phone, address) VALUES ('Frodo', 'frodo9fingers@bagend.com', '(505) 950-3330', 'Bagend, Hobbiton, Shire');

INSERT INTO hobbitTable (name, email, phone, address) VALUES ('Sam', 'greenthumb88@bagend.com', '(505) 345-1002', 'Hobbiton, Shire');

INSERT INTO hobbitTable (name, email, phone, address) VALUES ('Merry', 'mushrooms@shortcut.org', '(208) 038-1000', 'Shire');

INSERT INTO hobbitTable (name, email, phone, address) VALUES ('Pippin', 'fool_of_a_took@hairyfeet.com', '(219) 295-0333', 'Shire');