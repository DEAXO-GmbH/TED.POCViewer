import { action, computed, makeObservable, observable } from 'mobx';
import { IPOCViewerInputParameters, IHorizontalAxis, IVerticalAxis, ILevelPlane, IViewerPOC, IViewerPOCLine, IViewerTool, IViewerInterconnection, IUnusedViewerPOC } from './types';
import { transformLevelsToLevelPlanes, transformPOCs, transformToHorizontalAxes, transformToVIewerTools, transformToVerticalAxes, transformToViewerPOCLines, transformUnusedPOCs } from './utils';



class POCViewerStore {
    @observable pocInputParameters: IPOCViewerInputParameters | null = null;
    @observable hoveredPOCIds: Set<string> = new Set();
    @observable clickedPOC: IViewerPOC | IUnusedViewerPOC | null = null;


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

        return transformPOCs(this.pocInputParameters.pocs);
    }

    @computed
    get unusedPOCs (): IUnusedViewerPOC[] {
        if (!this.pocInputParameters) return [];
        return transformUnusedPOCs(this.pocInputParameters.pocs);
    }

    @computed // Returns the number of pocs per line in the unused zone
    get unusedPOCsPerLine (): number {
        return Math.floor((this.unusedPOCs.length - 1) ** 0.5) + 1;
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
    public setClickedPOC (poc: IViewerPOC | IUnusedViewerPOC) {
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
