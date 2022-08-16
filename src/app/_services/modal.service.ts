import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  PortalInjector,
  ComponentType,
} from '@angular/cdk/portal';
import {
  ComponentRef,
  Injectable,
  InjectionToken,
  Injector,
} from '@angular/core';

export class FormModalOverlayRef {
  constructor(private overlayRef: OverlayRef) {
    this.overlayRef._outsidePointerEvents.subscribe((evt) => {
      this.close();
    });
  }

  close(): void {
    this.overlayRef.dispose();
  }
}

export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

interface FormModalConfig<D> {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  position?: 'center' | 'right';
  data?: D;
}

const DEFAULT_CONFIG: FormModalConfig<any> = {
  hasBackdrop: true,
  backdropClass: 'modal-backdrop',
  panelClass: 'min-h-full',
  position: 'right',
  data: undefined,
};

@Injectable()
export class ModalService {
  public dialogRef!: FormModalOverlayRef;
  constructor(private injector: Injector, private overlay: Overlay) {}

  open<T, D>(component: ComponentType<T>, config: FormModalConfig<D> = {}) {
    const modalConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay<D>(modalConfig);
    const dialogRef = new FormModalOverlayRef(overlayRef);

    const overlayComponent = this.attachModalContainer<T, D>(
      overlayRef,
      modalConfig,
      dialogRef,
      component
    );

    this.dialogRef = dialogRef;
    return dialogRef;
  }

  // tslint:disable-next-line:max-line-length
  private attachModalContainer<T, D>(
    overlayRef: OverlayRef,
    config: FormModalConfig<D>,
    dialogRef: FormModalOverlayRef,
    component: ComponentType<T>
  ) {
    const injector = this.createInjector<D>(config, dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<T> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private createInjector<D>(
    config: FormModalConfig<D>,
    dialogRef: FormModalOverlayRef
  ) {
    const injectionTokens = new WeakMap();

    injectionTokens.set(FormModalOverlayRef, dialogRef);
    injectionTokens.set(MODAL_DATA, config.data);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig<D>(config: FormModalConfig<D>): OverlayConfig {
    const positionStrategy =
      config.position === 'right'
        ? this.overlay.position().global().end()
        : this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createOverlay<D>(config: FormModalConfig<D>) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig<D>(config);

    // Returns an OverlayRef
    return this.overlay.create(overlayConfig);
  }
}
