// anamnesis-form-service.test.ts

import AnamnesisFormService from '../anamnesis-form'; // Adjust the import path as necessary

jest.mock('../../repositories/anamnesis-form');

describe('AnamnesisFormService', () => {
    let service: AnamnesisFormService;
    let mockContainer: any;

    beforeEach(() => {
        mockContainer = {
            anamnesisFormRepository: {
                create: jest.fn(),
                save: jest.fn(),
                find: jest.fn(),
                findOne: jest.fn(),
                remove: jest.fn(),
                getAdminFormTemplateById: jest.fn(),
            },
        };
        service = new AnamnesisFormService(mockContainer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new anamnesis form', async () => {
            const formData = { title: 'Test Title', description: 'Test Description' };
            const mockForm = { ...formData };

            // Mock the repository methods
            mockContainer.anamnesisFormRepository.create.mockReturnValue(mockForm);
            mockContainer.anamnesisFormRepository.save.mockResolvedValue(mockForm);

            const result = await service.create(formData);

            expect(mockContainer.anamnesisFormRepository.create).toHaveBeenCalledWith(formData);
            expect(mockContainer.anamnesisFormRepository.save).toHaveBeenCalledWith(mockForm);
            expect(result).toEqual(mockForm);
        });
    });

    describe('list', () => {
        it('should return a list of anamnesis forms', async () => {
            const mockForms = [
                { title: 'Form 1', description: 'Description 1' },
                { title: 'Form 2', description: 'Description 2' },
            ];

            // Mock the repository method
            mockContainer.anamnesisFormRepository.find.mockResolvedValue(mockForms);

            const result = await service.list();

            expect(mockContainer.anamnesisFormRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockForms);
        });
    });

    describe('get', () => {
        it('should retrieve an anamnesis form by ID', async () => {
            const mockForm = { id: '1', title: 'Test Form', description: 'Test Description' };
            mockContainer.anamnesisFormRepository.findOne.mockResolvedValue(mockForm);

            const result = await service.get('1');

            expect(mockContainer.anamnesisFormRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(result).toEqual(mockForm);
        });

        it('should return null if no form is found', async () => {
            mockContainer.anamnesisFormRepository.findOne.mockResolvedValue(null);

            const result = await service.get('nonexistent');

            expect(mockContainer.anamnesisFormRepository.findOne).toHaveBeenCalledWith({ where: { id: 'nonexistent' } });
            expect(result).toBeNull();
        });
    });

    describe('getAdminFormTemplateById', () => {
        const formId = "anamnesis_form_01J7GMAM0TV1SDM2HW212507XG";
        
        it('should return admin form templates', async () => {
            const mockAdminTemplates = {
                id: formId,
                title: "Form title",
                description: "Form description",
                created_at: "2024-09-11T13:28:21.785Z",
                updated_at: "2024-09-11T13:28:21.785Z",
                sections: [
                    {
                        id: "anamnesis_section_01J7GMBJYJBHYDJMXV0284ZWZV",
                        title: "section title",
                        description: "section description",
                        order: 1,
                        form_id: "anamnesis_form_01J7GMAM0TV1SDM2HW212507XG",
                        created_at: "2024-09-11T13:28:53.456Z",
                        updated_at: "2024-09-11T13:28:53.456Z",
                        questions: [
                            {
                                id: "anamnesis_question_01J7GMC4KNZWPZZFCC47HA8ZHZ",
                                section_id: "anamnesis_section_01J7GMBJYJBHYDJMXV0284ZWZV",
                                question_text: "question text",
                                question_type: "select",
                                options: [
                                    {
                                        others: {},
                                        options: [
                                            "A.",
                                            "B.",
                                            "C."
                                        ],
                                        option_name: "asdf"
                                    }
                                ],
                                created_at: "2024-09-11T13:29:11.542Z",
                                updated_at: "2024-09-11T13:29:11.542Z"
                            }
                        ]
                    }
                ]
            };

            mockContainer.anamnesisFormRepository.getAdminFormTemplateById.mockResolvedValue(mockAdminTemplates);

            const result = await service.getAdminFormTemplateById(formId);

            expect(mockContainer.anamnesisFormRepository.getAdminFormTemplateById).toHaveBeenCalledWith(formId);
            expect(result).toEqual(mockAdminTemplates);
        });

        it('should return a null if admin template is not found', async () => {
            mockContainer.anamnesisFormRepository.getAdminFormTemplateById.mockResolvedValue(null);

            const result = await service.getAdminFormTemplateById(formId);

            expect(mockContainer.anamnesisFormRepository.getAdminFormTemplateById).toHaveBeenCalledWith(formId);
            expect(result).toEqual(null);
        });

        it('should throw an error if the repository method fails', async () => {
            const errorMessage = 'Database error';
            mockContainer.anamnesisFormRepository.getAdminFormTemplateById.mockRejectedValue(new Error(errorMessage));

            await expect(service.getAdminFormTemplateById(formId)).rejects.toThrow(errorMessage);
        });
    });

    describe('update', () => {
        it('should update an existing anamnesis form', async () => {
            const existingForm = { id: '1', title: 'Old Title', description: 'Old Description' };
            const updateData = { title: 'New Title' };
            const updatedForm = { ...existingForm, ...updateData };

            mockContainer.anamnesisFormRepository.findOne.mockResolvedValue(existingForm);
            mockContainer.anamnesisFormRepository.save.mockResolvedValue(updatedForm);

            const result = await service.update('1', updateData);

            expect(mockContainer.anamnesisFormRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(mockContainer.anamnesisFormRepository.save).toHaveBeenCalledWith(updatedForm);
            expect(result).toEqual(updatedForm);
        });

        it('should throw an error if the form to update is not found', async () => {
            mockContainer.anamnesisFormRepository.findOne.mockResolvedValue(null);

            await expect(service.update('nonexistent', { title: 'New Title' })).rejects.toThrow('Anamnesis form not found');
        });
    });

    describe('delete', () => {
        it('should delete an existing anamnesis form', async () => {
            const existingForm = { id: '1', title: 'Test Form', description: 'Test Description' };

            mockContainer.anamnesisFormRepository.findOne.mockResolvedValue(existingForm);
            mockContainer.anamnesisFormRepository.remove.mockResolvedValue(existingForm);

            const result = await service.delete('1');

            expect(mockContainer.anamnesisFormRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
            expect(mockContainer.anamnesisFormRepository.remove).toHaveBeenCalledWith(existingForm);
            expect(result).toEqual(existingForm);
        });

        it('should throw an error if the form to delete is not found', async () => {
            mockContainer.anamnesisFormRepository.findOne.mockResolvedValue(null);

            await expect(service.delete('nonexistent')).rejects.toThrow('Anamnesis form not found');
        });
    });
});
