import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.scss']
})
export class NotAllowedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    LoaderService.loader.next(true);
    localStorage.clear();
    this.router.navigate(['login']);
    setTimeout(() => {
      LoaderService.loader.next(false);
    }, 1000);
  }
}
