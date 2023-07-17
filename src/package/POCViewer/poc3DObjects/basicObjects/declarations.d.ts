import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

export {};

declare global {
    namespace JSX {
        interface IntrinsicElements {
            textGeometry: any
            meshLineGeometry: Partial<MeshLineGeometry> & any
            meshLineMaterial: Partial<MeshLineMaterial>
        }
    }
}
