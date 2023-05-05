import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SlicePipe} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { GlobalHelpComponent } from './global-help/global-help.component';
import { DownscaledHelpComponent } from './downscaled-help/downscaled-help.component';
import { ModelSimulationHelpComponent } from './model-simulation-help/model-simulation-help.component';
import { EnsembleMemberHelpComponent } from './ensemble-member-help/ensemble-member-help.component';
import { TemporalResolutionHelpComponent } from './temporal-resolution-help/temporal-resolution-help.component';
import { ClimateVariableHelpComponent } from './climate-variable-help/climate-variable-help.component';
import { FormatHelpComponent } from './format-help/format-help.component';
@NgModule({
  declarations: [
    AppComponent,
    GlobalHelpComponent,
    DownscaledHelpComponent,
    ModelSimulationHelpComponent,
    EnsembleMemberHelpComponent,
    TemporalResolutionHelpComponent,
    ClimateVariableHelpComponent,
    FormatHelpComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatRadioModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    LeafletModule,
    LeafletDrawModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [GlobalHelpComponent, DownscaledHelpComponent, ClimateVariableHelpComponent, ModelSimulationHelpComponent,
    EnsembleMemberHelpComponent, TemporalResolutionHelpComponent, FormatHelpComponent]
})
export class AppModule { }
