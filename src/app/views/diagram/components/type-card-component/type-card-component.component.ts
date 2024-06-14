import { Component, computed, inject, Input, output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JsplumbService } from '../../services/jsplumb.service';
import { SavedType } from '../../services/type.service';

@Component({
  selector: 'app-type-card-component',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './type-card-component.component.html',
  styleUrl: './type-card-component.component.scss',
})
export class TypeCardComponent {
  @Input({ required: true }) element!: SavedType;
  selected = output<SavedType>();

  selectedElement = computed(inject(JsplumbService).selectedElement);
}
