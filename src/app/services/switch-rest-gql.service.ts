import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchRestGqlService {
  useRest$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  changeService(useRest: boolean) {
    this.useRest$.next(useRest);
  }
}
