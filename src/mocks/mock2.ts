import type { IPOCViewerInputParameters } from '../package/stores/POCViewerStore/types';



export const mock2: IPOCViewerInputParameters = {
    'interconnections': [],
    'pocLines': [
        {
            'id': '727cbec1-93e0-4ad8-bc8c-af332c0261e3',
            'parentPOCLineId': null,
            'name': '001',
            'description': null,
            'index': 30,
            'incomeVolumeCapacity': null,
            'totalMediaCapacity': '1,5 Nm3/h',
            'occupiedMediaCapacity': '0 Nm3/h',
            'factOccupiedMediaCapacity': null,
            'totalPhysicalCapacity': '0',
            'occupiedPhysicalCapacity': '0',
            'factOccupiedPhysicalCapacity': null,
            'unitSymbol': null
        },
        {
            'id': '42b47347-b77d-420c-9bd9-e5efac470f0b',
            'parentPOCLineId': null,
            'name': '005',
            'description': 'FAB FACILITY',
            'index': 316,
            'incomingVolumeCapacity': null,
            'totalMediaCapacity': '0 Nm3/h',
            'occupiedMediaCapacity': '0,314 Nm3/h',
            'factOccupiedMediaCapacity': null,
            'totalPhysicalCapacity': '0',
            'occupiedPhysicalCapacity': '1',
            'factOccupiedPhysicalCapacity': null,
            'unitSymbol': null
        },
        {
            'id': 'a622c1d4-f196-49c8-966d-8f68e7efbda8',
            'parentPOCLineId': null,
            'name': '610',
            'description': 'FAB FACILITY',
            'index': 322,
            'incomeVolumeCapacity': null,
            'totalMediaCapacity': '0 Nm3/h',
            'occupiedMediaCapacity': '1,3 Nm3/h',
            'factOccupiedMediaCapacity': null,
            'totalPhysicalCapacity': '0',
            'occupiedPhysicalCapacity': '1',
            'factOccupiedPhysicalCapacity': null,
            'unitSymbol': null
        }
    ],
    'pocs': [
        {
            'id': '56475b22-7efe-4507-8d50-70c113c40f18',
            'pocLineId': '727cbec1-93e0-4ad8-bc8c-af332c0261e3',
            'name': '001',
            'description': 'FAB FACILITY',
            'space': 'AREA PRODUTTIVA DTT',
            'index': 28,
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'levelId': 'b4c2f363-f3dc-4bc1-8ab9-11589e824a8a',
            'axisXStartId': '04440cc8-03e0-48a5-9b15-ff2282a8f663',
            'axisYStartId': '85a1a2dd-2e8b-4c9f-bf49-e263a9a47c1b',
            'axisXEndId': '630534ea-ebbc-47a9-9c10-7aa791abf17c',
            'axisYEndId': 'd84c2543-63d0-40a7-96ad-9d35e168788f',
            'totalMediaCapacity': '1,5 Nm3/h',
            'occupiedMediaCapacity': '0 Nm3/h',
            'factOccupiedMediaCapacity': null,
            'totalPhysicalCapacity': '0',
            'occupiedPhysicalCapacity': '0',
            'factOccupiedPhysicalCapacity': null,
            'unitSymbol': null
        },
        {
            'id': 'e79d868b-7670-4cff-945d-a1612b27a0b4',
            'pocLineId': '42b47347-b77d-420c-9bd9-e5efac470f0b',
            'name': '005',
            'description': 'FAB FACILITY',
            'space': 'AREA PRODUTTIVA DTT',
            'index': 315,
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'levelId': 'b4c2f363-f3dc-4bc1-8ab9-11589e824a8a',
            'axisXStartId': '04440cc8-03e0-48a5-9b15-ff2282a8f663',
            'axisYStartId': '85a1a2dd-2e8b-4c9f-bf49-e263a9a47c1b',
            'axisXEndId': '630534ea-ebbc-47a9-9c10-7aa791abf17c',
            'axisYEndId': 'd84c2543-63d0-40a7-96ad-9d35e168788f',
            'totalMediaCapacity': '0 Nm3/h',
            'occupiedMediaCapacity': '0,314 Nm3/h',
            'factOccupiedMediaCapacity': null,
            'totalPhysicalCapacity': '0',
            'occupiedPhysicalCapacity': '1',
            'factOccupiedPhysicalCapacity': null,
            'unitSymbol': null
        },
        {
            'id': 'e1d749ae-9c7f-4a9e-a3e5-903185c7a8f5',
            'pocLineId': 'a622c1d4-f196-49c8-966d-8f68e7efbda8',
            'name': '610',
            'description': 'FAB FACILITY',
            'space': 'AREA PRODUTTIVA (CHASE AREA)',
            'index': 321,
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'levelId': 'b4c2f363-f3dc-4bc1-8ab9-11589e824a8a',
            'axisXStartId': '36bff7b7-36be-4888-9f00-9f2b1c82f005',
            'axisYStartId': 'b77151cb-34d4-4f9a-8a92-99ba492f7640',
            'axisXEndId': 'deff8e17-932d-420e-b1ec-5e859353e199',
            'axisYEndId': 'f3b2dbcb-30b8-4cb1-895f-484f0709c50a',
            'totalMediaCapacity': '0 Nm3/h',
            'occupiedMediaCapacity': '1,3 Nm3/h',
            'factOccupiedMediaCapacity': null,
            'totalPhysicalCapacity': '0',
            'occupiedPhysicalCapacity': '1',
            'factOccupiedPhysicalCapacity': null,
            'unitSymbol': null
        },
        {
            'id': '1abc624a-b081-4a1b-a769-060a7f2b1521',
            'pocLineId': null,
            'name': '687',
            'description': 'FAB FACILITY',
            'space': 'AREA PRODUTTIVA DTT',
            'index': 448,
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'levelId': '00000000-0000-0000-0000-000000000000',
            'axisXStartId': '00000000-0000-0000-0000-000000000000',
            'axisYStartId': '00000000-0000-0000-0000-000000000000',
            'axisXEndId': '00000000-0000-0000-0000-000000000000',
            'axisYEndId': '00000000-0000-0000-0000-000000000000',
            'totalMediaCapacity': '0 Nm3/h',
            'occupiedMediaCapacity': '0,243 Nm3/h',
            'factOccupiedMediaCapacity': null,
            'totalPhysicalCapacity': '0',
            'occupiedPhysicalCapacity': '1',
            'factOccupiedPhysicalCapacity': null,
            'unitSymbol': null
        }
    ],
    'tools': [
        {
            'id': '723ea86c-d5a5-4717-bce7-1952137a5aaf',
            'name': 'D1-50-00A BROOKS',
            'pocId': [
                'e79d868b-7670-4cff-945d-a1612b27a0b4'
            ],
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'levelId': '4b802f38-1911-44d5-923d-db1d7a58dbeb',
            'axisXStartId': '04440cc8-03e0-48a5-9b15-ff2282a8f663',
            'axisYStartId': 'd84c2543-63d0-40a7-96ad-9d35e168788f',
            'axisXEndId': '630534ea-ebbc-47a9-9c10-7aa791abf17c',
            'axisYEndId': 'd84c2543-63d0-40a7-96ad-9d35e168788f',
            'height': '3.25'
        },
        {
            'id': '91fa091c-14ec-4e32-b42b-795f1e33d1cb',
            'name': 'D1-57-12A AMAT',
            'pocId': [
                '1abc624a-b081-4a1b-a769-060a7f2b1521'
            ],
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'levelId': 'b4c2f363-f3dc-4bc1-8ab9-11589e824a8a',
            'axisXStartId': '36bff7b7-36be-4888-9f00-9f2b1c82f005',
            'axisYStartId': 'b77151cb-34d4-4f9a-8a92-99ba492f7640',
            'axisXEndId': 'deff8e17-932d-420e-b1ec-5e859353e199',
            'axisYEndId': 'f3b2dbcb-30b8-4cb1-895f-484f0709c50a',
            'height': null
        },
        {
            'id': '923e0aed-81b2-4295-bf8b-a19e8bad24cb',
            'name': 'D1-68-00A  BOSCIEN',
            'pocId': [
                'e1d749ae-9c7f-4a9e-a3e5-903185c7a8f5'
            ],
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'levelId': '4b802f38-1911-44d5-923d-db1d7a58dbeb',
            'axisXStartId': '36bff7b7-36be-4888-9f00-9f2b1c82f005',
            'axisYStartId': 'b77151cb-34d4-4f9a-8a92-99ba492f7640',
            'axisXEndId': 'deff8e17-932d-420e-b1ec-5e859353e199',
            'axisYEndId': 'f3b2dbcb-30b8-4cb1-895f-484f0709c50a',
            'height': '2.948'
        }
    ],
    'levels': [
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'L0-SUBFAB',
            'index': 0,
            'value': '8,29',
            'id': 'c44fd8b2-5543-4928-b6e6-76ab40a9d0f7',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'L1-RAISED_FLOOR',
            'index': 1,
            'value': '1',
            'id': 'b4c2f363-f3dc-4bc1-8ab9-11589e824a8a',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': 1
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'L1-CLEANROOM',
            'index': 2,
            'value': '5',
            'id': '4b802f38-1911-44d5-923d-db1d7a58dbeb',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': 5
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'L1-PLENUM',
            'index': 3,
            'value': '2',
            'id': '18f9a5d2-0ee2-44ad-925f-0898f2f1f8f7',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': 2
        }
    ],
    'xAxes': [
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': '0',
            'index': 0,
            'value': '75',
            'id': '91686d33-efac-4a74-a7b8-d77da985dffb',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': 75
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F1',
            'index': 1,
            'value': '0',
            'id': '9e91fbe1-5344-471d-ab6b-5f74d2a9c5af',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': 0
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F1b',
            'index': 2,
            'value': '7,5',
            'id': '486484b9-472f-4853-a6b7-80ffa5e81137',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F2',
            'index': 3,
            'value': '2,5',
            'id': '051c582e-3830-4909-8fe4-44a204efac7d',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F3',
            'index': 4,
            'value': '1,1',
            'id': '05a57436-fce0-45f5-ad8d-cf99d498c386',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F4',
            'index': 5,
            'value': '14,4',
            'id': 'b9d13c0a-e211-4224-a703-470631918da9',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F5',
            'index': 6,
            'value': '14,4',
            'id': 'cf7ecd5d-f5fc-44e6-83cf-4b876feb5a84',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F6',
            'index': 7,
            'value': '15,6',
            'id': 'bdb4dd72-04cf-4b27-bf12-af28c5dbe3be',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F7',
            'index': 8,
            'value': '14,4',
            'id': '04440cc8-03e0-48a5-9b15-ff2282a8f663',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F8',
            'index': 9,
            'value': '14,4',
            'id': '630534ea-ebbc-47a9-9c10-7aa791abf17c',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F9',
            'index': 10,
            'value': '1,1',
            'id': '36bff7b7-36be-4888-9f00-9f2b1c82f005',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'F10',
            'index': 11,
            'value': '11,5',
            'id': 'deff8e17-932d-420e-b1ec-5e859353e199',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        }
    ],
    'yAxes': [
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FA',
            'index': 1,
            'value': '0',
            'id': 'e80b841e-8e54-49d5-8b84-f54b37133c22',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': 0
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FAb',
            'index': 2,
            'value': '7,1',
            'id': '8b35ea2e-e1e5-4630-a7c4-18a729bdfd2f',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FB',
            'index': 3,
            'value': '2,5',
            'id': 'af6e930e-f495-4fe0-8a0d-ccbe0a1ad42b',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FC',
            'index': 4,
            'value': '14,4',
            'id': 'c02a3528-52be-4ed2-a50b-e32be20f5a61',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FD',
            'index': 5,
            'value': '14,4',
            'id': '9522771d-18ac-4688-b64d-938f38edcc09',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FE',
            'index': 6,
            'value': '13,9',
            'id': '0b7c45f6-2531-48ae-b6e7-05c5682021a4',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FF',
            'index': 7,
            'value': '1,1',
            'id': 'c1ea612d-1337-40c8-aa09-f8a8c6aef2de',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FG',
            'index': 8,
            'value': '6,7',
            'id': '49f14a18-9628-4d7c-a373-508737c881c9',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FH',
            'index': 9,
            'value': '7,2',
            'id': '85a1a2dd-2e8b-4c9f-bf49-e263a9a47c1b',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FI',
            'index': 10,
            'value': '7,2',
            'id': 'd84c2543-63d0-40a7-96ad-9d35e168788f',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FL',
            'index': 11,
            'value': '7,2',
            'id': '39d69c1b-47a7-48ee-b9cf-ee1fc2ce81c4',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FM',
            'index': 12,
            'value': '7,2',
            'id': 'b77151cb-34d4-4f9a-8a92-99ba492f7640',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        },
        {
            'buildingId': 'a93e8297-9e82-4d42-9394-803a00ebda14',
            'name': 'FN',
            'index': 13,
            'value': '7,2',
            'id': 'f3b2dbcb-30b8-4cb1-895f-484f0709c50a',
            'projectId': '3a2126b8-f608-42a5-b976-0da9cae23805',
            'distance': null
        }
    ]
};
