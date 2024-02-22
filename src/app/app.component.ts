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

  options1: string[] = ['Apple', 'Banana', 'Orange'];
  options2: string[] = ['Red', 'Green', 'Blue'];

  myControl = new FormControl('');
  myControl2 = new FormControl('');

  filteredOptions: Observable<string[]> = of();
  filteredOptions2: Observable<string[]> = of();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.options1))
    );

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.options2))
    );
  }

  private _filter(value: string | null, options: string[]): string[] {
    const filterValue = value?.toLowerCase() ?? "";

    return options.filter(option => option.toLowerCase().includes(filterValue ));
  }
}
