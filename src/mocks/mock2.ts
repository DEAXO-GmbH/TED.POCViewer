import type { IPOCViewerInputParameters } from '../package/stores/POCViewerStore/types';



export const mock2: IPOCViewerInputParameters = {
    levels: [
        { id: '00', distance: 0, name: 'Level 00' }, { id:'01', distance: 5, name: 'Level 01' }, { id: '02', distance: 20, name: 'Level 02' }
    ],
    xAxes: [{ id: 'test', distance: 0, name: 'a' }, { id: 'b', distance: 2, name: 'b' }, { id: 'c', distance: 2, name: 'c' }, { id: 'd', distance: 2, name: 'd' }, ],
    yAxes: [{ id: '1', distance: 0, name: '1' }, { id: '2', distance: 2, name: '2' }, { id: '3', distance: 2, name: '3' }, { id: '5', distance: 5, name: '5' }, { id: '6', distance: 11, name: '6' }, ],
    pocs: [
        {
            id: 'POC1',
            pocLineId: 'pl1',
            name: 'RD-2511',
            description: 'aaa',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'd',
            axisXEndId: 'd',
            axisYStartId: '3',
            axisYEndId: '3',
            index: 4,
            unit: 'l/s',
            mediaCapacity: '25',
            occupiedMediaCapacity: '21.1',
            occupiedPhysicalCapacity: '500',
            physicalCapacity: '420',
        },
        {
            id: 'POC2',
            pocLineId: 'pl1',
            name: 'CH11',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            unit: 'l/s',
            axisXStartId: 'c',
            axisXEndId: 'c',
            axisYStartId: '2',
            axisYEndId: '2',
            index: 6,
            mediaCapacity: '100',
            occupiedMediaCapacity: '200',
            occupiedPhysicalCapacity: '300',
            physicalCapacity: '200',
        },
        {
            id: 'POC3',
            pocLineId: 'pl1',
            name: 'VH-EX',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            unit: 'l/s',
            axisXStartId: 'b',
            axisXEndId: 'b',
            axisYStartId: '2',
            axisYEndId: '2',
            index: 77,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC42',
            pocLineId: 'pl1',
            name: 'CH-25',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            unit: 'l/s',
            axisXStartId: 'b',
            axisXEndId: 'b',
            axisYStartId: '3',
            axisYEndId: '3',
            index: 511,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },

        {
            id: 'POC4',
            pocLineId: 'pl2',
            name: 'A115',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            unit: 'l/s',
            levelId: '01',
            axisXStartId: 'c',
            axisXEndId: 'c',
            axisYStartId: '6',
            axisYEndId: '6',
            index: 5,
            mediaCapacity: '10',
            occupiedMediaCapacity: '15',
            physicalCapacity: '11',
            occupiedPhysicalCapacity: '0',
        },
        {
            id: 'POC5',
            pocLineId: 'pl2',
            name: 'RD20',
            description: 'aaa2',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'd',
            unit: 'l/s',
            axisXEndId: 'd',
            axisYStartId: '6',
            axisYEndId: '6',
            index: 6,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC51',
            pocLineId: 'pl2',
            name: 'SHU2',
            description: 'aaa2',
            unit: 'l/s',
            space: 'dw',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'd',
            axisXEndId: 'd',
            axisYStartId: '5',
            axisYEndId: '5',
            index: 7,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
        {
            id: 'POC13',
            pocLineId: 'pl3',
            name: 'PO21',
            description: 'aaa2',
            space: 'dw',
            unit: 'l/s',
            buildingId: 'wd',
            levelId: '01',
            axisXStartId: 'b',
            axisXEndId: 'c',
            axisYStartId: '5',
            axisYEndId: '6',
            index: 50,
            mediaCapacity: '0',
            occupiedMediaCapacity: '0',
            occupiedPhysicalCapacity: '0',
            physicalCapacity: '0',
        },
    ],
    pocLines: [
        {
            id: 'pl1',
            description: 'POCLine 2',
            incomingVolumeCapacity: '0',
            index: 102,
            name: 'Super name',
            parentPOCLineId: 'pl3',
        },
        {
            id: 'pl2',
            description: 'POCLine hehe',
            incomingVolumeCapacity: '0',
            index: 105,
            name: 'Super name',
            parentPOCLineId: 'pl3',
        },
        {
            id: 'pl3',
            description: 'POCLine hehe',
            incomingVolumeCapacity: '0',
            index: 2,
            name: 'Super name',
            parentPOCLineId: null,
        }
    ],
    interconnections: [],
    tools: [],
};
