import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import Pickr from '@simonwep/pickr';
import { AbstractControl } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const defaultColors = {
  hex: '#0889DA',
  rgba: 'rgb(100,100,100)',
};

@Component({
  selector: 'dyna-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent implements OnInit, OnDestroy {
  @Input()
  field: ColorField;
  @Input()
  control: AbstractControl;

  private pickr: Pickr;
  private colorSet: boolean;

  private subscriptions: Subscription[];

  @ViewChild('inputFieldElement', { static: true })
  inputFieldElement: ElementRef<HTMLInputElement>;
  @ViewChild('pickerElement', { static: true }) pickerElement: ElementRef<
    HTMLInputElement
  >;

  constructor() {}

  ngOnInit(): void {
    const { output, swatches, opacity } = this.field;

    this.pickr = Pickr.create({
      el: this.pickerElement.nativeElement,
      theme: 'nano', // or 'monolith', or 'nano'
      default: this.control.value || defaultColors[output],
      swatches,
      lockOpacity: !opacity,
      components: {
        // Main components
        opacity: opacity !== undefined ? opacity : true,
        preview: true,
        hue: true,

        // Input / output Options
        interaction: {
          input: true,
          save: true,
        },
      },
      strings: {
        save: 'Save color',
      },
    });
    this.pickr.on('show', (color: Pickr.HSVaColor, instance: Pickr) => {
      this.colorSet = false;
    });
    this.pickr.on('save', (color: Pickr.HSVaColor, instance: Pickr) => {
      this.setValue(color);
      this.colorSet = true;
      instance.hide();
    });
    this.pickr.on('change', (color: Pickr.HSVaColor, instance: Pickr) => {
      this.setValue(color);
    });
    this.pickr.on('hide', (instance: Pickr) => {
      if (!this.colorSet) {
        instance.setColor(this.control.value || '');
        this.colorSet = true;
      }
    });

    const inputTypingSubscription: Subscription = fromEvent(
      this.inputFieldElement.nativeElement,
      'keyup',
    )
      .pipe(debounceTime(1000))
      .subscribe(() => {
        try {
          this.pickr.setColor(this.control.value);
        } catch (error) {
          console.error('invalid color input');
        }
      });

    this.subscriptions = [inputTypingSubscription];
  }

  private setValue(color: Pickr.HSVaColor) {
    switch (this.field.output) {
      case 'rgba':
        this.control.setValue(color.toRGBA().toString(0));
        break;

      default:
        this.control.setValue(color.toHEXA().toString());
        break;
    }
  }
  ngOnDestroy() {
    this.pickr.off('save', () => {});
    this.pickr.off('change', () => {});
    this.pickr.off('hide', () => {});

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
