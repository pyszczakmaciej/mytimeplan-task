import { DragDropModule } from '@angular/cdk/drag-drop';
import { KeyValuePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { jsPlumb } from 'jsplumb';
import { CreateTypeComponent } from './components/create-type/create-type.component';
import { TypeCardComponent } from './components/type-card-component/type-card-component.component';
import { SavedType, TypeService } from './services/type.service';
@Component({
  selector: 'app-diagram',
  standalone: true,
  imports: [
    CreateTypeComponent,
    KeyValuePipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
  ],
  templateUrl: './diagram.component.html',
  styleUrl: './diagram.component.scss',
})
export class DiagramComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  private jsPlumbInstance: any;
  private typeService = inject(TypeService);
  selectedElement = computed(this.typeService.selectedElement);

  constructor() {}

  ngOnInit(): void {
    this.jsPlumbInstance = jsPlumb.getInstance();
  }

  ngAfterViewInit(): void {}

  typeControl = new FormControl<SavedType>(this.types()[0], {
    nonNullable: true,
  });

  get types() {
    return computed(this.typeService.savedTypes);
  }

  get diagramElements() {
    return computed(this.typeService.diagramElements);
  }

  addToDiagram(): void {
    if (!this.typeControl.value) return;

    const savedType = this.typeService.addTypeToDiagram(this.typeControl.value);
    this.addToJsPlubInstance(savedType);
  }

  private addToJsPlubInstance(element: SavedType): void {
    const componentRef = this.container.createComponent(TypeCardComponent);
    componentRef.instance.element = element;
    componentRef.instance.selectedElement.bind(this.selectedElement);
    componentRef.instance.selected.subscribe((val) => this.select(val));

    setTimeout(() => {
      this.jsPlumbInstance.draggable(element.id);
    }, 300);
  }

  select(element: SavedType): void {
    if (!element.id) {
      return;
    }

    if (this.selectedElement()?.id === element.id) {
      this.typeService.setSelectedElement(null);
      return;
    }

    if (!this.selectedElement()) {
      this.typeService.setSelectedElement(element);
    } else if (this.selectedElement()?.typeName === element.typeName) {
      console.warn(
        `Couldn't connect ${this.selectedElement()?.typeName} to the type ${
          element.typeName
        }.`
      );
    } else {
      this.jsPlumbInstance.connect({
        source: this.selectedElement()?.id,
        target: element.id,
        connector: 'Straight',
        endpoint: 'Dot',
        anchor: 'Continuous',
      });
      this.typeService.setSelectedElement(null);
    }
  }
}
