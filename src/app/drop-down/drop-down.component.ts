import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Category } from '../model/Category';

@Component({
  selector: 'app-drop-down',
  standalone: false,
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})
export class DropDownComponent {
  @Input() options: Category[] = [];
  @Output() selectedOptions: EventEmitter<any[]> = new EventEmitter<any[]>();

  selectedItems: any[] = [];
  labelKey = 'name';
  valueKey = 'id';
  dropdownOpen = false;
  selectedIds: any[] = [];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.selectedIds = this.selectedItems.map(item => item[this.valueKey]);
    this.selectedOptions.emit(this.selectedIds);
  }

  isSelected(option: any): boolean {
    return this.selectedItems.some(item => item[this.valueKey] === option[this.valueKey]);
  }

  toggleSelection(option: any) {
    if (this.isSelected(option)) {
      this.selectedItems = this.selectedItems.filter(
        item => item[this.valueKey] !== option[this.valueKey]
      );
    } else {
      this.selectedItems = [...this.selectedItems, option];
    }
  }

  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter(
      selected => selected[this.valueKey] !== item[this.valueKey]
    );
    this.selectedIds = this.selectedItems.map(item => item[this.valueKey]);
    this.selectedOptions.emit(this.selectedIds);
  }

  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   if (!target.closest('.dropdown-wrapper')) {
  //     this.dropdownOpen = false;
  //   }
  // }

  // closeDropdown() {
  //   setTimeout(() => {
  //   this.dropdownOpen = false;}, 200); // Delay to allow click event to register
  // }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    if (this.dropdownOpen) {
      this.closeDropdownIfMouseOutside();
      // const dropdown = document.querySelector('.dropdown-wrapper') as HTMLElement;
      // dropdown.blur();
    }
  }

  // Close the dropdown if the mouse is not inside
  closeDropdownIfMouseOutside() {
    this.selectedIds = this.selectedItems.map(item => item[this.valueKey]);
    this.selectedOptions.emit(this.selectedIds);
    setTimeout(() => {
        this.dropdownOpen = false;
    }, 100); // Add a slight delay to ensure smooth behavior
  }

}
