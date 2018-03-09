import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LoggerFactory } from '../../../core/logger-factory.service';
import { Logger } from '../../../core/logger.service';
import { VehicleService } from './vehicle-selection-sevice/vehicle.service';

declare const $: any;

@Component({
    selector: 'app-vehicle-selection',
    templateUrl: './vehicle-selection.component.html',
    styleUrls: ['./vehicle-selection.component.scss']
})

export class VehicleSelectionComponent implements OnInit {
    @Input() outputType: string;
    @Output() selected = new EventEmitter<Array<any>>();

    log: Logger;

    carSeriesNav: Boolean = true;
    carModelNav: Boolean = true;
    carBrand: Boolean = false;
    carSeries: Boolean = true;
    carModels: Boolean = true;
    isclose: Boolean = false;

    letterList: Array<any>;
    carBrandList: Array<any>;
    carSeriesList: Array<any>;
    carSeriesFilterList: Array<any>;
    carModelList: Array<any>;
    carModelFilterList: Array<any>;
    filterTemporaryList: Array<any>;
    outGoingList: any;

    letterActive: String = 'A';
    filterString: any = '';
    outPutBrand: string;
    outPutSeries: string;
    outPutModel: string;
    outPutResult: String = `选择车品牌/车系/车型`;

    constructor(
        private vehicleService: VehicleService,
        private loggerFactory: LoggerFactory
    ) {
        this.log = this.loggerFactory.getLogger();
    };

    ngOnInit() {
        this.getLetterList();
        this.getCarbrand(`A`);
    };

    // 获取字母表
    getLetterList() {
        this.letterList = this.vehicleService.letterList();
    };

    // 处理车系数据
    handleCarSeriesData(obj: any) {
        const arr: Array<any> = [];
        let assembleObj = {
            title: true
        };

        obj.forEach((item: any) => {
            let itemAssemble: Array<any> = [];
            for (const i in item) {
                if (i === `vehicle_Series`) {
                    for (let m = 0; m < item[i].length; m++) {
                        itemAssemble.push(item[i][m]);
                    }
                } else {
                    assembleObj[i] = item[i];
                }
            }
            itemAssemble.unshift(assembleObj);
            for (let n = 0; n < itemAssemble.length; n++) {
                arr.push(itemAssemble[n]);
            }
            assembleObj = { title: true };
            itemAssemble = [];
        });

        return arr;
    };

    // 处理车型数据
    handleCarModelsData(obj: any) {
        const arr: Array<any> = [];
        let assembleObj = {
            title: true
        };

        obj.forEach((item: any) => {
            let itemAssemble: Array<any> = [];
            for (const i in item) {
                if (i === `infolist`) {
                    for (let m = 0; m < item[i].length; m++) {
                        item[i][m]['mosaicName'] = `${item[i][m].vehicleName}
                         ${item[i][m].driveName} 排量：
                         ${item[i][m].displacement}`;
                        itemAssemble.push(item[i][m]);
                    }
                } else {
                    assembleObj[i] = item[i];
                    if (i === 'year') {
                        assembleObj['mosaicName'] = item[i].toString();
                    }
                }
            }

            itemAssemble.unshift(assembleObj);

            for (let n = 0; n < itemAssemble.length; n++) {
                arr.push(itemAssemble[n]);
            }

            assembleObj = { title: true };
            itemAssemble = [];
        });

        return arr;
    };

    // 获取车品牌
    getCarbrand(code: string) {
        this.vehicleService.getCarbrand(code).subscribe(Response => {
            this.carBrandList = Response;
        }, error => {
            this.log.error(`字母${code}类车获取失败`, error);
        });
    };

    removeClass(element: any, className: any) {
        element.className = element.className.replace(new RegExp(className), '');
    }



    // 获取车系列
    getCarSeries(item: any) {
        if (this.outputType === `brand`) {
            this.outPutResult = item.tree.name;
            this.outGoingList = {
                carBrandName: item.tree.name,
                carBrandId: item.tree.id
            };

            this.selected.emit(this.outGoingList);

            // let dropdown = document.getElementById('dropdown');
            // let className = dropdown.className;

            // if (className.indexOf('m-dropdown--open') > 0) {
            //     this.removeClass(dropdown, 'm-dropdown--open');
            // }

            return;

        } else if (this.outputType === `series`) {
            this.outPutBrand = `${item.tree.name}`;
            this.outPutResult = `${item.tree.name}/车系/车型`;
            this.outGoingList = {
                carBrandName: item.tree.name,
                carBrandId: item.tree.id
            };
        } else if (this.outputType === `model`) {
            this.outPutBrand = item.tree.name;
            this.outPutResult = item.tree.name;
            this.outGoingList = {
                carBrandName: item.tree.name,
                carBrandId: item.tree.id
            };
        }
        this.vehicleService.getCarSeries(item.tree.id).subscribe(Response => {
            this.carSeriesList = this.handleCarSeriesData(Response);
            this.carSeriesFilterList = this.handleCarSeriesData(Response);
            this.carSeriesNav = false;
            this.carBrand = true;
            this.carSeries = false;
            this.carModels = true;
        }, error => {
            this.log.error(`车系获取失败`, error);
        });
    };

    // 获取车型
    getCarModels(item: any) {
        if (item.title) {
            return;
        };

        if (this.outputType === `series`) {
            this.outPutResult = `${this.outPutBrand}/${item.name}`;
            this.outGoingList['carSeriesName'] = item.name;
            this.outGoingList['carSeriesId'] = item.id;

            this.selected.emit(this.outGoingList);
            return;

        } else if (this.outputType === `model`) {
            this.outPutSeries = `${item.name}`;
            this.outPutResult = `${this.outPutBrand}/${item.name}/车型`;
            this.outGoingList[`carSeriesName`] = item.name;
            this.outGoingList[`carSeriesId`] = item.id;
        } else if (this.outputType === `model`) {
            this.outPutSeries = item.name;
            this.outPutResult = `${this.outPutBrand}/${item.name}`;
        }

        this.vehicleService.getCarModels(item.id).subscribe(Response => {
            this.carModelList = this.handleCarModelsData(Response);
            this.carModelFilterList = this.handleCarModelsData(Response);

            this.carModelNav = false;
            this.carBrand = true;
            this.carSeries = true;
            this.carModels = false;
        }, error => {
            this.log.error(`车型获取失败`, error);
        });
    };

    // 选择车型
    selectCarModels(item: any) {
        if (item.title) {
            return;
        };

        this.outPutResult = `${this.outPutBrand}/${this.outPutSeries}/${item.mosaicName}`;
        this.outGoingList[`carModelInfo`] = item;

        this.selected.emit(this.outGoingList);

    };

    // 过滤车系数据
    filterCarSeriesData(array: Array<any>) {
        this.filterTemporaryList = array.filter((item: any) => {
            return item.name.indexOf(`${this.filterString}`) >= 0;
        });

        this.carSeriesList = this.filterTemporaryList;
    };

    // 过滤车型数据
    filterCarModelsData(array: Array<any>) {
        this.filterTemporaryList = array.filter((item: any) => {
            return item.mosaicName.indexOf(`${this.filterString}`) >= 0;
        });

        this.carModelList = this.filterTemporaryList;
    };
};
