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
  constructor(private wasmService : WasmService){
    this.a = wasmService.fibonacci(27).subscribe(
      val=>{
       this.title = val;
      }
    );
  
  }
}
