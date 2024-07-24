import { action, makeObservable, observable } from 'mobx'
import { ILevelLayerOption } from './types'
import { ILevelPlane } from '../POCViewerStore/types'


class LayersWidgetStore {
    @observable isWidgetOpen = true;
    @observable layerVisibilityOptions: ILevelLayerOption[] = [];
    @observable showInterconnections = true;
    @observable showPOCCellLabels = false;
    @observable toolsTransparent = true;
    @observable showOrthographicCamera = false;

    constructor () {
        makeObservable(this);
    }


    @action
    public addLevels (levels: ILevelPlane[]) {
        this.layerVisibilityOptions = levels.map((level, index) => {
            const isPlaneBottommost = index === levels.length - 1;
            return {
                levelId: level.id,
                levelName: level.levelName,
                isLayerExpanded: false,
                levelHidden: false,
                axesHidden: isPlaneBottommost ? false : true,
                pocsHidden: false,
                toolsHidden: false,
                planeHidden: true,
            };
        });
    }

    public getLevelOptionsById (levelId: string) {
        return this.layerVisibilityOptions.find(layer => layer.levelId === levelId) || {
            isLayerExpanded: false,
            levelHidden: false,
            axesHidden: false,
            pocsHidden: false,
            toolsHidden: false,
            planeHidden: false,
        };
    }

    @action
    public openWidget () {
        this.isWidgetOpen = true;
    }

    @action
    public closeWidget () {
        this.isWidgetOpen = false;
    }

    @action
    public toggleLayerExpanded (levelId: string) {
        const layer = this.layerVisibilityOptions.find(layer => layer.levelId === levelId)!;

        layer.isLayerExpanded = !layer.isLayerExpanded;
    }

    @action
    public toggleLayerVisibility (levelId: string) {
        const layer = this.layerVisibilityOptions.find(layer => layer.levelId === levelId)!;

        if (layer.levelHidden) {
            Object.assign(layer, {
                levelHidden: false,
                axesHidden: true,
                pocsHidden: false,
                toolsHidden: false,
                planeHidden: true,
            });
        } else {
            Object.assign(layer, {
                levelHidden: true,
                axesHidden: true,
                pocsHidden: true,
                toolsHidden: true,
                planeHidden: true,
            });
        }
    }

    @action
    public toggleAxesVisibility (levelId: string) {
        const layer = this.layerVisibilityOptions.find(layer => layer.levelId === levelId)!;
        layer.axesHidden = !layer.axesHidden;
    }

    @action
    public togglePOCVisibility (levelId: string) {
        const layer = this.layerVisibilityOptions.find(layer => layer.levelId === levelId)!;
        layer.pocsHidden = !layer.pocsHidden;
    }

    @action
    public toggleToolsVisibility (levelId: string) {
        const layer = this.layerVisibilityOptions.find(layer => layer.levelId === levelId)!;
        layer.toolsHidden = !layer.toolsHidden;
    }

    @action togglePlaneVisibility (levelId: string) {
        const layer = this.layerVisibilityOptions.find(layer => layer.levelId === levelId)!;
        layer.planeHidden = !layer.planeHidden;
    }

    @action
    public toggleShowInterconnections () {
        this.showInterconnections = !this.showInterconnections;
    }

    @action
    public toggleShowPOCCellLabels () {
        this.showPOCCellLabels = !this.showPOCCellLabels;
    }

    @action
    public toggleToolsTransparent () {
        this.toolsTransparent = !this.toolsTransparent;
    }

    @action
    public toggleOrthographicCamera () {
        this.showOrthographicCamera = !this.showOrthographicCamera;
    }
}


export const layersWidgetStore = new LayersWidgetStore;
