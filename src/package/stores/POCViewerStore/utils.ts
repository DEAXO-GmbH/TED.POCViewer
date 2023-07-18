import { IAxisXDTO, IAxisYDTO, IHorizontalAxis, ILevelDTO, ILevelPlane, IPOCLineDTO, IVerticalAxis, IViewerPOC, IViewerPOCLine, POCViewer3DPoint, ViewerPOCTypes } from './types';
import { sortBy, last } from 'lodash';

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


export const transformToViewerPOCLines = (pocs: IViewerPOC[], pocLineDtos: IPOCLineDTO[]): IViewerPOCLine[] => {
    return pocLineDtos.map(pocLineDto => {
        return {
            id: pocLineDto.id,
            parentPOCLineId: pocLineDto.parentPOCLineId,

            name: pocLineDto.name,
            desciption: pocLineDto.description,
            type: ViewerPOCTypes.POCLine,

            index: pocLineDto.index,

            getChildrenPoints(children: Array<IViewerPOCLine | IViewerPOC>) {
                const points = sortBy(children.filter(child => child.parentPOCLineId === this.id), ['index']).map(child => {
                    if (child.type === ViewerPOCTypes.POC) {
                        return { x: child.position.x, y: child.level.distance, z: -child.position.z };
                    } else {
                        return last(child.getChildrenPoints(children))!;
                    }
                }).filter(Boolean);// remove undefined from points

                if (pocLineDto.parentPOCLineId === null) {
                    // If pocLine parent === null, connect it to the root pocLines
                    const mainPOCLineConnectionPoint: POCViewer3DPoint = { ...last(points)! };
                    mainPOCLineConnectionPoint.x = 0;
                    points.push(mainPOCLineConnectionPoint);
                }


                // TODO add offset here
                return points;
            },

            getDirection(childPoints: POCViewer3DPoint[]) {
                const maxX = Math.max(...childPoints.map(point => point.x));
                const minX = Math.min(...childPoints.map(point => point.x));
                const maxY = Math.max(...childPoints.map(point => point.y));
                const minY = Math.min(...childPoints.map(point => point.y));

                return (maxX - minX) > (maxY - minY) ? 'horizontal' : 'vertical';
            }
        };
    });
};
