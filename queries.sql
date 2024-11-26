-- Creating basic table of hills --
CREATE TABLE hills (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE,
	height INT NOT NULL,
	mountain VARCHAR(100) NOT NULL,
	latitude DECIMAL(10,6) NOT NULL,
	longitude DECIMAL(10,6) NOT NULL
)
