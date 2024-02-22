import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, startWith, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-autocomplete';

  @ViewChild('auto1Trigger', { read: MatAutocompleteTrigger }) auto1?: MatAutocompleteTrigger;
  @ViewChild('auto2Trigger', { read: MatAutocompleteTrigger }) auto2?: MatAutocompleteTrigger;

  options1: string[] = ['Apple', 'Banana', 'Orange'];
  options2: string[] = ['Red', 'Green', 'Blue'];

  openAutocompletePanel(panel: any) {
    panel.openPanel();
  }


  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = of();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
