import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import init from 'src/assets/wasm/rust/pkg/hello_world.js';
@Injectable({
  providedIn: 'root'
})
export class RustService {

  wasmReadyProva = new BehaviorSubject<boolean>(false);
  moduleProva: any;

  constructor() {

  
    this.instantiateWasmProva('./assets/wasm/rust/pkg/hello_world_bg.wasm');
   
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
        this.wasmReadyProva.next(true)
      },
    }

    // instantiate the module
   // console.log(moduleArgs.wasmBinary);
    
   // this.moduleProva = Module(moduleArgs)
  }


  public run(input:number): Observable<number> {
    return this.wasmReadyProva.pipe(filter(value => value === true)).pipe(
      map(() => {
        console.log(this.moduleProva.__zone_symbol__value);
        return this.moduleProva.__zone_symbol__value._procedure(input);
      })
    )
  }
}