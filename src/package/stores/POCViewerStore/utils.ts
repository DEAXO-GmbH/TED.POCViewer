import { DEFAULT_POC_NAME, TOOL_DEFAULT_LENGTH, TOOL_DEFAULT_WIDTH } from 'package/constants';
import { IAxisXDTO, IAxisYDTO, IHorizontalAxis, ILevelDTO, ILevelPlane, IPocCellDTO, IPocDTO, IToolDTO, IUnusedViewerPOC, IVerticalAxis, IViewerPOC, IViewerPOCCell, IViewerTool, ViewerPOCTypes } from './types';
import { pocViewerStore } from './pocViewerStore';

export const transformLevelsToLevelPlanes = (levels: ILevelDTO[]): ILevelPlane[] => {
    let currentDistance = 0;

    return levels.map(level => {
        currentDistance += level.distance || 0;

        return { distance: currentDistance, levelName: level.name, id: level.id };
    });
};

export const transformToVerticalAxes = (axes: IAxisYDTO[]): IVerticalAxis[] => {
    let currentDistance = 0;

    return axes.map(axis => {
        currentDistance += axis.distance || 0;

        return { distance: currentDistance, name: axis.name, id: axis.id };
    });
};

export const transformToHorizontalAxes = (axes: IAxisXDTO[]): IHorizontalAxis[] => {
    let currentDistance = 0;

    return axes.map(axis => {
        currentDistance += axis.distance || 0;

        return { distance: currentDistance, name: axis.name, id: axis.id };
    });
};



export const transformToVIewerTools = (tools: IToolDTO[]): IViewerTool[] => {
    return tools.map(tool => {
        let xAxisStart = pocViewerStore.horizontalAxis.find(axis => axis.id === tool.axisXStartId)!;
        let xAxisEnd = pocViewerStore.horizontalAxis.find(axis => axis.id === tool.axisXEndId) || xAxisStart;
        let yAxisStart = pocViewerStore.verticalAxis.find(axis => axis.id === tool.axisYStartId)!;
        let yAxisEnd = pocViewerStore.verticalAxis.find(axis => axis.id === tool.axisYEndId) || yAxisStart;
        const level = pocViewerStore.levelPlanes.find(level => level.id === tool.levelId)!;

        if (xAxisStart === null && xAxisEnd === null) {
            // In case both are null - do not add them to the resulting array
            return null;
        } else {
            if (!xAxisStart) {
                xAxisStart = pocViewerStore.horizontalAxis[0];
            }
            if (!xAxisEnd) {
                xAxisEnd = pocViewerStore.horizontalAxis[pocViewerStore.horizontalAxis.length - 1];
            }
        }

        if (!yAxisStart && !yAxisEnd) {
            // In case both are null - do not add them to the resulting array
            return null;
        } else {
            if (!yAxisStart) {
                yAxisStart = pocViewerStore.verticalAxis[0];
            }
            if (!yAxisEnd) {
                yAxisEnd = pocViewerStore.verticalAxis[pocViewerStore.verticalAxis.length - 1];
            }
        }

        const toolLength = (xAxisEnd.distance - xAxisStart.distance) || TOOL_DEFAULT_LENGTH;
        const toolWidth = (yAxisEnd.distance - yAxisStart.distance) || TOOL_DEFAULT_WIDTH;
        const toolHeight = tool.height;

        const position = {
            x: yAxisStart.distance + (yAxisEnd.distance - yAxisStart.distance) / 2,
            y: level.distance,
            z: xAxisStart.distance + (xAxisEnd.distance - xAxisStart.distance) / 2,
        };


        return {
            id: tool.id,
            name: tool.name,

            buildingId: tool.buildingId,
            level: level,
            axisXStart: xAxisStart,
            axisXEnd: xAxisEnd,
            axisYStart: yAxisStart,
            axisYEnd: yAxisEnd,

            height: toolHeight,
            length: toolLength,
            width: toolWidth,
            position: position,

            pocCellIds: tool.pocCellId,
        };
    }).filter(tool => tool !== null) as IViewerTool[];
};

// TODO to remove
export const transformPOCs = (pocCells: IPocCellDTO[]) => {
    const pocs: IPocDTO[] = pocCells.reduce((pr, cur) => {
        return [...pr, ...cur.pocs];
    }, []);

    const pocArray = pocs.map(pocDto => {
        let xAxisStart = pocViewerStore.horizontalAxis.find(axis => axis.id === pocDto.axisXStartId);
        let yAxisStart = pocViewerStore.verticalAxis.find(axis => axis.id === pocDto.axisYStartId);
        let xAxisEnd = pocViewerStore.horizontalAxis.find(axis => axis.id === pocDto.axisXEndId);
        let yAxisEnd = pocViewerStore.verticalAxis.find(axis => axis.id === pocDto.axisYEndId);
        const level = pocViewerStore.levelPlanes.find(levelPlane => levelPlane.id === pocDto.levelId);

        if (!xAxisStart && !xAxisEnd || !level) {
            // In case both are null - do not add them to the resulting array
            return null;
        } else {
            if (!xAxisStart) {
                xAxisStart = pocViewerStore.horizontalAxis[0];
            }
            if (!xAxisEnd) {
                xAxisEnd = pocViewerStore.horizontalAxis[pocViewerStore.horizontalAxis.length - 1];
            }
        }

        if (!yAxisStart && !yAxisEnd) {
            // In case both are null - do not add them to the resulting array
            return null;
        } else {
            if (!yAxisStart) {
                yAxisStart = pocViewerStore.verticalAxis[0];
            }
            if (!yAxisEnd) {
                yAxisEnd = pocViewerStore.verticalAxis[pocViewerStore.verticalAxis.length - 1];
            }
        }



        const position = {
            x: yAxisStart.distance + (yAxisEnd.distance - yAxisStart.distance) / 2,
            y: level.distance,
            z: xAxisStart.distance + (xAxisEnd.distance - xAxisStart.distance) / 2,
        };

        return {
            id: pocDto.id,
            parentPOCLineId: pocDto,

            name: pocDto.name,
            description: pocDto.description,
            type: ViewerPOCTypes.POC,

            index: pocDto.index,

            level: level,
            xAxisStart: xAxisStart,
            yAxisStart: yAxisStart,
            xAxisEnd: xAxisEnd,
            yAxisEnd: yAxisEnd,

            unit: pocDto.unitSymbol,

            position,

            mediaCapacity: pocDto.mediaCapacity || 0,
            occupiedMediaCapacity: pocDto.occupiedMediaCapacity || 0,
            occupiedPhysicalCapacity: pocDto.occupiedPhysicalCapacity || 0,
            physicalCapacity: pocDto.physicalCapacity || 0,
        };
    }).filter(poc => poc !== null) as IViewerPOC[];

    return pocArray;
};


export const transformUnusedPOCs = (pocs: IPocDTO[]): IUnusedViewerPOC[] => {
    const pocArray = pocs.map(pocDto => {
        const xAxisStart = pocViewerStore.horizontalAxis.find(axis => axis.id === pocDto.axisXStartId);
        const yAxisStart = pocViewerStore.verticalAxis.find(axis => axis.id === pocDto.axisYStartId);
        const xAxisEnd = pocViewerStore.horizontalAxis.find(axis => axis.id === pocDto.axisXEndId);
        const yAxisEnd = pocViewerStore.verticalAxis.find(axis => axis.id === pocDto.axisYEndId);
        const level = pocViewerStore.levelPlanes.find(levelPlane => levelPlane.id === pocDto.levelId);

        return {
            id: pocDto.id,

            name: pocDto.name || DEFAULT_POC_NAME,
            description: pocDto.description,
            type: ViewerPOCTypes.POC,

            index: pocDto.index,

            level: level,
            xAxisStart: xAxisStart,
            yAxisStart: yAxisStart,
            xAxisEnd: xAxisEnd,
            yAxisEnd: yAxisEnd,

            unit: pocDto.unitSymbol,

            mediaCapacity: pocDto.mediaCapacity,
            occupiedMediaCapacity: pocDto.occupiedMediaCapacity,
            occupiedPhysicalCapacity: pocDto.occupiedPhysicalCapacity,
            physicalCapacity: pocDto.physicalCapacity
        };
    }).filter(poc => poc !== null) as IUnusedViewerPOC[];

    return pocArray.sort((poc1, poc2) => poc1.name > poc2.name ? 1 : -1);
};

export const transformPOCCells = (pocCells: IPocCellDTO[]): IViewerPOCCell[] => {
    const pocCellsArray: IViewerPOCCell[] = pocCells.map(pocCellDto => {
        let xAxisStart = pocViewerStore.horizontalAxis.find(axis => axis.id === pocCellDto.axisXStartId);
        let yAxisStart = pocViewerStore.verticalAxis.find(axis => axis.id === pocCellDto.axisYStartId);
        let xAxisEnd = pocViewerStore.horizontalAxis.find(axis => axis.id === pocCellDto.axisXEndId);
        let yAxisEnd = pocViewerStore.verticalAxis.find(axis => axis.id === pocCellDto.axisYEndId);
        const level = pocViewerStore.levelPlanes.find(levelPlane => levelPlane.id === pocCellDto.levelId);

        if (!xAxisStart && !xAxisEnd || !level) {
            // In case both are null - do not add them to the resulting array
            return null;
        } else {
            if (!xAxisStart) {
                xAxisStart = pocViewerStore.horizontalAxis[0];
            }
            if (!xAxisEnd) {
                xAxisEnd = pocViewerStore.horizontalAxis[pocViewerStore.horizontalAxis.length - 1];
            }
        }

        if (!yAxisStart && !yAxisEnd) {
            // In case both are null - do not add them to the resulting array
            return null;
        } else {
            if (!yAxisStart) {
                yAxisStart = pocViewerStore.verticalAxis[0];
            }
            if (!yAxisEnd) {
                yAxisEnd = pocViewerStore.verticalAxis[pocViewerStore.verticalAxis.length - 1];
            }
        }

        const pocArray: IPocDTO[] = pocCellDto.pocs;

        const position = {
            x: yAxisStart.distance + (yAxisEnd.distance - yAxisStart.distance) / 2,
            y: level.distance,
            z: xAxisStart.distance + (xAxisEnd.distance - xAxisStart.distance) / 2,
        };

        let isOverflow = false;

        for (const poc of pocCellDto.pocs) {
            const mediaCapacityNumber = Number(poc.mediaCapacity) || 0;
            const occupiedMediaCapacityNumber = Number(poc.occupiedMediaCapacity) || 0;
            const physicalCapacityNumber = Number(poc.physicalCapacity) || 0;
            const occupiedPhysicalCapacityNumber = Number(poc.occupiedPhysicalCapacity) || 0;

            const isMediaOverflow = occupiedMediaCapacityNumber > mediaCapacityNumber;
            const isPhysicalOverflow = occupiedPhysicalCapacityNumber > physicalCapacityNumber;

            if (isMediaOverflow || isPhysicalOverflow) {
                isOverflow = true;
                break;
            }
        }

        // ===================
        //  Create a poc cell
        // ===================
        const pocCell: IViewerPOCCell = {
            id: pocCellDto.id,
            pocs: pocArray,

            level: level,
            xAxisEnd,
            xAxisStart,
            yAxisEnd,
            yAxisStart,

            position,
            isOverflow,
        };

        return pocCell;
    }).filter(pocCell => pocCell !== null) as IViewerPOCCell[];


    return pocCellsArray;
};
