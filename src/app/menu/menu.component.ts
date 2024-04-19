import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userId: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('userId');
      if (userIdParam !== null) {
        this.userId = +userIdParam;
      }
    });
  }

  navigateToUsers() {
    this.router.navigate(['/xuxedex']);
  }

  navigateToInventory() {
    this.router.navigate(['/inventario', this.userId]); 
  }

  navigateToHospital() {
    this.router.navigate(['/hospital', this.userId]); 
  }
}
