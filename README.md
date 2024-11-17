**Mini CRM**

This is a Node.js-based API application that serves as a simplified CRM system to manage customer data and track orders. It includes functionalities for adding new customers and placing orders, with seamless integration into a MySQL database.

Features
- Customer Management: Add customers with details such as name, email, and phone.
- Order Management: Add orders linked to specific customers, while updating total spending and visit count.
- Data Persistence: Stores customer and order data in a MySQL database.
  
Technologies Used
- Backend: Node.js with Express.js
- Database: MySQL
- Unique IDs: uuid package for generating unique identifiers
- API Testing: Postman for sending requests and testing responses
  
Prerequisites
- Install Node.js (v20.4 or higher recommended)
- Install MySQL (v8.0.40 or higher recommended)
- Install Postman (optional, for API testing)

API Endpoints
- Customers API
POST /customers: Adds a new customer to the database.
Payload Example:
{
  "name": "Jim Halpert",
  "email": "jim@xeno.com",
  "phone": "2224312345"
}

- Orders API
POST /orders: Adds a new order linked to a customer, updating their total spending and visit count.
Payload Example:
{
    "customer_id": "(generated_customer_id)",
    "product": "smart phone",
    "amount": 45000

}

Run and Test
- Use Postman or a similar tool to send requests to the endpoints.
- Verify data is stored and updated in the database using SQL queries.
  
*Acknowledgments*
Thanks for the opportunity to work on this project. This implementation demonstrates core CRM functionalities and can be extended further for enhanced features.

