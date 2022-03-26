import {Component, Input, OnInit} from '@angular/core';
import {NodeModel} from "../node.model";
import {FilesService} from "../files.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {
  @Input() item: NodeModel;
  @Input() depth: number = 0;
  @Input() innerClass;
  showOptions = false;
  showForm = false;
  form = this.fb.group({
    name: [''],
    type: [''],
  })

  constructor(
    private fileService: FilesService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

  setType(type: 'file' | 'folder') {
    this.form.patchValue({type})
  }

  deleteItem() {
    this.fileService.deleteFile(this.item);
  }

  addItem() {
    this.fileService.addFile({...this.form.value, parent: this.item, id: new Date().getTime().toString(),}, this.item);
    this.closeForm();
  }


  closeForm() {
    this.form.reset();
    this.showForm = false;
  }

}
