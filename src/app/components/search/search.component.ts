import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Observable } from 'rxjs';
import {User} from '../../../User'
import { UserService } from '../../services/user.service';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  searchInput$ = new FormControl();
  searchQuery$!: Observable<User[]>;

  autoComplete$!: Observable<string[]>;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.searchInput$.valueChanges.subscribe((searchInput: string) => {
      this.searchQuery$ = this.userService.getUser(searchInput.toLowerCase());
      this.autoComplete$ = this.userService.autoComplete(searchInput.toLowerCase());
    })
    this.userService.getUsers().subscribe((res) => console.log(res.results[0]));

    // auto-complete

  }

}
