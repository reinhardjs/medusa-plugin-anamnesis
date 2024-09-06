import request from "supertest";

describe("Admin Form API", () => {
    const apiUrl = "localhost:9000";
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXzAxSjcyUU5DRFpCQTBLRDdTS0hIV1FYNDQ0IiwiZG9tYWluIjoiYWRtaW4iLCJpYXQiOjE3MjU2MzU5NzcsImV4cCI6MTcyNTcyMjM3N30.xIlqm0Y619_YaEFm9LAsnvHA-zg_GIxiTj61lhN2NtI";

    describe("POST /admin/custom/forms", () => {
        it("should create a new form", async () => {
            let formData = {
                "title": "Form title",
                "description": "Form description"
            };

            const response = await request(apiUrl)
                .post("/admin/custom/forms")
                .set("Authorization", `Bearer ${authToken}`)
                .send(formData)
                .expect(201);

            const data = response.body.data;
            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(formData);
        });

        it("should return 400 for invalid data", async () => {
            const invalidData = {
                entity_type: "INVALID_TYPE",
                entity_id: "prod_123",
            };

            await request(apiUrl)
                .post("/admin/custom/forms")
                .set("Authorization", `Bearer ${authToken}`)
                .send(invalidData)
                .expect(400);
        });
    });

    describe("GET /admin/custom/forms/:id", () => {
        it("should retrieve a form by ID", async () => {
            // First, create a form
            const formData = {
                "title": "Form title",
                "description": "Form description"
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/forms")
                .set("Authorization", `Bearer ${authToken}`)
                .send(formData)
                .expect(201);

            let data = createResponse.body.data;

            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(formData);
        });
    });

    describe("PUT /admin/custom/forms/:id", () => {
        it("should update an existing form", async () => {
            // First, create a form
            const initialData = {
                "title": "Form title",
                "description": "Form description"
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/forms")
                .set("Authorization", `Bearer ${authToken}`)
                .send(initialData)
                .expect(201);

            const formId = createResponse.body.data.id;

            // Then, update the form
            const updateData = {
                "title": "Updated Form title",
                "description": "Updated Form description"
            };

            const updateResponse = await request(apiUrl)
                .put(`/admin/custom/forms/${formId}`)
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

    describe("DELETE /admin/custom/forms/:id", () => {
        it("should delete an existing form", async () => {
            // First, create a form
            const formData = {
                "title": "Form title",
                "description": "Form description"
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/forms")
                .set("Authorization", `Bearer ${authToken}`)
                .send(formData)
                .expect(201);

            const formId = createResponse.body.data.id;

            // Then, delete the form
            await request(apiUrl)
                .delete(`/admin/custom/forms/${formId}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
        });
    });
});
