import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  constructor(private _fb: FormBuilder, private http: HttpClient) {}

  showErr: boolean = false;
  formDisable: boolean = false;

  loginForm: FormGroup = this._fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // disable form
    this.formDisable = true;
    if (this.loginForm.invalid) {
      this.showErr = true;
      this.formDisable = false;
      return;
    }
    this.showErr = false;
    //post req
    console.log("im here")
    this.http
      .post("http://localhost:8081/api/login", {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe((data)=>{console.log(data)});
    this.formDisable = false;
  }
}
