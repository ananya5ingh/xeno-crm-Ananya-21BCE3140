// Required imports
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiger",
    database: "crmdb",
});

// Add Customer
app.post("/customers", (req, res) => {
    const {
        //customer_id,
        name,
        email,
        phone,
        total_spent = 0,
        visit_count = 0,
        last_visit_date,
        created_at
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
        return res.status(400).json({ error: "Name, email, and phone are required." });
    }

    // Create a new customer object
    const customer = {
        customer_id:uuidv4(),
        name,
        email,
        phone,
        total_spent,
        visit_count,
        last_visit_date,
        created_at,
    };

    // SQL query to insert the customer
    const query = `INSERT INTO customers (customer_id, name, email, phone, total_spent, visit_count, last_visit_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) `;

    // Execute the query
    db.query(
        query,
        [
            customer.customer_id,
            customer.name,
            customer.email,
            customer.phone,
            customer.total_spent,
            customer.visit_count,
            customer.last_visit_date,
            customer.created_at,
        ],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: "Customer added successfully",
                customer,
            });
        }
    );
});

// Add Order
app.post("/orders", (req, res) => {
    const { customer_id, product, amount } = req.body;

    db.query(`SELECT * FROM customers WHERE customer_id = ?`, [customer_id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }

        const order = {
            order_id: uuidv4(),
            customer_id,
            product,
            amount,
        };

        const query = `INSERT INTO orders SET ?`;
        db.query(query, order, (err) => {
            if (err) return res.status(500).json({ error: err.message });

            // Update Customer Data
            const updateQuery = `
                UPDATE customers 
                SET total_spent = total_spent + ?, 
                    visit_count = visit_count + 1, 
                    last_visit_date = NOW() 
                WHERE customer_id = ?`;
            db.query(updateQuery, [amount, customer_id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: "Order added", order });
            });
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

