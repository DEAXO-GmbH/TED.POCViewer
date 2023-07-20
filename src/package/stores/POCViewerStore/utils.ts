import { POCLINE_OFFSET_LENGTH } from 'package/constants';
import { IAxisXDTO, IAxisYDTO, IHorizontalAxis, ILevelDTO, ILevelPlane, IPOCLineDTO, IVerticalAxis, IViewerPOC, IViewerPOCLine, POCViewer3DPoint, ViewerPOCTypes } from './types';
import { sortBy, last } from 'lodash';
import { pocViewerStore } from './pocViewerStore';

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
            incomingVolumeCapacity: pocLineDto.incomingVolumeCapacity,

            getChildrenPoints(children: Array<IViewerPOCLine | IViewerPOC>) {
                const points = sortBy(children.filter(child => child.parentPOCLineId === this.id), ['index']).map(child => {
                    if (child.type === ViewerPOCTypes.POC) {
                        return { x: child.position.x, y: child.level.distance, z: -child.position.z };
                    } else {
                        return child.getChildrenPoints(children)[0];
                    }
                }).filter(Boolean);// remove undefined from points


                // If pocLine parent === null, connect it to the root pocLines, else add an offset point
                // Connect to the main line
                if (pocLineDto.parentPOCLineId === null) {
                    const firstPoint = points[0];
                    const mainPOCLineConnectionPoint: POCViewer3DPoint = { ...firstPoint };

                    if (firstPoint.x > firstPoint.z) {
                        mainPOCLineConnectionPoint.x = 0;
                    } else {
                        mainPOCLineConnectionPoint.z = 0;
                    }
                    points.unshift(mainPOCLineConnectionPoint);

                // Add an offset point
                } else {
                    const firstPoint = points[0];
                    const newOffsetPoint = { ...firstPoint };
                    if (this.getDirection(points) === 'horizontal') {
                        const isXOutOfBounds = newOffsetPoint.x + POCLINE_OFFSET_LENGTH > pocViewerStore.planesWidth;
                        newOffsetPoint.x += isXOutOfBounds ? -POCLINE_OFFSET_LENGTH : POCLINE_OFFSET_LENGTH;
                    } else {
                        const isZOutOfBounds = -newOffsetPoint.z + POCLINE_OFFSET_LENGTH > pocViewerStore.planesLength;
                        newOffsetPoint.z += isZOutOfBounds ? POCLINE_OFFSET_LENGTH : -POCLINE_OFFSET_LENGTH;
                    }
                    points.unshift(newOffsetPoint);
                }


                // TODO add offset here
                return points;
            },

            getDirection(childPoints: POCViewer3DPoint[]) {
                const maxX = Math.max(...childPoints.map(point => point.x));
                const minX = Math.min(...childPoints.map(point => point.x));
                const maxZ = Math.max(...childPoints.map(point => point.z));
                const minZ = Math.min(...childPoints.map(point => point.z));

                return (maxX - minX) > (maxZ - minZ) ? 'horizontal' : 'vertical';
            }
        };
    });
};
