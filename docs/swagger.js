const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API config info
 */
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Documentacion de mi API Curso NODE Rest",
        version: "1.0.0",
    },
    servers: [
        {
            url: "http://localhost:3002/api"
        }
    ],
    components:{
        securitySchemes:{
            bearerAuth:{
                type:"http",
                scheme:"bearer",
            }
        },
        schemas: {
            track:{
                type:"object",
                required:["name","albun","cover","artis","duration","mediaId"],
                properties: {
                    name:{
                        type:"string",
                    },
                    album:{
                        type:"string"
                    },
                    cover:{
                        type:"string"
                    },
                    artist:{
                        type:"object",
                        properties:{
                            name:{
                                type:"string"
                            },
                            nickname:{
                                type:"string"
                            },
                            nationality:{
                                type:"string"
                            }
                        }
                    },
                    duration:{
                        type:"object",
                        properties:{
                            start:{
                                type:"integer"
                            },
                            end:{
                                type:"end"
                            }
                        }
                    },
                    mediaId:{
                        type:"string"
                    }
                }
            },
            storage:{
                type:"object",
                required:["url","filename"],
                properties:{
                    url:{
                        type:"string"
                        },
                    filename:{
                        type:"string"
                    }
                }
            },
            authLogin:{
                type:"object",
                required:["email","password"],
                properties:{
                    email:{
                        type:"string",
                    },
                    password:{
                        type:"string"
                    }
                }
            },
            authRegister:{
                type:"object",
                required: ["name", "age", "email", "password"],
                properties:{
                    name:{
                        type:"string"
                    },
                    age:{
                        type:"integer",
                    },
                    email:{
                        type:"string"
                    },
                    password:{
                        type:"string",
                    },
                }
            }
        },
    },


}

/**
 * Opciones
 */
const options = {
    swaggerDefinition,
    apis:[
        // todo lo que esta en routes y termine en .js
        "./routes/*.js"
    ]
}

const openApiConfig = swaggerJsdoc(options);

module.exports = openApiConfig;