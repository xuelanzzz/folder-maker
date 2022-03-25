import {Injectable} from '@angular/core';
import {NodeModel} from './node.model';
import {HttpClient} from "@angular/common/http";

const fileUrl = 'assets/files.json';
@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private files: NodeModel[] = []; // file includes files & folders
  constructor(
    private http: HttpClient,
  ) {

  }

  getFiles() {
    return this.http.get<NodeModel[]>(fileUrl);
  }

  addToFiles(file: NodeModel, parent: NodeModel) {
    if (!parent.children) parent.children = [];
    parent.children.push(file);
  }

}
