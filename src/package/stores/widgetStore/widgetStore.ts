import { action, makeObservable, observable } from 'mobx';
import { ILevelLayerOption } from './types';
import { ILevelPlane } from '../POCViewerStore/types';

class LayersWidgetStore {
    @observable isWidgetOpen = false;
    @observable layerVisibilityOptions: ILevelLayerOption[] = [];

    constructor () {
        makeObservable(this);
    }


    @action
    public addLevels (levels: ILevelPlane[]) {
        this.layerVisibilityOptions = levels.map(level => {
            return {
                levelId: level.id,
                levelName: level.levelName,
                isLayerExpanded: false,
                levelHidden: false,
                axesHidden: false,
                pocsHidden: false,
                toolsHidden: false,
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
                axesHidden: false,
                pocsHidden: false,
                toolsHidden: false,
            });
        } else {
            Object.assign(layer, {
                levelHidden: true,
                axesHidden: true,
                pocsHidden: true,
                toolsHidden: true,
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
}


export const layersWidgetStore = new LayersWidgetStore;
