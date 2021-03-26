import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  username: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('username'));
      this.username = params.get('username');
    });
  }

  

}
