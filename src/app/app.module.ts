import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MatIconModule } from "@angular/material/icon";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NodeComponent } from "./node/node.component";

@NgModule({
  declarations: [AppComponent, NodeComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, MatIconModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
