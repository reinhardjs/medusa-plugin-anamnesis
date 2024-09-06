import request from "supertest";

describe("Translation API", () => {
    const apiUrl = "localhost:9000";
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNyXzAxSjcyUU5DRFpCQTBLRDdTS0hIV1FYNDQ0IiwiZG9tYWluIjoiYWRtaW4iLCJpYXQiOjE3MjU2MzU5NzcsImV4cCI6MTcyNTcyMjM3N30.xIlqm0Y619_YaEFm9LAsnvHA-zg_GIxiTj61lhN2NtI";

    let formId: string;
    let sectionId: string;

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
    });

    describe("POST /admin/custom/questions", () => {
        it("should create a new question", async () => {

            let questionData = {
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

            const response = await request(apiUrl)
                .post("/admin/custom/questions")
                .set("Authorization", `Bearer ${authToken}`)
                .send(questionData)
                .expect(201);

            const data = response.body.data;
            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(questionData);
        });

        it("should return 400 for invalid data", async () => {
            const invalidData = {
            };

            await request(apiUrl)
                .post("/admin/custom/questions")
                .set("Authorization", `Bearer ${authToken}`)
                .send(invalidData)
                .expect(400);
        });
    });

    describe("GET /admin/custom/questions/:id", () => {
        it("should retrieve a question by ID", async () => {
            // First, create a question
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

            let data = createResponse.body.data;

            delete data.id
            delete data.created_at
            delete data.updated_at;

            expect(data).toEqual(questionData);
        });
    });

    describe("PUT /admin/custom/questions/:id", () => {
        it("should update an existing question", async () => {
            // First, create a question
            const initialData = {
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
                .send(initialData)
                .expect(201);

            const questionId = createResponse.body.data.id;

            // Then, update the question
            const updateData = {
                "question_text": "updated question text",
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

            const updateResponse = await request(apiUrl)
                .put(`/admin/custom/questions/${questionId}`)
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

    describe("DELETE /admin/custom/questions/:id", () => {
        it("should delete an existing question", async () => {
            // First, create a question
            const initialData =  {
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
                .send(initialData)
                .expect(201);

            const questionId = createResponse.body.data.id;

            // Then, delete the question
            await request(apiUrl)
                .delete(`/admin/custom/questions/${questionId}`)
                .set("Authorization", `Bearer ${authToken}`)
                .expect(200);
        });
    });
});
