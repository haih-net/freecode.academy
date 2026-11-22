import { ImageSegmenter } from '@mediapipe/tasks-vision'
import wasmLoaderPath from '@mediapipe/tasks-vision/vision_wasm_internal.js?url'
import wasmBinaryPath from '@mediapipe/tasks-vision/vision_wasm_internal.wasm?url'

export async function createSegmenter(): Promise<ImageSegmenter> {
  return ImageSegmenter.createFromOptions(
    { wasmLoaderPath, wasmBinaryPath },
    {
      // Google MediaPipe Selfie Segmenter (landscape, float16):
      // https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter_landscape/float16/latest/selfie_segmenter_landscape.tflite
      // Единственная маска вероятностей этой модели соответствует силуэту человека.
      baseOptions: {
        modelAssetPath: '/models/selfie-segmenter-landscape.tflite',
      },
      runningMode: 'VIDEO',
      outputCategoryMask: false,
      outputConfidenceMasks: true,
    },
  )
}
