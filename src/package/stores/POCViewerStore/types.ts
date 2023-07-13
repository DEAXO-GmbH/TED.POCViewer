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
    name: string
    level: string
    xAxis: string
    yAxis: string
    pocLine?: string
    mediaCapacity: number
}

export interface IPOCLineDTO {
    id: string
    name: string
    pocLine?: string
}

export interface IPOCViewerInputParameters {
    xAxes: IAxisXDTO[]
    yAxes: IAxisYDTO[]
    levels: ILevelDTO[]
    pocs: IPocDTO[]
    pocLines: IPOCLineDTO[]
}

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

export interface IPOCLineTreeNode {
    id: string
    pocLineParent: string
    points: ([number, number, number] | IPOCLineTreeNode)[] // Array of child pocLines & pocs
    direction: 'horizontal' | 'vertical'
    endPoint: [number, number, number] // The point that's added in the end to get offset
}

export interface IViewerPOC {
    id: string
    level: ILevelPlane
    xAxis: IHorizontalAxis
    yAxis: IVerticalAxis
    name: string
}
