const { Router } = require("express");
const schoolRouter = Router();
const db = require('../config/db');
// const { z } = require('zod');



//After getting this assignment this part is the most deficult for 
//Find the nearest schools to the given latitude and longitude
//For that I need a formula to calculate the distance between two points
// Haversine formula(I git this after reasearching)


const getDistence = (lat1, lon1, lat2, lon2) =>{
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}



schoolRouter.post('/addSchool', async (req, res) =>{
    const { name, address, latitude, longitude } = req.body;


    //Validation for every field, here i can use zod library also like this 
    // const schema = z.object({
    //     name: z.string().min(5),
    //     address: z.string().min(5),
    //     latitude: z.float().min(-90).max(90),
    //     longitude: z.float().min(-180).max(180)
    // })
    // const result = schema.safeParse(req.body);
    // if (!result.success) {
    //     return res.status(400).json({
    //         message: 'Invalid input',
    //     });

    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({
            message: "Invalid or missing 'name'"
        });
    }

    if (typeof address !== 'string' || address.trim() === '') {
        return res.status(400).json({
            message: "Invalid or missing 'address'"
        });
    }

    if (isNaN(latitude) || latitude === '' || latitude === null) {
        return res.status(400).json({
            message: "Invalid 'latitude'"
        });
    }

    if (isNaN(longitude) || longitude === '' || longitude === null) {
        return res.status(400).json({
            message: "Invalid 'longitude'"
        });
    }
    try {
        const [response] = await db.execute('INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)', [name, address, latitude, longitude]); 
        res.status(200).json({
            message: "School created successfully",
            id: response.insertId
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        })
    }
})

schoolRouter.get('/listSchools', async (req, res) => {
    
    const {latitude, longitude} = req.query;


    //same validation as above
    if (isNaN(latitude) || latitude === '' || latitude === null) {
        return res.status(400).json({
            message: "Invalid 'latitude'"
        });
    }
    if (isNaN(longitude) || longitude === '' || longitude === null) {
        return res.status(400).json({
            message: "Invalid 'longitude'"
        });
    }

    try {
        const [schools] = await db.execute('SELECT * FROM schools');
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        //This part will calculate the distance between the user and the schools
        //and sort the schools by distance
        const shortedSchools = schools.map(school => ({
                ...school,
                distance: getDistence(userLatitude, userLongitude, school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            message: "Schools fetched successfully",
            data: shortedSchools
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }



})


module.exports = {
    schoolRouter: schoolRouter
}