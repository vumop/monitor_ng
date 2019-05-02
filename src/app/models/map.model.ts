import { HttpParams } from "@angular/common/http";

import { Map, View } from "ol";
import { defaults as defaultControls, ScaleLine } from "ol/control.js";
import { defaults as defaultInteraction } from "ol/interaction.js";
import proj4 from "proj4/dist/proj4";
import { register } from "ol/proj/proj4";

import { LayerModel } from "./layer.model";

export class MapModel {
  // OL map object
  private map: Map;

  private updateHistory: boolean;

  constructor() {
    proj4.defs(
      "EPSG:102067",
      "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +pm=greenwich +units=m +no_defs +towgs84=570.8,85.7,462.8,4.998,1.587,5.261,3.56"
    );

    register(proj4);

    this.map = new Map({
      controls: defaultControls({
        rotate: true,
        zoom: false
      }).extend([new ScaleLine({ units: "metric" })]),
      interactions: defaultInteraction({ doubleClickZoom: false }),
      view: new View({
        extent: [-925000, -1230000, -400000, -900000],
        projection: "EPSG:102067",
        maxZoom: 20,
        minZoom: 8,
        /**
         * used from URL history
         */
        center: this.getCenterFromUrl(),
        zoom: this.getZoomFromUrl()
      })
    });

    /**
     * the map control history
     */
    this.updateHistory = true;

    this.map.getView().on("change", this.onChangeView);
    // restore the view state when navigating through the history, see
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
    window.addEventListener("popstate", this.backInHistory);
  }

  public getMap: Map = () => this.map;

  public getMapView: View = () => this.map.getView();

  public addLayer(layer: LayerModel): void {
    this.map.addLayer(layer.olLayer);
  }

  public removeLayer(layer: LayerModel): void {
    this.map.removeLayer(layer.olLayer);
  }

  public getScaleFromResolution(resolution, round): string {
    //Projection units: 'degrees', 'ft', 'm', 'pixels', or 'us-ft'.
    //var units = App.mapaOL.Map.getView().getProjection().getUnits();
    //var dpi = 25.4 / 0.28;
    const dpi = this.getDpi();

    //const mpu = proj.METERS_PER_UNIT[units];
    // from metr to metr is 1
    const mpu = 1;
    const scale: number = resolution * mpu * 39.37 * dpi;
    let res: string = Math.round(scale) + "";
    if (round) {
      if (scale >= 9500 && scale <= 950000) {
        res = Math.round(scale / 1000) + "K";
      } else if (scale >= 950000) {
        res = Math.round(scale / 1000000) + "M";
      }
    }
    return res;
  }

  public getResolutionFromScale(scale: number): number {
    //var dpi = 25.4 / 0.28;
    const dpi = this.getDpi();
    //var units = App.mapaOL.Map.getView().getProjection().getUnits();
    //const mpu = proj.METERS_PER_UNIT[units];
    // from metr to metr is 1
    const mpu = 1;
    return scale / (mpu * 39.37 * dpi);
  }
  /**
   * get dpi
   */
  private getDpi(): number {
    return 96;
  }
  /**
   * get the map coordinates from the url params
   */
  private getCenterFromUrl(): [number, number] {
    const center = this.getParamValueQueryString("center");
    let x = -700000;
    let y = -1060000;
    if (center) {
      x = parseFloat(center.split(",")[0]);
      y = parseFloat(center.split(",")[1]);
    }
    return [x, y];
  }
  /**
   * get zoom level from the url params
   */
  private getZoomFromUrl(): number {
    const zoom = this.getParamValueQueryString("zoom");
    return zoom ? zoom : 10;
  }
  /**
   * get specifically URL params
   */
  private getParamValueQueryString(paramName): any {
    const url = window.location.href;
    let paramValue;
    if (url.includes("?")) {
      const httpParams = new HttpParams({ fromString: url.split("?")[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  private onChangeView = (evt): void => {
    /**
     * opetovne nacteni - neexistujici routa
     */
    if (!this.updateHistory) {
      // do not update the URL when the view was changed in the 'popstate' handler
      this.updateHistory = true;
      return;
    }
    /**
     * preserve current url parameters
     */
    const params = window.location.search.substring(1).split("&");
    let urlParams = "";
    params.forEach(item => {
      // have to be array lenght 2
      const param = item.split("=");
      if (param.length === 2) {
        if (param[0] === "zoom" || param[0] === "center") {
          return;
        }
        urlParams += `${param[0]}=${param[1]}&`;
      }
    });

    const path = window.location.pathname;
    const hash = `${path}?${urlParams}zoom=${evt.target.getZoom()}&center=${evt.target.getCenter()}`;
    const state = {
      zoom: evt.target.getZoom(),
      center: evt.target.getCenter(),
      rotation: evt.target.getRotation()
    };
    window.history.pushState(state, "", hash);
  };

  private backInHistory = (event): void => {
    if (event.state === null) {
      return;
    }
    this.getMapView().setCenter(event.state.center);
    this.getMapView().setZoom(event.state.zoom);
    this.getMapView().setRotation(event.state.rotation);

    this.updateHistory = false;
  };
}
