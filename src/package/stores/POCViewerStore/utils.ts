import { IAxisXDTO, IAxisYDTO, IHorizontalAxis, ILevelDTO, ILevelPlane, IVerticalAxis } from './types';

export const transformLevelsToLevelPlanes = (levels: ILevelDTO[]): ILevelPlane[] => {
    let currentDistance = 0;

    return levels.map(level => {
        currentDistance += level.distance;

        return { distance: currentDistance, levelName: level.name, id: level.id };
    });
};

export const transformToVerticalAxes = (axes: IAxisYDTO[]): IVerticalAxis[] => {
    let currentDistance = 0;

    return axes.map(axis => {
        currentDistance += axis.distance;

        return { distance: currentDistance, name: axis.name, id: axis.id };
    });
};

export const transformToHorizontalAxes = (axes: IAxisXDTO[]): IHorizontalAxis[] => {
    let currentDistance = 0;

    return axes.map(axis => {
        currentDistance += axis.distance;

        return { distance: currentDistance, name: axis.name, id: axis.id };
    });
};
