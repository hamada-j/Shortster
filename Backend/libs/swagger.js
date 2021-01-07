'use strict';

const options = {
    swaggerDefinition: {
        "description": "Short and unique ID generate for a URL API",
        "contact": {
            name: "Hamada",
            github: "https://github.com/hamada-j"
        },
        
        "info": {
            "title": "MovingWorlds Challenge" ,
            "version": "1.0.0"
        },
        servers: ["http://localhost:3000"],
        responses: {
            '200': {
                description: "Success response."
            },
            '400': {
                description: "Information is missing or invalid."
            }

        }
    },

    "apis": ['./routes/routes.js'] // Path to the API docs

};

module.exports = options
