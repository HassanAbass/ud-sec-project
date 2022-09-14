import supertest from "supertest";
import { UNAUTHORIZED_CODE } from "../constants";
import { validateNumber } from "../helpers/request";
import app from "../server";

const request = supertest(app);

describe("Test API endpoints functionality", () => {
    it("check users endpoint is tokentized", async () => {
        const response = await request.post("/users");
        expect(response.status).toBe(UNAUTHORIZED_CODE);
    });

    it("check products endpoint is tokentized", async () => {
        const response = await request.post("/products");
        expect(response.status).toBe(UNAUTHORIZED_CODE);
    });

    it("check orders endpoint is tokentized", async () => {
        const response = await request.post("/products");
        expect(response.status).toBe(UNAUTHORIZED_CODE);
    });

    it("validate number is positive, non zero", async () => {
        expect(validateNumber("-1")).toEqual(false);
        expect(validateNumber("0")).toEqual(false);
        expect(validateNumber("100a")).toEqual(false);
        expect(validateNumber("00")).toEqual(false);
        expect(validateNumber("100")).toEqual(true);
    });
});
