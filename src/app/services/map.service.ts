import { Injectable } from "@angular/core";

import { HttpParams } from "@angular/common/http";

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

@Injectable({
  providedIn: "root"
})
export class MapService {
  private map: Map;

  private updateHistory: boolean;

  constructor() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: this.getCenterFromUrl(),
        zoom: this.getZoomFromUrl()
      })
    });

    /**
     * the map control history
     */
    this.updateHistory = true;

    this.map.getView().on("change", evt => {
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
      for (let i = 0; i < params.length; i++) {
        // have to be array lenght 2
        const param = params[i].split("=");
        if (param.length === 2) {
          if (param[0] === "zoom" || param[0] === "center") {
            continue;
          }
          urlParams += param[0] + "=" + param[1] + "&";
        }
      }

      const path = window.location.pathname;
      const hash =
        path +
        "?" +
        urlParams +
        "zoom=" +
        evt.target.getZoom() +
        "&center=" +
        evt.target.getCenter();
      const state = {
        zoom: evt.target.getZoom(),
        center: evt.target.getCenter(),
        rotation: evt.target.getRotation()
      };
      window.history.pushState(state, "", hash);
    });
    // restore the view state when navigating through the history, see
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate

    window.addEventListener("popstate", event => {
      if (event.state === null) {
        return;
      }
      this.map.getView().setCenter(event.state.center);
      this.map.getView().setZoom(event.state.zoom);
      this.map.getView().setRotation(event.state.rotation);

      this.updateHistory = false;
    });
  }

  public getMap(): Map {
    return this.map;
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
}
