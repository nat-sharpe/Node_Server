CREATE TABLE hobbitLog
(
    userid serial PRIMARY KEY,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL, 
    phone character varying(20) NOT NULL,
    address varchar
)