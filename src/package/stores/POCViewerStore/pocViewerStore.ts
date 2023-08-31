import { action, computed, makeObservable, observable } from 'mobx';
import { IPOCViewerInputParameters, IHorizontalAxis, IVerticalAxis, ILevelPlane, IViewerPOC, IViewerTool, IViewerInterconnection, IUnusedViewerPOC, IViewerPOCCell } from './types';
import { transformLevelsToLevelPlanes, transformPOCCells, transformPOCs, transformToHorizontalAxes, transformToVIewerTools, transformToVerticalAxes, transformUnusedPOCs } from './utils';



class POCViewerStore {
    @observable pocInputParameters: IPOCViewerInputParameters | null = null;
    @observable hoveredPOCIds: Set<string> = new Set();
    @observable clickedPOC: IViewerPOC | IUnusedViewerPOC | null = null;
    @observable clickedPOCCell: IViewerPOCCell | null = null;
    @observable isDebugMode = false;


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
    get pocs (): IViewerPOC[] { // :IViewerPOCCell[] ?? // TODO remove completely
        if (!this.pocInputParameters) return [];

        return transformPOCs(this.pocInputParameters.pocCells);
    }
    @computed
    get pocCells (): IViewerPOCCell[] {
        if (!this.pocInputParameters) return [];

        return transformPOCCells(this.pocInputParameters.pocCells);
    }
    @computed
    get unusedPOCs (): IUnusedViewerPOC[] {
        if (!this.pocInputParameters) return [];

        return transformUnusedPOCs(this.pocInputParameters.pocNotPlaced);
    }

    @computed // Returns the number of pocs per line in the unused zone
    get unusedPOCsPerLine (): number {
        const pocsPerLine = Math.floor((this.unusedPOCs.length - 1) ** 0.5) + 1;
        return pocsPerLine || 0;
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
    public setClickedPOC (poc: IViewerPOC | IUnusedViewerPOC) {
        this.clickedPOC = poc;
    }

    @action
    public setClickedPOCCell (pocCell: IViewerPOCCell) {
        this.clickedPOCCell = pocCell;
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

    public getAllPOCCells (levelId: string) {
        return this.pocCells.filter(pocCell => pocCell.level.id === levelId);
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

    @action
    setDebugMode (value: boolean) {
        this.isDebugMode = value;
    }
}


const pocViewerStore = new POCViewerStore;


export { pocViewerStore };
