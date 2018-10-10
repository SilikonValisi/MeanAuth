import { Component, OnInit } from '@angular/core';
import {ValidateService} from "../../services/validate.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
  //in the constructor we do the dependincy injection
  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit(){
    //creating the user to use we can register it and the this.name comes from the form in the html
    const user= {
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
    //testing where the field are empty
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill in the all field",{cssClass:"alert-danger",timeout:3000});
      return false;
    }
    //Validating the email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Please use a valid email",{cssClass:"alert-danger",timeout:3000});
      return false;
    }
    //Register user
    this.authService.registerUser(user).subscribe(
      data => {
      if(data["success"]){
        console.log("You are REGISTERED");
        this.router.navigate(["/login"]);
      }else {
        console.log("You cant registered something went wrong");
        this.router.navigate(["/register"]);
      }

    });
  }

}
