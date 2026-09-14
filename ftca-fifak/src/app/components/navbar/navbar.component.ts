import { Component, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ScrollStateService } from '../../services/scroll-state.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { ClubsDrawerComponent } from '../clubs-drawer/clubs-drawer.component';
import { assetUrl } from '../../shared/asset-url';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MobileMenuComponent, ClubsDrawerComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly assetUrl = assetUrl;

  isMobileMenuOpen = false;
  isFifakDropdownOpen = false;
  isClubsDrawerOpen = false;
  isScrolled = this.scrollService.isScrolled;

  navClasses = computed(() => ({
    'is-scrolled': this.isScrolled(),
  }));

  constructor(private scrollService: ScrollStateService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isClubsDrawerOpen = false;
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

  openClubsDrawer(): void {
    this.isMobileMenuOpen = false;
    this.isClubsDrawerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeClubsDrawer(): void {
    this.isClubsDrawerOpen = false;
    document.body.style.overflow = '';
  }
}
