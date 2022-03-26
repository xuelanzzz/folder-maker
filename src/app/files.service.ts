import {Injectable} from '@angular/core';
import {NodeModel} from './node.model';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

const fileUrl = 'assets/files.json';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  filesSub: BehaviorSubject<NodeModel[]> = new BehaviorSubject<NodeModel[]>([]);
  files$ = this.filesSub.asObservable();

  constructor(
  ) {}

  getFiles() {
    return this.files$;
  }

  addRoot(file: NodeModel) {
    const currentFiles = this.filesSub.value;
    this.filesSub.next([...currentFiles, file]);
  }

  addFile(node: NodeModel, current: NodeModel) {
    const currentFiles = this.filesSub.value;
    if (!current.children) current.children = [];
    current.children = [...current.children, node];
    while (current.parent) {
      const indexForCurrent = current.parent.children.findIndex(c => c.id === current.id);
      current.parent.children.splice(indexForCurrent, 1, current);
      current = current.parent;
    }
    const index = currentFiles.findIndex(f => f.id === current.id);
    currentFiles.splice(index, 1, current);
    this.filesSub.next(currentFiles);
  }

  deleteFile(node: NodeModel) {
    const currentFiles = this.filesSub.value;
    let newFiles;
    if (currentFiles.find(f => f.id === node.id)) {
      newFiles = currentFiles.filter(f => f.id !== node.id);
    } else {
      newFiles = currentFiles.map(tree => this.deleteNode(tree, node.id));
    }
    this.filesSub.next(newFiles);
  }

  private deleteNode(tree, id) {
    if (!tree.children) return tree;
    tree.children = tree.children.filter(subtree => {
      if (subtree.children) this.deleteNode(subtree, id);
      return subtree.id !== id;
    })
    return tree;
  }
}
