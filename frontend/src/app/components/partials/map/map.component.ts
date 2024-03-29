import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { LocationService } from '../../../services/location/location.service';
import { Order } from '../../../shared/models/Order.model';

@Component({
  selector: 'map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  @Input()
  order !: Order;
  @Input()
  readonly = false;

  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl: 'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLANG : LatLngTuple = [51.505, -0.09];

  @ViewChild('map', {static: true}) 
  mapRef !: ElementRef;
  map !: Map
  currentMarker !: Marker;

  private locationService = inject(LocationService);

  ngOnChanges() : void {
    if(!this.order) return;
    this.initializeMap();

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }
  showLocationOnReadonlyMode() {
    const m = this.map
    this.setMarker(this.addressLatLng); // set marker on map with addressLatLng
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL); // set view to addressLatLng

    m.dragging.disable(); 
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLANG, 1);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => { 
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.setMarker(latlng);
      }
    });
  }

  setMarker(latlng: LatLngExpression) {
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }
    
    this.currentMarker = marker(latlng, {
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    });
  }

  set addressLatLng(latlng : LatLng) { // MongoDB only accepts 8 decimal places
    if (!latlng.lat.toFixed) return

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng() {
    return this.order.addressLatLng!;
  }
}
