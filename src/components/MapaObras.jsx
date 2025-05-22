import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerGreen from "../assets/marker-green.svg";
import markerOrange from "../assets/marker-orange.svg";
import markerRed from "../assets/marker-red.svg";
/* import comunasData from "../data/COMUNA.json";
import proj4 from "proj4"; */

const MapaObras = ({ data, className }) => {
  const position = [6.2442, -75.5812]; // Centro de Medellín
  // Definir la proyección MAGNA-SIRGAS 2018 (EPSG:6257)
  /* proj4.defs(
    "EPSG:6257",
    "+proj=tmerc +lat_0=4.596200416666666 +lon_0=-74.07750791666666 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +units=m +no_defs"
  );

  // Función de conversión
  const convertToWGS84 = (x, y) => {
    return proj4("EPSG:6257", "WGS84", [y, x]);
  }; */
  const iconos = {
    "En Ejecución": new Icon({iconUrl : markerOrange,
      iconSize : [10,10], // size of the icon
      iconAnchor : [0,0], // point of the icon which will correspond to marker's location
      popupAnchor : [0, 0]}),
    "Terminado": new Icon({iconUrl : markerGreen,
      iconSize : [10,10], // size of the icon
      iconAnchor : [0,0], // point of the icon which will correspond to marker's location
      popupAnchor : [0, 0]}),
    "Suspendido": new Icon({iconUrl : markerRed,
      iconSize : [10,10], // size of the icon
      iconAnchor : [0,0], // point of the icon which will correspond to marker's location
      popupAnchor : [0, 0]}),
  }
  /* const COMUNAS = comunasData.features || []

  console.log(COMUNAS) */

  return (
    
      <MapContainer center={position} zoom={13} style={{ height: "400px" }} className={`z-0 ${className}`}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* {COMUNAS.map(({attributes, geometry}, _)=>
          geometry.rings.map((ring, index) =>  
          <Polygon
            key={`${attributes.OBJECTID}-${index}`}
            positions={ring.map(([x, y]) => convertToWGS84(x, y))}
            pathOptions={{ color: "blue", weight: 2 }}
          />
        ))} */}
        {data.map(({attributes: obra, geometry}, _)=>
            <Marker key={obra.FID} position={[geometry.y, geometry.x]} icon={iconos[obra.ESTADO]}>
              <Popup>
                <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
                  <p><strong style={{fontSize: "28px", color: "#FF8403", width: "50%"}}>Contrato #{obra.NUMERO_CON}</strong></p>
                  <p style={{fontSize: "16px", fontWeight: "bolder", color: "#00749f", textAlign: "center"}}>VIGENCIA: {obra.VIGENCIA}</p>
                </div>
                <p>
                  <strong>TIPO CONTRATO:</strong> {obra.TIPO_CONTR}<br />
                  <strong>ESTADO:</strong> {obra.ESTADO}<br />
                  <strong>COMUNA:</strong> {obra.COMUMEDELL}
                </p>
                <p>
                  <strong>ACTIVIDAD:</strong> {obra.ACTIVIDAD}
                </p>
                <div style={{display: "flex", justifyContent: "flex-end", fontSize: "28px", fontWeight: "bold", color: "#FF8403"}}>
                  <p style={{padding: 0, margin: 0}}>Cantidad: {obra.CANTIDAD_A} {obra.UN}</p>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", fontSize: "28px", fontWeight: "bold", color: "#00749f"}}>
                  <p style={{padding: 0, margin: 0}}>Valor: ${obra.VALOR_ACTU}</p>
                </div>
              </Popup>
            </Marker>
          )
        }
      </MapContainer>
    
  );
};

export default MapaObras;

