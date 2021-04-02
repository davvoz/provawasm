import { Component } from '@angular/core';
import { WasmService } from 'src/services/wasm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 0;
  a:any;
  fattore = 0;
  constructor(public wasmService : WasmService){
    
  
  }
  async fibonacci(){
    this.a = this.wasmService.fibonacci(this.fattore).subscribe(
      val=>{
       this.title = val;
      }
    );
  }
}
