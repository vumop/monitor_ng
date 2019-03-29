import OlTileWMS from "ol/source/TileWMS";
import OlImageWMS from "ol/source/ImageWMS";

export class LayerModel {
  public id: number;

  public name: string;

  public visible: boolean;

  public olLayer: any;

  public disabled: boolean;

  public opacity: number;

  public legends: string[];

  constructor(olLayer, map) {
    this.id = olLayer.get("id");
    this.name = olLayer.get("name");
    this.visible = olLayer.getVisible();
    this.olLayer = olLayer;
    this.opacity = olLayer.getOpacity() * 100;
    /**
     * has the layer legend -  param: legendUrl (bolean or url string)
     */
    this.legends = this.olLayer.get("legendUrl") ? this.getLegendUrls() : [];
    /**
     *
     */
    this.controlDisabled(map.getView());
    map.getView().on("change:resolution", e => {
      this.controlDisabled(e.target);
    });
  }

  private controlDisabled(view): void {
    if (view.getResolution() < this.olLayer.getMinResolution()) {
      this.disabled = true;
    } else if (view.getResolution() > this.olLayer.getMaxResolution()) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

  public setVisibility(visible: boolean) {
    this.visible = visible;
    this.olLayer.setVisible(visible);
  }

  public setOpacity(val: number): void {
    this.opacity = val;
    this.olLayer.setOpacity(val / 100);
  }

  public getLegendUrls(): string[] {
    const legendUrls = [];
    if (
      this.olLayer.getSource() instanceof OlTileWMS ||
      this.olLayer.getSource() instanceof OlImageWMS
    ) {
      if (this.olLayer.getSource().getParams().LAYERS == "undefined") {
        console.log("The layer parameter is wrong defined.");
        return [];
      }

      // mapserver layers
      const MAP = this.olLayer.getSource().getParams().MAP;

      const urlSrc =
        this.olLayer.getSource() instanceof OlTileWMS
          ? this.olLayer.getSource().getUrls()[0]
          : this.olLayer.getSource().getUrl();

      const layersArray = this.olLayer
        .getSource()
        .getParams()
        .LAYERS.split(",");

      for (let i = 0; i < layersArray.length; i++) {
        const layer = layersArray[i];
        let url: string;
        if (MAP) {
          url = `${urlSrc}?MAP=${MAP}&LAYER=${layer}&REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&FORMAT=image/png`;
        } else {
          url = `${urlSrc}?LAYER=${layer}&REQUEST=GetLegendGraphic&SERVICE=WMS&VERSION=1.1.1&FORMAT=image/png`;
        }
        legendUrls.push(url);
      }
    }
    return legendUrls;
  }
}
