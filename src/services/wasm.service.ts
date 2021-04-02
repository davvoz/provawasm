import { Injectable } from '@angular/core';
//@ts-ignore
import * as Module from '../assets/wasm/fibonacci.js';
import { BehaviorSubject } from 'rxjs';
import { Observable, of, pipe } from 'rxjs';
import { map, filter, tap, mergeMap } from 'rxjs/operators'
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WasmService {


  wasmReady = new BehaviorSubject<boolean>(false)
  module: any;
  constructor(private http: HttpClient) {
     this.instantiateWasm('../assets/wasm/fibonacci.wasm');////C:\Users\Compiuter\ngwasm\angular-wasm\src\assets\wasm\fibonacci.wasm
  
  //   this.instantiateWasmz('../assets/wasm/fibonacci.wasm', {}).then(module => {
     
  //     console.log(module.instance.exports.a);
      
  //   });
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
  private instantiateWasmz(
    url: string,
    imports?: WebAssembly.Imports
  ): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
    return this.http
      .get(url, { responseType: "arraybuffer" })
      .pipe(mergeMap((bytes) => WebAssembly.instantiate(bytes, imports)))
      .toPromise();
  }

  public fibonacci(input: number): Observable<number> {

    return this.wasmReady.pipe(filter(value => value === true)).pipe(

      map(() => {
        //console.log(this.module.__zone_symbol__value._fibonacci(30));

        return this.module.__zone_symbol__value._fibonacci(input);
      })
    )
  }
}
