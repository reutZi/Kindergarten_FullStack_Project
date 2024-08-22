CREATE DATABASE our_kindergarten;

USE our_kindergarten;

CREATE TABLE kindergarten (
  id VARCHAR(9) PRIMARY KEY,
  name VARCHAR(30),
  city VARCHAR(30)
);

CREATE TABLE children (
  id VARCHAR(9) PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  photo_url TEXT,
  allergy_info TEXT,
  kindergarten_id VARCHAR(9),
  FOREIGN KEY (kindergarten_id) REFERENCES kindergarten(id)
);

CREATE TABLE users (
  id VARCHAR(9) PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  username VARCHAR(20) UNIQUE,
  password VARCHAR(20),
  phone VARCHAR(10),
  role ENUM('parent', 'teacher')
);

CREATE TABLE parent (
  pid VARCHAR(9) PRIMARY KEY,
  cid VARCHAR(9),
  FOREIGN KEY (cid) REFERENCES children(id),
  FOREIGN KEY (pid) REFERENCES users(id)
);

CREATE TABLE teacher (
  tid VARCHAR(9) PRIMARY KEY,
  kin_id VARCHAR(9),
  FOREIGN KEY (kin_id) REFERENCES kindergarten(id),
  FOREIGN KEY (tid) REFERENCES users(id)
);

CREATE TABLE attendance (
  cid VARCHAR(9),
  date DATE,
  check_in_time TIME,
  check_out_time TIME,
  is_absent BOOLEAN,
  expected_in_time TIME,
  PRIMARY KEY (cid, date),
  FOREIGN KEY (cid) REFERENCES children(id)
);
