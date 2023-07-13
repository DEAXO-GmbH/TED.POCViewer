import { action, computed, makeObservable, observable } from 'mobx';
import { IPOCViewerInputParameters, IHorizontalAxis, IVerticalAxis, ILevelPlane, IViewerPOC, IPOCLineDTO, IPOCLineTreeNode } from './types';
import { transformLevelsToLevelPlanes, transformToHorizontalAxes, transformToVerticalAxes } from './utils';



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
            return {
                id: pocDto.id,
                name: pocDto.name,
                level: this.levelPlanes.find(levelPlane => levelPlane.id === pocDto.level)!,
                xAxis: this.horizontalAxis.find(axis => axis.id === pocDto.xAxis)!,
                yAxis: this.verticalAxis.find(axis => axis.id === pocDto.yAxis)!,
            };
        });
    }

    @computed
    get pocLineTree () {
        const recursiveMapToPOCLineTree = (pocLine: IPOCLineDTO): IPOCLineTreeNode => {
            for (const pocLine of this.pocInputParameters?.pocLines) {}
        };
        return this.pocInputParameters?.pocLines.map;
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
    yAxes: [{ id: '1', distance: 0, name: '1' }, { id: '2', distance: 10, name: '2' }, { id: '3', distance: 5, name: '3' }, { id: '4', distance: 45, name: '4' }, ],
    pocs: [
        { id: 'FD3A-DWQWD-32DA-ADW', level: '01', xAxis: 'c', yAxis: '3', name: 'R2-44', mediaCapacity: 0.2, pocLine: 'GFDS' }, { id: 'FD11A-DWQWD-32DA-ADW', level: '00', xAxis: 'a', yAxis: '1', name: 'R2-44', mediaCapacity: 0.2 },
        { id: 'FD2A-DWQWD-32DA-ADW', level: '01', xAxis: 'b', yAxis: '2', name: 'R2-44', mediaCapacity: 0.5, pocLine: 'GFDS' }, { id: 'FD5A-DWQWD-32DA-ADW', level: '02', xAxis: 'a', yAxis: '3', name: 'R2-44', mediaCapacity: 0.9 },
        { id: 'FD1A-DWQWD-32DA-ADW', level: '01', xAxis: 'c', yAxis: '1', name: 'R2-44', mediaCapacity: 1, pocLine: 'GFDS' },   { id: 'FD1A-DWQWD-32DA-ADW', level: '04', xAxis: 'c', yAxis: '4', name: 'R2-44', mediaCapacity: 1 },
        { id: 'FD6A-DWQWD-32DA-ADW', level: '01', xAxis: 'd', yAxis: '3', name: 'R2-44', mediaCapacity: 0.2, pocLine: 'GFDS' },
    ],
    pocLines: [
        { id: 'GFDS', name: 'DR05', },
    ]
};
pocViewerStore.setPocInputParameters(mock1);

export { pocViewerStore };
