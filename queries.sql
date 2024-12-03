-- Creating basic table of hills --
CREATE TABLE hills (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE,
	height INT NOT NULL,
	mountain VARCHAR(100) NOT NULL,
	latitude DECIMAL(10,6) NOT NULL,
	longitude DECIMAL(10,6) NOT NULL
)

-- Inserting starting records --
INSERT INTO hills (name, height, mountain, latitude, longitude) VALUES ('Sněžka', 1603, 'Krkonoše', 50.736111, 15.739722),
('Praděd', 1491, 'Hrubý Jeseník', 50.083056, 17.230833),
('Lysá hora', 1324, 'Moravskoslezské Beskydy', 49.546111, 18.447222), 
('Klínovec', 1244, 'Krušné hory', 50.396389, 12.967778), 
('Kralický Sněžník', 1423, 'Kralický Sněžník', 50.2075, 16.8475);

-- Creating users table --
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100)
)