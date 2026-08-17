import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollStateService } from '../../services/scroll-state.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MobileMenuComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  isFifakDropdownOpen = false;
  isScrolled = this.scrollService.isScrolled;

  navClasses = computed(() => ({
    'is-scrolled': this.isScrolled(),
  }));

  constructor(private scrollService: ScrollStateService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleFifakDropdown(): void {
    this.isFifakDropdownOpen = !this.isFifakDropdownOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isFifakDropdownOpen = false;
    document.body.style.overflow = '';
  }
}
