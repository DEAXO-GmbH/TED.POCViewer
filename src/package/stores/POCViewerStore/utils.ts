import { IAxisX, IAxisY, IHorizontalAxis, ILevel, ILevelPlane, IVerticalAxis } from './types';

export const transformLevelsToLevelPlanes = (levels: ILevel[]): ILevelPlane[] => {
    let currentDistance = 0;

    return levels.map(level => {
        currentDistance += level.distance;

        return { distance: currentDistance, levelName: level.name };
    });
};

export const transformToVerticalAxes = (axes: IAxisY[]): IVerticalAxis[] => {
    let currentDistance = 0;

    return axes.map(axis => {
        currentDistance += axis.distance;

        return { distance: currentDistance, name: axis.name };
    });
};

export const transformToHorizontalAxes = (axes: IAxisX[]): IHorizontalAxis[] => {
    let currentDistance = 0;

    return axes.map(axis => {
        currentDistance += axis.distance;

        return { distance: currentDistance, name: axis.name };
    });
};
