import { DragDropModule } from '@angular/cdk/drag-drop';
import { KeyValuePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreateTypeComponent } from './components/create-type/create-type.component';
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
export class DiagramComponent {
  private typeService = inject(TypeService);

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
    this.typeService.addTypeToDiagram(this.typeControl.value);
  }
}
