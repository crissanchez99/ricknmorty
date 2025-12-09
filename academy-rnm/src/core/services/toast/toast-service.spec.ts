import { TestBed } from "@angular/core/testing";
import { ToastService } from "./toast-service";
import { ToastController } from "@ionic/angular";

describe(`ToastService`, () =>{
  let service: ToastService;
  let toastController: ToastController;

  const toastSpy = {
    present: jest.fn()
  }

  const toastControllerMock = {
    create: jest.fn().mockResolvedValue(toastSpy)
  }
  
  const message = 'message';
  const duration = 2000;
  const cssClass = '';

   beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastService,
        {provide: ToastController, useValue: toastControllerMock}
      ],
    });

    service = TestBed.inject(ToastService);
    toastController = TestBed.inject(ToastController);
  });

  it(`Variables that are GIVEN have been typed correctly`, () => {
    expect(typeof message).toBe('string');
    expect(typeof duration).toBe('number');
    expect(typeof cssClass).toBe('string');
  });

  it(`WHEN request show toast THEN toast is created and presented`, async() => {
    await service.showToast(message, duration, cssClass);

    expect(toastControllerMock.create).toHaveBeenCalledWith({
      cssClass,
      duration,
      message,
    });
    expect(toastControllerMock.create).toHaveBeenCalledTimes(1);
    expect(toastSpy.present).toHaveBeenCalledTimes(1);
  });

});