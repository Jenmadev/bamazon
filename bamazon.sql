DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
	item_id INTEGER (10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(500) NOT NULL,
    department_name VARCHAR (100) NOT NULL, 
    price INTEGER NOT NULL, 
    stock_quantity INTEGER NOT NULL,
    PRIMARY KEY (item_id)
);
SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Fitz and Floyd Luster Stemless Glasses (Set of 4), Gold", "Drinkware", 30, 10), 
("Moscow Mule Hammered Copper 18 Ounce Drinking Mug, Set of 4", "Drinkware", 20, 10),
("Cresimo 24-Ounce Stainless Steel Martini Cocktail Shaker and Jigger with Cocktail Recipes EBook", "Bar", 15, 50), 
("Rabbit Wine Opener", "Bar", 30, 100),
("50oz Wine Decanter", "Bar", 80, 20),
("Game of Throne 'Hand of the King' Bottole Opener", "Bar", 20, 50),
("Natural Bark Wine Rack", "Bar", 80, 10),
("Lemon Lime Squeezer", "Kitchen Appliances", 15, 200),
("Professional Series 750 Blender Finish: Copper", "Kitchen Appliances", 600, 20),
("Martini Glass Box Set of 2", "Drinkware", 25, 20);

