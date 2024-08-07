import { AllowedSchema } from "express-json-validator-middleware";

export const FileUpdateSchema: AllowedSchema = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                id: {
                    type: "number"
                },
                userID: {
                    type: "number"
                }
            },
            required: ["id", "userID"]
        }
    },
    required: ["data"]
}