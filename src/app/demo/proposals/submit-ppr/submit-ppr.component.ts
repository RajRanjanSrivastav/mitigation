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
  selector: 'app-submit-ppr',
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
  templateUrl: './submit-ppr.component.html',
  styleUrl: './submit-ppr.component.scss'
})
export class SubmitPPRComponent {
  constructor(private builder: FormBuilder) {}
  isLinear = true;
  previewData: any;

  ngOnInit(): void {
    this.addImplimentExp();
    this.addMoreRows('proposedHuman');
    this.addMoreRows('projectPointContact');
  }

  PPR = this.builder.group({
    applicantDetails: this.builder.group({
      applicantDepartmentName: this.builder.control(''),
      typeOrg: this.builder.control(''),
      addressApplicant: this.builder.control(''),
      stateApplicant: this.builder.control(''),
      cityApplicant: this.builder.control(''),
      districtApplicant: this.builder.control(''),
      pincodeApplicant: this.builder.control(''),
      projectPointContact: this.builder.array([])
    }),
    organisationLegal: this.builder.group({
      statusOrg: this.builder.control(''),
      natureBusiness: this.builder.control(''),
      dateIncorporation: this.builder.control(''),
      referenceNo: this.builder.control(''),
      addressHeadOrg: this.builder.control(''),
      addressRegisteredOrg: this.builder.control(''),
      otherRelevantInfo: this.builder.control('')
    }),
    implementExp: this.builder.group({
      implementExpArr: this.builder.array([])
    }),
    projectOverview: this.builder.group({
      projectTitle: this.builder.control(''),
      stateProject: this.builder.control(''),
      hazardProject: this.builder.control(''),
      hazardProfileArea: this.builder.control(''),
      projectRationale: this.builder.control(''),
      projectDescription: this.builder.control(''),
      projectObjective: this.builder.control(''),
      projectGoals: this.builder.control(''),
      projectActivities: this.builder.control(''),
      projectPartners: this.builder.control(''),
      projectIndicators: this.builder.control(''),
      Approximateproject: this.builder.control(''),
      Approximatebudget: this.builder.control(''),
      mitigationCheckProject: this.builder.control(''),
      typesProjectCheck: this.builder.group({
        Infrastructure: [false],
        Regulations: [false],
        Protection: [false],
        Awareness: [false]
      }),
      proposedHuman: this.builder.array([])
    }),
    documentChecklist: this.builder.group({
      coverLetter: this.builder.control(''),
      incorporation: this.builder.control(''),
      cpoyPan: this.builder.control(''),
      cpoyGst: this.builder.control(''),
      contactDetails: this.builder.control(''),
      registerCompRefNo: this.builder.control(''),
      auditedFinancial: this.builder.control(''),
      supportingImpli: this.builder.control(''),
      expressionInterest: this.builder.control(''),
      files: this.builder.array([])
    })
  });

  // this is for dynamic add fields
  get projectPointContact(): FormArray {
    return this.applicantDetailsform.get('projectPointContact') as FormArray;
  }

  get proposedHuman(): FormArray {
    return this.projectOverviewform.get('proposedHuman') as FormArray;
  }
  get implementExpArr(): FormArray {
    return this.implementExpform.get('implementExpArr') as FormArray;
  }
  get files(): FormArray {
    return this.PPR.get('documentChecklist').get('files') as FormArray;
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      const file = input.files[0];
      if (this.files.length > index) {
        this.files.at(index).setValue(file.name);
      } else {
        this.files.push(this.builder.control(file.name));
      }
    }
    console.log(this.files, 'dekho');
  }

  // for add rows
  addMoreRows(type: String) {
    if (type == 'proposedHuman') {
      this.proposedHuman.push(
        this.builder.group({
          areaExpertise: [''],
          resourcesPartTime: [''],
          resourcesFullTime: ['']
        })
      );
    } else if ((type = 'projectPointContact')) {
      this.projectPointContact.push(
        this.builder.group({
          nameProjectPoint: [''],
          emailrojectPoint: [''],
          designationProjectPoint: [''],
          mobileNoProjectPoint: ['']
        })
      );
    }
  }

  //for remove rows
  removeRows(index: number, type: string) {
    if (type == 'proposedHuman') {
      if (this.proposedHuman.length > 1) {
        this.proposedHuman.removeAt(index);
      }
    } else if ((type = 'projectPointContact')) {
      if (this.projectPointContact.length > 1) {
        this.projectPointContact.removeAt(index);
      }
    } else if (type == 'implementExpArr') {
      if (this.implementExpArr.length > 1) {
        this.implementExpArr.removeAt(index);
      }
    }
  }

  //for add impliment exp
  addImplimentExp() {
    this.implementExpArr.push(
      this.builder.group({
        clientNameExp: this.builder.control(''),
        projectScopeExp: this.builder.control(''),
        projectSrtExp: this.builder.control(''),
        projectValExp: this.builder.control(''),
        nameReferredExp: this.builder.control(''),
        designationExp: this.builder.control(''),
        phoneNoExp: this.builder.control(''),
        emailExp: this.builder.control(''),
        postalAddExp: this.builder.control('')
      })
    );
  }

  //remove impiment exp
  removeImplimentExp(index: number) {
    if (this.implementExpArr.length > 1) {
      this.implementExpArr.removeAt(index);
    }
  }

  get applicantDetailsform() {
    return this.PPR.get('applicantDetails') as FormGroup;
  }
  get organisationLegalform() {
    return this.PPR.get('organisationLegal') as FormGroup;
  }
  get projectOverviewform() {
    return this.PPR.get('projectOverview') as FormGroup;
  }
  get implementExpform() {
    return this.PPR.get('implementExp') as FormGroup;
  }
  get documentChecklistform() {
    return this.PPR.get('documentChecklist') as FormGroup;
  }

  // gatherPreviewData
  gatherPreviewData() {
    const rawPreviewData = this.PPR.value;
    // this.previewData = this.PPR.value;
    // console.log(this.previewData, 'before');

    // Filter only the checked checkboxes for mitigationCheckProject
    const mitigationChecked = Object.keys(rawPreviewData.projectOverview.mitigationCheckProject)
      .filter((key) => rawPreviewData.projectOverview.mitigationCheckProject[key])
      .reduce((obj, key) => {
        obj[key] = true;
        return obj;
      }, {});

    // Filter only the checked checkboxes for typesProjectCheck
    const typesChecked = Object.keys(rawPreviewData.projectOverview.typesProjectCheck)
      .filter((key) => rawPreviewData.projectOverview.typesProjectCheck[key])
      .reduce((obj, key) => {
        obj[key] = true;
        return obj;
      }, {});

    this.previewData = {
      ...rawPreviewData,
      projectOverview: {
        ...rawPreviewData.projectOverview,
        mitigationCheckProject: mitigationChecked,
        typesProjectCheck: typesChecked
      }
    };

    // console.log(this.previewData);
  }

  // go to first step
  goToStep(stepper: MatStepper, index: number) {
    stepper.selectedIndex = index;
  }

  //for submit form data
  HandleSubmit() {
    if (this.PPR.valid) {
      console.log(this.PPR.value);
    }
  }
}
