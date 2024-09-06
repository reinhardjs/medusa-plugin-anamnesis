import AnamnesisQuestionService from '../anamnesis-question';
import { CreateAnamnesisQuestionDto, UpdateAnamnesisQuestionDto } from '../../common/dtos/anamnesis-question';
import { QuestionType } from '../../common/enums/anamnesis-question.enum';

jest.mock('../../repositories/anamnesis-question');

describe('AnamnesisQuestionService', () => {
    let service: AnamnesisQuestionService;
    let mockContainer: any;

    beforeEach(() => {
        mockContainer = {
            anamnesisQuestionRepository: {
                create: jest.fn(),
                save: jest.fn(),
                find: jest.fn(),
                findOne: jest.fn(),
                remove: jest.fn(),
            },
        };
        service = new AnamnesisQuestionService(mockContainer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new anamnesis question', async () => {
            const dto: CreateAnamnesisQuestionDto = {
                question_text: 'Test question',
                question_type: 'form' as QuestionType,
                options: ['Option 1', 'Option 2'],
                section_id: 'section123',
            };
            const mockQuestion = { ...dto, id: 'question123', section: { id: 'section123' } };

            mockContainer.anamnesisQuestionRepository.create.mockReturnValue(mockQuestion);
            mockContainer.anamnesisQuestionRepository.save.mockResolvedValue(mockQuestion);

            const result = await service.create(dto);

            expect(mockContainer.anamnesisQuestionRepository.create).toHaveBeenCalledWith({
                ...dto,
                section: { id: dto.section_id },
                section_id: dto.section_id,
            });
            expect(mockContainer.anamnesisQuestionRepository.save).toHaveBeenCalledWith(mockQuestion);
            expect(result).toEqual({ ...mockQuestion, section: undefined });
        });
    });

    describe('list', () => {
        it('should return a list of anamnesis questions', async () => {
            const mockQuestions = [
                { id: 'question1', question_text: 'Question 1' },
                { id: 'question2', question_text: 'Question 2' },
            ];

            mockContainer.anamnesisQuestionRepository.find.mockResolvedValue(mockQuestions);

            const result = await service.list();

            expect(mockContainer.anamnesisQuestionRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockQuestions);
        });
    });

    describe('get', () => {
        it('should retrieve an anamnesis question by id', async () => {
            const mockQuestion = { id: 'question123', question_text: 'Test question' };

            mockContainer.anamnesisQuestionRepository.findOne.mockResolvedValue(mockQuestion);

            const result = await service.get('question123');

            expect(mockContainer.anamnesisQuestionRepository.findOne).toHaveBeenCalledWith({ where: { id: 'question123' } });
            expect(result).toEqual(mockQuestion);
        });

        it('should return null if question is not found', async () => {
            mockContainer.anamnesisQuestionRepository.findOne.mockResolvedValue(null);

            const result = await service.get('nonexistent');

            expect(mockContainer.anamnesisQuestionRepository.findOne).toHaveBeenCalledWith({ where: { id: 'nonexistent' } });
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update an existing anamnesis question', async () => {
            const id = 'question123';
            const dto: UpdateAnamnesisQuestionDto = {
                question_text: 'Updated question',
                question_type: 'form' as QuestionType,
                options: ['New Option 1', 'New Option 2'],
                section_id: 'newsection123',
            };
            const existingQuestion = { id, question_text: 'Old question', question_type: 'multiple_choice', options: [], section_id: 'oldsection123' };
            const updatedQuestion = { ...existingQuestion, ...dto, section: { id: 'newsection123' } };
            const updateQuestionWithoutSection = updatedQuestion

            mockContainer.anamnesisQuestionRepository.findOne.mockResolvedValue(existingQuestion);
            mockContainer.anamnesisQuestionRepository.save.mockResolvedValue(updatedQuestion);

            const result = await service.update(id, dto);

            expect(mockContainer.anamnesisQuestionRepository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(mockContainer.anamnesisQuestionRepository.save).toHaveBeenCalledWith({
                ...existingQuestion, ...dto,
            });
            expect(result).toEqual({ ...updatedQuestion, section: undefined });
        });

        it('should throw an error if the question is not found', async () => {
            mockContainer.anamnesisQuestionRepository.findOne.mockResolvedValue(null);

            await expect(service.update('nonexistent', {} as UpdateAnamnesisQuestionDto)).rejects.toThrow('Anamnesis question not found');
        });
    });

    describe('delete', () => {
        it('should delete an anamnesis question', async () => {
            const mockQuestion = { id: 'question123', question_text: 'Test question' };

            mockContainer.anamnesisQuestionRepository.findOne.mockResolvedValue(mockQuestion);
            mockContainer.anamnesisQuestionRepository.remove.mockResolvedValue(mockQuestion);

            const result = await service.delete('question123');

            expect(mockContainer.anamnesisQuestionRepository.findOne).toHaveBeenCalledWith({ where: { id: 'question123' } });
            expect(mockContainer.anamnesisQuestionRepository.remove).toHaveBeenCalledWith(mockQuestion);
            expect(result).toEqual(mockQuestion);
        });

        it('should throw an error if the question is not found', async () => {
            mockContainer.anamnesisQuestionRepository.findOne.mockResolvedValue(null);

            await expect(service.delete('nonexistent')).rejects.toThrow('Anamnesis question not found');
        });
    });
});
