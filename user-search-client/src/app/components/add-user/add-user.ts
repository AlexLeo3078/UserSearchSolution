import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../services/toast.service';
import { TOAST_TYPE } from '../../interfaces/toast';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})

export class AddUserComponent {
  userForm: FormGroup;
  loading = false;
  success = false;
  isFormVisible = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      jobTitle: [''],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9+\-\s()]{7,}$/)
      ]]
    });
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  cancel() {
    this.isFormVisible = false;
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.success = false;
    this.error = '';

    this.userService.addUser(this.userForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges()
        })
      )
      .subscribe({
        next: (res) => {
          if (res != null) {
            this.toast.show('User created successfully ✔', TOAST_TYPE.Success);
            this.success = true;
            this.userForm.reset();
            this.isFormVisible = false;
          } else {
            this.toast.show('Failed to create user', TOAST_TYPE.Error);
          }
        },
        error: (err) => {
          this.toast.show(err?.error || 'Failed to create user', TOAST_TYPE.Error);
        }
      });
  }
}
