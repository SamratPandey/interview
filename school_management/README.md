#  School Management Assignment

A simple Node.js + Express + MySQL API to manage schools, allowing users to add new schools and fetch a list of schools sorted by proximity to a given location.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL 
- **ORM**: `mysql2`
- **Hosting**: Render 

---

##  Project Setup

### 1. Clone the Repository

```bash
https://github.com/SamratPandey/interview.git
cd school_management
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the folder same as .env.example

```env
PORT=8000
DB_HOST=your-db-host
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```

---

## Database Setup

Run this SQL in your MySQL instance to create the required table:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```

---

## API Documentation

### 1. Add School

**Endpoint**: `/api/v1/school/addSchool`  
**Method**: `POST`  
**Content-Type**: `application/json`

#### Request Body

```json
{
  "name": "Greenwood High",
  "address": "123 School Street, NY",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

#### Response

```json
{
  "message": "School added successfully"
}
```

---

### 2. List Schools by Proximity

**Endpoint**: `/api/v1/school/listSchools`  
**Method**: `GET`  
**Query Params**:

- `latitude`: User's latitude
- `longitude`: User's longitude

#### Example

```http
GET /api/v1/school/listSchools?latitude=40.73061&longitude=-73.935242
```

#### Response

```json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 School Street, NY",
    "latitude": 40.7128,
    "longitude": -74.006,
    "distance": 2.48
  }
  ...
]
```


### Live Link for both end point

Copy this API URL: https://school-management-sv6x.onrender.com/api/v1/school/addSchool

Copy this API URL: https://school-management-sv6x.onrender.com/api/v1/school/listSchools?latitude=12.5&longitude=7.9



### Postman Collection
A ready-to-import Postman collection

Copy this URL - https://.postman.co/workspace/Samrat~d06d0d2f-ce59-48a8-b959-a326f986b7c9/collection/27133718-6a483f08-ea8d-4f6e-80db-8428c82ad00d?action=share&creator=27133718

