import { PasswordsMatchValidator } from './../../../shared/validators/password_match_validator';
import { Component, inject } from '@angular/core';
import { TitleComponent } from '../../partials/title/title.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  registerForm !: FormGroup
  isSubmitted = false;

  returnUrl = '';

  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() : void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
    },{
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

}
