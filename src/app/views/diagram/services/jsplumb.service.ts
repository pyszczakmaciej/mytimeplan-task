import { Injectable, signal, ViewContainerRef } from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { TypeCardComponent } from '../components/type-card-component/type-card-component.component';
import { SavedType } from './type.service';

@Injectable({
  providedIn: 'root',
})
export class JsplumbService {
  private jsPlumbInstance: any;

  selectedElement = signal<SavedType | null>(null);

  constructor() {
    this.jsPlumbInstance = jsPlumb.getInstance();
  }

  addToJsPlubInstance(container: ViewContainerRef, element: SavedType): void {
    const componentRef = container.createComponent(TypeCardComponent);
    componentRef.instance.element = element;
    componentRef.instance.selected.subscribe((val) =>
      this.setSelectedElement(val)
    );

    setTimeout(() => {
      this.jsPlumbInstance.draggable(element.id);
    }, 300);
  }

  setSelectedElement(element: SavedType | null): void {
    if (!element) {
      return;
    }

    if (!this.selectedElement()) {
      this.selectedElement.set(element);
      return;
    }

    if (this.selectedElement()?.id === element.id) {
      this.selectedElement.set(null);
      return;
    }

    this.connect(element);
  }

  private connect(element: SavedType): void {
    if (this.selectedElement()?.typeName === element.typeName) {
      console.warn(
        `Couldn't connect ${this.selectedElement()?.typeName} to the type ${
          element.typeName
        }.`
      );
    } else {
      this.jsPlumbInstance.connect({
        source: this.selectedElement()?.id,
        target: element.id,
        connector: 'Flowchart',
        endpoint: 'Dot',
        anchor: 'Continuous',
      });
      this.setSelectedElement(null);
    }
  }
}
