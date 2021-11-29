import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core'

@Directive({
  selector: '[appReverseIf]'
})
export class ReverseIfDirective {

  @Input('appReverseIf') set reverseIf(visible: boolean) {
    if (!visible) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    } else {
      this.viewContainer.clear()
    }
  }

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { }

}
