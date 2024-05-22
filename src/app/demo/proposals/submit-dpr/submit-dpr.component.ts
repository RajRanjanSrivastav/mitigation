import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-submit-dpr',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './submit-dpr.component.html',
  styleUrl: './submit-dpr.component.scss'
})
export class SubmitDprComponent {
  constructor(private builder: FormBuilder) {}
  isLinear = true;
  previewData: any;
  selectedCategory: any;

  ngOnInit(): void {
    this.addMoreRows('breakDownCost'), this.addMoreRows('objOutcomes'), this.addMoreRows('projectLocation'), this.addMoreRows('monitoring');
  }

  DPR = this.builder.group({
    projectDetails: this.builder.group({
      projectTitle: this.builder.control(''),
      typesOfProject: this.builder.control(''),
      totalEstimatedBud: this.builder.control(''),
      totalDuration: this.builder.control(''),
      summaryProject: this.builder.control(''),
      goalsDpr: this.builder.control(''),
      projectLocation: this.builder.array([]),
      objOutcomes: this.builder.array([])
    }),
    projectCost: this.builder.group({
      breakDownCost: this.builder.array([]),
      grandToatl: this.builder.control(''),
      ineligibleCost: this.builder.control(''),
      contribution: this.builder.control(''),
      totalElidible: this.builder.control(''),
      requestFund: this.builder.control(''),
      costDetermined: this.builder.control('')
    }),
    Monitoring: this.builder.group({
      monitoringInd: this.builder.array([])
    }),
    AttachedDoc: this.builder.group({
      hazardReport: this.builder.control(''),
      vulnerablitliyReport: this.builder.control(''),
      CommunityReport: this.builder.control(''),
      questionnaireReport: this.builder.control(''),
      riskReport: this.builder.control(''),
      optionReport: this.builder.control(''),
      costBenfitReport: this.builder.control(''),
      preliminaryReport: this.builder.control(''),
      projectReport: this.builder.control(''),
      costDeterReport: this.builder.control(''),
      researchReport: this.builder.control('')
    }),
    assessmentReport: this.builder.group({
      hazardAsseessment: this.builder.control(''),
      vulnerabilityAsseessment: this.builder.control(''),
      riskAsseessment: this.builder.control(''),
      stakeholderAsseessment: this.builder.control(''),
      mitigationAsseessment: this.builder.control(''),
      costBenifitAsseessment: this.builder.control(''),
      plannedAsseessment: this.builder.control(''),
      implementationAsseessment: this.builder.control(''),
      budgetAsseessment: this.builder.control(''),
      reportingAsseessment: this.builder.control(''),
      conflictAsseessment: this.builder.control(''),
      hazardText: this.builder.control(''),
      vulnerabilityText: this.builder.control(''),
      riskText: this.builder.control(''),
      stakeholderText: this.builder.control(''),
      mitigationText: this.builder.control(''),
      costBenifitText: this.builder.control(''),
      plannedText: this.builder.control(''),
      implementationText: this.builder.control(''),
      budgetText: this.builder.control(''),
      reportingText: this.builder.control(''),
      conflictText: this.builder.control('')
    })
  });

  // this is for dynamic add fields
  get projectLocationArr(): FormArray {
    return this.projectDetailsform.get('projectLocation') as FormArray;
  }
  get objOutcomesArr(): FormArray {
    return this.projectDetailsform.get('objOutcomes') as FormArray;
  }

  get breakDownCostArr(): FormArray {
    return this.projectCostForm.get('breakDownCost') as FormArray;
  }

  get monitoringIndArr(): FormArray {
    return this.MonitoringForm.get('monitoringInd') as FormArray;
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    // if (input.files.length > 0) {
    //   const file = input.files[0];
    //   if (this.files.length > index) {
    //     this.files.at(index).setValue(file.name);
    //   } else {
    //     this.files.push(this.builder.control(file.name));
    //   }
    // }
    console.log('dekho');
  }

  //for add more Rows
  addMoreRows(type: String): void {
    if (type == 'projectLocation') {
      this.projectLocationArr.push(
        this.builder.group({
          villageDpr: [''],
          blockDpr: [''],
          districtDpr: [''],
          stateDpr: [''],
          geoCordDpr: [''],
          siteNo: ['']
        })
      );
    } else if (type == 'objOutcomes') {
      this.objOutcomesArr.push(
        this.builder.group({
          outcome1: [''],
          outcome2: [''],
          outcome3: ['']
        })
      );
    } else if (type == 'breakDownCost') {
      this.breakDownCostArr.push(
        this.builder.group({
          objectiveActivity: [''],
          amount: ['']
        })
      );
    } else if (type == 'monitoring') {
      this.monitoringIndArr.push(
        this.builder.group({
          indicators: [''],
          description: [''],
          output: ['']
        })
      );
    }
  }
  // for remove rows
  removeRow(index: number, type: String): void {
    if (type == 'projectLocation') {
      if (this.projectLocationArr.length > 1) {
        this.projectLocationArr.removeAt(index);
      }
    } else if (type == 'objOutcomes') {
      if (this.objOutcomesArr.length > 1) {
        this.objOutcomesArr.removeAt(index);
      }
    } else if (type == 'breakDownCost') {
      if (this.breakDownCostArr.length > 1) {
        this.breakDownCostArr.removeAt(index);
      }
    } else if (type == 'monitoring') {
      if (this.monitoringIndArr.length > 1) {
        this.monitoringIndArr.removeAt(index);
      }
    }
  }

  // this id for form
  get projectDetailsform() {
    return this.DPR.get('projectDetails') as FormGroup;
  }
  get projectCostForm() {
    return this.DPR.get('projectCost') as FormGroup;
  }
  get MonitoringForm() {
    return this.DPR.get('Monitoring') as FormGroup;
  }
  get AttachedDocForm() {
    return this.DPR.get('AttachedDoc') as FormGroup;
  }
  get assessmentReportForm() {
    return this.DPR.get('assessmentReport') as FormGroup;
  }

  onRadioChange(category: string): void {
    this.selectedCategory = category;
  }

  // gatherPreviewData
  gatherPreviewData() {
    const rawPreviewData = this.DPR.value;
    // this.previewData = this.PPR.value;
    // console.log(this.previewData, 'before');

    this.previewData = rawPreviewData;

    console.log(this.previewData, 'preview');
  }

  // go to first step
  goToStep(stepper: MatStepper, index: number) {
    stepper.selectedIndex = index;
  }

  //for submit form data
  HandleSubmit() {
    if (this.DPR.valid) {
      console.log(this.DPR.value);
    }
  }

  onFileChange(event: Event, category: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.DPR.get(['projectCost', 'fileUploads', category]).setValue(file);
    }
  }
}
