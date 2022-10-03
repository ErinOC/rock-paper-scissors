import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { catchError, of } from 'rxjs';
// services
import { ApiService } from 'src/app/shared/api.service';
import { StateService } from 'src/app/shared/services/state.service';
// interfaces
import { IUserData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-identify-user',
  templateUrl: './identify-user.component.html',
  styleUrls: ['./identify-user.component.less']
})
export class IdentifyUserComponent {
  
  public form: FormGroup;
  public isNewUserCreation = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private stateService: StateService
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl('')
    })
  }

  get email(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  get name(): FormControl {
    return this.form.controls['name'] as FormControl;
  }

  submit() {
    if (!this.isNewUserCreation) {
      this.apiService.getUser(this.form.controls['email'].value)
        .pipe(
          catchError((error) => {
            if (error.status === 404) {
              this.isNewUserCreation = true;
              this.form.addControl('name', new FormControl(''));
            }
            return of();
          })
        )
        .subscribe((res: IUserData) => {
          this.stateService.setUser(res);
        })
    } else {
      this.apiService.createUser(this.form.value)
        .subscribe((res: IUserData) => {
          this.stateService.setUser(res);
        });
    }
  }
}
