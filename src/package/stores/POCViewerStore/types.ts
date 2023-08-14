import { PartialBy } from 'package/types';

export interface IPOCViewerInputParameters {
    xAxes: IAxisXDTO[]
    yAxes: IAxisYDTO[]
    levels: ILevelDTO[]
    pocs: IPocDTO[]
    pocLines: IPOCLineDTO[]
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
    distance: number
}

export interface IAxisYDTO {
    id: string
    name: string
    distance: number
}

export interface ILevelDTO {
    id: string
    name: string
    distance: number
}

export interface IPocDTO {
    id: string
    pocLineId: string | null

    name: string
    description: string
    space: string

    index: number

    buildingId: string
    levelId?: string
    axisXStartId?: string
    axisYStartId?: string
    axisXEndId?: string
    axisYEndId?: string

    mediaCapacity: string
    occupiedMediaCapacity: string
    unit: string
    physicalCapacity: string
    occupiedPhysicalCapacity: string
}

export interface IPOCLineDTO {
    id: string
    parentPOCLineId: string | null

    name: string
    description: string

    index: number

    incomingVolumeCapacity: string
}

export interface IToolDTO {
    id: string
    name: string
    pocIds: string[]

    buildingId: string
    levelId?: string
    axisXStartId?: string
    axisYStartId?: string
    axisXEndId?: string
    axisYEndId?: string

    height: number
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
    POCLine,
}

export interface IViewerPOCLine {
    id: string
    parentPOCLineId: string | null

    name: string
    desciption: string
    type: ViewerPOCTypes.POCLine

    index: number
    incomingVolumeCapacity: string

    getDirection: (children: POCViewer3DPoint[]) => 'horizontal' | 'vertical'
    getChildrenPoints: (children: Array<IViewerPOCLine | IViewerPOC>) => POCViewer3DPoint[]
}

export interface IViewerPOC {
    id: string
    parentPOCLineId: string | null

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

export type IUnusedViewerPOC = PartialBy<IViewerPOC, 'xAxisStart' | 'xAxisEnd' | 'yAxisEnd' | 'yAxisStart' | 'level' | 'position'>


export interface IViewerTool {
    id: string
    name: string
    pocIds: string[]

    buildingId: string

    level: ILevelPlane
    axisXStart: IHorizontalAxis
    axisYStart: IHorizontalAxis
    axisXEnd: IVerticalAxis
    axisYEnd: IVerticalAxis

    width: number
    length: number
    height: number
    position: POCViewer3DPoint
}

export interface IViewerInterconnection {
    firstTool: IViewerTool
    secondTool: IViewerTool
}
// =================================
