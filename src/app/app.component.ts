import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {latLng, tileLayer, FeatureGroup, featureGroup, DrawEvents, rectangle, Map, LayerGroup, polygon, polyline, geoJSON, canvas} from 'leaflet';
import * as L from 'leaflet';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { GlobalHelpComponent } from './global-help/global-help.component';
import { DownscaledHelpComponent } from './downscaled-help/downscaled-help.component';
import { ModelSimulationHelpComponent } from './model-simulation-help/model-simulation-help.component';
import { EnsembleMemberHelpComponent } from './ensemble-member-help/ensemble-member-help.component';
import { TemporalResolutionHelpComponent } from './temporal-resolution-help/temporal-resolution-help.component';
import { ClimateVariableHelpComponent } from './climate-variable-help/climate-variable-help.component';
import { FormatHelpComponent } from './format-help/format-help.component';
import { Globals } from './globals';
interface ClimateVariable {
  value: string;
  viewValue: string;
}
interface EnsembleMember {
  value: string;
  viewValue: string;
}
interface TimePeriodMonth {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public dialog: MatDialog) { }
  title = 'GISClimateData';
  map: any;
  dataCollection = 'global';
  climateVariable: ClimateVariable[] = [
    {value: 'tas', viewValue: 'Air Temperature | C'},
    {value: 'ppt', viewValue: 'Precipitation Amount | mm'},
    {value: 'pr', viewValue: 'Precipitation Flux | kg m-2'},
    {value: 'ts', viewValue: 'Surface "Skin" Temperature | K'},
    // {value: 'tasmin', viewValue: 'Minimum Air Temperature | K'},
    // {value: 'tasmax', viewValue: 'Maximum Air Temperature | K'},
    {value: 'psl', viewValue: 'Sea Level Pressure | Pa'},
    {value: 'ps', viewValue: 'Surface Air Pressure | Pa'},
    // {value: 'clwvi', viewValue: 'Condensed Water Path | kg m-2'},
    {value: 'prc', viewValue: 'Convective Precipitation | kg m-2 s-1'},
    {value: 'evspsbl', viewValue: 'Evaporation | kg m-2 s-1'},
    {value: 'ci', viewValue: 'Fraction of Time Convection Occurs'},
    // {value: 'sci', viewValue: 'Fraction of Time Shallow Convection Occurs'},
    {value: 'clivi', viewValue: 'Ice Water Path | kg m-2'},
    {value: 'hur', viewValue: 'Relative Humidity | %'},
    {value: 'huss', viewValue: 'Near-Surface Specific Humidity'},
    {value: 'rtmt', viewValue: 'Net Downward Flux at Top of Model | W m-2'},
    {value: 'prsn', viewValue: 'Snowfall Flux | kg m-2 s-1'},
    {value: 'tauu', viewValue: 'Surface Downward Eastward Wind Stress | Pa'},
    {value: 'tauv', viewValue: 'Surface Downward Northward Wind Stress | Pa'},
    {value: 'rldscs', viewValue: 'Surface Downwelling Clear-Sky Longwave Radiation | W m-2'},
    {value: 'rsdscs', viewValue: 'Surface Downwelling Clear-Sky Shortwave Radiation | W m-2'},
    {value: 'rlds', viewValue: 'Surface Downwelling Longwave Radiation | W m-2'},
    {value: 'rsds', viewValue: 'Surface Downwelling Shortwave Radiation | W m-2'},
    {value: 'hfls', viewValue: 'Surface Upward Latent Heat Flux | W m-2'},
    {value: 'hfss', viewValue: 'Surface Upward Sensible Heat Flux | W m-2'},
    {value: 'rsuscs', viewValue: 'Surface Upwelling Clear-Sky Shortwave Radiation | W m-2'},
    {value: 'rlus', viewValue: 'Surface Upwelling Longwave Radiation | W m-2'},
    {value: 'rsus', viewValue: 'Surface Upwelling Shortwave Radiation | W m-2'},
    {value: 'rsdt', viewValue: 'Top of Atmosphere Incident Shortwave Radiation | W m-2'},
    {value: 'rlutcs', viewValue: 'Top of Atmosphere Outgoing Clear-Sky Longwave Radiation | W m-2'},
    {value: 'rsutcs', viewValue: 'Top of Atmosphere Outgoing Clear-Sky Shortwave Radiation | W m-2'},
    {value: 'rlut', viewValue: 'Top of Atmosphere Outgoing Longwave Radiation | W m-2'},
    {value: 'rsut', viewValue: 'Top of Atmosphere Outgoing Shortwave Radiation | W m-2'},
    {value: 'clt', viewValue: 'Total Cloud Fraction | %'},
    {value: 'prw', viewValue: 'Water Vapor Path | kg m-2'}
  ];
  conusGeoJSON = Globals.conusGeoJSON;
  selectedClimateVariable = this.climateVariable[0].value;
  modelSimulation = 'historical';
  ensembleMember: EnsembleMember[] = [
    {value: 'ea', viewValue: 'Ensemble Average'},
    {value: 'run4', viewValue: 'Run 4'},
    {value: 'run10', viewValue: 'Run 10'},
    {value: 'run11', viewValue: 'Run 11'}
    ];
  selectedEnsembleMember = this.ensembleMember[0].value;
  regionOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Map &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'})
    ],
    noWrap: true,
    maxBounds: [[90, -180], [-90, 180]],
    zoom: 1,
    center: latLng(51.163, 10.45)
  };
  conusOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Map &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'}),
      geoJSON(({type: 'MultiPolygon', coordinates: this.conusGeoJSON}) as any, {style: () => ({opacity: 0.2})})
    ],
    noWrap: true,
    maxBounds:  [[23.8991, -125.3321], [50, -65.7421]],
    zoom: 3,
    center: latLng(39.0902, 96.7129)
  };
  drawnItems: FeatureGroup = featureGroup();
  drawEdit = {
    edit: {
      featureGroup: this.drawnItems
    },
    draw: false
  };
  drawDelete = {
    edit: false,
    draw: false
  };
  drawOptions = {
    position: 'topright',
    draw: {
      marker: false,
      polyline: false,
      circle: false,
      polygon: false,
      circlemarker: false,
      rectangle: {
        shapeOptions: {
          color: '#85bb65'
        }
      }
    },
  };
  globalExtent = rectangle([[90, -180], [-90, 180]], {color: '#85bb65'});
  globalButton = false;
  globalExtentOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Map &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' }),
      this.globalExtent,
    ],
    noWrap: true,
    maxBounds: [[90, -180], [-90, 180]],
    zoom: 1,
    center: latLng(51.163, 10.45)
  };
  west = '-180.00';
  east = '180.00';
  south = '-90.00';
  north = '90.00';
  temporalResolution = 'monthly/mean';
  timePeriodMonth: TimePeriodMonth[] = [
    {value: 'all', viewValue: 'All Months'},
    {value: 'january', viewValue: 'January'},
    {value: 'february', viewValue: 'February'},
    {value: 'march', viewValue: 'March'},
    {value: 'april', viewValue: 'April'},
    {value: 'may', viewValue: 'May'},
    {value: 'june', viewValue: 'June'},
    {value: 'july', viewValue: 'July'},
    {value: 'august', viewValue: 'August'},
    {value: 'september', viewValue: 'September'},
    {value: 'october', viewValue: 'October'},
    {value: 'november', viewValue: 'November'},
    {value: 'december', viewValue: 'December'},
    {value: 'annual', viewValue: 'Annual'}
  ];
  selectedTimePeriodMonth = this.timePeriodMonth[0].value;
  timePeriodOptions = 'monthly';
  startYear = 1850;
  endYear = 1850;
  format = '.shp';
  shown = 'true';
  durationInSeconds = 10;
  downloadUrl = '';
  errorCode = '';
  /**
   * Flip global extent boolean when clicked, set coordinates when data collection step is done
   * param $event
   * return void
   */
  changeGlobal($event): void {
    this.globalButton = !this.globalButton;
    if (this.globalButton && this.dataCollection === 'global'){
      this.west = '-180.00';
      this.east = '180.00';
      this.south = '-90.00';
      this.north = '90.00';
      this.shown = 'true';
      // Remove layers when toggling
      const layers = this.drawnItems;
      layers.eachLayer(function(layer) {
        layers.removeLayer(layer);
      });

    }else if (this.globalButton && this.dataCollection !== 'global'){
      this.west = '-100.00';
      this.east = '-95.00';
      this.south = '35.00';
      this.north = '40.00';
      this.shown = 'true';
      // Remove layers when toggling
      const layers = this.drawnItems;
      layers.eachLayer(function(layer) {
        layers.removeLayer(layer);
      });
    }
  }
  /**
   * Return options for map depending on global extent button value or if downscaled is selected
   * param void
   * return leafletOptions:Object
   */
  checkGlobal(): object {
    if (this.globalButton && this.dataCollection === 'global'){
      return this.globalExtentOptions;
    }else if (!this.globalButton && this.dataCollection === 'global'){
      return this.regionOptions;
    }else{
      return this.conusOptions;
    }
  }
  /**
   * Leaflet function detects when a drawing is made, set Lat/Long of this drawing in the coordinates input
   * param e:any
   * return void
   */
  onDrawCreated(e: any): void {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
    this.shown = 'false';
    const layer = e.layer;
    const LatLngs = layer.getLatLngs()[0];
    // Set Lat/Long to NSEW coords, shorten to 6 decimals
    this.north = LatLngs[1].lat.toFixed(6);
    this.south = LatLngs[0].lat.toFixed(6);
    this.east = LatLngs[2].lng.toFixed(6);
    this.west = LatLngs[0].lng.toFixed(6);
  }
  /**
   * Leaflet function detects when a drawing is edited, choose Lat/Long from edited drawing
   * param e:any
   * return void
   */
  onDrawEdited(e: any): void {
    let LatLngs = [];
    // Have to loop through layers for edited Lat/Long
    const layers = e.layers;
    layers.eachLayer(function(layer) {
      LatLngs = layer.getLatLngs()[0];
      });
    this.north = LatLngs[1].lat.toFixed(6);
    this.south = LatLngs[0].lat.toFixed(6);
    this.east = LatLngs[2].lng.toFixed(6);
    this.west = LatLngs[0].lng.toFixed(6);
  }
  /**
   * Leaflet function that detects when a drawing is deleted
   * param e:any
   * return void
   */
  onDrawDeleted(e: any): void {
    this.shown = 'true';
  }
  /**
   * If Data Collection step is returned to, map resets with drawings removed, coordinates reset
   * param event:any
   * return void
   */
  resetMap(event: any): void{
    if (this.dataCollection === 'global'){
      this.west = '-180.00';
      this.east = '180.00';
      this.south = '-90.00';
      this.north = '90.00';
      this.shown = 'true';
      const layers = this.drawnItems;
      layers.eachLayer(function(layer) {
        layers.removeLayer(layer);
      });
    }else{
      this.west = '-100.00';
      this.east = '-95.00';
      this.south = '35.00';
      this.north = '40.00';
      this.shown = 'true';
      const layers = this.drawnItems;
      layers.eachLayer(function(layer) {
        layers.removeLayer(layer);
      });
    }
  }
  /**
   * Capture changes in forms and make specific changes to options shown (specifically start/end, months)
   * param event: any
   * return void
   */
  changeOptions(event: any): void
  {
    if (this.temporalResolution === 'longterm/average' || this.temporalResolution === 'anomaly'){
      // Don't show All Months option
      if (this.selectedTimePeriodMonth === 'all'){
        this.selectedTimePeriodMonth = this.timePeriodMonth[1].value;
      }
    }
    // Based on Model Simulation/Temporal
    if (this.modelSimulation === 'historical' && (this.temporalResolution === 'monthly/mean' || this.temporalResolution === 'annual/mean')){
      this.startYear = 1850;
      this.endYear = 1850;
      this.timePeriodOptions = 'monthly';
    }else if (this.modelSimulation !== 'historical' && (this.temporalResolution === 'monthly/mean' || this.temporalResolution === 'annual/mean')){
      this.startYear = 2015;
      this.endYear = 2015;
      this.timePeriodOptions = 'monthly';
    }else{
      this.startYear = 2015;
      this.endYear = 2015;
    }
  }
  /**
   * Help text function uses companent help text to fill dialog box based on whatever is selected
   * param helpType: String
   * return void
   */
  openDialog(helpType): void {
    if (helpType === 'global'){
      this.dialog.open(GlobalHelpComponent);
    }else if (helpType === 'downscaled'){
      this.dialog.open(DownscaledHelpComponent);
    }else if (helpType === 'model-simulation'){
      this.dialog.open(ModelSimulationHelpComponent);
    }else if (helpType === 'ensemble-member'){
      this.dialog.open(EnsembleMemberHelpComponent);
    }else if (helpType === 'temporal-resolution'){
      this.dialog.open(TemporalResolutionHelpComponent);
    }else if (helpType === 'climate-variable'){
      this.dialog.open(ClimateVariableHelpComponent);
    }else if (helpType === 'format'){
      this.dialog.open(FormatHelpComponent);
    }

  }
  /**
   * Receive data function
   * param res:any, statusText: String, status: any
   * return void
   */
  receiveData(res: any, statusText: string, status: any): void{
    console.log('try', res, statusText, status);

  }
  /**
   * Validation step and request data
   * params scale:String, variable:String, scenario:String, ensemble:String, run:String, period:String, month:String,
   *     start:String, end:String, format:String, ymax:String, ymin:String, xmax:String, xmin:String
   * return data or error
   */
  validate(e): boolean {
    this.downloadUrl = '';

    let yearRange = this.modelSimulation === 'historical' ? {start: 1850, end: 2014} : {start: 2015, end: 2100};
    // Set up object with bounding box range for Downscaled
    let coordRange = null;
    if (this.dataCollection === 'downscaled'){
      coordRange = {ymax: 49.9166, ymin: 24.0833, xmax: -66.4999, xmin: -125};
    }
    const msg = [];
    // Empty start and year times
    if (this.startYear === null){
      msg.push('Please enter a start year\n');
    }
    if (this.endYear === null){
      msg.push('Please enter an end year\n');
    }
    // Case where start/end are not entered, so must be set
    if (this.modelSimulation === 'historical' && this.temporalResolution === 'longterm/average'){
      this.startYear = 1996;
      this.endYear = 1996;
      yearRange = {start: 1996, end: 1996};
    }
    // If values entered aren't numbers, or out of range, print error
    if (isNaN(Number(this.startYear)) || isNaN(Number(this.endYear)) || this.startYear < yearRange.start || this.endYear > yearRange.end){
        msg.push('Please specify years between ' + yearRange.start + ' and ' + yearRange.end + '\n' );
      }else if (Number(this.startYear) > Number(this.endYear)){
        msg.push('Start year cannot be after the end year.\n');
      }else if (this.temporalResolution === 'monthly/mean' && this.selectedTimePeriodMonth === 'all' && (Number(this.endYear) - Number(this.startYear)) > 20){
        msg.push('For \'All Months\' the interval may not exceed 20 years.');
      }else if (this.temporalResolution === 'monthly/mean' && (Number(this.endYear) - Number(this.startYear)) > 20 && this.format === '.shp'){
      msg.push('For shapefiles, please specify a range that doesn\'t exceed 20 years');
    }else if ((this.temporalResolution === 'longterm/average' || this.temporalResolution === 'anomaly') && (Number(this.endYear) - Number(this.startYear)) > 10 && this.format === '.shp'){
      msg.push('For shapefiles, please specify a range that doesn\'t exceed 10 years');
    }
    // If all are empty, allow submission
    // If one is empty, throw error
    // If entries aren't numbers, or aren't in range, throw error
    // If values entered outside of continental US typed or bbox is bigger than 5x5 degrees, throw error
    if (!this.north && !this.south && !this.east && !this.west){
      if (this.dataCollection === 'global'){
        this.west = '-180.00';
        this.east = '180.00';
        this.south = '-90.00';
        this.north = '90.00';
      }else{
        this.west = '-100.00';
        this.east = '-95.00';
        this.south = '35.00';
        this.north = '40.00';
      }
    } else if (!this.north || !this.south || !this.east || !this.west){
      msg.push('Please check the coordinates; some appear to be invalid.\n');
    } else if (!(Number(this.north) && Number(this.south) && Number(this.east) && Number(this.west))){
      msg.push('Please check the coordinates; some appear to be invalid.\n');
    } else if ((
      (Number(this.west) > Number(this.east)) || (Number(this.south) > Number(this.north)) ||
      (-180 > Number(this.west)) || (180 < Number(this.west)) ||
      (-180 > Number(this.east)) || (180 < Number(this.east)) ||
      (-90 > Number(this.south)) || (90 < Number(this.south)) ||
      (-90 > Number(this.north)) || (90 < Number(this.north)))){
      msg.push('Please check the coordinates; some appear to be invalid.\n');
    }else if (coordRange){
      if (!(Number(this.west) > coordRange.xmin && Number(this.east) < coordRange.xmax && Number(this.south) > coordRange.ymin && Number(this.north) < coordRange.ymax)){
      msg.push('Please select coordinates within the United States\n');
      }else if (Math.abs(Number(this.east) - Number(this.west)) > 5 || Math.abs(Number(this.north) - Number(this.south)) > 5){
        msg.push('Please select a smaller bounding box (5 by 5 degrees)\n');
      }
    }
    // This is the error box that pops up with all of the form errors
    if (msg.length > 0){
      this._snackBar.open(msg.join(''), 'close', {
        duration: this.durationInSeconds * 1000,
      });
      this.downloadUrl = '#';
      e.preventDefault();
      return true;
    }else{
      // Request data if there are no errors
      // Common url parts
      //https://tds.gisclimatechange.ucar.edu/products/
      //'http://128.117.14.70:5000/products/'
      const baseurl = 'http://compass.rap.ucar.edu:82/products/' + this.dataCollection + '/' + this.selectedClimateVariable + '/' + this.modelSimulation + '/' + this.temporalResolution;
      const urlArray = [baseurl];
      // For Monthly Mean, include Run (ensemble average, run1, run2, ...)
      if (this.temporalResolution === 'monthly/mean'){
        urlArray.push(this.selectedEnsembleMember);
      }
      // For Long Term Average (aka 20-year Mean) or Climate Anomaly, include Period Type (monthly or annual)
      if (this.temporalResolution === 'longterm/average' || this.temporalResolution === 'anomaly'){
        urlArray.push(this.timePeriodOptions);
      }
      // If Monthly Mean, Long Term Average (aka 20-year Mean), or Climate Anomaly, AND month is Jan-Dec or "All", include the month
      if (this.temporalResolution !== 'annual/mean' && this.timePeriodOptions !== 'annual'){
        urlArray.push(this.selectedTimePeriodMonth);
      }
      // Always include start/end year
      urlArray.push(''+this.startYear);
      urlArray.push(''+this.endYear);
      let url = urlArray.join('/');

      url += this.format;

      if (this.west && this.east && this.south && this.north){
        url += '?ymin=' + this.south + '&ymax=' + this.north + '&xmin=' + this.west + '&xmax=' + this.east;
      }
      console.log(url);
      this.downloadUrl = url;

      /* send a log request to the server */
      // this.postLogMessage(url);

      /* download the data with an http get */
      // this.getDataRequest(this.downloadUrl);
      return true;
    }
    return true;
  }


  public getDataRequest(url: string): void
  {
    const ahref = document.createElement('a')
    ahref.setAttribute('href', this.downloadUrl);
    ahref.setAttribute('target', 'download');
    document.getElementById('hiddenLink')
      .appendChild(ahref);

    ahref.click();
  }


  public postLogMessage(url: string): void
  {
    /* send a log request to the server */
    const logUrl = 'https://tds.gisclimatechange.ucar.edu/products/log';
    const logBody = {URL: url, status: this.errorCode};
    const logOptions = {
      'headers': new HttpHeaders()
        .append('Content-Type', 'plain/text')
    };
    this.http.post(logUrl, logBody, logOptions)
      .subscribe(this.handlePostLogMessageResponse.bind(this));
  }

  private handlePostLogMessageResponse(): void
  {
    console.log('POST FINISHED');
  }
}
