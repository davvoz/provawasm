import { Injectable } from '@angular/core';
//@ts-ignore
import * as Module from '../assets/wasm/fibonacci.js';
//@ts-ignore
import * as Module from '../assets/wasm/prova/prova.js';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WasmService {


  wasmReady = new BehaviorSubject<boolean>(false)
  wasmReadyProva = new BehaviorSubject<boolean>(false)
  module: any;
  moduleProva: any;
  constructor() {
    this.instantiateWasm('../assets/wasm/fibonacci.wasm');
    //this.instantiateWasmProva('../assets/wasm/prova/prova.wasm');
  }

  private async instantiateWasm(url: string) {
    // fetch the wasm file
    const wasmFile = await fetch(url)

    // convert it into a binary array
    const buffer = await wasmFile.arrayBuffer()
    const binary = new Uint8Array(buffer)

    // create module arguments
    // including the wasm-file
    const moduleArgs = {
      wasmBinary: binary,
      onRuntimeInitialized: () => {
        this.wasmReady.next(true)
      },
    }

    // instantiate the module
    this.module = Module(moduleArgs)
  }
  private async instantiateWasmProva(url: string) {
    // fetch the wasm file
    const wasmFile = await fetch(url)

    // convert it into a binary array
    const buffer = await wasmFile.arrayBuffer()
    const binary = new Uint8Array(buffer)

    // create module arguments
    // including the wasm-file
    const moduleArgs = {
      wasmBinary: binary,
      onRuntimeInitialized: () => {
        this.wasmReady.next(true)
      },
    }

    // instantiate the module
    this.module = Module(moduleArgs)
  }
  public fibonacci(input: number): Observable<number> {
    return this.wasmReady.pipe(filter(value => value === true)).pipe(
      map(() => {
        return this.module.__zone_symbol__value._fibonacci(input);
      })
    )
  }

  public prova(input: number): Observable<number> {
    return this.wasmReadyProva.pipe(filter(value => value === true)).pipe(
      map(() => {
        return this.moduleProva.__zone_symbol__value.run(input);
      })
    )
  }
}
