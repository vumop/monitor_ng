export default {
  groups: [
    {
      name: "Podkladové vrstvy",
      description: "",
      //definition of roles for access permission
      // not defined for all or array[alias permit]
      //role: ["guest", "user", "vumop", "admin", "editor"],
      //The key of group identification (obligatory)
      // base and default, add automatically to project ( in group list is not visible )
      group_key: "base",
      layers: [
        {
          // layer ID
          id: 1,
          name: "Ortofoto ČR",
          visible: true,
          minResolution: 0,
          maxResolution: Infinity,
          metadata:
            "https://geoportal.cuzk.cz/(S(qbwjf2d5q0uzcem1kajcj35r))/Default.aspx?mode=TextMeta&metadataXSL=full&side=wms.verejne&metadataID=CZ-CUZK-WMS-SPRAVHRAN-P",
          legendUrl: false,
          opacity: 1,
          source: {
            url: "https://geoportal.cuzk.cz/WMS_ORTOFOTO_PUB/WMService.aspx",
            params: {
              LAYERS: "GR_ORTFOTORGB"
            },
            attributions:
              '<a href="https://geoportal.cuzk.cz" target="_blank">ČÚZK</a>'
          }
        },
        {
          id: 2,
          name: "Pozemkový katastr",
          role: ["admin", "editor"],
          metadata:
            "https://geoportal.cuzk.cz/(S(qbwjf2d5q0uzcem1kajcj35r))/Default.aspx?mode=TextMeta&metadataXSL=full&side=wms.verejne&metadataID=CZ-00025712-CUZK_WMS-MD_KM",
          description: "<small>Max 1: 5000</small>",
          minResolution: 0,
          maxResolution: 6000,
          legendUrl: false,
          source: {
            url: "https://services.cuzk.cz/wms/local-km-wms.asp?",
            params: { LAYERS: "RST_PK" },
            attributions:
              '<a href="https://geoportal.cuzk.cz" target="_blank">ČÚZK</a>'
          },
          visible: false
        },
        {
          id: 3,
          name: "Stínovaný model DMR5G",
          opacity: 0.65,
          minResolution: 0,
          maxResolution: Infinity,
          legendUrl: false,
          metadata:
            "https://geoportal.cuzk.cz/(S(qbwjf2d5q0uzcem1kajcj35r))/Default.aspx?mode=TextMeta&metadataXSL=full&side=wms.verejne&metadataID=CZ-CUZK-WMS-DMR5G",
          source: {
            url:
              "https://ags.cuzk.cz/arcgis2/services/dmr5g/ImageServer/WMSServer",
            params: { LAYERS: "dmr5g:GrayscaleHillshade" },
            attributions:
              '<a href="https://geoportal.cuzk.cz" target="_blank">ČÚZK</a>'
          },
          visible: false
        }
      ]
    },
    {
      name: "Vrstvy LPIS",
      description: "Tématické vrstvy LPIS",
      group_key: "default",
      layers: [
        {
          id: 4,
          name: "LPIS dle kultury",
          description:
            "Kultury dílů půdních bloků DPB, LPIS – on-line<br><small>Max 1: 25k</small>",
          legendUrl: true,
          minResolution: 0,
          maxResolution: 25000,
          metadata: false,
          source: {
            url: "https://eagri.cz/public/app/wms/plpis.fcgi",
            params: { LAYERS: "LPIS_FB_KUL", INFO_FORMAT: "text/plain" },
            attributions:
              '<a href="https://eagri.cz/public/web/mze/farmar/LPIS/" target="_blank">Mze</a>'
          },
          visible: false
        },
        {
          id: 5,
          name: "LPIS štítek",
          description:
            "Kódy dílů půdních bloků DPB, LPIS – on-line<br><small>Max 1: 25k</small>",
          legendUrl: true,
          minResolution: 0,
          maxResolution: 25000,
          metadata: false,
          source: {
            url: "https://eagri.cz/public/app/wms/plpis.fcgi",
            params: { LAYERS: "LPIS_FB4_KOD", INFO_FORMAT: "text/plain" },
            attributions:
              '<a href="https://eagri.cz/public/web/mze/farmar/LPIS/" target="_blank">Mze</a>'
          },
          visible: false
        },
        {
          id: 6,
          name: "LPIS",
          description:
            "Díly půdních bloků DPB, LPIS – on-line<br><small>Max 1: 25k</small>",
          legendUrl: true,
          minResolution: 0,
          maxResolution: 25000,
          metadata: false,
          source: {
            url: "https://eagri.cz/public/app/wms/plpis.fcgi",
            params: { LAYERS: "LPIS_FB4", INFO_FORMAT: "text/plain" },
            attributions:
              '<a href="https://eagri.cz/public/web/mze/farmar/LPIS/" target="_blank">Mze</a>'
          },
          visible: true
        }
      ]
    },
    {
      name: "Správní hranice",
      description: "kraj, okres, obce",
      group_key: "border",
      layers: [
        {
          id: 7,
          name: "Správní hranice",
          visible: true,
          minResolution: 0,
          maxResolution: Infinity,
          metadata: false,
          legendUrl: true,
          opacity: 1,
          source: {
            url: "https://kalkulacka.vumop.cz/cgi-bin/mapserv.fcgi",
            params: {
              LAYERS: "sprava_obce,sprava_kraj,sprava_okres",
              MAP: "/mapfiles/megaprojekt/sprava_vse/maps/sprava.map"
            },
            attributions: null
          }
        }
      ]
    },
    {
      name: "Vrstvy eroze",
      description: "Tématické vrstvy eroze",
      role: ["user", "vumop", "admin", "editor"],
      group_key: "eroze",
      layers: [
        {
          id: 8,
          name: "Erozní události",
          description:
            "Erozní události evidované v rámci Monitoringu eroze, VÚMOP – on-line",
          legendUrl: true,
          minResolution: 0,
          maxResolution: Infinity,
          metadata: false,
          source: {
            url: "http://wms.vumop.cz/public/udalosti.php",
            params: {
              LAYERS: "eroze",
              FORMAT: "image/png",
              INFO_FORMAT: "text/html"
            },
            attributions:
              '<a href="https://me.vumop.cz" target="_blank">Monitoring eroze zemědělské půdy</a>'
          },
          visible: false
        }
      ]
    }
  ]
};
