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
}

export interface IPOCInputParameters {
    xAxes: IAxisXDTO[]
    yAxes: IAxisYDTO[]
    levels: ILevelDTO[]
    pocs: IPocDTO[]
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

export interface IViewerPOC {
    id: string
    level: ILevelPlane
    xAxis: IHorizontalAxis
    yAxis: IVerticalAxis
    name: string
}
