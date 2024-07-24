import React, { useRef } from 'react';
import { observer } from 'mobx-react';

import { CopyOutlined, FullscreenOutlined, UploadOutlined, ScissorOutlined } from '@ant-design/icons';
import { LayersWidget } from '../layersWidget';

import { layersWidgetStore } from 'package/stores/widgetStore';
import { pocViewerStore } from 'package/stores/POCViewerStore';

import { downloadFile } from 'package/utils';

import './buttonPannel.css';



export const ButtonPannel = observer(() => {
    const jsonImportButtonRef = useRef<HTMLInputElement>(null!);

    const onFullscreenClick = () => {
        const viewerCont = document.querySelector('.poc-viewer_cont');
        const isFullscreen = viewerCont?.clientWidth === window.innerWidth && viewerCont.clientHeight === window.innerHeight;

        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            viewerCont?.requestFullscreen();
        }
    };

    const onLayersClick = () => {
        if (layersWidgetStore.isWidgetOpen) {
            layersWidgetStore.closeWidget();
        } else {
            layersWidgetStore.openWidget();
        }
    };

    const onExportAsJSONClick = () => {
        const pocViewerSceneDataJson = JSON.stringify(pocViewerStore.pocInputParameters);

        const d = new Date();
        const exportFileName = `poc_json ${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.json`;
        const file = new File([new Blob([pocViewerSceneDataJson], { type: 'text/json' })], exportFileName);

        downloadFile(file);
    };

    const onImportJSONClick = () => {
        jsonImportButtonRef.current.click();
    };

    const onJSONFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const jsonFile = e.target.files?.[0] || null;

        if (jsonFile) {
            pocViewerStore.importPocParametersFromJSON(jsonFile);
        }
    };


    return (
        <>
            <input ref={jsonImportButtonRef} accept='.json' type='file' hidden onChange={onJSONFileImport} />

            <div className='poc-viewer__button-pannel'>
                <div className='poc-viewer__button-pannel_btn-group'>
                    <button className='poc-viewer__button-pannel_btn' onClick={onFullscreenClick}><FullscreenOutlined /></button>
                </div>

                <div className='poc-viewer__button-pannel_btn-group'>
                    <button className='poc-viewer__button-pannel_btn' onClick={onLayersClick}><CopyOutlined /></button>
                    {/*<button className='poc-viewer__button-pannel_btn' ><ScissorOutlined /></button>*/}
                </div>

                {
                    pocViewerStore.isDebugMode &&
                    <div className='poc-viewer__button-pannel_btn-group'>
                        <button style={{ fontSize: 8 }} className='poc-viewer__button-pannel_btn' onClick={onExportAsJSONClick}>JSON</button>
                        <button className='poc-viewer__button-pannel_btn' onClick={onImportJSONClick}><UploadOutlined /></button>
                    </div>
                }
            </div>

            <LayersWidget />
        </>
    );
});
