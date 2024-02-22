import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, of, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs';

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

    this.filteredOptions3 = this.myControl3.valueChanges.pipe(
      debounceTime(300), // Debounce user input to reduce API calls
      distinctUntilChanged(), // Only emit when the input value changes
      filter(value => value != null && value.length >= 2), // Only continue if input length is >= 2
      switchMap(value => this.fetchExternalData(value ?? "")) // Fetch data from the external API
    );
  }

  private _filter(value: string | null, options: string[]): string[] {
    const filterValue = value?.toLowerCase() ?? "";

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Emulate fetching data from an external API
  fetchExternalData(query: string): Observable<string[]> {
    // Simulate API call with mocked data
    const mockedData: string[] = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];
    return of(mockedData.filter(option => option.toLowerCase().includes(query.toLowerCase())));
  }
}
