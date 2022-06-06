import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authLogin/auth-login.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: [null],
    password: [null],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }
  ngOnInit(): void { }

  // sending credentials in auth service to check if user have permission or not to view posts or users.
  signIn() {
    LoaderService.loader.next(true);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
}
