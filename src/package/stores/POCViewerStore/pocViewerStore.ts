import { action, computed, makeObservable, observable } from 'mobx';
import { IPOCInputParameters, IHorizontalAxis, IVerticalAxis, ILevelPlane } from './types';
import { transformLevelsToLevelPlanes, transformToHorizontalAxes, transformToVerticalAxes } from './utils';



class POCViewerStore {
    @observable pocInputParameters: IPOCInputParameters | null = null;

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
    get planesLength () {
        return this.horizontalAxis.slice(-1)[0].distance;
    }

    @computed
    get planesWidth () {
        return this.verticalAxis.slice(-1)[0].distance;
    }


    constructor () {
        makeObservable(this);
    }

    @action
    public setPocInputParameters (pocInputParameters: IPOCInputParameters) {
        this.pocInputParameters = pocInputParameters;
    }
}


const pocViewerStore = new POCViewerStore;


const mock1 = {
    levels: [{ distance: 0, name: 'Level 00' }, { distance: 5, name: 'Level 01' }, { distance: 10, name: 'Level 02' }],
    xAxes: [{ distance: 0, name: 'a' }, { distance: 3, name: 'b' }, { distance: 3, name: 'c' }, ],
    yAxes: [{ distance: 0, name: '1' }, { distance: 10, name: '2' }, { distance: 20, name: '3' }, { distance: 2, name: '4' }, ],
};

const mock2 = {
    levels: [{ distance: 0, name: 'Level 00' }, { distance: 5, name: 'Level 01' }, { distance: 10, name: 'Level 02' }, { distance: 30, name: 'Level 03' }, { distance: 4, name: 'Level 04' }],
    xAxes: [{ distance: 0, name: 'a' }, { distance: 1, name: 'b' }, { distance: 20, name: 'c' }, { distance: 5, name: 'c' }, ],
    yAxes: [{ distance: 0, name: '1' }, { distance: 10, name: '2' }, { distance: 5, name: '3' }, { distance: 45, name: '4' }, ],
};
pocViewerStore.setPocInputParameters(mock2);

export { pocViewerStore };
