-- Use the our_kindergarten database
USE our_kindergarten;

-- Insert data into the kindergarten table
INSERT INTO kindergarten (id, name, city) VALUES
('001', 'גן דובדבן', 'תל אביב'),
('002', 'גן פעמון', 'ירושלים'),
('003', 'גן כלנית', 'חיפה');

-- Insert data into the children table
INSERT INTO children (id, first_name, last_name, photo_url, allergy_info, kindergarten_id) VALUES
('10001', 'אורי', 'כהן', 'https://example.com/photo1.jpg', 'בוטנים', '001'),
('10002', 'נועה', 'לוי', 'https://example.com/photo2.jpg', 'חלב', '001'),
('10003', 'דניאל', 'ישראלי', 'https://example.com/photo3.jpg', 'גלוטן', '001'),
('10004', 'יובל', 'שמש', 'https://example.com/photo4.jpg', 'שום', '002'),
('10005', 'מיה', 'רוזן', 'https://example.com/photo5.jpg', 'דגים', '002'),
('10006', 'איתי', 'מלמד', 'https://example.com/photo6.jpg', 'אגוזים', '002'),
('10007', 'אלון', 'גפן', 'https://example.com/photo7.jpg', 'אין', '003'),
('10008', 'מאיה', 'לביא', 'https://example.com/photo8.jpg', 'ביצים', '003'),
('10009', 'תמר', 'ירדן', 'https://example.com/photo9.jpg', 'שומשום', '003'),
('10010', 'שחר', 'כהן', 'https://example.com/photo10.jpg', 'שום', '001'),
('10011', 'ליאן', 'כהן', 'https://example.com/photo11.jpg', 'אבקנים', '001'),
('10012', 'עידו', 'כהן', 'https://example.com/photo12.jpg', 'אגוזים', '001');

-- Insert data into the users table
INSERT INTO users (id, first_name, last_name, username, password, phone, role) VALUES
('20001', 'אורי', 'כהן', 'ori_k', 'password123', '0501234567', 'parent'),
('20002', 'יובל', 'לוי', 'yuval_l', 'password123', '0502345678', 'parent'),
('20003', 'מאיה', 'רוזן', 'maya_r', 'password123', '0503456789', 'parent'),
('20004', 'דוד', 'שמש', 'david_s', 'password123', '0504567890', 'teacher'),
('20005', 'רונית', 'לביא', 'ronit_l', 'password123', '0505678901', 'teacher');

-- Insert data into the parent table
INSERT INTO parent (pid, cid) VALUES
('20001', '10001'),
('20001', '10010'),
('20001', '10011'),
('20001', '10012'),  -- Parent with four children
('20002', '10002'),
('20003', '10005'),
('20003', '10006'),
('20003', '10007');  -- Parent with three children

-- Insert data into the teacher table
INSERT INTO teacher (tid, kin_id) VALUES
('20004', '001'),
('20005', '002');

-- Insert data into the attendance table
INSERT INTO attendance (cid, date, check_in_time, check_out_time, is_absent, expected_in_time, absence_reason) VALUES
('10001', '2024-08-31', '08:00:00', '13:00:00', FALSE, NULL, NULL),
('10002', '2024-08-31', '08:10:00', '13:05:00', FALSE, NULL, NULL),
('10003', '2024-08-31', '08:15:00', '12:55:00', TRUE, NULL, 'מחלה'),
('10004', '2024-08-31', '08:20:00', '13:15:00', FALSE, NULL, NULL),
('10005', '2024-08-31', '08:30:00', '13:25:00', FALSE, NULL, NULL);

-- Insert data into the notice_board table
INSERT INTO notice_board (title, content, date_posted, kindergarten_id) VALUES
('ברוכים הבאים', 'הורים יקרים, אנו שמחים לקבל אתכם לשנה החדשה בגן דובדבן!', '2024-08-30', '001'),
('חג סוכות', 'בגן פעמון נתחיל את החגיגות מחר בשעה 10:00 בבוקר. כולם מוזמנים!', '2024-08-31', '002'),
('טיול שנתי', 'גן כלנית יוצא לטיול שנתי ביום ראשון הקרוב. נא לא לשכוח להביא כובע ומים!', '2024-08-30', '003');
