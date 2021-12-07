import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { NodeModel } from "./models/node.model";
import { NotifierService } from "./services/notifier.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  alive$ = new Subject<void>();
  title = "explorer-demo";

  rootNode: NodeModel = {
    id: "rootNode",
    type: "folder",
    children: [],
  };

  constructor(private service: NotifierService) {}

  ngOnInit() {
    const data = localStorage.getItem("explorerDemo");
    const parsed = data ? JSON.parse(data) ?? null : null;

    if (parsed) {
      this.rootNode = { ...parsed };
    }

    this.service.somethingUpdated$.pipe(takeUntil(this.alive$)).subscribe(() => {
      localStorage.setItem("explorerDemo", JSON.stringify(this.rootNode));
    });
  }

  ngOnDestroy() {
    this.alive$.next();
    this.alive$.complete();
  }
}
