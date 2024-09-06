import request from "supertest";

describe("Store Response API", () => {
    const apiUrl = "localhost:9000";
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXzAxSjcyUU5DRFpCQTBLRDdTS0hIV1FYNDQ0IiwiZG9tYWluIjoiYWRtaW4iLCJpYXQiOjE3MjU2MzU5NzcsImV4cCI6MTcyNTcyMjM3N30.xIlqm0Y619_YaEFm9LAsnvHA-zg_GIxiTj61lhN2NtI";

    let formId: string;
    let sectionId: string;
    let questionId: string;

    beforeAll(async () => {
        // First, create a form
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

        // create a section
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

        sectionId = response.body.data.id;

        // Create a question
        const questionData = {
            "question_text": "question text",
            "question_type": "select",
            "options": [
                {
                    "option_name": "asdf",
                    "options": ["A.", "B.", "C."],
                    "others": {}
                }
            ],
            "section_id": sectionId
        };

        const createResponse = await request(apiUrl)
            .post("/admin/custom/questions")
            .set("Authorization", `Bearer ${authToken}`)
            .send(questionData)
            .expect(201);

        questionId = createResponse.body.data.id;
    });

    describe("POST /store/custom/responses", () => {
        it("should create a new response", async () => {

            let responseData = {
                "customer_id": "customer_01J733HSZ1C85636315ST0216Z",
                "order_id": "order_01J733J016WVPBBFPEE2HJMRYX",
                "form_id": formId,
                "responses": [
                    {
                        "question_id": questionId,
                        "answer": "This is an answer"
                    }
                ]
            };

            const response = await request(apiUrl)
                .post("/store/custom/responses")
                .set("Authorization", `Bearer ${authToken}`)
                .send(responseData)
                .expect(201);

            const data = response.body.data;
            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(responseData);
        });

        it("should return 400 for invalid data", async () => {
            const invalidData = {
            };

            await request(apiUrl)
                .post("/store/custom/responses")
                .set("Authorization", `Bearer ${authToken}`)
                .send(invalidData)
                .expect(400);
        });
    });

    describe("GET /store/custom/responses/:id", () => {
        it("should retrieve a response by ID", async () => {
            // First, create a response
            const responseData = {
                "customer_id": "customer_01J733HSZ1C85636315ST0216Z",
                "order_id": "order_01J733J016WVPBBFPEE2HJMRYX",
                "form_id": formId,
                "responses": [
                    {
                        "question_id": questionId,
                        "answer": "This is an answer"
                    }
                ]
            };

            const createResponse = await request(apiUrl)
                .post("/store/custom/responses")
                .set("Authorization", `Bearer ${authToken}`)
                .send(responseData)
                .expect(201);

            let data = createResponse.body.data;

            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(responseData);
        });
    });

    describe("PUT /store/custom/responses/:id", () => {
        it("should update an existing response", async () => {
            // First, create a response
            const initialData = {
                "customer_id": "customer_01J733HSZ1C85636315ST0216Z",
                "order_id": "order_01J733J016WVPBBFPEE2HJMRYX",
                "form_id": formId,
                "responses": [
                    {
                        "question_id": questionId,
                        "answer": "This is an answer"
                    }
                ]
            };

            const createResponse = await request(apiUrl)
                .post("/store/custom/responses")
                .set("Authorization", `Bearer ${authToken}`)
                .send(initialData)
                .expect(201);

            const responseId = createResponse.body.data.id;

            // Then, update the response
            const updateData = {
                "customer_id": "customer_01J733HSZ1C85636315ST0216Z",
                    "order_id": "order_01J733J016WVPBBFPEE2HJMRYX",
                    "form_id": formId,
                    "responses": [
                    {
                        "question_id": questionId,
                        "answer": "This is an updated answer"
                    }
                ]
            };

            const updateResponse = await request(apiUrl)
                .put(`/store/custom/responses/${responseId}`)
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

    describe("DELETE /store/custom/responses/:id", () => {
        it("should delete an existing response", async () => {
            // First, create a response
            const initialData = {
                "customer_id": "customer_01J733HSZ1C85636315ST0216Z",
                "order_id": "order_01J733J016WVPBBFPEE2HJMRYX",
                "form_id": formId,
                "responses": [
                    {
                        "question_id": questionId,
                        "answer": "This is an answer"
                    }
                ]
            };

            const createResponse = await request(apiUrl)
                .post("/store/custom/responses")
                .set("Authorization", `Bearer ${authToken}`)
                .send(initialData)
                .expect(201);

            const responseId = createResponse.body.data.id;

            // Then, delete the response
            await request(apiUrl)
                .delete(`/store/custom/responses/${responseId}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
        });
    });
});
