import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

import { environment } from '@env';

import { AuthService } from '@utils';

export interface RouteParams {
  username: string;
  token: string;
}

@Component({
  moduleId: module.id,
  selector: 'app-reset-password',
  templateUrl: `reset-password.component.html`
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('newPassword') newPassword: NgModel;
  public credentials: any = {
    token: '',
    newPassword: ''
  };
  public username: string;
  public isTokenInvalid = false;
  public isSecretReset = false;
  public passwordTooltip: string;
  public passwordErrors: string[];

  constructor(
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Password Reset' + environment.metaTitleSuffix);
    this.route.paramMap.subscribe(paramMap => {
      const token = paramMap.get('token');
      this.isTokenInvalid = token === 'invalid' ? true : false;
      this.credentials.token = token !== 'invalid' ? token : 'invalid';
      this.username = paramMap.get('username');
    });
  }

  resetPassword(): void {
    this.authService.reset(this.credentials).subscribe(
      (data: any) => {
        if (data) {
          if (data.invalidSecret) {
            this.newPassword.control.setErrors({ invalidsecret: true });
          } else if (data.tokenInvalid) {
            this.isTokenInvalid = data.tokenInvalid;
          } else if (data.secretReset) {
            this.isSecretReset = data.secretReset;
          }
        }
      });
  }

  setPasswordValidation(passwordValidation: any): void {
    this.passwordTooltip = passwordValidation.passwordTooltip;
    this.passwordErrors = passwordValidation.errorMessages;
    if (this.newPassword && !this.newPassword.control.pristine) {
      if (passwordValidation.status) {
        this.newPassword.control.setErrors({ incorrect: true });
      } else {
        this.newPassword.control.setErrors(null);
      }
    }
    this.cdr.detectChanges();
  }

}
