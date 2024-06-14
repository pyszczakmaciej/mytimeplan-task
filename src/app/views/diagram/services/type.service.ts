import { Injectable, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export type SavedType = {
  id?: string;
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
      typeName: 'InitialType',
      color: this.randomColor(),
      fields: ['name'],
    },
  ]);

  diagramElements = signal<SavedType[]>([]);

  selectedElement = signal<SavedType | null>(null);

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
      id: crypto.randomUUID(),
    };

    if (this.savedTypes().find((item) => item.typeName === newType.typeName)) {
      console.warn('Typ o takiej nazwie istnieje');
      return;
    }

    this.savedTypes.set([...this.savedTypes(), newType]);

    console.log('Created type:', newType);
  }

  addTypeToDiagram(type: SavedType): SavedType {
    const typeWithId = { ...type, id: crypto.randomUUID() };
    this.diagramElements.set([...this.diagramElements(), typeWithId]);
    console.log('Element added to view:', typeWithId);
    return typeWithId;
  }

  randomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  setSelectedElement(element: SavedType | null): void {
    this.selectedElement.set(element);
  }
}
