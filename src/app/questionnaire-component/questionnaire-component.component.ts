import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup,FormBuilder,FormArray,Validators } from "@angular/forms"


@Component({
  selector: 'app-questionnaire-component',
  templateUrl: './questionnaire-component.component.html',
  styleUrls: ['./questionnaire-component.component.scss']
})
export class QuestionnaireComponentComponent implements OnInit {

  private _jsonURL = 'assets/questionnaire.json';

  dynamicJSON: any ;
  submitted : boolean = false;

  questionFormGroup:FormGroup;

  constructor(private http: HttpClient ,private formBuilder:FormBuilder)
   { }  
  

  ngOnInit(): void {

    this.getJSON().subscribe(data => {
   
      this.dynamicJSON = data.item;

      // let questionForm = {
      //   questions: this.dynamicJSON
      // }
      this.questionFormGroup = this.formBuilder.group({
        questions: this.formBuilder.array([])
      })

      this.questionFormGroup = this.formBuilder.group({
        value: ['', Validators.required],

      })

       //this.generateForm()

    })

  }

  get f() { return this.questionFormGroup.controls; }

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);  
  }

  
 
  generateForm(){
    this.dynamicJSON.forEach( (t , i) =>{
      let questions =<FormArray> this.questionFormGroup.controls["questions"]; 
     questions.push(this.formBuilder.group({
      value :['' , Validators.required]
     }))
    })
  }

  sortDynamicJson(){
    let newArray = this.dynamicJSON;
    let questions: any = [    ]
    newArray.forEach(element => { 
        questions.push(element)
    });
    questions.sort((a, b) => a.order - b.order);
    this.dynamicJSON = questions;
  }

  onSubmit() {
    this.submitted = true

    console.log(this.questionFormGroup.value)
  }
}



