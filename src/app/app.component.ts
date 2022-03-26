import {Component, OnInit} from '@angular/core';
import {FilesService} from "./files.service";
import {NodeModel} from "./node.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'folder-maker';
  files: NodeModel[] = [];
  formTitle = new FormControl('');
  showRootFrom = false;

  constructor(
    private fileService: FilesService,
  ) {
  }

  ngOnInit(): void {
    this.getFiles().subscribe(files => {
      this.files = files;
      console.log(files);
    });
  }

  getFiles() {
    return this.fileService.getFiles();
  }

  addToRoot() {
    const node: NodeModel = {
      id: new Date().getTime().toString(),
      name: this.formTitle.value,
      type: 'folder',
      parent: null,
    }
    this.fileService.addRoot(node);
    this.closeRootForm();
  }

  closeRootForm() {
    this.formTitle.reset();
    this.showRootFrom = false;
  }
}
