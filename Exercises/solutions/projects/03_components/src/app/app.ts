import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [],
})
export class App {
  isHovered = false;

  toggleIsHovered() {
    this.isHovered = !this.isHovered;
  }
}
