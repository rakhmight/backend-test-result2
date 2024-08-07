import { AllowedSchema } from "express-json-validator-middleware";

export const AuthHeadersSchema = {
    type: "object",
    properties: {
      Authorization: {
        type: "string",
        description: "Access token (Bearer ...)"
      },
    },
    required: ["Authorization"],
  };

export const SignupSchema: AllowedSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                fullName: {
                    type: "string"
                },
                password: {
                    type: "string",
                    minLength: 4
                },
                id: {
                    type: "string"
                }
            },
            required: ["fullName", "password", "id"]
        }
    },
    required: ["data"]
}

export const SigninSchema: AllowedSchema = {
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

export const LogoutSchema: AllowedSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                userID: {
                    type: "number",
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