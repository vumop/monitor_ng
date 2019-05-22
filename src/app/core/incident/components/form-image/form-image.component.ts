import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-incident-form-image",
  templateUrl: "./form-image.component.html",
  styleUrls: ["./form-image.component.css"]
})
export class FormImageComponent implements OnInit {
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

  constructor() {
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
    if (this.file) {
      this.setLoading.emit(true);
      setTimeout(() => {
        // submit form, as result get id incident
        this.setLoading.emit(false);
        // change step
        if (next) {
          this.nextStep.emit();
        }
        // set to default
        this.setToDefault();
        // active file input
      }, 1200);
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
