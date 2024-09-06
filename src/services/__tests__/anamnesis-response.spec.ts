import AnamnesisResponseService from '../anamnesis-response';
import { CreateAnamnesisResponseDto, UpdateAnamnesisResponseDto } from '../../common/dtos/anamnesis-response';

jest.mock('../../repositories/anamnesis-response');

describe('AnamnesisResponseService', () => {
    let service: AnamnesisResponseService;
    let mockContainer: any;

    beforeEach(() => {
        mockContainer = {
            anamnesisResponseRepository: {
                create: jest.fn(),
                save: jest.fn(),
                find: jest.fn(),
                findOne: jest.fn(),
                remove: jest.fn(),
            },
        };
        service = new AnamnesisResponseService(mockContainer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new anamnesis response', async () => {
            const dto: CreateAnamnesisResponseDto = {
                customer_id: 'customer123',
                order_id: 'order123',
                form_id: 'form123',
                responses: [{ question_id: 'q1', answer: 'a1' }],
            };
            const mockResponse = { ...dto, id: 'response123', form: { id: 'form123' } };

            mockContainer.anamnesisResponseRepository.create.mockReturnValue(mockResponse);
            mockContainer.anamnesisResponseRepository.save.mockResolvedValue(mockResponse);

            const result = await service.create(dto);

            expect(mockContainer.anamnesisResponseRepository.create).toHaveBeenCalledWith(dto);
            expect(mockContainer.anamnesisResponseRepository.save).toHaveBeenCalledWith(mockResponse);
            expect(result).toEqual({ ...mockResponse, form: undefined });
        });
    });

    describe('list', () => {
        it('should return a list of anamnesis responses', async () => {
            const mockResponses = [
                { id: 'response1', customer_id: 'customer1' },
                { id: 'response2', customer_id: 'customer2' },
            ];

            mockContainer.anamnesisResponseRepository.find.mockResolvedValue(mockResponses);

            const result = await service.list();

            expect(mockContainer.anamnesisResponseRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockResponses);
        });
    });

    describe('get', () => {
        it('should retrieve an anamnesis response by id', async () => {
            const mockResponse = { id: 'response123', customer_id: 'customer123' };

            mockContainer.anamnesisResponseRepository.findOne.mockResolvedValue(mockResponse);

            const result = await service.get('response123');

            expect(mockContainer.anamnesisResponseRepository.findOne).toHaveBeenCalledWith({ where: { id: 'response123' } });
            expect(result).toEqual(mockResponse);
        });

        it('should return null if response is not found', async () => {
            mockContainer.anamnesisResponseRepository.findOne.mockResolvedValue(null);

            const result = await service.get('nonexistent');

            expect(mockContainer.anamnesisResponseRepository.findOne).toHaveBeenCalledWith({ where: { id: 'nonexistent' } });
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update an existing anamnesis response', async () => {
            const id = 'response123';
            const dto: UpdateAnamnesisResponseDto = {
                customer_id: 'updatedCustomer',
                order_id: 'updatedOrder',
                form_id: 'updatedForm',
                responses: [{ question_id: 'q2', answer: 'a2' }],
            };
            const existingResponse = { id, customer_id: 'oldCustomer', order_id: 'oldOrder', form_id: 'oldForm', responses: [] };
            const updatedResponse = { ...existingResponse, ...dto, form: { id: 'updatedForm' } };

            mockContainer.anamnesisResponseRepository.findOne.mockResolvedValue(existingResponse);
            mockContainer.anamnesisResponseRepository.save.mockResolvedValue(updatedResponse);

            const result = await service.update(id, dto);

            expect(mockContainer.anamnesisResponseRepository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(mockContainer.anamnesisResponseRepository.save).toHaveBeenCalledWith(updatedResponse);
            expect(result).toEqual({ ...updatedResponse, form: undefined });
        });

        it('should throw an error if the response is not found', async () => {
            mockContainer.anamnesisResponseRepository.findOne.mockResolvedValue(null);

            await expect(service.update('nonexistent', {} as UpdateAnamnesisResponseDto)).rejects.toThrow('Anamnesis response not found');
        });
    });

    describe('delete', () => {
        it('should delete an anamnesis response', async () => {
            const mockResponse = { id: 'response123', customer_id: 'customer123' };

            mockContainer.anamnesisResponseRepository.findOne.mockResolvedValue(mockResponse);
            mockContainer.anamnesisResponseRepository.remove.mockResolvedValue(mockResponse);

            const result = await service.delete('response123');

            expect(mockContainer.anamnesisResponseRepository.findOne).toHaveBeenCalledWith({ where: { id: 'response123' } });
            expect(mockContainer.anamnesisResponseRepository.remove).toHaveBeenCalledWith(mockResponse);
            expect(result).toEqual(mockResponse);
        });

        it('should throw an error if the response is not found', async () => {
            mockContainer.anamnesisResponseRepository.findOne.mockResolvedValue(null);

            await expect(service.delete('nonexistent')).rejects.toThrow('Anamnesis response not found');
        });
    });
});
