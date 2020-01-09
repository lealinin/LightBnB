INSERT INTO users (name, email, password)
VALUES ('Sally Greennails', 'sally.greennails@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bridget Jones', 'bridget_jones@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Phil Spector', 'philsp@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Luxury Modern Home near Disneyland', 'For families up for an adventure', 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 200, 1, 2, 1, 'USA', '15th Street', 'Orlando', 'Florida', '15NJK', true),
(2, 'Sovereign Cottage - Self Check-In & Free Parking', 'Great for couples on their honeymoon', 'https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1131573/pexels-photo-1131573.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 120, 1, 1, 1, 'Canada', 'Dunsmuir Street', 'Vancouver', 'BC', 'V5N', true),
(3, 'A Modern & Homely Suite', 'For the urban traveller', 'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/3201763/pexels-photo-3201763.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 140, 1, 1, 1, 'Denmark', 'Hans Denmark Street', 'Copenhagen', 'North Denmarkia', '1378', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'Awesome space!'),
(2, 2, 2, 4, 'Splendid times'),
(3, 3, 3, 4, 'Great hosts');