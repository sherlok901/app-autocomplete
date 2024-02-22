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
  options3: string[] = [];

  myControl = new FormControl('');
  myControl2 = new FormControl('');
  myControl3 = new FormControl('');

  filteredOptions: Observable<string[]> = of();
  filteredOptions2: Observable<string[]> = of();
  filteredOptions3: Observable<string[]> = of();

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.options1))
    );

    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value, this.options2))
    );

    // Emulate fetching data from an external API
    this.fetchExternalData().subscribe(data => {
      this.options3 = data; // Assuming data is an array of strings
      this.filteredOptions3 = this.myControl3.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value, this.options3))
      );
    });
  }

  private _filter(value: string | null, options: string[]): string[] {
    const filterValue = value?.toLowerCase() ?? "";

    return options.filter(option => option.toLowerCase().includes(filterValue ));
  }

  // Emulate fetching data from an external API
  fetchExternalData(): Observable<string[]> {
    return of(['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes']);
  }
}
