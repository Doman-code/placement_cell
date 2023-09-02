import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StdregisterService } from 'src/app/modules/structure/services/stdregister.service';
import { UserService } from 'src/app/modules/structure/services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit {
  skills: any;
  skillsfile?: File;
  skill_file_url: any;
  skillurl: string[] = [];
  
  skilldata: any;


  constructor(private _formBuilder: FormBuilder, private _us: UserService, private _sr: StdregisterService, private AS: AuthService) {
    //skills
    this._us.getData('skills').subscribe((res: any = []) => {
      console.log(res);
      this.skills = res;
    });
  }

  ngOnInit(): void {
    this.addSkills()

  }

  form = this._formBuilder.group({
    skill: this._formBuilder.array([]),

  });



  get skill() {
    return this.form.controls['skill'] as FormArray
  }

  //add skills
  addSkills() {
    const SkillForm = this._formBuilder.group({
      //Student_Skill_ID:[null],
     //Student_ID: [null],
      Registration_No: [this.AS.currentUser.id],
      Skill_Id: [null],
      Skill_Cetificate_Url: [''],

      Created_By: [this.AS.currentUser.username],
      //Created_Date: [''],
      // Modified_By: [''],
      //Modified_Date: [''],
     // Delete_Flag: [''],
      // Public_IP_Address: [''],
      // Private_IP_Address: [''],

    });
    this.skill.push(SkillForm);
  }

  deleteSkills(SkillIndex: number) {
    this.skill.removeAt(SkillIndex);
  }


  //file upload 
  // tenth marksheet  file upload 
  selectskillfile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];            //it is used to get the input file dom property
      this.skillsfile = file
      console.log(this.skillsfile);
    }

  }

  // upload sill certificate
  uploadskill() {                            //multer will accept form data so we here creating a form data
    if (!this.skillsfile) {
      return this.nopath();
    }
    const formData = new FormData();
    formData.append('Marksheet', this.skillsfile);
    console.log(this.skillsfile)

    this._sr.MarksheetUpload(formData).subscribe((result: any) => {
      console.log(result.body.marksheet_url);
      this.skillurl.push(result.body.marksheet_url);
      Swal.fire("Cetificate uploaded successfully");
    });

  }
  nopath() {
    Swal.fire("please select a file")
  }
  onClear() {
    this.skill.reset();
    this.skill.clearValidators();
    this.skill.updateValueAndValidity();
  }

  onSubmitSkills() {

    // printing form values
    console.log(this.form.value);

    const mainFormValue = this.form.value;
    const skillFormArrayValue = mainFormValue.skill;


    console.log('SkillFormArray Value:', skillFormArrayValue);

    const url = this.skillurl;

    if (url && url.length > 0) {
      skillFormArrayValue?.forEach((item: any, index: number) => {
        if (index < url.length) {
          item.Skill_Cetificate_Url = url[index]
        }
      })
    }


    if (skillFormArrayValue) {


      for (const item of skillFormArrayValue) {

        this._us.postRegisterData('skilldata', item).subscribe(res => {
          this.skilldata = res;
          if (this.skilldata) { Swal.fire('Form submitted SuccessFully'); }
          this.onClear();
        });
      }
    }


  }

}


