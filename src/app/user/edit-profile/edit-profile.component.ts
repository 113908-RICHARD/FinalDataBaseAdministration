import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HobbyModel, UserModelResponse } from 'src/app/models/dtos';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profile!:UserModelResponse;
  hobbieForm!: FormGroup;
  countries: any[] = [];
  states: any[] = []; 
  isEmailDisabled: boolean = true;
  hobbiesId: number [] = [];

   hobbies: HobbyModel[] = [
    
    // Add more hobbies as needed
];

  showHobbieInput: boolean = false;

  constructor(private formBuilder: FormBuilder, private apiService: ProfileService,private router:Router) { 

    this.hobbieForm = this.formBuilder.group({
      selectedHobbies:this.formBuilder.array([])
  });
  }

  get hobbiesForm() {
    return this.hobbieForm.get('selectedHobbies') as FormArray;
  }

  
  createHobbiesForm(): FormGroup {
    return this.formBuilder.group({
      hobbie: ['', { validators: Validators.required, updateOn: 'blur' }] 
    });
  }

  addHobbie() {
    this.hobbiesForm.push(this.createHobbiesForm());
  }

  removeCountry(index: number) {
    this.hobbiesForm.removeAt(index);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadCountries();
    this.getProfile();
    this.loadHobbies();
  }
  getProfile(): void {
    this.apiService.getProfile().subscribe(
      (profile: UserModelResponse) => {
        this.profile = profile;
        
        this.profileForm.patchValue({
          email: profile.email
        });
      },
      (error) => {
        console.error('Error fetching profile:', error);
        // Handle error
      }
    );
  }
  

  
  initForm(): void {
    this.profileForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      email: [{ value: '', disabled: true }], 
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(25)]],
      countryId: ['', Validators.required],
      stateId: [''], 
      phoneNumber: ['', [Validators.required, this.phoneNumberValidator]]
    });
  }
  

  
  
  phoneNumberValidator(control:any) {
    const phoneNumberRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/;
    return phoneNumberRegex.test(control.value) ? null : { invalidPhoneNumber: true };
  }

  loadCountries(): void {
   
    this.apiService.getCountries().subscribe((data: any) => {
      this.countries = data;
    }, (error: any) => {
      console.error('Error fetching countries:', error);
    });
  }

  loadHobbies(): void {
   
    this.apiService.getHobbies().subscribe((data: any) => {
      this.hobbies = data;
    }, (error: any) => {
      console.error('Error fetching hobbies:', error);
    });
  }


  onCountryChange(): void {
    const countryId = this.profileForm.get('countryId')?.value;
    if (countryId) {
      
      this.apiService.getStates(countryId).subscribe((data: any) => {
        this.states = data;
      }, (error: any) => {
        console.error('Error fetching states:', error);
      });
    } else {
      this.states = []; 
    }
  }
  

  saveProfile(): void {
    if (this.profileForm.valid) {
      
      this.profile.userName = this.profileForm.get('userName')?.value;
    this.profile.firstName = this.profileForm.get('firstName')?.value;
    this.profile.lastName = this.profileForm.get('lastName')?.value;
    this.profile.countryId = this.profileForm.get('countryId')?.value;
    this.profile.stateId = this.profileForm.get('stateId')?.value;
    this.profile.email = this.profileForm.get('email')?.value;
    this.profile.phoneNumber = this.profileForm.get('phoneNumber')?.value;
    const selectedHobbies = this.hobbieForm.get('selectedHobbies')?.value;
const hobbyIds = selectedHobbies.map((hobby: any) => parseInt(hobby.hobbie, 10)).filter((id: number) => !isNaN(id));
      this.profile.avatarUrl ="url";
      this.profile.birthDate = new Date(); 
      

    
    this.profile.hobbies = hobbyIds;
    if (this.profileForm.valid) {
      

      
      this.apiService.updateProfile(this.profile).subscribe(
        (response: any) => {
          
          Swal.fire({
            icon: 'success',
            title: 'User updated',
            showConfirmButton: false,
            timer: 1500 
          });
        },
        (error: any) => {
          
          console.error('Error updating profile', error);
        }
      );
    } else {
      
    }

    } else {
     
      Object.values(this.profileForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  toggleHobbieInput() {
    this.showHobbieInput = !this.showHobbieInput;
    if (this.showHobbieInput) {
      this.addHobbie();
    }
  }
}
