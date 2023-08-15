import { Button } from 'antd';
import { ERROR_BOUNDARY_TEXT_COLOR } from 'package/constants';
import 'antd/dist/antd.css';
import React , { Component } from 'react';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { downloadFile } from 'package/utils';



interface IVIewerErrorBoundaryProps {
    children: JSX.Element
}

interface IViewerErrorBoundaryState {
    hasError: boolean
}

export class POCViewerErrorBoundary extends Component<IVIewerErrorBoundaryProps, IViewerErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
        };

    }

    onDownloadJSONClick () {
        const pocViewerSceneDataJson = JSON.stringify(pocViewerStore.pocInputParameters);

        const d = new Date();
        const exportFileName = `poc_json ${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.json`;
        const file = new File([new Blob([pocViewerSceneDataJson], { type: 'text/json' })], exportFileName);

        downloadFile(file);
    }

    clearHasErrorState () {
        this.setState({ ...this.state, hasError: false });
    }

    componentDidCatch(error: Error) {
        console.error('An error occured in POC Viewer:', error);
        this.setState({ ...this.state, hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ color: `#${ERROR_BOUNDARY_TEXT_COLOR.toString(16).padStart(6, '0')}`, textAlign: 'center', paddingTop: 60, fontSize: 20 }}>
                    <div style={{ marginBottom: 8 }}>An error occured in POC viewer. Download json below:</div>
                    <Button onClick={this.onDownloadJSONClick} type='primary' style={{ fontSize: 14 }}>Download JSON</Button>
                </div>
            );
        }

        return this.props.children;
    }
}
