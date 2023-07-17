import { action, computed, makeObservable, observable } from 'mobx';
import { IPOCViewerInputParameters, IHorizontalAxis, IVerticalAxis, ILevelPlane, IViewerPOC, ViewerPOCTypes, IViewerPOCLine } from './types';
import { transformLevelsToLevelPlanes, transformToHorizontalAxes, transformToVerticalAxes, transformToViewerPOCLines } from './utils';



class POCViewerStore {
    @observable pocInputParameters: IPOCViewerInputParameters | null = null;
    @observable hoveredPOCIds: Set<string> = new Set();
    @observable idk: string[] = [];

    @computed
    get horizontalAxis (): IHorizontalAxis[] {
        if (!this.pocInputParameters) return [];

        return transformToHorizontalAxes(this.pocInputParameters.xAxes);
    }

    @computed
    get verticalAxis (): IVerticalAxis[] {
        if (!this.pocInputParameters) return [];

        return transformToVerticalAxes(this.pocInputParameters.yAxes);
    }

    @computed
    get levelPlanes (): ILevelPlane[] {
        if (!this.pocInputParameters) return [];

        return transformLevelsToLevelPlanes(this.pocInputParameters.levels);
    }

    @computed
    get pocs (): IViewerPOC[] {
        if (!this.pocInputParameters) return [];

        return this.pocInputParameters.pocs.map(pocDto => {
            const xAxisStart = this.horizontalAxis.find(axis => axis.id === pocDto.axisXStartId)!;
            const yAxisStart = this.verticalAxis.find(axis => axis.id === pocDto.axisYStartId)!;
            // in case end axes aren't specified, consider them same as starting ones
            const xAxisEnd = this.horizontalAxis.find(axis => axis.id === pocDto.axisXEndId) || xAxisStart;
            const yAxisEnd = this.verticalAxis.find(axis => axis.id === pocDto.axisYEndId) || yAxisStart;
            const level = this.levelPlanes.find(levelPlane => levelPlane.id === pocDto.levelId)!;

            const position = {
                x: yAxisStart.distance + (yAxisEnd.distance - yAxisStart.distance) / 2,
                y: level.distance,
                z: xAxisStart.distance + (xAxisEnd.distance - xAxisStart.distance) / 2,
            };

            return {
                id: pocDto.id,
                parentPOCLineId: pocDto.pocLineId,

                name: pocDto.name,
                description: pocDto.description,
                type: ViewerPOCTypes.POC,

                index: pocDto.index,

                level: level,
                xAxisStart: xAxisStart,
                yAxisStart: yAxisStart,
                xAxisEnd: xAxisEnd,
                yAxisEnd: yAxisEnd,

                position,

                mediaCapacity: pocDto.mediaCapacity,
                occupiedMediaCapacity: pocDto.occupiedMediaCapacity,
                occupiedPhysicalCapacity: pocDto.occupiedPhysicalCapacity,
                physicalCapacity: pocDto.physicalCapacity
            };
        });
    }

    @computed
    get pocLines (): IViewerPOCLine[] {
        if (!this.pocInputParameters) return [];

        return transformToViewerPOCLines(this.pocs, this.pocInputParameters.pocLines);
    }


    @computed
    get planesLength () {
        return this.horizontalAxis.slice(-1)[0].distance;
    }

    @computed
    get planesWidth () {
        return this.verticalAxis.slice(-1)[0].distance;
    }

    @computed
    get arePOCsHovered () {
        return this.hoveredPOCIds.size !== 0;
    }


    constructor () {
        makeObservable(this);
    }

    @action
    public setPocInputParameters (pocInputParameters: IPOCViewerInputParameters) {
        this.pocInputParameters = pocInputParameters;
    }

    public getAllLevelPOCs (levelId: string) {
        return this.pocs.filter(poc => poc.level.id === levelId);
    }

    @action
    public addHoveredPOCId (pocId: string) {
        this.hoveredPOCIds.add(pocId);
    }

    @action
    public removeHoveredPOCId (pocId: string) {
        this.hoveredPOCIds.delete(pocId);
    }
}


const pocViewerStore = new POCViewerStore;



const mock1: IPOCViewerInputParameters = {
    levels: [{ id: '00', distance: 0, name: 'Level 00' }, { id:'01', distance: 5, name: 'Level 01' }, { id: '02', distance: 20, name: 'Level 02' }, { id: '03', distance: 30, name: 'Level 03' }, { id: '04', distance: 4, name: 'Level 04' }],
    xAxes: [{ id: 'a', distance: 0, name: 'a' }, { id: 'b', distance: 1, name: 'b' }, { id: 'c', distance: 20, name: 'c' }, { id: 'd', distance: 5, name: 'd' }, ],
    yAxes: [{ id: '1', distance: 0, name: '1' }, { id: '2', distance: 10, name: '2' }, { id: '3', distance: 5, name: '3' }, { id: '4', distance: 5, name: '4' }, { id: '5', distance: 5, name: '5' }, { id: '6', distance: 21, name: '6' }, ],
    pocs: [
        {
            id: 'POC1',
            pocLineId: 'pl1',
            name: '1',
            description: 'aaa',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'b',
            axisXEndId: 'b',
            axisYStartId: '1',
            axisYEndId: '1',
            index: 4,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC2',
            pocLineId: 'pl1',
            name: '2',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'c',
            axisXEndId: 'd',
            axisYStartId: '2',
            axisYEndId: '3',
            index: 6,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC3',
            pocLineId: 'pl1',
            name: '3',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '00',
            axisXStartId: 'c',
            axisXEndId: 'c',
            axisYStartId: '2',
            axisYEndId: '2',
            index: 3,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC4',
            pocLineId: 'pl1',
            name: '1.5',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'c',
            axisXEndId: 'c',
            axisYStartId: '3',
            axisYEndId: '3',
            index: 5,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },

        {
            id: 'POC4',
            pocLineId: 'pl2',
            name: '5',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'b',
            axisXEndId: 'b',
            axisYStartId: '4',
            axisYEndId: '4',
            index: 5,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC5',
            pocLineId: 'pl2',
            name: '6',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'b',
            axisXEndId: 'c',
            axisYStartId: '3',
            axisYEndId: '4',
            index: 5,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC6',
            pocLineId: 'pl2',
            name: '6',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'c',
            axisXEndId: 'c',
            axisYStartId: '4',
            axisYEndId: '4',
            index: 5,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC6',
            pocLineId: 'pl3',
            name: '6',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'b',
            axisXEndId: 'c',
            axisYStartId: '5',
            axisYEndId: '6',
            index: 1100,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
    ],
    pocLines: [
        {
            id: 'pl1',
            description: 'POCLine 2',
            incomingVolumeCapacity: '0',
            index: 102,
            name: 'Super name',
            parentPOCLineId: 'pl3',
        },
        {
            id: 'pl2',
            description: 'POCLine hehe',
            incomingVolumeCapacity: '0',
            index: 105,
            name: 'Super name',
            parentPOCLineId: 'pl3',
        },
        {
            id: 'pl3',
            description: 'POCLine hehe',
            incomingVolumeCapacity: '0',
            index: 2,
            name: 'Super name',
            parentPOCLineId: null,
        }
    ]
};
pocViewerStore.setPocInputParameters(mock1);

export { pocViewerStore };
