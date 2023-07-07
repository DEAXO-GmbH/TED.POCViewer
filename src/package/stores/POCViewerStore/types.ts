export interface IAxisX {
    name: string
    distance: number
}

export interface IAxisY {
    name: string
    distance: number
}

export interface ILevel {
    name: string
    distance: number
}

export interface IPOCInputParameters {
    xAxes: IAxisX[]
    yAxes: IAxisY[]
    levels: ILevel[]
}

export interface IVerticalAxis {
    name: string
    distance: number
}

export interface IHorizontalAxis {
    name: string
    distance: number
}

export interface ILevelPlane {
    distance: number
    levelName: string
}
