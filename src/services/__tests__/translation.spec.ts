import TranslationService from '../translation';
import { CreateTranslationDto, UpdateTranslationDto } from '../../common/dtos/translation';
import { EntityType } from '../../common/enums/translation.enum';

jest.mock('../../repositories/translation');

describe('TranslationService', () => {
    let service: TranslationService;
    let mockContainer: any;

    beforeEach(() => {
        mockContainer = {
            translationRepository: {
                create: jest.fn(),
                save: jest.fn(),
                find: jest.fn(),
                findOne: jest.fn(),
                remove: jest.fn(),
            },
        };
        service = new TranslationService(mockContainer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it.each([
            ["form", 'form123', 'en', 'Form Translation'],
            ["section", 'section123', 'fr', 'Section Translation'],
            ["question", 'question123', 'es', 'Question Translation'],
        ])('should create a new translation for %s', async (entityType, entityId, languageCode, translatedText) => {
            const dto: CreateTranslationDto = {
                entity_type: entityType as EntityType,
                entity_id: entityId,
                language_code: languageCode,
                translated_text: translatedText,
            };
            const mockTranslation = { ...dto, id: 'trans123' };

            mockContainer.translationRepository.create.mockReturnValue(mockTranslation);
            mockContainer.translationRepository.save.mockResolvedValue(mockTranslation);

            const result = await service.create(dto);

            expect(mockContainer.translationRepository.create).toHaveBeenCalledWith(dto);
            expect(mockContainer.translationRepository.save).toHaveBeenCalledWith(mockTranslation);
            expect(result).toEqual(mockTranslation);
        });
    });

    describe('list', () => {
        it('should return a list of translations for all entity types', async () => {
            const mockTranslations = [
                { id: 'trans1', entity_type: "form", entity_id: 'form1', language_code: 'en', translated_text: 'Form Translation' },
                { id: 'trans2', entity_type: "section", entity_id: 'section1', language_code: 'fr', translated_text: 'Section Translation' },
                { id: 'trans3', entity_type: "question", entity_id: 'question1', language_code: 'es', translated_text: 'Question Translation' },
            ];

            mockContainer.translationRepository.find.mockResolvedValue(mockTranslations);

            const result = await service.list();

            expect(mockContainer.translationRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockTranslations);
        });
    });

    describe('get', () => {
        it.each([
            ["form", 'form123'],
            ["section", 'section123'],
            ["question", 'question123'],
        ])('should retrieve a translation by id for %s', async (entityType, entityId) => {
            const mockTranslation = { id: 'trans123', entity_type: entityType, entity_id: entityId, language_code: 'en', translated_text: 'Test Translation' };

            mockContainer.translationRepository.findOne.mockResolvedValue(mockTranslation);

            const result = await service.get('trans123');

            expect(mockContainer.translationRepository.findOne).toHaveBeenCalledWith({ where: { id: 'trans123' } });
            expect(result).toEqual(mockTranslation);
        });

        it('should return null if translation is not found', async () => {
            mockContainer.translationRepository.findOne.mockResolvedValue(null);

            const result = await service.get('nonexistent');

            expect(mockContainer.translationRepository.findOne).toHaveBeenCalledWith({ where: { id: 'nonexistent' } });
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it.each([
            ["form", 'form123', 'en', 'Updated Form Translation'],
            ["section", 'section123', 'fr', 'Updated Section Translation'],
            ["question", 'question123', 'es', 'Updated Question Translation'],
        ])('should update an existing translation for %s', async (entityType, entityId, languageCode, translatedText) => {
            const id = 'trans123';
            const dto: UpdateTranslationDto = {
                entity_type: entityType as EntityType,
                entity_id: entityId,
                language_code: languageCode,
                translated_text: translatedText,
            };
            const existingTranslation = { id, entity_type: entityType, entity_id: 'old123', language_code: 'en', translated_text: 'Old Translation' };
            const updatedTranslation = { ...existingTranslation, ...dto };

            mockContainer.translationRepository.findOne.mockResolvedValue(existingTranslation);
            mockContainer.translationRepository.save.mockResolvedValue(updatedTranslation);

            const result = await service.update(id, dto);

            expect(mockContainer.translationRepository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(mockContainer.translationRepository.save).toHaveBeenCalledWith(updatedTranslation);
            expect(result).toEqual(updatedTranslation);
        });

        it('should throw an error if the translation is not found', async () => {
            mockContainer.translationRepository.findOne.mockResolvedValue(null);

            await expect(service.update('nonexistent', {} as UpdateTranslationDto)).rejects.toThrow('Translation not found');
        });
    });

    describe('delete', () => {
        it.each([
            ["form", 'form123'],
            ["section", 'section123'],
            ["question", 'question123'],
        ])('should delete a translation for %s', async (entityType, entityId) => {
            const mockTranslation = { id: 'trans123', entity_type: entityType, entity_id: entityId, language_code: 'en', translated_text: 'Test Translation' };

            mockContainer.translationRepository.findOne.mockResolvedValue(mockTranslation);
            mockContainer.translationRepository.remove.mockResolvedValue(mockTranslation);

            const result = await service.delete('trans123');

            expect(mockContainer.translationRepository.findOne).toHaveBeenCalledWith({ where: { id: 'trans123' } });
            expect(mockContainer.translationRepository.remove).toHaveBeenCalledWith(mockTranslation);
            expect(result).toEqual(mockTranslation);
        });

        it('should throw an error if the translation is not found', async () => {
            mockContainer.translationRepository.findOne.mockResolvedValue(null);

            await expect(service.delete('nonexistent')).rejects.toThrow('Translation not found');
        });
    });
});
