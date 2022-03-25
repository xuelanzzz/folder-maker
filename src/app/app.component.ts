import {Component, OnInit} from '@angular/core';
import {FilesService} from "./files.service";
import {NodeModel} from "./node.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'folder-maker';
  files: NodeModel[] = [];

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
}
