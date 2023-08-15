import React, { useEffect, useState } from 'react';
import { POCViewer } from './package/POCViewer';
import { mock1 } from './mocks/mock1';
import { mock2 } from './mocks/mock2';
import './App.css';


const mocks = {
    'null': null,
    'mock1': mock1,
    'mock2': mock2,
};

const defaultMockKey = Object.keys(mocks)[1];


function App() {
    const [mock, setMock] = useState<keyof typeof mocks>(localStorage.getItem('lastMock') || defaultMockKey as any);

    useEffect(() => {
        localStorage.setItem('lastMock', mock);
    }, [mock]);

    return (
        <main style={{ padding: 20 }}>
            <div style={{ width: '100%', height: 600 }}>
                <POCViewer debug onPOCClick={poc => console.log('poc =>', poc)} pocInputParameters={mocks[mock]} />
            </div>

            <div className='mock-buttons'>
                <div>Mocks:</div>
                {
                    Object.keys(mocks).map(key => {
                        return <button className={key === mock ? 'clicked' : ''} onClick={() => setMock(key as any)} key={key}>{key}</button>;
                    })
                }
            </div>
        </main>
    );
}


export default App;
