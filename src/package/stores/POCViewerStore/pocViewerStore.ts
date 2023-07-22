import { action, computed, makeObservable, observable } from 'mobx';
import { IPOCViewerInputParameters, IHorizontalAxis, IVerticalAxis, ILevelPlane, IViewerPOC, ViewerPOCTypes, IViewerPOCLine, IViewerTool, IViewerInterconnection } from './types';
import { transformLevelsToLevelPlanes, transformToHorizontalAxes, transformToVIewerTools, transformToVerticalAxes, transformToViewerPOCLines } from './utils';



class POCViewerStore {
    @observable pocInputParameters: IPOCViewerInputParameters | null = null;
    @observable hoveredPOCIds: Set<string> = new Set();
    @observable clickedPOC: IViewerPOC | null = null;


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

                unit: pocDto.unit,

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
    get tools (): IViewerTool[] {
        if (!this.pocInputParameters) return [];

        return transformToVIewerTools(this.pocInputParameters.tools);
    }

    @computed
    get interconnections (): IViewerInterconnection[] {
        if (!this.pocInputParameters) return [];

        return this.pocInputParameters.interconnections.map(interconnection => {
            const firstTool = this.tools.find(tool => tool.id === interconnection.firstToolId)!;
            const secondTool = this.tools.find(tool => tool.id === interconnection.secondToolId)!;

            return {
                firstTool,
                secondTool,
            };
        });
    }


    @computed
    get planesLength () {
        return this.horizontalAxis.slice(-1)[0]?.distance || 0;
    }

    @computed
    get planesWidth () {
        return this.verticalAxis.slice(-1)[0]?.distance || 0;
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

    @action
    public setClickedPOC (poc: IViewerPOC) {
        this.clickedPOC = poc;
    }

    @action
    public async importPocParametersFromJSON (jsonFile: File) {
        const fileContent = await jsonFile.text();

        const pocInputParameters: IPOCViewerInputParameters = JSON.parse(fileContent);
        console.log(pocInputParameters);
        this.pocInputParameters = pocInputParameters;
    }

    public getAllLevelPOCs (levelId: string) {
        return this.pocs.filter(poc => poc.level.id === levelId);
    }

    @action
    public resetSceneData () {
        this.pocInputParameters = null;
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


export { pocViewerStore };
