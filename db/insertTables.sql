USE our_kindergarten;

ALTER TABLE attendance ADD COLUMN absence_reason VARCHAR(255);


-- Insert into Kindergarten table
INSERT INTO kindergarten (id, name, city) 
VALUES ('K001', 'Happy Kids Kindergarten', 'Springfield');

-- Insert into Users table for the teacher
INSERT INTO users (id, first_name, last_name, username, password, phone, role) 
VALUES ('T001', 'John', 'Doe', 'jdoe', 'password123', '1234567890', 'teacher');

-- Insert into Users table for the parents
INSERT INTO users (id, first_name, last_name, username, password, phone, role) 
VALUES 
('P001', 'Jane', 'Smith', 'jsmith', 'parentpass1', '0987654321', 'parent'),
('P002', 'Alice', 'Johnson', 'ajohnson', 'parentpass2', '0123456789', 'parent'),
('P003', 'Robert', 'Brown', 'rbrown', 'parentpass3', '2345678901', 'parent'),
('P004', 'Mary', 'Williams', 'mwilliams', 'parentpass4', '3456789012', 'parent'),
('P005', 'Michael', 'Miller', 'mmiller', 'parentpass5', '4567890123', 'parent');

-- Insert into Children table
INSERT INTO children (id, first_name, last_name, photo_url, allergy_info, kindergarten_id) 
VALUES 
('C001', 'Emily', 'Smith', 'photo_url_1', 'Peanuts', 'K001'),
('C002', 'Liam', 'Johnson', 'photo_url_2', 'None', 'K001'),
('C003', 'Sophia', 'Brown', 'photo_url_3', 'Gluten', 'K001'),
('C004', 'James', 'Williams', 'photo_url_4', 'None', 'K001'),
('C005', 'Olivia', 'Miller', 'photo_url_5', 'Milk', 'K001');

-- Insert into Parent table (each parent with one child)
INSERT INTO parent (pid, cid) 
VALUES 
('P001', 'C001'),
('P002', 'C002'),
('P003', 'C003'),
('P004', 'C004'),
('P005', 'C005');

-- Insert into Teacher table
INSERT INTO teacher (tid, kin_id) 
VALUES ('T001', 'K001');

USE our_kindergarten;

-- Insert attendance records for today for all children in the kindergarten
INSERT INTO attendance (cid, date, check_in_time, check_out_time, is_absent, expected_in_time) 
VALUES 
('C001', CURDATE(), '08:00:00', '14:00:00', FALSE, '08:00:00'),
('C002', CURDATE(), '08:05:00', '14:00:00', FALSE, '08:00:00'),
('C003', CURDATE(), '08:10:00', '14:00:00', FALSE, '08:00:00'),
('C004', CURDATE(), '08:15:00', '14:00:00', FALSE, '08:00:00'),
('C005', CURDATE(), '08:20:00', '14:00:00', FALSE, '08:00:00');

