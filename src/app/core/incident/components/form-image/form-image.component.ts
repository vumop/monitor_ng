import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

import { Store } from "@ngxs/store";
import { AddImage } from "../../../../actions/incident.actions";
import { take } from "rxjs/operators";

@Component({
  selector: "app-incident-form-image",
  templateUrl: "./form-image.component.html",
  styleUrls: ["./form-image.component.css"]
})
export class FormImageComponent implements OnInit {
  @Input() idIncident: number;

  @Output() setLoading = new EventEmitter<boolean>();

  @Output() nextStep = new EventEmitter();
  /**
   * name of file
   */
  public name: string;
  /**
   * count of loaded images
   */
  public loadedImg: number;

  public form: FormGroup;

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.form.controls;
  }

  constructor(private formBuilder: FormBuilder, private store: Store) {
    this.loadedImg = 0;
    this.name = undefined;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fileToUpload: [undefined, Validators.compose([Validators.required])],
      popis: [{ value: undefined, disabled: true }],
      id_udalost: [],
      valid: [false, Validators.compose([Validators.required])]
    });
  }
  /**
   * save loaded image
   */
  public saveImage = (next: boolean) => {
    this.form.controls["id_udalost"].setValue(this.idIncident);
    this.store
      .dispatch(new AddImage(this.form.value, this.idIncident))
      .pipe(take(1))
      .subscribe(res => {
        // submit form, as result get id incident
        this.setLoading.emit(false);
        // reset inputs
        if (res.Incidents.additionImage.success) {
          this.loadedImg++;
          this.form.controls["fileToUpload"].reset();
          this.form.controls["popis"].reset();
          if (next) {
            this.nextStep.emit();

          }
        }
      });
  }

  public onSubmit = (next: boolean = true) => {
    if (this.form.valid && this.idIncident) {
      this.saveImage(next);
    }
  };

  /**
   * add incident image
   */
  public addImage = () => {
    // if the user already selected file, the form is submitted
    this.onSubmit(false);
    this.activeFileInput();
  };

  /**
   * on change input file value
   * @param event
   */
  public onFileChanged = (event): void => {
    //if target isn't there then take srcElement
    const target = event.target || event.srcElement;
    this.name = target.files[0].name;
    this.form.controls["popis"].enable();
  };

  private activeFileInput = () => {
    const fileInput: HTMLElement = document.getElementById(
      "fileInput"
    ) as HTMLElement;
    fileInput.click();
  };
}
