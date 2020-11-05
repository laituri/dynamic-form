import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { DynamicFormBase } from '../dynamic-form-base.class';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DynamicFormService } from '../dynamic-form.service';
import { FieldTemplate, RepeaterField, Field } from '../dynamic-form.types';

@Component({
  selector: 'dyna-repeater',
  templateUrl: './repeater.component.html',
  styleUrls: ['./repeater.component.scss'],
})
export class RepeaterComponent
  extends DynamicFormBase
  implements OnInit, AfterViewInit {
  @Input()
  fields: FieldTemplate[];
  @Input()
  field: RepeaterField;
  @Input()
  controlsArray: FormArray;
  @Input()
  customFieldsTemplate: TemplateRef<any>;

  @ViewChildren('fieldsElement') subFields: QueryList<
    ElementRef<HTMLDivElement>
  >;

  constructor(public dfs: DynamicFormService) {
    super(dfs);
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    if (this.field.collapsed) {
      this.subFields.forEach(({ nativeElement }) => {
        nativeElement.style.maxHeight = `0px`;
        nativeElement.style.opacity = `0`;
      });
    }
  }

  public addItem() {
    const item = this.contructForm(this.fields as FieldTemplate[], null);
    this.controlsArray.push(item);
  }

  public drop(event: CdkDragDrop<string[]>) {
    const items: Field[] = this.controlsArray.value;
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.controlsArray.setValue(items);
  }

  deleteControlItem(i: number, el: HTMLDivElement) {
    /* const deleteConfirmation = confirm('Confirm removal');
    if (deleteConfirmation) { */
    let start: number;
    const totalTime = 300;
    const maxHeight = el.clientHeight;
    const collapseStep = (timestamp) => {
      if (start === undefined) {
        start = timestamp;
      }
      const elapsedTime = timestamp - start;
      const elapsedPercent =
        Math.round(((timestamp - start) / totalTime) * 100) / 100;

      el.style.maxHeight = `${Math.floor(maxHeight * (1 - elapsedPercent))}px`;
      el.style.opacity = `${1 - elapsedPercent}`;

      if (elapsedTime < totalTime) {
        window.requestAnimationFrame(collapseStep);
      } else {
        this.controlsArray.removeAt(i);
      }
    };
    window.requestAnimationFrame(collapseStep);
    /* } */
  }

  getDisplayValue(control: FormControl): string {
    const { display } = this.field;
    if (!display) {
      return '';
    }
    const value = control.value[display];
    if (!value) {
      return '';
    }
    return value.toString();
  }

  hideItemFields(el: HTMLDivElement) {
    const collapse = el.style.maxHeight !== '0px';
    let start: number;
    const totalTime = 300;
    if (collapse) {
      const maxHeight = el.clientHeight;
      function collapseStep(timestamp) {
        if (start === undefined) {
          start = timestamp;
        }
        const elapsedTime = timestamp - start;
        const elapsedPercent =
          Math.round(((timestamp - start) / totalTime) * 100) / 100;

        el.style.maxHeight = `${Math.floor(
          maxHeight * (1 - elapsedPercent),
        )}px`;
        el.style.opacity = `${1 - elapsedPercent}`;

        if (elapsedTime < totalTime) {
          window.requestAnimationFrame(collapseStep);
        }
      }
      window.requestAnimationFrame(collapseStep);
    } else {
      el.style.maxHeight = `initial`;
      function expandStep(timestamp) {
        if (start === undefined) {
          start = timestamp;
        }
        const elapsedTime = timestamp - start;
        const elapsedPercent =
          Math.round(((timestamp - start) / totalTime) * 100) / 100;
        el.style.opacity = `${elapsedPercent}`;

        if (elapsedTime < totalTime) {
          window.requestAnimationFrame(expandStep);
        }
      }
      window.requestAnimationFrame(expandStep);
    }
  }
}
