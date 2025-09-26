import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface FRAMapProps {
  onMapLoad?: (map: L.Map) => void;
  activeLayer?: string;
}

const FRAMap = ({ onMapLoad, activeLayer }: FRAMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{ [key: string]: L.TileLayer }>({});

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on India
    const map = L.map(mapRef.current, {
      center: [20.5937, 78.9629], // India center coordinates
      zoom: 5,
      zoomControl: true,
    });

    // Base OpenStreetMap layer
    const osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Store base layer
    layersRef.current["osm"] = osmLayer;

    // Add satellite layer option
    const satelliteLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: 'Tiles © <a href="https://www.esri.com/">Esri</a>',
        maxZoom: 18,
      }
    );
    layersRef.current["satellite"] = satelliteLayer;

    // Add forest cover layer (simulated with a different tile layer)
    const forestLayer = L.tileLayer(
      "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      {
        attribution: 'Map data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: © <a href="https://opentopomap.org">OpenTopoMap</a>',
        maxZoom: 17,
        opacity: 0.7,
      }
    );
    layersRef.current["forest-cover"] = forestLayer;

    // Add water bodies layer (simulated)
    const waterLayer = L.tileLayer(
      "https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png",
      {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
        opacity: 0.6,
      }
    );
    layersRef.current["water-bodies"] = waterLayer;

    // Add some sample FRA villages as markers
    const sampleVillages = [
      { name: "Dharampur Village", lat: 20.4, lng: 73.1, status: "claimed" },
      { name: "Nandigram Village", lat: 22.8, lng: 87.8, status: "approved" },
      { name: "Kondagaon Village", lat: 19.6, lng: 81.7, status: "pending" },
      { name: "Jharia Village", lat: 23.7, lng: 86.4, status: "claimed" },
      { name: "Nandurbar Village", lat: 21.4, lng: 74.2, status: "approved" },
    ];

    const getMarkerColor = (status: string) => {
      switch (status) {
        case "approved": return "#22c55e";
        case "claimed": return "#eab308";
        case "pending": return "#ef4444";
        default: return "#6b7280";
      }
    };

    sampleVillages.forEach(village => {
      const marker = L.circleMarker([village.lat, village.lng], {
        radius: 8,
        fillColor: getMarkerColor(village.status),
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      });

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold text-sm">${village.name}</h3>
          <p class="text-xs text-gray-600">Status: <span class="capitalize font-medium">${village.status}</span></p>
          <p class="text-xs text-gray-600">Coordinates: ${village.lat.toFixed(3)}, ${village.lng.toFixed(3)}</p>
        </div>
      `);

      marker.addTo(map);
    });

    // Add layer control
    const baseLayers = {
      "OpenStreetMap": osmLayer,
      "Satellite": satelliteLayer,
    };

    const overlayLayers = {
      "Forest Cover": forestLayer,
      "Water Bodies": waterLayer,
    };

    L.control.layers(baseLayers, overlayLayers, {
      position: "topright",
      collapsed: false,
    }).addTo(map);

    // Add scale control
    L.control.scale({
      position: "bottomleft",
    }).addTo(map);

    mapInstanceRef.current = map;
    onMapLoad?.(map);

    return () => {
      map.remove();
    };
  }, [onMapLoad]);

  // Handle active layer changes
  useEffect(() => {
    if (!mapInstanceRef.current || !activeLayer) return;

    const map = mapInstanceRef.current;
    const layer = layersRef.current[activeLayer];

    if (layer) {
      // Remove all overlay layers first
      Object.values(layersRef.current).forEach(l => {
        if (l !== layersRef.current["osm"] && l !== layersRef.current["satellite"]) {
          map.removeLayer(l);
        }
      });

      // Add the selected layer
      if (activeLayer !== "osm" && activeLayer !== "satellite") {
        layer.addTo(map);
      }
    }
  }, [activeLayer]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full rounded-lg border border-border shadow-[var(--shadow-card)]"
      style={{ minHeight: "400px" }}
    />
  );
};

export default FRAMap;