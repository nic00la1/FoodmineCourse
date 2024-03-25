import { Component, ElementRef, ViewChild } from '@angular/core';
import { LatLngTuple, Map, map, tileLayer } from 'leaflet';

@Component({
  selector: 'map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  private readonly DEFAULT_LATLANG : LatLngTuple = [51.505, -0.09];

  @ViewChild('map', {static: true}) 
  mapRef !: ElementRef;

  map !: Map

  ngOnInit() : void {
    this.initializeMap();
  }

  initializeMap() {
    if (this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLANG, 1);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  }

  findMyLocation() {
    
  }
}
