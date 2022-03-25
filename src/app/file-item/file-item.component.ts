import {Component, Input, OnInit} from '@angular/core';
import {NodeModel} from "../node.model";

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {
  // @ts-ignore
  @Input() item: NodeModel;
  @Input() depth: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
