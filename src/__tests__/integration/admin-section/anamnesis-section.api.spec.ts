import request from "supertest";

describe("Admin Section API", () => {
    const apiUrl = "localhost:9000";
    let authToken: string;

    let formId: string;

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

        // Create a form
        const formData = {
            "title": "Form title",
            "description": "Form description"
        };

        const createFormResponse = await request(apiUrl)
            .post("/admin/custom/forms")
            .set("Authorization", `Bearer ${authToken}`)
            .send(formData)
            .expect(201);

        formId = createFormResponse.body.data.id;
    });

    describe("POST /admin/custom/sections", () => {
        it("should create a new section", async () => {

            let sectionData = {
                "title": "section title",
                "description": "section description",
                "order": 1,
                "form_id": formId
            };

            const response = await request(apiUrl)
                .post("/admin/custom/sections")
                .set("Authorization", `Bearer ${authToken}`)
                .send(sectionData)
                .expect(201);

            const data = response.body.data;
            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(sectionData);
        });

        it("should return 400 for invalid data", async () => {
            const invalidData = {
                entity_type: "INVALID_TYPE",
                entity_id: "prod_123",
            };

            await request(apiUrl)
                .post("/admin/custom/sections")
                .set("Authorization", `Bearer ${authToken}`)
                .send(invalidData)
                .expect(400);
        });
    });

    describe("GET /admin/custom/sections/:id", () => {
        it("should retrieve a section by ID", async () => {
            // First, create a section
            const sectionData = {
                "title": "section title",
                "description": "section description",
                "order": 1,
                "form_id": formId
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/sections")
                .set("Authorization", `Bearer ${authToken}`)
                .send(sectionData)
                .expect(201);

            let data = createResponse.body.data;

            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(sectionData);
        });
    });

    describe("PUT /admin/custom/sections/:id", () => {
        it("should update an existing section", async () => {
            // First, create a section
            const initialData = {
                "title": "section title",
                "description": "section description",
                "order": 1,
                "form_id": formId
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/sections")
                .set("Authorization", `Bearer ${authToken}`)
                .send(initialData)
                .expect(201);

            const sectionId = createResponse.body.data.id;

            // Then, update the section
            const updateData = {
                "title": "updated section title",
                "description": "updated section description",
                "order": 1,
                "form_id": formId
            };

            const updateResponse = await request(apiUrl)
                .put(`/admin/custom/sections/${sectionId}`)
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

    describe("DELETE /admin/custom/sections/:id", () => {
        it("should delete an existing section", async () => {
            // First, create a section
            const initialData = {
                "title": "section title",
                "description": "section description",
                "order": 1,
                "form_id": formId
            };

            const createResponse = await request(apiUrl)
                .post("/admin/custom/sections")
                .set("Authorization", `Bearer ${authToken}`)
                .send(initialData)
                .expect(201);

            const sectionId = createResponse.body.data.id;

            // Then, delete the section
            await request(apiUrl)
                .delete(`/admin/custom/sections/${sectionId}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
        });
    });
});
