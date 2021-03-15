import { createContext } from 'react';
import { Work } from '../../../model/catalogue';
import { IIIFCanvas, IIIFManifest, IIIFRendering } from '../../../model/iiif';
import { LicenseData } from '../../../utils/licenses';

type Props = {
  work: Work | undefined;
  manifest: IIIFManifest | undefined;
  manifestIndex: number | undefined;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  canvases: IIIFCanvas[];
  canvasIndex: number | undefined;
  gridVisible: boolean;
  setGridVisible: (v: boolean) => void;
  currentManifestLabel?: string;
  licenseInfo: LicenseData;
  iiifImageLocationCredit: string;
  downloadOptions: IIIFRendering[];
  iiifPresentationDownloadOptions: IIIFRendering[];
  parentManifest: IIIFManifest | undefined;
  lang: string;
  mainAreaWidth: number;
  mainAreaHeight: number;
  isFullscreen: boolean;
  setShowZoomed: (v: boolean) => void;
  isSidebarActive: boolean;
  setIsSidebarActive: (v: boolean) => void;
  showZoomed: boolean;
  setZoomInfoUrl: (v: string) => void;
  setIsFullscreen: (v: boolean) => void;
  zoomInfoUrl: string;
  setRotatedImages: (v: { canvasIndex: number }[]) => void;
  showControls: boolean;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  setImageJson: (v: boolean) => void;
  setParentManifest: (v: IIIFManifest) => void;
  rotatedImages: { canvasIndex: number }[];
  setShowControls: (v: boolean) => void;
  errorHandler: () => undefined;
  setCurrentManifestLabel: (v: string) => void;
};
const ItemViewerContext = createContext<Props>({
  work: undefined,
  manifest: undefined,
  manifestIndex: undefined,
  activeIndex: 0,
  canvases: [],
  canvasIndex: undefined,
  gridVisible: false,
  currentManifestLabel: undefined,
  licenseInfo: undefined,
  iiifImageLocationCredit: '',
  downloadOptions: [],
  iiifPresentationDownloadOptions: [],
  parentManifest: undefined,
  lang: '',
  mainAreaWidth: 1000,
  mainAreaHeight: 500,
  isFullscreen: false,
  isSidebarActive: false,
  showZoomed: false,
  zoomInfoUrl: '',
  showControls: false,
  isLoading: false,
  rotatedImages: [],
  setZoomInfoUrl: () => undefined,
  setActiveIndex: () => undefined,
  setGridVisible: () => false,
  setShowZoomed: () => undefined,
  setIsSidebarActive: () => undefined,
  setIsFullscreen: () => undefined,
  setRotatedImages: () => undefined,
  setIsLoading: () => undefined,
  setImageJson: () => undefined,
  setParentManifest: () => undefined,
  setShowControls: () => undefined,
  errorHandler: () => undefined,
  setCurrentManifestLabel: () => undefined,
});
export default ItemViewerContext;
