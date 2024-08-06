import { AllowedSchema } from "express-json-validator-middleware";
 
export const SignupSchema: AllowedSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                fullname: {
                    type: "string",
                },
                password: {
                    type: "string",
                    minLength: 4,
                },
                id: {
                    type: "string",
                    // format: "email",
                }
            },
            required: ["fullname", "password", "id"]
        }
    },
    required: ["data"]
}

export const SigninSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                password: {
                    type: "string",
                    minLength: 4,
                },
                id: {
                    type: "string",
                    // format: "email",
                }
            },
            required: ["password", "id"]
        }
    },
    required: ["data"]
}

export const LogoutSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                userID: {
                    type: "string",
                    // format: "uuid"
                },
                sessionID: {
                    type: "string",
                    // format: "uuid",
                }
            },
            required: ["userID", "sessionID"]
        }
    },
    required: ["data"]
}

export const RefreshSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                userID: {
                    type: "string"
                    // format: "uuid"
                },
                sessionID: {
                    type: "string"
                    // format: "uuid",
                },
                refreshToken: {
                    type: "string"
                }
            },
            required: ["userID", "sessionID", "refreshToken"]
        }
    },
    required: ["data"]
}

export const DeleteUserSchema = {
    type: "object",
    properties: {
        id: {
            type: "number",
            minimum: 1
        }
    },
    required: ["id"]
}

export const GetUserSchema = {
    type: "object",
    properties: {
        id: {
            type: "number",
            minimum: 1
        }
    },
    required: ["id"]
}