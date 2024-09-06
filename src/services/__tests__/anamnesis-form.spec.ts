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
});
