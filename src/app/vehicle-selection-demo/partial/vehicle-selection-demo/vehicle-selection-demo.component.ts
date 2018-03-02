import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-vehicle-selection-demo',
    templateUrl: './vehicle-selection-demo.component.html',
    styleUrls: ['./vehicle-selection-demo.component.scss']
})
export class VehicleSelectionDemoComponent implements OnInit {
    brand: any;
    series: any;
    model: any;

    constructor() { }

    ngOnInit() {
    }

    getBrand(event: any) {
        this.brand = JSON.stringify(event);
    };

    getSeries(event: any) {
        this.series = JSON.stringify(event);
    };

    getModel(event: any) {
        this.model = JSON.stringify(event);
    };
}
