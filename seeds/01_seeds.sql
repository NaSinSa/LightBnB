INSERT INTO users (name, email, password) 
VALUES ('iamauser','user@email.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('mynameisname','name@email.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('thisisme','this@email.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'statue of Liberty', 'description', 'https://www.lighthouselabs.ca/uploads/team_member/avatar/283/medium_Capture_d_e_cran_2018-04-30_a__11.45.23.png', 'https://www.lighthouselabs.ca/uploads/team_member/avatar/413/medium_135-0-2.jpg', 3, 5, 8, 5, 'USA', 'street', 'city', 'province', '123456', true),
(2, 'trump tower', 'description', 'https://www.lighthouselabs.ca/uploads/team_member/avatar/235/medium_dominic.jpeg', 'https://www.lighthouselabs.ca/uploads/team_member/avatar/420/medium_136-0-2.jpg', 2, 6, 3, 4, 'USA', 'street', 'city', 'province', '654987', true),
(3, 'empire state', 'description', 'https://www.lighthouselabs.ca/uploads/team_member/avatar/291/medium_P1050464.jpg', 'https://www.lighthouselabs.ca/uploads/team_member/avatar/412/medium_134-0-2.jpg', 1, 7, 5, 6, 'USA', 'street', 'city', 'province', '987456', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 1, 1, 5, 'message'),
(2, 2, 2, 4, 'message'),
(3, 3, 3, 3, 'message');

