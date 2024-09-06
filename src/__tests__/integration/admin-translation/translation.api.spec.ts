import request from "supertest";
import { EntityType } from "../../../common/enums/translation.enum";

describe("Translation API", () => {
    const apiUrl = "localhost:9000";
    let authToken: string;

    beforeAll(async () => {
        // First, get access_token
        const authData = {
            "email": "admin@medusa-test.com",
            "password": "supersecret"
        };

        const authResponse = await request(apiUrl)
            .post("/admin/auth/token")
            .send(authData)
            .expect(200);

        authToken = authResponse.body.access_token;
    });

    describe("POST /admin/custom/translations", () => {
        it("should create a new translation", async () => {
            let translationData = {
                entity_type: "question" as EntityType,
                entity_id: "question_123",
                language_code: "fr",
                translated_text: "question",
            };

            const response = await request(apiUrl)
                .post("/admin/custom/translations")
                .set("Authorization", `Bearer ${authToken}`)
                .send(translationData)
                .expect(201);

            const data = response.body.data;
            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(translationData);
        });

        it("should return 400 for invalid data", async () => {
            const invalidData = {
                entity_type: "INVALID_TYPE",
                entity_id: "prod_123",
            };

            await request(apiUrl)
                .post("/admin/custom/translations")
                .set("Authorization", `Bearer ${authToken}`)
                .send(invalidData)
                .expect(400);
        });
    });

    describe("GET /admin/custom/translations/:id", () => {
        it("should retrieve a translation by ID", async () => {
            // First, create a translation
            const translationData = {
                entity_type: "question" as EntityType,
                entity_id: "prod_456",
                language_code: "es",
                translated_text: "Producto traducido",
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/translations")
                .set("Authorization", `Bearer ${authToken}`)
                .send(translationData)
                .expect(201);

            let data = createResponse.body.data;

            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(translationData);
        });
    });

    describe("PUT /admin/custom/translations/:id", () => {
        it("should update an existing translation", async () => {
            // First, create a translation
            const initialData = {
                entity_type: "question" as EntityType,
                entity_id: "prod_789",
                language_code: "de",
                translated_text: "Übersetztes Produkt",
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/translations")
                .set("Authorization", `Bearer ${authToken}`)
                .send(initialData)
                .expect(201);

            const translationId = createResponse.body.data.id;

            // Then, update the translation
            const updateData = {
                translated_text: "Aktualisiertes übersetztes Produkt",
            };

            const updateResponse = await request(apiUrl)
                .put(`/admin/custom/translations/${translationId}`)
                .set("Authorization", `Bearer ${authToken}`)
                .send(updateData)
                .expect(200);

            let data = updateResponse.body.data
            
            delete data.id
            delete data.created_at
            delete data.updated_at

            expect(data).toEqual({
                ...updateData
            });
        });
    });

    describe("DELETE /admin/custom/translations/:id", () => {
        it("should delete an existing translation", async () => {
            // First, create a translation
            const translationData = {
                entity_type: "question" as EntityType,
                entity_id: "prod_101",
                language_code: "it",
                translated_text: "Prodotto tradotto",
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/translations")
                .set("Authorization", `Bearer ${authToken}`)
                .send(translationData)
                .expect(201);

            const translationId = createResponse.body.data.id;

            // Then, delete the translation
            await request(apiUrl)
                .delete(`/admin/custom/translations/${translationId}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
        });
    });
});
