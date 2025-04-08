import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TheBigBrainBlog';

  // @ViewChild('navbar', { static: false }) navbar!: ElementRef;

  // ngAfterViewInit() {
  //   console.log(this.navbar); // Check if the navbar reference is valid
  //   setTimeout(() => {
  //     this.adjustContentPadding();
  //   },0);
  // } 

  // adjustContentPadding() {
  //   if (!this.navbar || !this.navbar.nativeElement) {
  //     console.warn('Navbar element is not available.');
  //     return;
  //   }
  //   const navbarHeight = this.navbar.nativeElement.offsetHeight || 0;
  //   const content = document.getElementById('content');
  //   // if (content) {
  //   //   content.style.paddingTop = `${navbarHeight}px`;
  //   // }
  //   const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Get root font size in pixels
  //   const navbarHeightInRem = navbarHeight / rootFontSize; // Convert height to rem
  //   if (content) {
  //     content.style.paddingTop = `${navbarHeightInRem}rem`; // Apply padding in rem
  //   }
  // }


}
