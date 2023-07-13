import { action, makeObservable, observable } from 'mobx';

class WidgetStore {
    @observable isWidgetOpen = false;
    @observable hiddenLayers: Set<string> = new Set();

    constructor () {
        makeObservable(this);
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
    public revealLayer (layerId: string) {
        this.hiddenLayers.delete(layerId);
    }

    @action
    public hideLayer (layerId: string) {
        this.hiddenLayers.add(layerId);
    }
}


export const widgetStore = new WidgetStore;
