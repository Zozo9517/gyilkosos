import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestserviceService } from '../services/restservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public restService: RestserviceService) { }
  @ViewChild('lobbyForm', { static: false }) public lobbyForm: NgForm | undefined;

  name = new FormControl('', [Validators.required]);
  lobbyID!: string;

  getErrorMessage(): string {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Name is not valid';
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.lobbyID);
    this.restService.createLobby(this.lobbyID).toPromise().then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    });
  }
}
