import { Component } from '@angular/core';
import { ProvawasmService } from 'src/services/provawasm.service';
import { RustService } from 'src/services/rust.service';
import { TimerService } from 'src/services/timer.service';
import { WasmService } from 'src/services/wasm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 0;
  a: any;
  fattore = 0;
  oscWk!: AudioWorkletNode;
  audioEworkletSnippet = `
   `;

  constructor(public wasmrust: RustService, public wasmService: WasmService, public wasmprova: ProvawasmService, public myTimer: TimerService) {
    this.loadWorklet();
  }

  async fibonacci() {
    this.a = this.wasmService.fibonacci(this.fattore).subscribe(
      val => {
        this.title = val;
      }
    );
  }

  async run() {
    this.a = this.wasmprova.run(this.fattore).subscribe(
      val => {
        this.title = val;
      }
    );
  }

  async runRust() {
    this.a = this.wasmrust.run(this.fattore).subscribe(
      val => {
        console.log(val);
        this.title = val;
      }
    );
  }

  async loadWorklet() {
    
  }
}