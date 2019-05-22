import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Store } from "@ngxs/store";
import { AddImage } from "../../../../actions/incident.actions";

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
   * if defined img file else NULL
   * default NULL
   */
  public file: any;
  public name: string;
  public desc: string;
  /**
   * count of loaded images
   */
  public loadedImg: number;

  constructor(private store: Store) {
    this.loadedImg = 0;
    this.setToDefault();
  }

  ngOnInit() {}

  /**
   * add incident image
   */
  public addImage = () => {
    if (this.file) {
      this.saveImage(false);
    }
    this.activeFileInput();
  };
  /**
   * save loaded image
   */
  public saveImage = (next: boolean) => {
    console.log(this.file);
    if (this.file && this.idIncident) {
      this.setLoading.emit(true);

      this.store
        .dispatch(
          new AddImage(
            {
              fileToUpload: this.file,
              popis: this.desc,
              id_udalost: this.idIncident
            },
            this.idIncident
          )
        )
        .subscribe(res => {
          // submit form, as result get id incident
          this.setLoading.emit(false);
          // change step
          if (next) {
            this.nextStep.emit();
          }
          // set to default
          this.setToDefault();
          // active file input
        });
    }
  };

  /**
   * on change input file value
   * @param event
   */
  public onFileChanged = (event): void => {
    //if target isn't there then take srcElement
    const target = event.target || event.srcElement;
    this.file = target.files[0];
    this.name = this.file.name;
    this.loadedImg++;
  };

  private activeFileInput = () => {
    const fileInput: HTMLElement = document.getElementById(
      "fileInput"
    ) as HTMLElement;
    fileInput.click();
  };

  private setToDefault = () => {
    this.file = null;
    this.desc = undefined;
    this.name = undefined;
  };
}
