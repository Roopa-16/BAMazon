DROP DATABASE IF EXISTS bamazom_DB;
CREATE database bamazon_DB;
USE bamazon_DB;
CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)
);
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES("Bananas","Grocery",01.25,150),
	("Cucumbers","Grocery",01.39,50),
    ("Carrots","Grocery",03.49,200),
    ("Demin Jeans","Clothing",39.99,15),
    ("Ripped Jeans","Clothing",54.25,35),
    ("Athletic T-Shirt","Clothing",20.00,42),
    ("MacBook Pro 15 inch","Technology",2,900.99,25),
    ("IPhone XR","Technology",749.00,50),
    ("Apple Watch","Technology",849.00,35),
    ("Jenga","Entertainment",12.99,20),
    ("Sequence","Entertainment",20.00,15),
    ("Monopoly","Entertainment",15.00,36);
SELECT * FROM bamazon_DB;
SELECT * FROM products;
    