import { PartialBy } from 'package/types';

export interface IPOCViewerInputParameters {
    xAxes: IAxisXDTO[]
    yAxes: IAxisYDTO[]
    levels: ILevelDTO[]

    pocNotPlaced: IPocDTO[]
    pocCells: IPocCellDTO[]
    tools: IToolDTO[]
    interconnections: IInterconnectionDTO[]
}

export type POCViewer3DPoint = {
    x: number
    y: number
    z: number
}

// ========== DTO objects ==========
export interface IAxisXDTO {
    id: string
    name: string
    distance: number | null
    buildingId: string
    index: number
}

export interface IAxisYDTO {
    id: string
    name: string
    distance: number | null
    buildingId: string
    index: number
}

export interface ILevelDTO {
    id: string
    name: string
    distance: number | null
    buildingId: string
    index: number
}


export interface IPocCellDTO {
    id: string
    pocs: IPocDTO[]

    levelId?: string
    axisXStartId?: string
    axisYStartId?: string
    axisXEndId?: string
    axisYEndId?: string
}

export interface IPocDTO {
    id: string

    name?: string
    description?: string
    space: string

    index: number

    buildingId: string
    levelId?: string
    axisXStartId?: string
    axisYStartId?: string
    axisXEndId?: string
    axisYEndId?: string

    toolIds: string[]

    elements: IPocElementDto[]

    mediaCapacity?: string
    occupiedMediaCapacity?: string
    physicalCapacity?: string
    occupiedPhysicalCapacity?: string
    unitSymbol?: string
}

export interface IPocElementDto {
    toolId: string,
    toolName: string,
    toolAverageFlowDouble: number,
    toolAverageFlow: string,
    toolMaximumFlowDouble: number,
    toolMaximumFlow: string,
    poU_Tag: string,
    ventile: string
}


export interface IToolDTO {
    id: string
    name: string
    pocCellId: string[]

    buildingId: string
    levelId?: string
    axisXStartId?: string
    axisYStartId?: string
    axisXEndId?: string
    axisYEndId?: string

    height?: number | undefined | null
    length?: number | undefined | null
    width?: number | undefined | null
}

export interface IInterconnectionDTO {
    firstToolId: string
    secondToolId: string
}
// =================================


// ========= Store objects =========
export interface IVerticalAxis {
    id: string
    name: string
    distance: number
}

export interface IHorizontalAxis {
    id: string
    name: string
    distance: number
}

export interface ILevelPlane {
    id: string
    distance: number
    levelName: string
}

export enum ViewerPOCTypes {
    POC,
}

// TODO outdated
export interface IViewerPOC {
    id: string

    name: string
    description: string
    type: ViewerPOCTypes.POC

    index: number

    level: ILevelPlane
    xAxisStart: IHorizontalAxis
    yAxisStart: IVerticalAxis
    xAxisEnd: IHorizontalAxis
    yAxisEnd: IVerticalAxis

    position: POCViewer3DPoint

    mediaCapacity: string
    occupiedMediaCapacity: string
    unit: string
    physicalCapacity: string
    occupiedPhysicalCapacity: string
}

export interface IViewerPOCCell {
    id: string
    pocs: IPocDTO[]

    level: ILevelPlane
    xAxisStart: IHorizontalAxis
    yAxisStart: IVerticalAxis
    xAxisEnd: IHorizontalAxis
    yAxisEnd: IVerticalAxis

    position: POCViewer3DPoint
    isOverflow: boolean
}

export type IUnusedViewerPOC = PartialBy<IViewerPOC,
    'xAxisStart' |'xAxisEnd' | 'yAxisEnd' | 'yAxisStart' | 'level' |
    'position' | 'occupiedMediaCapacity' | 'occupiedPhysicalCapacity' |
    'mediaCapacity' | 'physicalCapacity' | 'unit'
>


export interface IViewerTool {
    id: string
    name: string
    pocCellIds: string[]

    buildingId: string

    level: ILevelPlane
    axisXStart: IHorizontalAxis
    axisYStart: IHorizontalAxis
    axisXEnd: IVerticalAxis
    axisYEnd: IVerticalAxis

    width: number | null | undefined
    length: number | null | undefined
    height: number | null | undefined
    position: POCViewer3DPoint
}

export interface IViewerInterconnection {
    firstTool: IViewerTool
    secondTool: IViewerTool
}
// =================================
