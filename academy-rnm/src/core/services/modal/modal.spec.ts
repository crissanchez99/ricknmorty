import { TestBed } from "@angular/core/testing";
import { ModalService } from "./modal";
import { ModalController } from "@ionic/angular";
import { MockModalComponent } from "../../../../test/mocks/modal-component/modal-component.mock";
import { mockCharacterDTO } from "../../../../test/mocks/characters/characters.mock";

describe(`ModalService`, () =>{
  let service: ModalService;
  let modalCtrl: ModalController;

  const modalCtrlMock = {
    create: jest.fn(),
    dismiss: jest.fn()
  }

  const cssClass = '';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockModalComponent],
      providers: [
        ModalService,
        {provide: ModalController, useValue: modalCtrlMock},
      ],
    });
    service = TestBed.inject(ModalService);
    modalCtrl = TestBed.inject(ModalController);
  });

  it(`WHEN request open modal THEN create it`, async() => {
    await service.openModal(MockModalComponent, mockCharacterDTO, cssClass, async (mockCharacter) => void{});

    expect(modalCtrlMock.create).toHaveBeenCalledWith({
      component: MockModalComponent,
      componentProps: {
        item: mockCharacterDTO,
        favoritePress: expect.any(Function)
      },
      cssClass: cssClass,
      showBackdrop: true
    });

    expect(modalCtrlMock.create).toHaveBeenCalledTimes(1);
  });

  it(`WHEN request close modal THEN dismiss it`, async() => {
    await service.closeModal(mockCharacterDTO);
    
    expect(modalCtrlMock.dismiss).toHaveBeenCalledWith({
      item: mockCharacterDTO,
    });
    expect(modalCtrlMock.dismiss).toHaveBeenCalledTimes(1);
  })

});