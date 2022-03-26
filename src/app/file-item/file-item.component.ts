import {Component, Input, OnInit} from '@angular/core';
import {NodeModel} from "../node.model";
import {FilesService} from "../files.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {
  @Input() item: NodeModel;
  @Input() innerClass;
  showOptions = false;
  showForm = false;
  form = this.fb.group({
    name: ['', [Validators.required]],
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
    this.fileService.deleteNode(this.item);
  }

  addItem() {
    this.fileService.addNode({...this.form.value, parent: this.item, id: new Date().getTime().toString(),}, this.item);
    this.closeForm();
  }


  closeForm() {
    this.form.reset();
    this.showForm = false;
  }

}
