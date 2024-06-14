import { Injectable, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export type SavedType = {
  typeName: string;
  color: string;
  fields: string[];
};

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  savedTypes = signal<SavedType[]>([
    {
      typeName: 'Initial Type',
      fields: ['name'],
      color: this.randomColor(),
    },
  ]);

  diagramElements = signal<SavedType[]>([]);

  newTypeForm = new FormGroup({
    typeName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    fields: new FormArray<FormControl<string>>([
      new FormControl({ value: 'name', disabled: true }, { nonNullable: true }),
    ]),
  });

  get fields(): FormControl[] {
    return this.newTypeForm.controls.fields.controls;
  }

  addField(): void {
    this.fields.push(
      new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      })
    );
  }

  saveType(): void {
    if (this.newTypeForm.invalid) {
      return;
    }

    const newType = {
      ...this.newTypeForm.getRawValue(),
      color: this.randomColor(),
    };

    if (this.savedTypes().find((item) => item.typeName === newType.typeName)) {
      console.warn('Typ o takiej nazwie istnieje');
      return;
    }

    this.savedTypes.set([...this.savedTypes(), newType]);

    console.log('Created type:', newType);
  }

  addTypeToDiagram(type: SavedType): void {
    this.diagramElements.set([...this.diagramElements(), type]);
    console.log('Element added to view:', type);
  }

  randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
