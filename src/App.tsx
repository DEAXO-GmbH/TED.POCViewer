import React from 'react';
import { POCViewer } from './package/POCViewer';
import './App.css';



function App() {
    return (
        <main style={{ padding: 100 }}>
            <div style={{ width: '100%', height: 600 }}>
                <POCViewer />
            </div>
        </main>
    );
}


export default App;
