import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TypeService } from '../../services/type.service';
@Component({
  selector: 'app-create-type',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create-type.component.html',
  styleUrl: './create-type.component.scss',
})
export class CreateTypeComponent {
  private typeService = inject(TypeService);

  newTypeForm = this.typeService.newTypeForm;

  get fields(): FormControl[] {
    return this.typeService.fields;
  }

  addField(): void {
    this.typeService.addField();
  }

  submit(): void {
    this.typeService.saveType();
  }
}
