import AnamnesisSectionService from '../anamnesis-section';
import { CreateAnamnesisSectionDto, UpdateAnamnesisSectionDto } from '../../common/dtos/anamnesis-section';

jest.mock('../../repositories/anamnesis-section');

describe('AnamnesisSectionService', () => {
    let service: AnamnesisSectionService;
    let mockContainer: any;

    beforeEach(() => {
        mockContainer = {
            anamnesisSectionRepository: {
                create: jest.fn(),
                save: jest.fn(),
                find: jest.fn(),
                findOne: jest.fn(),
                remove: jest.fn(),
            },
        };
        service = new AnamnesisSectionService(mockContainer);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new anamnesis section', async () => {
            const dto: CreateAnamnesisSectionDto = {
                title: 'Test Title',
                description: 'Test Description',
                order: 1,
                form_id: 'form123',
            };
            const mockSection = { ...dto, id: 'section123' };

            mockContainer.anamnesisSectionRepository.create.mockReturnValue(mockSection);
            mockContainer.anamnesisSectionRepository.save.mockResolvedValue(mockSection);

            const result = await service.create(dto);

            expect(mockContainer.anamnesisSectionRepository.create).toHaveBeenCalledWith({
                title: dto.title,
                description: dto.description,
                order: dto.order,
                form: { id: dto.form_id },
            });
            expect(mockContainer.anamnesisSectionRepository.save).toHaveBeenCalledWith(mockSection);
            expect(result).toEqual({ ...mockSection, form: undefined });
        });
    });

    describe('list', () => {
        it('should return a list of anamnesis sections', async () => {
            const mockSections = [
                { id: 'section1', title: 'Section 1' },
                { id: 'section2', title: 'Section 2' },
            ];

            mockContainer.anamnesisSectionRepository.find.mockResolvedValue(mockSections);

            const result = await service.list();

            expect(mockContainer.anamnesisSectionRepository.find).toHaveBeenCalled();
            expect(result).toEqual(mockSections);
        });
    });

    describe('get', () => {
        it('should retrieve an anamnesis section by id', async () => {
            const mockSection = { id: 'section123', title: 'Test Section' };

            mockContainer.anamnesisSectionRepository.findOne.mockResolvedValue(mockSection);

            const result = await service.get('section123');

            expect(mockContainer.anamnesisSectionRepository.findOne).toHaveBeenCalledWith({ where: { id: 'section123' } });
            expect(result).toEqual(mockSection);
        });
    });

    describe('update', () => {
        it('should update an existing anamnesis section', async () => {
            const id = 'section123';
            const dto: UpdateAnamnesisSectionDto = {
                title: 'Updated Title',
                description: 'Updated Description',
                order: 2,
                form_id: 'form456',
            };
            const existingSection = { id, title: 'Old Title', description: 'Old Description', order: 1 };
            const updatedSection = { ...existingSection, ...dto };

            mockContainer.anamnesisSectionRepository.findOne.mockResolvedValue(existingSection);
            mockContainer.anamnesisSectionRepository.save.mockResolvedValue(updatedSection);

            const result = await service.update(id, dto);

            expect(mockContainer.anamnesisSectionRepository.findOne).toHaveBeenCalledWith({ where: { id } });
            expect(mockContainer.anamnesisSectionRepository.save).toHaveBeenCalledWith({
                ...existingSection,
                ...{
                    title: dto.title,
                    description: dto.description,
                    order: dto.order,
                },
                form: { id: dto.form_id },
            });
            expect(result).toEqual({ ...updatedSection, form: undefined });
        });

        it('should throw an error if the section is not found', async () => {
            mockContainer.anamnesisSectionRepository.findOne.mockResolvedValue(null);

            await expect(service.update('nonexistent', {} as UpdateAnamnesisSectionDto)).rejects.toThrow('Anamnesis section not found');
        });
    });

    describe('delete', () => {
        it('should delete an anamnesis section', async () => {
            const mockSection = { id: 'section123', title: 'Test Section' };

            mockContainer.anamnesisSectionRepository.findOne.mockResolvedValue(mockSection);
            mockContainer.anamnesisSectionRepository.remove.mockResolvedValue(mockSection);

            const result = await service.delete('section123');

            expect(mockContainer.anamnesisSectionRepository.findOne).toHaveBeenCalledWith({ where: { id: 'section123' } });
            expect(mockContainer.anamnesisSectionRepository.remove).toHaveBeenCalledWith(mockSection);
            expect(result).toEqual(mockSection);
        });

        it('should throw an error if the section is not found', async () => {
            mockContainer.anamnesisSectionRepository.findOne.mockResolvedValue(null);

            await expect(service.delete('nonexistent')).rejects.toThrow('Anamnesis section not found');
        });
    });
});
