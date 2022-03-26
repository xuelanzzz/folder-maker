import {Injectable} from '@angular/core';
import {NodeModel} from './node.model';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  nodesSub: BehaviorSubject<NodeModel[]> = new BehaviorSubject<NodeModel[]>([]);
  nodes$ = this.nodesSub.asObservable();

  constructor() {
  }

  getNodes() {
    return this.nodes$;
  }

  addRoot(node: NodeModel) {
    const currentFiles = this.nodesSub.value;
    this.nodesSub.next([...currentFiles, node]);
  }

  addNode(node: NodeModel, current: NodeModel) {
    const currentFiles = this.nodesSub.value;
    if (!current.children) current.children = [];
    current.children = [...current.children, node];
    while (current.parent) {
      const indexForCurrent = current.parent.children.findIndex(c => c.id === current.id);
      current.parent.children.splice(indexForCurrent, 1, current);
      current = current.parent;
    }
    const index = currentFiles.findIndex(f => f.id === current.id);
    currentFiles.splice(index, 1, current);
    this.nodesSub.next(currentFiles);
  }

  deleteNode(node: NodeModel) {
    const currentFiles = this.nodesSub.value;
    let newFiles;
    // delete root node
    if (currentFiles.find(f => f.id === node.id)) {
      newFiles = currentFiles.filter(f => f.id !== node.id);
    } else {
      // delete node in one one the root node children
      newFiles = currentFiles.map(tree => this.deleteNodeInChildren(tree, node.id));
    }
    this.nodesSub.next(newFiles);
  }

  private deleteNodeInChildren(tree, id) {
    if (!tree.children) return tree;
    tree.children = tree.children.filter(subtree => {
      if (subtree.children) this.deleteNodeInChildren(subtree, id);
      return subtree.id !== id;
    })
    return tree;
  }
}
