import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { NodeModel } from "../models/node.model";
import { NotifierService } from "../services/notifier.service";

@Component({
  selector: "app-node",
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
  @Input() node: NodeModel | null = null;
  @Input() isRootNode: boolean = false;
  @Output() deleteEvent = new EventEmitter<string>();

  addPanelVisible$ = new BehaviorSubject<{ type: "folder" | "file" | null } | null>(null);

  inputForm: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
  });

  constructor(private fb: FormBuilder, private service: NotifierService) {}

  ngOnInit(): void {}

  // open panel selection for file vs folder
  openAddPanelBlank() {
    this.addPanelVisible$.next({ type: null });
  }

  // open panel with type set as foler/file
  openAddPanel(isFolder: boolean) {
    this.addPanelVisible$.next({ type: isFolder ? "folder" : "file" });
  }

  // close add file/folder panel
  closeAddPanel() {
    this.addPanelVisible$.next(null);
  }

  // form submit: read name & create a node!
  formSubmit(type: any) {
    const value = this.inputForm.value;
    const name = value?.name;
    this.addNode(name, type == "folder");
    this.reset();
  }

  // reset form & close add panel
  reset() {
    this.inputForm.reset();
    this.closeAddPanel();
  }

  // generate a random Id and create a node
  private addNode(name: string, isFolder: boolean = false) {
    const id = this.generateId();
    const node: NodeModel = {
      id,
      name,
      type: isFolder ? "folder" : "file",
      children: [],
    };
    this.node?.children?.push(node);
    this.notify();
  }

  private deleteNodeByIndex(index: number) {
    this.node?.children?.splice(index, 1);
    this.closeAddPanel();
    this.notify();
  }

  deleteNode(id: string | undefined) {
    if (id) {
      const index = this.node?.children?.findIndex((x) => x.id === id) ?? -1;
      if (index > -1) {
        this.deleteNodeByIndex(index);
      }
    }
  }

  emitDelete(id: string | undefined) {
    this.deleteEvent.emit(id);
  }

  private generateId(): string {
    return `${new Date().toISOString()}_${this.getRandomSuffix()}`;
  }

  private getRandomSuffix(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  private notify() {
    this.service.somethingUpdated$.next();
  }
}
