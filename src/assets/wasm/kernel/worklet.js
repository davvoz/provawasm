 const audioWorklet = `import Module from './simple-kernel.wasmmodule.js';
import { RENDER_QUANTUM_FRAMES, MAX_CHANNEL_COUNT, HeapAudioBuffer } from '../lib/wasm-audio-helper.js';

class WASMWorkletProcessor extends AudioWorkletProcessor {

    constructor() {
        super();


        this._heapInputBuffer = new HeapAudioBuffer(Module, RENDER_QUANTUM_FRAMES,
            2, MAX_CHANNEL_COUNT);
        this._heapOutputBuffer = new HeapAudioBuffer(Module, RENDER_QUANTUM_FRAMES,
            2, MAX_CHANNEL_COUNT);
        this._kernel = new Module.SimpleKernel();
    }

    process(inputs, outputs, parameters) {

        return true;
    }
}
registerProcessor('wasm-worklet-processor', WASMWorkletProcessor);`